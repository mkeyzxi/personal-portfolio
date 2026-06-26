'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSWR from 'swr';
import TimelineItem from '@/components/ui/TimelineItem';
import { cn } from '@/lib/utils';
import { fetcher } from '@/lib/fetcher';
import type { Experience } from '@/types';

type FilterType = 'all' | 'work' | 'organization' | 'education' | 'certificate';

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'Semua', value: 'all' },
  { label: 'Kerja', value: 'work' },
  { label: 'Organisasi', value: 'organization' },
  { label: 'Pendidikan', value: 'education' },
  { label: 'Sertifikat', value: 'certificate' },
];

export default function ExperienceSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const { data: experiences = [], isLoading } = useSWR<Experience[]>('/api/experiences', fetcher);

  const filteredExperiences = experiences.filter((exp) => 
    activeFilter === 'all' ? true : exp.type === activeFilter
  );

  return (
    <section aria-labelledby="experience-heading" className="flex min-h-screen w-full flex-col items-center justify-center py-24 px-6 md:px-10">
      <div className="w-full max-w-5xl">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center md:text-left">
          <h1 id="experience-heading" className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Pengalaman & Kredensial
          </h1>
          <div className="mt-2 h-1 w-20 bg-[var(--color-text-primary)] mx-auto md:mx-0"></div>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            Jejak karir, pendidikan, organisasi, serta sertifikasi profesional saya.
          </p>
        </div>

        {/* ── Filter Tabs (Framer Motion Magic Pill) ────────────── */}
        <div className="mb-16 flex flex-wrap justify-center md:justify-start gap-2">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.value;
            return (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  "relative px-5 py-2 text-sm font-medium transition-colors rounded-full",
                  isActive ? "text-[var(--color-interactive-text)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="experience-filter-active"
                    className="absolute inset-0 bg-[var(--color-interactive)] rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  />
                )}
                <span className="relative z-10">{filter.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Timeline ─────────────────────────────────────────── */}
        <div className="relative w-full">
          {/* Garis vertikal background (hanya Desktop) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-[var(--color-border)] hidden md:block"></div>
          {/* Garis vertikal background (Mobile) */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-[var(--color-border)] md:hidden block"></div>

          {isLoading ? (
            <div className="py-12 text-center text-[var(--color-text-muted)]">
              Memuat data...
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredExperiences.length > 0 ? (
                filteredExperiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TimelineItem experience={exp} index={index} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center text-[var(--color-text-muted)]"
                >
                  Belum ada data untuk kategori ini.
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}
