'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function StoryIndexPage() {
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [navigatingId, setNavigatingId] = useState<string | null>(null);

  // Menggunakan SWR untuk caching otomatis. 
  // Fetcher akan mengambil data sekali, dan menyimpannya di cache.
  // Jika pindah halaman dan kembali, data akan langsung dirender dari cache.
  const { data: catRes, error: catError } = useSWR('/api/categories', fetcher, { revalidateOnFocus: false });
  const { data: storyRes, error: storyError } = useSWR('/api/stories', fetcher, { revalidateOnFocus: false });

  const categories = catRes?.success ? catRes.data : [];
  const allStories = storyRes?.success ? storyRes.data : [];
  
  const isLoading = (!catRes && !catError) || (!storyRes && !storyError);

  // 1. Dapatkan daftar slug kategori yang sudah memiliki artikel
  const usedCategorySlugs = new Set(allStories.map((s: any) => s.categorySlug));
  
  // 2. Filter kategori agar HANYA menampilkan kategori yang memiliki konten
  const availableCategories = categories.filter((cat: any) => usedCategorySlugs.has(cat.slug));

  // 3. Filter story berdasarkan kategori aktif di sisi klien (karena data sudah ter-fetch semua)
  const filteredStories = activeCategory 
    ? allStories.filter((s: any) => s.categorySlug === activeCategory)
    : allStories;

  // Hapus state loading navigasi jika user menekan tombol Back di browser (BFCache)
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        setNavigatingId(null);
      }
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  return (
    <div className="p-8 md:p-12 max-w-5xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
          Story & Artikel
        </h1>
        <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          Catatan perjalanan, pemikiran, dan tutorial seputar pengembangan web, teknologi, dan pengalaman pribadi.
        </p>
      </motion.div>

      {/* Category Filter */}
      {!isLoading && availableCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <button
            onClick={() => setActiveCategory('')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === '' 
                ? 'bg-[var(--color-interactive)] text-[var(--color-interactive-text)]' 
                : 'bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] border border-[var(--color-border)]'
            }`}
          >
            Semua
          </button>
          {availableCategories.map((cat: any) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.slug 
                  ? 'bg-[var(--color-interactive)] text-[var(--color-interactive-text)]' 
                  : 'bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] border border-[var(--color-border)]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Story Grid */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <LucideIcons.Loader2 className="w-8 h-8 animate-spin text-[var(--color-text-muted)]" />
        </div>
      ) : filteredStories.length === 0 ? (
        <div className="text-center py-20 border border-[var(--color-border)] border-dashed rounded-xl">
          <LucideIcons.FileText className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Belum ada cerita</h3>
          <p className="text-[var(--color-text-secondary)]">Cerita untuk kategori ini belum tersedia.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story: any, i: number) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative h-full"
            >
              <Link 
                href={`/story/${story.slug}`} 
                className="block group h-full relative"
                onClick={() => setNavigatingId(story.id)}
              >
                {/* Visual Feedback saat navigasi (jaringan lag) */}
                {navigatingId === story.id && (
                  <div className="absolute inset-0 bg-white/40 dark:bg-black/40 z-10 rounded-2xl flex items-center justify-center backdrop-blur-[2px] transition-all">
                    <LucideIcons.Loader2 className="w-8 h-8 animate-spin text-[var(--color-interactive)]" />
                  </div>
                )}
                
                <article className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-2xl p-6 h-full flex flex-col transition-all hover:shadow-lg hover:border-[var(--color-interactive)]">
                  <div className="text-xs text-[var(--color-interactive)] mb-3 font-mono bg-[var(--color-interactive)]/10 w-fit px-2 py-1 rounded">
                    {categories.find((c: any) => c.slug === story.categorySlug)?.name || 'Uncategorized'}
                  </div>
                  <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-interactive)] transition-colors line-clamp-2">
                    {story.title}
                  </h2>
                  <p className="text-[var(--color-text-secondary)] text-sm mb-6 flex-1 line-clamp-3">
                    {story.summary}
                  </p>
                  <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] pt-4 border-t border-[var(--color-border)]">
                    <span>{new Date(story.createdAt).toLocaleDateString()}</span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><LucideIcons.Heart className="w-3 h-3" /> {story.likeCount || 0}</span>
                      <span className="flex items-center gap-1"><LucideIcons.MessageSquare className="w-3 h-3" /> {story.commentCount || 0}</span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
