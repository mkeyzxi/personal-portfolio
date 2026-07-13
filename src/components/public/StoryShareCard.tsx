import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export interface StoryCardData {
  title: string;
  description: string;
  thumbnail?: string;
  slug: string;
  likes: number;
  authorName: string;
  authorPhoto: string;
  authorRole: string;
  websiteUrl: string;
  publishDate: string;
}

interface StoryShareCardProps {
  data: StoryCardData;
}

export default function StoryShareCard({ data }: StoryShareCardProps) {
  return (
    <div
      id="story-share-card"
      className="absolute bg-[var(--color-bg-main)] text-[var(--color-text-primary)] flex flex-col justify-between overflow-hidden"
      style={{
        width: '360px',
        height: '640px',
        left: '-9999px', // Render off-screen
        top: 0,
        fontFamily: 'var(--font-geist-sans), sans-serif',
      }}
    >
      {/* Container Surface */}
      <div className="flex-1 flex flex-col p-6 bg-[var(--color-bg-surface)] border-[var(--color-border)] border m-4 rounded-2xl relative shadow-lg">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon.png" alt="WriteMbul Logo" className="w-8 h-8 object-contain filter grayscale" />
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight leading-tight">WriteMbul</span>
            <span className="text-[10px] text-[var(--color-text-secondary)] font-mono tracking-tighter">Stories that inspire</span>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-[var(--color-border)] mb-4" />

        {/* Cover Story */}
        <div className="w-full h-32 rounded-xl bg-[var(--color-bg-elevated)] overflow-hidden mb-4 shrink-0 flex items-center justify-center relative border border-[var(--color-border)]">
          {data.thumbnail ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img 
              src={data.thumbnail} 
              alt={data.title} 
              className="w-full h-full object-cover filter grayscale"
            />
          ) : (
            <div className="text-[var(--color-text-muted)] text-xs font-mono">No Image</div>
          )}
        </div>

        {/* Title & Description */}
        <div className="flex-1 min-h-0">
          <h1 className="text-lg font-bold leading-tight mb-2 line-clamp-2">
            {data.title}
          </h1>
          <p className="text-xs text-[var(--color-text-secondary)] line-clamp-3 leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-[10px] font-mono text-[var(--color-text-muted)] mb-4 mt-2">
          <span>❤️ {data.likes} Likes</span>
          <span>📅 {data.publishDate}</span>
        </div>

        {/* Author Profile */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-[var(--color-bg-elevated)] shrink-0 border border-[var(--color-border)]">
            {data.authorPhoto ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img 
                src={data.authorPhoto} 
                alt={data.authorName} 
                className="w-full h-full object-cover filter grayscale"
              />
            ) : (
              <div className="w-full h-full bg-neutral-300 dark:bg-neutral-700"></div>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold truncate">{data.authorName}</span>
            <span className="text-[10px] text-[var(--color-text-secondary)] truncate">{data.authorRole}</span>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-[var(--color-border)] mb-4" />

        {/* Footer: QR & CTA */}
        <div className="flex items-center gap-4">
          <div className="p-1 bg-white rounded shrink-0">
            <QRCodeSVG 
              value={`${data.websiteUrl}/story/${data.slug}`} 
              size={50} 
              level="M" 
              includeMargin={false} 
            />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <div className="w-full bg-[var(--color-text-primary)] text-[var(--color-bg-main)] text-center py-1.5 rounded uppercase text-[10px] font-bold tracking-wider mb-1">
              Read Full Story
            </div>
            <span className="text-[8px] font-mono text-[var(--color-text-muted)] truncate text-center">
              writembul.com/story/{data.slug}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
