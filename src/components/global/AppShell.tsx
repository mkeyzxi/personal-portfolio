'use client';

import { useState, useEffect, useCallback, type ComponentType } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import type { SectionKey } from '@/types';
import { VALID_SECTION_KEYS, STORAGE_KEY_ACTIVE_SECTION } from '@/lib/constants';



// ============================================================
// DYNAMIC IMPORTS — SDD §3: Lazy Loading / Dynamic Imports
// ============================================================
// Semua section di-import secara lazy untuk menekan Initial Load Time.
// Setiap section hanya dimuat saat pertama kali diaktifkan.
// ============================================================

const HeroSection = dynamic(
  () => import('@/components/sections/HeroSection'),
  { ssr: false }
);
const AboutSection = dynamic(
  () => import('@/components/sections/AboutSection'),
  { ssr: false }
);
const ExperienceSection = dynamic(
  () => import('@/components/sections/ExperienceSection'),
  { ssr: false }
);
const ProjectsSection = dynamic(
  () => import('@/components/sections/ProjectsSection'),
  { ssr: false }
);
const TechStackSection = dynamic(
  () => import('@/components/sections/TechStackSection'),
  { ssr: false }
);
const TestimonialsSection = dynamic(
  () => import('@/components/sections/TestimonialsSection'),
  { ssr: false }
);
const StorySection = dynamic(
  () => import('@/components/sections/StorySection'),
  { ssr: false }
);
const ContactSection = dynamic(
  () => import('@/components/sections/ContactSection'),
  { ssr: false }
);

/**
 * Peta SectionKey → Komponen React yang dirender secara lazy.
 */
const SECTION_MAP: Record<SectionKey, ComponentType> = {
  home: HeroSection,
  about: AboutSection,
  experience: ExperienceSection,
  projects: ProjectsSection,
  'tech-stack': TechStackSection,
  testimonials: TestimonialsSection,
  story: StorySection,
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

// ============================================================
// ANIMASI — SDD §4.3
// ============================================================
// Hanya menggunakan opacity dan transform y (translasi).
// Manipulasi lebar/tinggi DILARANG untuk menghindari Reflow.
// ============================================================

const sectionTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.25, ease: 'easeInOut' as const },
};

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
export default function AppShell() {
  const [activeSection, setActiveSection] = useState<SectionKey>('home');
  const [isInitialized, setIsInitialized] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // ── Initial Load Resolution ─────────────────────────────
  // Prioritas: URL hash > sessionStorage > default 'home'
  useEffect(() => {
    const hashSection = getHashSection();
    const storedSection = getStoredSection();

    const resolvedSection = hashSection ?? storedSection ?? 'home';

    setActiveSection(resolvedSection);

    // Sinkronkan hash ke URL jika belum ada
    if (window.location.hash !== `#${resolvedSection}`) {
      window.history.replaceState(null, '', `#${resolvedSection}`);
    }

    // Simpan ke sessionStorage
    try {
      sessionStorage.setItem(STORAGE_KEY_ACTIVE_SECTION, resolvedSection);
    } catch {
      // Gagal menyimpan — tidak fatal
    }

    setIsInitialized(true);
  }, []);

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

  // ── Navigation Handler ──────────────────────────────────
  // Dipanggil oleh SidebarNav, BottomNav, dan MobileDrawer.
  const handleNavigate = useCallback((key: SectionKey) => {
    setActiveSection(key);

    // Update URL hash tanpa reload (SDD §1.2)
    window.history.pushState(null, '', `#${key}`);

    // Simpan ke sessionStorage (SDD §1.2)
    try {
      sessionStorage.setItem(STORAGE_KEY_ACTIVE_SECTION, key);
    } catch {
      // Gagal menyimpan — tidak fatal
    }
  }, []);

  // ── Render ──────────────────────────────────────────────
  const ActiveComponent = SECTION_MAP[activeSection];

  // Tampilkan kosong selama inisialisasi untuk menghindari flash
  if (!isInitialized) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--color-bg-main)]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--color-text-muted)] border-t-[var(--color-text-primary)]" />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeSection}
        initial={sectionTransition.initial}
        animate={sectionTransition.animate}
        exit={sectionTransition.exit}
        transition={sectionTransition.transition}
        className="min-h-full"
      >
        <ActiveComponent />
      </motion.div>
    </AnimatePresence>
  );
}
