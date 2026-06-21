'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import * as LucideIcons from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    
    // Opsional: Memaksa pemilihan akun
    provider.setCustomParameters({
      prompt: 'select_account'
    });

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Ambil token untuk verifikasi ke server
      const token = await user.getIdToken();
      
      // Hit endpoint verifikasi untuk memastikan ini email admin
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();
      
      if (data.success) {
        toast.success('Login berhasil!');
        router.push('/admin');
      } else {
        toast.error('Akses Ditolak: Email tidak terdaftar sebagai Admin');
        auth.signOut(); // Sign out user yang bukan admin
      }
    } catch (err: any) {
      console.error(err);
      toast.error('Gagal login dengan Google.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-main)] p-4">
      <div className="w-full max-w-sm rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-8 shadow-xl text-center">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 rounded-full bg-[var(--color-interactive)] p-4 text-[var(--color-interactive-text)] shadow-lg shadow-blue-500/20">
            <LucideIcons.ShieldCheck className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Admin Portal</h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Akses eksklusif administrator sistem.
          </p>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-main)] px-4 py-3 font-semibold text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-interactive)] disabled:opacity-70 disabled:cursor-not-allowed group"
        >
          {isLoading ? (
            <LucideIcons.Loader2 className="h-5 w-5 animate-spin text-[var(--color-text-secondary)]" />
          ) : (
            <>
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Masuk dengan Google
            </>
          )}
        </button>

        <button 
          onClick={() => router.push('/')}
          className="mt-6 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors inline-flex items-center gap-2"
        >
          <LucideIcons.ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}
