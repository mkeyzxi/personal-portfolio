'use client';

import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { techStack } from '@/data/techstack';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

export default function TechStackSection() {
  return (
    <section aria-labelledby="tech-stack-heading" className="flex min-h-screen w-full flex-col items-center py-24 px-6 sm:px-10">
      <div className="w-full max-w-5xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h1 id="tech-stack-heading" className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Teknologi & Perangkat
          </h1>
          <div className="mt-2 h-1 w-20 bg-[var(--color-text-primary)] mx-auto"></div>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            Alat dan teknologi yang saya gunakan untuk membangun solusi digital.
          </p>
        </div>

        {/* ── Kategori Tech Stack ──────────────────────────────── */}
        <div className="flex flex-col gap-12">
          {Object.entries(techStack).map(([category, items], catIndex) => (
            <div key={category} className="flex flex-col gap-6">
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-2">
                {category}
              </h3>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
              >
                {items.map((tech) => (
                  <motion.div
                    key={tech.name}
                    variants={itemVariants}
                    className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 transition-all hover:-translate-y-2 hover:border-[var(--color-text-muted)] hover:shadow-lg hover:bg-[var(--color-bg-elevated)]"
                  >
                    <Icon 
                      icon={tech.icon} 
                      className="text-4xl text-[var(--color-text-primary)] transition-transform group-hover:scale-110 grayscale group-hover:grayscale-0 duration-300" 
                    />
                    <span className="text-sm font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors text-center">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
