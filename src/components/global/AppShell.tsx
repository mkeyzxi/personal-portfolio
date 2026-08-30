'use client';

import { useState, useEffect, type ComponentType } from 'react';
import dynamic from 'next/dynamic';
import type { SectionKey } from '@/types';
import { VALID_SECTION_KEYS, STORAGE_KEY_ACTIVE_SECTION } from '@/lib/constants';



// ============================================================
// DYNAMIC IMPORTS — SDD §3: Lazy Loading / Dynamic Imports
// ============================================================
// Semua section di-import secara lazy untuk menekan Initial Load Time.
// Setiap section hanya dimuat saat pertama kali diaktifkan.
// ============================================================

import ServerHeroContent from '@/components/sections/ServerHeroContent';
import AboutSkeleton from '@/components/skeletons/AboutSkeleton';
import ExperienceSkeleton from '@/components/skeletons/ExperienceSkeleton';
import ProjectsSkeleton from '@/components/skeletons/ProjectsSkeleton';
import TestimonialsSkeleton from '@/components/skeletons/TestimonialsSkeleton';

const SectionFallback = ({ title, subtitle, children }: { title: string, subtitle?: string, children: React.ReactNode }) => (
  <section className="flex min-h-screen w-full flex-col items-center justify-center py-24 px-6 md:px-10">
    <div className="w-full max-w-5xl flex flex-col justify-center h-full flex-1">
      <div className="mb-12 md:mb-16 text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
          {title}
        </h1>
        <div className="mt-2 h-1 w-20 bg-[var(--color-text-primary)] mx-auto md:mx-0"></div>
        {subtitle && (
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  </section>
);

const RedirectToStory = () => {
  useEffect(() => {
    window.location.href = '/story';
  }, []);
  return null;
};

const HomeSection = dynamic(
  () => import('@/components/sections/HomeSection'),
  { ssr: false, loading: () => <ServerHeroContent /> }
);
const AboutSection = dynamic(
  () => import('@/components/sections/AboutSection'),
  { ssr: false, loading: () => <SectionFallback title="Tentang Saya"><AboutSkeleton /></SectionFallback> }
);
const ExperienceSection = dynamic(
  () => import('@/components/sections/ExperienceSection'),
  { ssr: false, loading: () => <SectionFallback title="Pengalaman & Kredensial" subtitle="Jejak karir, pendidikan, organisasi, serta sertifikasi profesional saya."><ExperienceSkeleton /></SectionFallback> }
);
const ProjectsSection = dynamic(
  () => import('@/components/sections/ProjectsSection'),
  { ssr: false, loading: () => <SectionFallback title="Proyek" subtitle="Koleksi portofolio dan proyek terbaik yang pernah saya kerjakan."><ProjectsSkeleton /></SectionFallback> }
);
const TechStackSection = dynamic(
  () => import('@/components/sections/TechStackSection'),
  { ssr: false, loading: () => <SectionFallback title="Teknologi & Perangkat" subtitle="Alat dan teknologi yang saya gunakan untuk membangun solusi digital."><div className="w-full min-h-[400px] animate-pulse rounded-[24px] border border-[var(--color-border)]/40 bg-[var(--color-bg-surface)]/50 my-8" /></SectionFallback> }
);
const TestimonialsSection = dynamic(
  () => import('@/components/sections/TestimonialsSection'),
  { ssr: false, loading: () => <SectionFallback title="Testimoni & Komentar" subtitle="Tinggalkan masukan Anda menggunakan akun sosial."><TestimonialsSkeleton /></SectionFallback> }
);
const ContactSection = dynamic(
  () => import('@/components/sections/ContactSection'),
  { ssr: false, loading: () => <SectionFallback title="Hubungi Saya" subtitle="Ada pertanyaan, tawaran kerja, atau sekadar ingin menyapa? Jangan ragu untuk mengirim pesan melalui form di bawah atau via media sosial."><div className="w-full min-h-[400px] animate-pulse rounded-[24px] border border-[var(--color-border)]/40 bg-[var(--color-bg-surface)]/50 my-8" /></SectionFallback> }
);

/**
 * Peta SectionKey → Komponen React yang dirender secara lazy.
 */
const SECTION_MAP: Record<SectionKey, ComponentType> = {
  home: HomeSection,
  about: AboutSection,
  experience: ExperienceSection,
  projects: ProjectsSection,
  'tech-stack': TechStackSection,
  testimonials: TestimonialsSection,
  story: RedirectToStory,
  contact: ContactSection,
};

/**
 * Validasi apakah string adalah SectionKey yang valid.
 * Digunakan saat parsing URL hash dan sessionStorage.
 */
function isValidSectionKey(value: string): value is SectionKey {
  return VALID_SECTION_KEYS.has(value as SectionKey);
}

/**
 * Baca hash dari window.location (tanpa karakter '#').
 * Mengembalikan null jika hash kosong atau tidak valid.
 */
function getHashSection(): SectionKey | null {
  if (typeof window === 'undefined') return null;

  const hash = window.location.hash.replace('#', '').trim();
  if (hash && isValidSectionKey(hash)) {
    return hash;
  }
  return null;
}

/**
 * Baca section terakhir dari sessionStorage.
 * Mengembalikan null jika tidak ada atau tidak valid.
 */
function getStoredSection(): SectionKey | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY_ACTIVE_SECTION);
    if (stored && isValidSectionKey(stored)) {
      return stored;
    }
  } catch {
    // sessionStorage mungkin tidak tersedia (private browsing, dll.)
  }
  return null;
}

// Transisi diganti dengan animasi CSS murni di className untuk mengurangi initial JS payload.

/**
 * AppShell — Komponen inti arsitektur SPA.
 *
 * Mengelola `activeSection` state dengan sinkronisasi tiga arah:
 * 1. URL Hash (window.location.hash) — untuk deep-linking
 * 2. sessionStorage — untuk persistensi saat refresh
 * 3. React State — untuk rendering komponen
 *
 * Alur sinkronisasi (SDD §1.2):
 * - Initial Load: hash → sessionStorage → default 'home'
 * - Navigation Event: setState + pushState + sessionStorage
 * - Browser Back/Forward: popstate → hash → setState
 */
import { useSyncOfflineData } from '@/hooks/useSyncOfflineData';

export default function AppShell() {
  const [activeSection, setActiveSection] = useState<SectionKey>(() => {
    const hashSection = getHashSection();
    const storedSection = getStoredSection();
    return hashSection ?? storedSection ?? 'home';
  });

  // Initialize offline sync
  useSyncOfflineData();

  // ── Initial Load Resolution ─────────────────────────────
  // Prioritas: URL hash > sessionStorage > default 'home'
  useEffect(() => {
    // Scroll to top automatically when section changes because we now use body scroll
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Sinkronkan hash ke URL jika belum ada
    if (window.location.hash !== `#${activeSection}`) {
      window.history.replaceState(null, '', `#${activeSection}`);
    }

    try {
      sessionStorage.setItem(STORAGE_KEY_ACTIVE_SECTION, activeSection);
    } catch {
      // Gagal menyimpan — tidak fatal
    }
  }, [activeSection]);

  useEffect(() => {
    function handleLocationChange() {
      const hashSection = getHashSection();
      if (hashSection) {
        setActiveSection(hashSection);
        try {
          sessionStorage.setItem(STORAGE_KEY_ACTIVE_SECTION, hashSection);
        } catch {
          // Gagal menyimpan — tidak fatal
        }
      }
    }

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);



  // ── Render ──────────────────────────────────────────────
  const ActiveComponent = SECTION_MAP[activeSection];

  return (
    <div
      key={activeSection}
      className="min-h-full animate-fade-in-up"
      style={{ animationDuration: '0.3s' }}
    >
      <ActiveComponent />
    </div>
  );
}
