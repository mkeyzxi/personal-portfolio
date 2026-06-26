'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import * as LucideIcons from 'lucide-react';
import { toast } from 'sonner';

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [user, loading, error] = useAuthState(auth);
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verifyAdmin = async () => {
      // Tunggu hingga Firebase Auth selesai memeriksa state
      if (loading) return;

      // Jika belum login, tendang ke login
      if (!user) {
        setIsVerifying(false);
        setIsAdmin(false);
        router.push('/admin/login');
        return;
      }

      try {
        const token = await user.getIdToken();
        const res = await fetch('/api/admin/verify', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await res.json();
        
        if (data.success) {
          localStorage.setItem('admin-auth', 'true');
          setIsAdmin(true);
        } else {
          localStorage.removeItem('admin-auth');
          toast.error('Akses Ditolak: Anda bukan Administrator');
          await auth.signOut();
          router.push('/');
        }
      } catch (err) {
        console.error('Verifikasi admin gagal', err);
        router.push('/');
      } finally {
        setIsVerifying(false);
      }
    };

    verifyAdmin();
  }, [user, loading, router]);

  if (loading || isVerifying) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[var(--color-bg-main)]">
        <LucideIcons.Loader2 className="w-10 h-10 animate-spin text-[var(--color-interactive)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[var(--color-bg-main)]">
        <p className="text-red-500">Terjadi kesalahan pada Autentikasi.</p>
      </div>
    );
  }

  // Jika sudah terverifikasi sebagai admin, tampilkan komponen anak
  if (isAdmin) {
    return <>{children}</>;
  }

  // Jika semua pengecekan gagal, return null (akan di-redirect oleh useEffect)
  return null;
}
