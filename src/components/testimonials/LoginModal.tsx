'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SocialLoginButton from './SocialLoginButton';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast } from 'sonner';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleLogin = async (provider: any, providerName: string) => {
    setLoadingProvider(providerName);
    try {
      await signInWithPopup(auth, provider);
      toast.success(`Berhasil login dengan ${providerName}`);
      onClose();
    } catch (error: any) {
      console.error(`Login error (${providerName}):`, error);
      toast.error(`Gagal login dengan ${providerName}`, {
        description: error.message || 'Pastikan provider diaktifkan di Firebase Console.'
      });
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-[var(--color-bg-surface)] border-[var(--color-border)] rounded-2xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-bold text-center text-[var(--color-text-primary)]">
            Masuk untuk Berinteraksi
          </DialogTitle>
          <p className="text-sm text-center text-[var(--color-text-secondary)] mt-2">
            Pilih penyedia layanan autentikasi untuk meninggalkan testimoni atau komentar.
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <SocialLoginButton
            providerName="Google"
            iconName="logos:google-icon"
            isLoading={loadingProvider === 'Google'}
            onClick={() => handleLogin(new GoogleAuthProvider(), 'Google')}
          />
          <SocialLoginButton
            providerName="GitHub"
            iconName="mdi:github"
            isLoading={loadingProvider === 'GitHub'}
            onClick={() => handleLogin(new GithubAuthProvider(), 'GitHub')}
            className="dark:bg-white dark:text-black dark:hover:bg-gray-200" // Pengecualian style khusus Github di mode gelap jika diperlukan
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
