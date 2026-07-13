'use client';

import { useState, useEffect } from 'react';
import { Share2, Link as LinkIcon, Download, Copy, Loader2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { toPng } from 'html-to-image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import StoryShareCard, { StoryCardData } from './StoryShareCard';

interface ShareButtonProps {
  storyData: Omit<StoryCardData, 'websiteUrl'>;
}

export default function ShareButton({ storyData }: ShareButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const fullStoryData: StoryCardData = {
    ...storyData,
    websiteUrl: origin || 'https://writembul.com',
  };

  const url = `${fullStoryData.websiteUrl}/story/${storyData.slug}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Tautan berhasil disalin ke clipboard');
      setIsOpen(false);
    } catch (err) {
      toast.error('Gagal menyalin tautan');
    }
  };

  const handleShareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${storyData.title} | Portofolio`,
          url: url
        });
        setIsOpen(false);
      } catch (err) {
        // Ignored, user cancelled share
      }
    } else {
      handleCopyLink();
    }
  };

  const handleExportImage = async () => {
    setIsExporting(true);
    toast.loading('Menyiapkan Gambar Story...', { id: 'export-toast' });
    
    // Memberikan waktu sebentar agar render komponen DOM (terutama font dan gambar) siap
    setTimeout(async () => {
      try {
        const element = document.getElementById('story-share-card');
        if (!element) throw new Error('Elemen tidak ditemukan');

        // Pastikan font sudah dimuat jika browser mendukung
        if (document.fonts) {
          await document.fonts.ready;
        }

        const dataUrl = await toPng(element, {
          pixelRatio: 3,
          cacheBust: true,
          style: {
            transform: 'scale(1)',
            transformOrigin: 'top left',
          }
        });

        const link = document.createElement('a');
        link.download = `${storyData.slug}-story.png`;
        link.href = dataUrl;
        link.click();

        toast.success('Berhasil mengunduh gambar!', { id: 'export-toast' });
        setIsOpen(false);
      } catch (error) {
        console.error('Gagal menghasilkan gambar story:', error);
        toast.error(`Gagal mengunduh gambar: ${error instanceof Error ? error.message : 'Unknown error'}`, { id: 'export-toast' });
      } finally {
        setIsExporting(false);
      }
    }, 500);
  };

  return (
    <>
      {/* Hidden Card for export */}
      <div style={{ position: 'absolute', zIndex: -9999, opacity: 0, pointerEvents: 'none' }}>
        <div id="story-share-card-wrapper" style={{ width: '360px', height: '640px' }}>
          {origin && <StoryShareCard data={fullStoryData} />}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger render={
          <button 
            className="flex items-center gap-2 px-3 py-1 rounded-full transition-colors border bg-[var(--color-bg-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)]"
            title="Bagikan Cerita"
          >
            <Share2 className="w-4 h-4" />
            <span className="font-mono text-sm hidden sm:inline">Share</span>
          </button>
        } />
        <DialogContent className="sm:max-w-md border-[var(--color-border)] bg-[var(--color-bg-surface)]">
          <DialogHeader>
            <DialogTitle className="text-center text-[var(--color-text-primary)]">Share Story</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2 py-4">
            <button 
              onClick={handleCopyLink}
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-[var(--color-bg-elevated)] transition-colors text-left text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            >
              <Copy className="w-5 h-5 text-[var(--color-text-muted)]" />
              <span className="font-medium">Salin Tautan</span>
            </button>
            <button 
              onClick={handleShareLink}
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-[var(--color-bg-elevated)] transition-colors text-left text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            >
              <LinkIcon className="w-5 h-5 text-[var(--color-text-muted)]" />
              <span className="font-medium">Bagikan Tautan</span>
            </button>
            <button 
              onClick={handleExportImage}
              disabled={isExporting}
              className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-[var(--color-bg-elevated)] transition-colors text-left text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <ImageIcon className="w-5 h-5 text-[var(--color-interactive)]" />
                <span className="font-medium">Buat Gambar Instagram Story</span>
              </div>
              {isExporting ? <Loader2 className="w-4 h-4 animate-spin text-[var(--color-text-muted)]" /> : <Download className="w-4 h-4 text-[var(--color-text-muted)]" />}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
