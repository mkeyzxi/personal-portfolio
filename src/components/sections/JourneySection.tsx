'use client';

import { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSWR from 'swr';
import { TerminalSquare, Code, MonitorSmartphone, Rocket, BookOpen } from 'lucide-react';
import { getJourneys } from '@/lib/firebase/journey';
import type { Journey } from '@/types';
import JourneySkeleton from '@/components/skeletons/JourneySkeleton';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 200, damping: 20 } },
};

const getIcon = (title?: string) => {
  const t = title?.toLowerCase() || '';
  if (t.includes('awal') || t.includes('terminal')) return <TerminalSquare className="h-5 w-5" />;
  if (t.includes('kode') || t.includes('code')) return <Code className="h-5 w-5" />;
  if (t.includes('mobile') || t.includes('app')) return <MonitorSmartphone className="h-5 w-5" />;
  if (t.includes('launch') || t.includes('rocket')) return <Rocket className="h-5 w-5" />;
  return <BookOpen className="h-5 w-5" />;
};

function JourneyContent() {
  const { data: journeys = [] } = useSWR<Journey[]>(
    'journeys-asc', 
    () => getJourneys('asc'),
    { revalidateOnFocus: false, dedupingInterval: 60000 * 5, suspense: true } // suspense: true
  );

  return (
    <AnimatePresence mode="wait">
      {journeys.length > 0 ? (
        <motion.div
          key="content"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Garis Vertikal */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-[var(--color-border)]"></div>

          <div className="flex flex-col gap-12">
            {journeys.map((item) => (
              <motion.div key={item.id} variants={itemVariants} className="relative flex gap-6 md:gap-8">
                {/* Ikon Lingkaran */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-[var(--color-bg-main)] shadow-sm bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)]">
                  {getIcon(item.title)}
                </div>

                {/* Konten Teks */}
                <div className="flex flex-col pt-1">
                  <span className="text-sm font-bold text-[var(--color-text-muted)] mb-1">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold mb-2 text-[var(--color-text-primary)]">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-center py-12 text-[var(--color-text-muted)]"
        >
          Belum ada jejak langkah yang ditambahkan.
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function JourneySection() {
  return (
    <section aria-labelledby="journey-heading" className="flex min-h-screen w-full flex-col items-center justify-center py-24 px-6 md:px-10">
      <div className="w-full max-w-5xl">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center md:text-left">
          <h1 id="journey-heading" className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Jejak Langkah
          </h1>
          <div className="mt-2 h-1 w-20 bg-[var(--color-text-primary)] mx-auto md:mx-0"></div>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            Bagaimana saya memulai perjalanan dan menemukan ketertarikan di dunia perangkat lunak.
          </p>
        </div>

        {/* ── Timeline Naratif ────────────────────────────────── */}
        <Suspense fallback={<JourneySkeleton />}>
          <JourneyContent />
        </Suspense>
      </div>
    </section>
  );
}
