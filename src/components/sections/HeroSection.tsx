'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { OWNER_INFO } from '@/lib/constants';

// ============================================================
// ANIMASI FRAMER MOTION
// ============================================================

// Stagger untuk kontainer teks
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Efek fade up untuk elemen individu
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 }
  },
};

// Efek background partikel "subtle mesh" (Monokromatik)
const particleVariants = {
  animate: {
    y: ['0%', '-50%', '0%'],
    x: ['0%', '20%', '0%'],
    opacity: [0.1, 0.3, 0.1],
    transition: {
      duration: 15,
      ease: 'linear' as const,
      repeat: Infinity,
    },
  },
};

export default function HeroSection() {
  // Fungsi navigasi menembakkan event hash change agar ditangkap oleh AppShell
  const navigateTo = (section: string) => {
    window.location.hash = section;
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6">
      {/* ── Background Animation (Subtle Mesh) ────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Blob 1 */}
        <motion.div
          variants={particleVariants}
          animate="animate"
          className="absolute -left-1/4 -top-1/4 h-[50vw] w-[50vw] rounded-full bg-[var(--color-text-muted)] blur-[120px] mix-blend-multiply opacity-20 dark:opacity-10"
        />
        {/* Blob 2 */}
        <motion.div
          variants={particleVariants}
          animate="animate"
          className="absolute -bottom-1/4 -right-1/4 h-[60vw] w-[60vw] rounded-full bg-[var(--color-border)] blur-[150px] mix-blend-multiply opacity-20 dark:opacity-10"
          style={{ animationDelay: '-5s' }} // Offset animasi manual
        />
      </div>

      {/* ── Content ────────────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-3xl text-center"
      >
        <motion.div variants={itemVariants} className="mb-6 flex justify-center">
          <span className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 py-1.5 text-sm font-medium text-[var(--color-text-secondary)]">
            <span className="mr-2 flex h-2 w-2 rounded-full bg-[var(--color-text-primary)] animate-pulse"></span>
            Tersedia untuk proyek baru
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="mb-4 text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-6xl md:text-7xl"
        >
          {OWNER_INFO.name}
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="mb-8 text-xl font-medium text-[var(--color-text-secondary)] sm:text-2xl"
        >
          {OWNER_INFO.tagline}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mx-auto mb-10 max-w-2xl text-base text-[var(--color-text-muted)] sm:text-lg leading-relaxed"
        >
          Saya membangun antarmuka digital yang bersih, efisien, dan berpusat pada pengguna. 
          Memadukan desain elegan dengan kode berkualitas tinggi untuk menciptakan pengalaman web yang modern.
        </motion.p>

        {/* ── Call to Action Buttons ───────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={() => navigateTo('projects')}
            className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[var(--color-interactive)] px-8 py-4 font-semibold text-[var(--color-interactive-text)] transition-all hover:scale-105 hover:bg-[var(--color-interactive-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-2 dark:focus:ring-offset-[#0a0a0a]"
          >
            Lihat Proyek
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={() => navigateTo('contact')}
            className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border-2 border-[var(--color-border)] bg-transparent px-8 py-4 font-semibold text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bg-surface)] hover:border-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-2 dark:focus:ring-offset-[#0a0a0a]"
          >
            <Mail className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            Hubungi Saya
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
