import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

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
  categoryName?: string;
}

interface StoryShareCardProps {
  data: StoryCardData;
}

export default function StoryShareCard({ data }: StoryShareCardProps) {
  return (
    <div
      id="story-share-card"
      style={{
        width: '420px',
        height: '746px', // aspect 9:16
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      }}
      className="bg-white rounded-3xl shadow-xl flex flex-col p-8 overflow-hidden"
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-100 pb-4">
        <h1 className="text-xl font-extrabold tracking-tight text-black">
          WriteMbuL
        </h1>
        <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>{data.categoryName || 'Story'}</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center py-6">
        <h2 className="text-[2.5rem] font-bold leading-tight text-black mb-4">
          {data.title}
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed line-clamp-4">
          {data.description}
        </p>
      </div>

      {/* Meta Data */}
      <div className="flex items-center text-gray-500 text-sm border-t border-b border-gray-100 py-4 mb-6">
        <div className="flex items-center flex-1 justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>{formatLikesDisplay(data.likes)} Likes</span>
        </div>
        <div className="h-6 border-l border-gray-200"></div>
        <div className="flex items-center flex-1 justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{data.publishDate}</span>
        </div>
      </div>

      {/* Author */}
      <div className="flex items-center mb-6">
        <div className="w-14 h-14 rounded-full bg-gray-200 mr-4 overflow-hidden shrink-0">
          {data.authorPhoto ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={data.authorPhoto} alt={data.authorName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-full h-full bg-gray-300" />
          )}
        </div>
        <div>
          <h3 className="font-bold text-black text-base">{data.authorName}</h3>
          <p className="text-sm text-gray-500">{data.authorRole || 'Author'}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4 flex items-center">
        <div className="w-20 h-20 bg-white rounded-xl border border-gray-200 shrink-0 mr-4 p-1 flex items-center justify-center">
          <QRCodeCanvas
            value={`${data.websiteUrl}/story/${data.slug}`}
            size={68}
            level="M"
            includeMargin={false}
          />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <span className="font-bold text-sm text-black mb-1">Baca selengkapnya di</span>
          <div className="flex items-center text-xs text-gray-700 font-medium mb-2">
            <svg className="w-4 h-4 mr-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <span className="truncate">writembul.com/story/{data.slug}</span>
          </div>
          <p className="text-[10px] leading-snug text-gray-500">
            Scan QR atau kunjungi link di atas untuk membaca versi lengkap.
          </p>
        </div>
      </div>
    </div>
  );
}

function formatLikesDisplay(likes: number): string {
  if (likes >= 1000000) return `${(likes / 1000000).toFixed(1)}M`;
  if (likes >= 1000) return `${(likes / 1000).toFixed(1)}K`;
  return String(likes);
}
