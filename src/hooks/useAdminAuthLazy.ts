'use client';

import { useState, useEffect } from 'react';

/**
 * Hook khusus untuk meload status Admin secara dinamis.
 * Hook ini hanya akan mengunduh SDK Firebase Auth dan memverifikasi status
 * jika terdapat flag 'admin-auth' di localStorage.
 * Hal ini memastikan pengunjung publik tidak dibebani oleh Firebase Auth.
 */
export function useAdminAuthLazy() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkAuth = () => {
      const authFlag = localStorage.getItem('admin-auth');
      if (authFlag === 'true') {
        // Hanya muat SDK jika admin-auth adalah true
        if (!isAuthLoaded) {
          import('@/lib/firebase').then(({ auth }) => {
            import('firebase/auth').then(({ onAuthStateChanged }) => {
              const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                  setIsAdmin(true);
                } else {
                  setIsAdmin(false);
                  localStorage.removeItem('admin-auth');
                }
              });
              setIsAuthLoaded(true);
              
              // Cleanup tidak mudah dikembalikan secara sinkron di sini, 
              // namun tidak masalah karena sidebar hidup secara global.
            }).catch(console.error);
          }).catch(console.error);
        } else {
          // SDK sudah dimuat dan listener sudah berjalan
        }
      } else {
        setIsAdmin(false);
      }
    };

    // Jalankan pemeriksaan saat mount
    checkAuth();

    // Dengarkan perubahan pada localStorage (misal dari tab lain atau setelah login/logout)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin-auth') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event untuk komunikasi dalam tab yang sama karena StorageEvent hanya berjalan cross-tab
    const handleLocalAuthChange = () => {
      checkAuth();
    };
    window.addEventListener('admin-auth-changed', handleLocalAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('admin-auth-changed', handleLocalAuthChange);
    };
  }, [isAuthLoaded]);

  return isAdmin;
}
