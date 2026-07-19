'use client';

import { useState, useEffect, useCallback } from 'react';
import { Share2, Link as LinkIcon, Download, Copy, Loader2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import QRCode from 'qrcode';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StoryCardData } from './StoryShareCard';

interface ShareButtonProps {
  storyData: Omit<StoryCardData, 'websiteUrl'>;
}

// ============================================================
// Canvas-based image generator
// Menggambar langsung ke Canvas API sesuai template WriteMbuL
// Tidak bergantung pada DOM cloning atau html-to-image
// ============================================================

async function loadImage(src: string): Promise<HTMLImageElement | null> {
  if (!src) return null;
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
      if (lines.length >= maxLines) break;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }
  // Ellipsis pada baris terakhir jika terpotong
  if (lines.length === maxLines && currentLine && !lines.includes(currentLine)) {
    const last = lines[maxLines - 1];
    lines[maxLines - 1] = last.slice(0, -3) + '...';
  }
  return lines;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function formatLikes(n: number): string {
  if (n < 10) return 'Tertarik';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M Likes`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K Likes`;
  return `${n} Likes`;
}

// Menggambar ikon SVG hati (heart outline) ke canvas
function drawHeartIcon(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) {
  ctx.save();
  ctx.translate(cx - size / 2, cy - size / 2);
  const s = size / 24; // scale dari viewBox 24x24
  ctx.beginPath();
  // Path dari template: M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5...
  // Simplified heart shape
  ctx.moveTo(12 * s, 20 * s);
  ctx.bezierCurveTo(12 * s, 20 * s, 4 * s, 13 * s, 4 * s, 8.5 * s);
  ctx.bezierCurveTo(4 * s, 5.4 * s, 6.4 * s, 3 * s, 8.5 * s, 3 * s);
  ctx.bezierCurveTo(9.8 * s, 3 * s, 11 * s, 3.8 * s, 12 * s, 5 * s);
  ctx.bezierCurveTo(13 * s, 3.8 * s, 14.2 * s, 3 * s, 15.5 * s, 3 * s);
  ctx.bezierCurveTo(17.6 * s, 3 * s, 20 * s, 5.4 * s, 20 * s, 8.5 * s);
  ctx.bezierCurveTo(20 * s, 13 * s, 12 * s, 20 * s, 12 * s, 20 * s);
  ctx.closePath();
  ctx.strokeStyle = ctx.fillStyle;
  ctx.lineWidth = 1.5 * s;
  ctx.stroke();
  ctx.restore();
}

// Menggambar ikon kalender ke canvas
function drawCalendarIcon(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) {
  ctx.save();
  const s = size / 24;
  const x = cx - size / 2;
  const y = cy - size / 2;
  ctx.strokeStyle = ctx.fillStyle;
  ctx.lineWidth = 1.5 * s;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  // Rectangle body
  roundRect(ctx, x + 3 * s, y + 5 * s, 18 * s, 16 * s, 2 * s);
  ctx.stroke();
  // Top lines (pins)
  ctx.beginPath();
  ctx.moveTo(x + 8 * s, y + 3 * s);
  ctx.lineTo(x + 8 * s, y + 7 * s);
  ctx.moveTo(x + 16 * s, y + 3 * s);
  ctx.lineTo(x + 16 * s, y + 7 * s);
  // Horizontal line
  ctx.moveTo(x + 3 * s, y + 11 * s);
  ctx.lineTo(x + 21 * s, y + 11 * s);
  ctx.stroke();
  ctx.restore();
}

// Menggambar ikon globe ke canvas
function drawGlobeIcon(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) {
  ctx.save();
  const s = size / 24;
  const x = cx - size / 2;
  const y = cy - size / 2;
  ctx.strokeStyle = ctx.fillStyle;
  ctx.lineWidth = 1.5 * s;
  // Outer circle
  ctx.beginPath();
  ctx.arc(x + 12 * s, y + 12 * s, 9 * s, 0, Math.PI * 2);
  ctx.stroke();
  // Horizontal line
  ctx.beginPath();
  ctx.moveTo(x + 3 * s, y + 12 * s);
  ctx.lineTo(x + 21 * s, y + 12 * s);
  ctx.stroke();
  // Vertical ellipse
  ctx.beginPath();
  ctx.ellipse(x + 12 * s, y + 12 * s, 4 * s, 9 * s, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

// Menggambar ikon dokumen ke canvas
function drawDocIcon(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) {
  ctx.save();
  const s = size / 24;
  const x = cx - size / 2;
  const y = cy - size / 2;
  ctx.strokeStyle = ctx.fillStyle;
  ctx.lineWidth = 2 * s;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  // Body
  ctx.beginPath();
  ctx.moveTo(x + 14 * s, y + 2 * s);
  ctx.lineTo(x + 7 * s, y + 2 * s);
  ctx.bezierCurveTo(x + 5.9 * s, y + 2 * s, x + 5 * s, y + 2.9 * s, x + 5 * s, y + 4 * s);
  ctx.lineTo(x + 5 * s, y + 20 * s);
  ctx.bezierCurveTo(x + 5 * s, y + 21.1 * s, x + 5.9 * s, y + 22 * s, x + 7 * s, y + 22 * s);
  ctx.lineTo(x + 17 * s, y + 22 * s);
  ctx.bezierCurveTo(x + 18.1 * s, y + 22 * s, x + 19 * s, y + 21.1 * s, x + 19 * s, y + 20 * s);
  ctx.lineTo(x + 19 * s, y + 7 * s);
  ctx.lineTo(x + 14 * s, y + 2 * s);
  ctx.stroke();
  // Fold
  ctx.beginPath();
  ctx.moveTo(x + 14 * s, y + 2 * s);
  ctx.lineTo(x + 14 * s, y + 7 * s);
  ctx.lineTo(x + 19 * s, y + 7 * s);
  ctx.stroke();
  // Lines
  ctx.beginPath();
  ctx.moveTo(x + 9 * s, y + 12 * s);
  ctx.lineTo(x + 15 * s, y + 12 * s);
  ctx.moveTo(x + 9 * s, y + 16 * s);
  ctx.lineTo(x + 15 * s, y + 16 * s);
  ctx.stroke();
  ctx.restore();
}

async function generateStoryCanvas(data: StoryCardData): Promise<string> {
  // Ukuran canvas standar IG Story (9:16)
  const W = 1080;
  const H = 1920;
  
  // Untuk membuat efek card-within-a-card, kita tetapkan lebar kartu dalam
  const CARD_W = 900;
  const CARD_H = 1600; // 900 * (16/9) = 1600 (Tetap proporsional 9:16)
  
  const OUTER_PAD_X = (W - CARD_W) / 2; // 90px
  const OUTER_PAD_Y = (H - CARD_H) / 2; // 160px
  
  // SCALE untuk semua elemen di dalam kartu didasarkan pada lebar referensi 420px
  const SCALE = CARD_W / 420; // ~2.14
  
  const PAD = 32 * SCALE; // Padding di dalam kartu putih

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  
  const CARD_X = OUTER_PAD_X;
  const CARD_Y = OUTER_PAD_Y;
  const CONTENT_W = CARD_W - PAD * 2;
  const FONT = 'Inter, system-ui, -apple-system, sans-serif';

  // === Background Keseluruhan (Abu-abu) ===
  ctx.fillStyle = '#f3f4f6'; // gray-100
  ctx.fillRect(0, 0, W, H);

  // === Outer Card Shadow ===
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 20;
  roundRect(ctx, CARD_X, CARD_Y, CARD_W, CARD_H, 24 * SCALE);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.restore();

  // === White Card ===
  roundRect(ctx, CARD_X, CARD_Y, CARD_W, CARD_H, 24 * SCALE);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  
  // Clip ke rounded rect agar shadow dan konten tidak keluar
  ctx.save();
  roundRect(ctx, CARD_X, CARD_Y, CARD_W, CARD_H, 24 * SCALE);
  ctx.clip();

  let y = CARD_Y + PAD;

  // ==========================================
  // HEADER: "WriteMbuL" (kiri) + ikon+kategori (kanan)
  // ==========================================
  const headerH = 24 * SCALE;
  
  // WriteMbuL
  ctx.fillStyle = '#000000';
  ctx.font = `800 ${21 * SCALE}px ${FONT}`;
  ctx.textBaseline = 'middle';
  ctx.fillText('WriteMbuL', CARD_X + PAD, y + headerH / 2);

  // Category (kanan)
  const catName = data.categoryName || 'Story';
  ctx.fillStyle = '#374151'; // gray-700
  ctx.font = `500 ${14 * SCALE}px ${FONT}`;
  const catMetrics = ctx.measureText(catName);
  const catTextX = CARD_X + CARD_W - PAD - catMetrics.width;
  ctx.fillText(catName, catTextX, y + headerH / 2);

  // Document icon (sebelum kategori)
  const iconSize = 16 * SCALE;
  ctx.fillStyle = '#374151';
  drawDocIcon(ctx, catTextX - iconSize / 2 - 4 * SCALE, y + headerH / 2, iconSize);

  y += headerH + 16 * SCALE;

  // Border bottom header
  ctx.strokeStyle = '#f3f4f6'; // gray-100
  ctx.lineWidth = 1 * SCALE;
  ctx.beginPath();
  ctx.moveTo(CARD_X + PAD, y);
  ctx.lineTo(CARD_X + CARD_W - PAD, y);
  ctx.stroke();

  // ==========================================
  // MAIN CONTENT: Title + Description (centered vertically)
  // ==========================================
  
  // Hitung ruang yang tersedia untuk konten utama
  // Bottom sections heights (approximate):
  const metaH = 56 * SCALE;      // meta bar
  const metaGap = 24 * SCALE;    // mb-6 
  const authorH = 56 * SCALE;    // author row
  const authorGap = 24 * SCALE;  // mb-6
  const footerH = 88 * SCALE;    // footer box
  const bottomTotal = metaH + metaGap + authorH + authorGap + footerH + PAD;
  
  const mainTop = y;
  const mainBottom = CARD_Y + CARD_H - bottomTotal;
  const mainH = mainBottom - mainTop;
  const mainPadY = 24 * SCALE; // py-6

  // Measure title
  ctx.font = `bold ${40 * SCALE}px ${FONT}`; // text-[2.5rem]
  const titleLines = wrapText(ctx, data.title, CONTENT_W, 4);
  const titleLineH = 44 * SCALE; // leading-tight
  const titleBlockH = titleLines.length * titleLineH;

  // Measure description
  ctx.font = `400 ${18 * SCALE}px ${FONT}`; // text-lg
  const descLines = wrapText(ctx, data.description, CONTENT_W, 5);
  const descLineH = 28 * SCALE; // leading-relaxed
  const descBlockH = descLines.length * descLineH;

  const contentBlockH = titleBlockH + 16 * SCALE + descBlockH; // mb-4 gap
  
  // Prevent negative start Y if content is too large
  let contentStartY = mainTop + mainPadY + (mainH - mainPadY * 2 - contentBlockH) / 2;
  if (contentStartY < mainTop + 16 * SCALE) {
    contentStartY = mainTop + 16 * SCALE;
  }

  // Draw title
  ctx.fillStyle = '#000000';
  ctx.font = `bold ${40 * SCALE}px ${FONT}`;
  ctx.textBaseline = 'top';
  let ty = contentStartY;
  for (const line of titleLines) {
    ctx.fillText(line, CARD_X + PAD, ty);
    ty += titleLineH;
  }

  ty += 16 * SCALE; // mb-4

  // Draw description
  ctx.fillStyle = '#4b5563'; // gray-600
  ctx.font = `400 ${18 * SCALE}px ${FONT}`;
  for (const line of descLines) {
    ctx.fillText(line, CARD_X + PAD, ty);
    ty += descLineH;
  }

  // ==========================================
  // META BAR: ❤ Likes | 📅 Date
  // ==========================================
  y = mainBottom;

  // Border top
  ctx.strokeStyle = '#f3f4f6';
  ctx.lineWidth = 1 * SCALE;
  ctx.beginPath();
  ctx.moveTo(CARD_X + PAD, y);
  ctx.lineTo(CARD_X + CARD_W - PAD, y);
  ctx.stroke();

  const metaCenterY = y + metaH / 2;
  ctx.textBaseline = 'middle';

  // Heart icon + Likes (left half)
  ctx.fillStyle = '#6b7280'; // gray-500
  const metaIconSize = 20 * SCALE;
  const likesText = formatLikes(data.likes);
  ctx.font = `400 ${14 * SCALE}px ${FONT}`;
  const likesW = ctx.measureText(likesText).width;
  const likesGroupW = metaIconSize + 8 * SCALE + likesW;
  const likesStartX = CARD_X + PAD + (CONTENT_W / 2 - likesGroupW) / 2;
  
  drawHeartIcon(ctx, likesStartX + metaIconSize / 2, metaCenterY, metaIconSize);
  ctx.fillStyle = '#6b7280';
  ctx.fillText(likesText, likesStartX + metaIconSize + 8 * SCALE, metaCenterY);

  // Divider (center vertical line)
  ctx.strokeStyle = '#e5e7eb'; // gray-200
  ctx.lineWidth = 1 * SCALE;
  ctx.beginPath();
  ctx.moveTo(CARD_X + CARD_W / 2, y + 12 * SCALE);
  ctx.lineTo(CARD_X + CARD_W / 2, y + metaH - 12 * SCALE);
  ctx.stroke();

  // Calendar icon + Date (right half)
  ctx.fillStyle = '#6b7280';
  const dateText = data.publishDate;
  ctx.font = `400 ${14 * SCALE}px ${FONT}`;
  const dateW = ctx.measureText(dateText).width;
  const dateGroupW = metaIconSize + 8 * SCALE + dateW;
  const dateStartX = CARD_X + CARD_W / 2 + (CONTENT_W / 2 - dateGroupW) / 2;
  
  drawCalendarIcon(ctx, dateStartX + metaIconSize / 2, metaCenterY, metaIconSize);
  ctx.fillStyle = '#6b7280';
  ctx.fillText(dateText, dateStartX + metaIconSize + 8 * SCALE, metaCenterY);

  // Border bottom
  ctx.beginPath();
  ctx.strokeStyle = '#f3f4f6';
  ctx.moveTo(CARD_X + PAD, y + metaH);
  ctx.lineTo(CARD_X + CARD_W - PAD, y + metaH);
  ctx.stroke();

  y += metaH + metaGap;

  // ==========================================
  // AUTHOR: Avatar + Name + Role
  // ==========================================
  const avatarSize = 56 * SCALE; // w-14 h-14
  const avatarX = CARD_X + PAD;
  const avatarY = y;

  // Avatar circle
  let avatarImg = null;
  if (data.authorPhoto) {
    avatarImg = await loadImage(data.authorPhoto);
  }
  
  if (!avatarImg) {
    avatarImg = await loadImage(`${data.websiteUrl}/profile.jpeg`);
  }
  
  if (avatarImg) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(avatarImg, avatarX, avatarY, avatarSize, avatarSize);
    ctx.restore();
  } else {
    // Fallback shape if image completely fails to load
    ctx.fillStyle = '#e5e7eb';
    ctx.beginPath();
    ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  const textX = avatarX + avatarSize + 16 * SCALE; // mr-4

  // Author name
  ctx.fillStyle = '#000000';
  ctx.font = `bold ${16 * SCALE}px ${FONT}`; // text-base font-bold
  ctx.textBaseline = 'middle';
  ctx.fillText(data.authorName, textX, avatarY + avatarSize * 0.35);

  // Author role
  ctx.fillStyle = '#6b7280'; // gray-500
  ctx.font = `400 ${14 * SCALE}px ${FONT}`; // text-sm
  ctx.fillText('Author', textX, avatarY + avatarSize * 0.7);

  y += avatarSize + authorGap;

  // ==========================================
  // FOOTER: QR Code + CTA
  // ==========================================
  const footerPad = 16 * SCALE; // p-4
  const footerRadius = 16 * SCALE; // rounded-2xl
  const footerY = y;
  const actualFooterH = footerH;

  // Footer background
  roundRect(ctx, CARD_X + PAD, footerY, CONTENT_W, actualFooterH, footerRadius);
  ctx.fillStyle = '#f9fafb'; // gray-50
  ctx.fill();
  ctx.strokeStyle = '#f3f4f6'; // gray-100
  ctx.lineWidth = 1 * SCALE;
  ctx.stroke();

  // QR container
  const qrBoxSize = 80 * SCALE; // w-20 h-20
  const qrBoxX = CARD_X + PAD + footerPad;
  const qrBoxY = footerY + (actualFooterH - qrBoxSize) / 2;
  
  roundRect(ctx, qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 12 * SCALE);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1 * SCALE;
  ctx.stroke();

  // Draw Real QR Code
  const qrPad = 4 * SCALE;
  const fullLink = `${data.websiteUrl}/story/${data.slug}`;
  try {
    const qrDataUrl = await QRCode.toDataURL(fullLink, {
      width: qrBoxSize - qrPad * 2,
      margin: 0,
      color: {
        dark: '#0f172a', // slate-900
        light: '#ffffff'
      }
    });
    const qrImg = await loadImage(qrDataUrl);
    if (qrImg) {
      ctx.drawImage(qrImg, qrBoxX + qrPad, qrBoxY + qrPad, qrBoxSize - qrPad * 2, qrBoxSize - qrPad * 2);
    }
  } catch (err) {
    console.error("Gagal membuat QR code", err);
  }

  // Text content (right of QR)
  const ftTextX = qrBoxX + qrBoxSize + 16 * SCALE; // mr-4
  let ftY = qrBoxY + 4 * SCALE;

  // "Baca selengkapnya di"
  ctx.fillStyle = '#000000';
  ctx.font = `bold ${14 * SCALE}px ${FONT}`; // text-sm font-bold
  ctx.textBaseline = 'top';
  ctx.fillText('Baca selengkapnya di', ftTextX, ftY);

  ftY += 20 * SCALE;

  // Globe icon + URL
  ctx.fillStyle = '#374151'; // gray-700
  const globeSize = 16 * SCALE;
  drawGlobeIcon(ctx, ftTextX + globeSize / 2, ftY + globeSize / 2, globeSize);
  
  ctx.font = `500 ${12 * SCALE}px ${FONT}`; // text-xs font-medium
  ctx.fillStyle = '#374151';
  
  // Format URL tanpa https://
  const cleanUrl = data.websiteUrl.replace(/^https?:\/\//, '');
  const displayFullUrl = `${cleanUrl}/story/${data.slug}`;
  
  const maxUrlW = CONTENT_W - (ftTextX - CARD_X - PAD) - footerPad - globeSize - 8 * SCALE;
  let displayUrl = displayFullUrl;
  if (ctx.measureText(displayFullUrl).width > maxUrlW) {
    while (ctx.measureText(displayUrl + '...').width > maxUrlW && displayUrl.length > 5) {
      displayUrl = displayUrl.slice(0, -1);
    }
    displayUrl += '...';
  }
  ctx.fillText(displayUrl, ftTextX + globeSize + 4 * SCALE, ftY + 2 * SCALE);

  ftY += 22 * SCALE;

  // Small text
  ctx.fillStyle = '#6b7280'; // gray-500
  ctx.font = `400 ${10 * SCALE}px ${FONT}`; // text-[10px]
  const smallMaxW = CONTENT_W - (ftTextX - CARD_X - PAD) - footerPad;
  const smallLines = wrapText(ctx, 'Scan QR atau kunjungi link di atas untuk membaca versi lengkap.', smallMaxW, 2);
  for (const line of smallLines) {
    ctx.fillText(line, ftTextX, ftY);
    ftY += 14 * SCALE;
  }

  ctx.restore(); // Restore dari clip

  return canvas.toDataURL('image/png');
}

// ============================================================

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
          title: `${storyData.title} | Makbul N`,
          url: url,
        });
        setIsOpen(false);
      } catch (err) {
        // User cancelled
      }
    } else {
      handleCopyLink();
    }
  };

  const handleExportImage = useCallback(async () => {
    setIsExporting(true);
    toast.loading('Menyiapkan Gambar Story...', { id: 'export-toast' });

    try {
      const dataUrl = await generateStoryCanvas(fullStoryData);

      const link = document.createElement('a');
      link.download = `${storyData.slug}-story.png`;
      link.href = dataUrl;
      link.click();

      toast.success('Berhasil mengunduh gambar!', { id: 'export-toast' });
      setIsOpen(false);
    } catch (error) {
      console.error('Gagal menghasilkan gambar story:', error);
      toast.error(
        `Gagal mengunduh gambar: ${error instanceof Error ? error.message : 'Terjadi kesalahan'}`,
        { id: 'export-toast' }
      );
    } finally {
      setIsExporting(false);
    }
   
  }, [fullStoryData, storyData.slug]);

  return (
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
            {isExporting ? (
              <Loader2 className="w-4 h-4 animate-spin text-[var(--color-text-muted)]" />
            ) : (
              <Download className="w-4 h-4 text-[var(--color-text-muted)]" />
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
