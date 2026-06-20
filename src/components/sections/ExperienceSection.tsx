'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences } from '@/data/experiences';
import TimelineItem from '@/components/ui/TimelineItem';
import { cn } from '@/lib/utils';

type FilterType = 'all' | 'work' | 'organization' | 'education';

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'Semua', value: 'all' },
  { label: 'Kerja', value: 'work' },
  { label: 'Organisasi', value: 'organization' },
  { label: 'Pendidikan', value: 'education' },
];

export default function ExperienceSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredExperiences = experiences.filter((exp) => 
    activeFilter === 'all' ? true : exp.type === activeFilter
  );

  return (
    <section className="flex min-h-screen w-full flex-col items-center py-24 px-6 sm:px-10">
      <div className="w-full max-w-4xl">
        {/* Section Header */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Pengalaman
          </h2>
          <div className="mt-2 h-1 w-20 bg-[var(--color-text-primary)] mx-auto md:mx-0"></div>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            Jejak karir, pendidikan, dan organisasi saya sejauh ini.
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
          <div className="absolute left-12 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-[var(--color-border)] hidden md:block"></div>
          {/* Garis vertikal background (Mobile) */}
          <div className="absolute left-12 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-[var(--color-border)] md:hidden block"></div>

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
        </div>
      </div>
    </section>
  );
}
