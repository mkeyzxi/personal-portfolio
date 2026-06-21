'use client';

import { motion } from 'framer-motion';
import { TerminalSquare, Code, MonitorSmartphone, Rocket, BookOpen } from 'lucide-react';
import { story } from '@/data/story';

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

export default function StorySection() {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'TerminalSquare': return <TerminalSquare className="h-5 w-5" />;
      case 'Code': return <Code className="h-5 w-5" />;
      case 'MonitorSmartphone': return <MonitorSmartphone className="h-5 w-5" />;
      case 'Rocket': return <Rocket className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  return (
    <section aria-labelledby="story-heading" className="flex min-h-screen w-full flex-col items-center py-24 px-6 sm:px-10">
      <div className="w-full max-w-4xl">
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <h1 id="story-heading" className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Cerita Perjalanan
          </h1>
          <div className="mt-2 h-1 w-20 bg-[var(--color-text-primary)] mx-auto md:mx-0"></div>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            Bagaimana saya mulai menulis kode dan menemukan ketertarikan di dunia rekayasa perangkat lunak.
          </p>
        </div>

        {/* ── Timeline Naratif ────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Garis Vertikal */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-[var(--color-border)]"></div>

          <div className="flex flex-col gap-12">
            {story.map((item, index) => (
              <motion.div key={item.id} variants={itemVariants} className="relative flex gap-6 md:gap-8">
                {/* Ikon Lingkaran */}
                <div className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-[var(--color-bg-main)] shadow-sm ${item.highlight ? 'bg-[var(--color-interactive)] text-[var(--color-interactive-text)]' : 'bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)]'}`}>
                  {getIcon(item.icon)}
                </div>

                {/* Konten Teks */}
                <div className="flex flex-col pt-1">
                  <span className="text-sm font-bold text-[var(--color-text-muted)] mb-1">
                    {item.year}
                  </span>
                  <h3 className={`text-xl font-bold mb-2 ${item.highlight ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-primary)]'}`}>
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
      </div>
    </section>
  );
}
