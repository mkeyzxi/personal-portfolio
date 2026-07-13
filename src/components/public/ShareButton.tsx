'use client';

import { Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface ShareButtonProps {
  title: string;
}

export default function ShareButton({ title }: ShareButtonProps) {
  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} | Portofolio`,
          url: url
        });
      } catch (err) {
        // Ignored, user cancelled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.success('Tautan berhasil disalin ke clipboard');
      } catch (err) {
        toast.error('Gagal menyalin tautan');
      }
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="flex items-center gap-2 px-3 py-1 rounded-full transition-colors border bg-[var(--color-bg-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)]"
      title="Bagikan Cerita"
    >
      <Share2 className="w-4 h-4" />
      <span className="font-mono text-sm hidden sm:inline">Share</span>
    </button>
  );
}
