'use client';

import { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';

/**
 * A lazy version of useAuthState that dynamically imports Firebase
 * only when the hook is mounted. This prevents Firebase from being
 * included in the initial main bundle for public users.
 */
export function useLazyAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let isMounted = true;

    const initAuth = async () => {
      try {
        const { auth } = await import('@/lib/firebase');
        const { onAuthStateChanged } = await import('firebase/auth');
        
        unsubscribe = onAuthStateChanged(auth, (u) => {
          if (isMounted) {
            setUser(u);
            setLoading(false);
          }
        });
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
          setLoading(false);
        }
      }
    };

    initAuth();

    return () => {
      isMounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return [user, loading, error] as const;
}
