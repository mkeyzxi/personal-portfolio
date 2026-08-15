'use client'

import {motion} from 'framer-motion'

import {Icon} from '@iconify/react'
import ShinyText from '@/components/ShinyText'
import {sectionVariants} from './shared'

export function TechPreview({
  previewTechs,
  navigateTo,
}: {
  previewTechs: {name: string; icon: string; level?: string}[]
  navigateTo: (section: string) => void
}) {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{once: true, margin: '-100px'}}
      className="w-full flex flex-col gap-8"
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2.5 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border)] px-4 py-1.5 shadow-sm">
              <Icon icon="lucide:code2" className="w-3.5 h-3.5 text-[var(--color-text-primary)]" />
              <ShinyText
                text="Tech Preview"
                disabled={false}
                speed={3}
                className="font-mono font-bold tracking-wider text-xs uppercase text-[var(--color-text-primary)]"
              />
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] font-heading">
            Teknologi Pilihan
          </h3>
          <p className="text-[var(--color-text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed">
            Katalog peralatan modern berakurasi tinggi yang saya gunakan untuk menjamin performa
            dan pemanduan produk.
          </p>
        </div>

        <button
          onClick={() => navigateTo('tech-stack')}
          className="group hidden sm:inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-3.5 font-semibold text-sm text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-text-muted)] shadow-sm"
        >
          Lihat Seluruh Tech Stack
          <Icon icon="lucide:arrow-right" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Tech Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
        {previewTechs.map((tech) => (
          <div
            key={tech.name}
            onClick={() => navigateTo('tech-stack')}
            className="group cursor-pointer flex items-center gap-4 rounded-[24px] border border-[var(--color-border)]/70 bg-[var(--color-bg-surface)]/80 px-5 py-4 transition-all duration-300 hover:scale-[1.03] hover:border-[var(--color-text-muted)] hover:bg-[var(--color-bg-elevated)] shadow-sm"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] shadow-inner group-hover:bg-[var(--color-bg-main)] transition-colors">
              <Icon
                icon={tech.icon}
                className="w-6 h-6 grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="font-mono text-sm font-extrabold text-[var(--color-text-primary)] truncate">
                {tech.name}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wide text-[var(--color-text-muted)] font-semibold">
                {tech.level || 'Professional'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex sm:hidden justify-center mt-2">
        <button
          onClick={() => navigateTo('tech-stack')}
          className="w-full justify-center group inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-3.5 font-semibold text-sm text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bg-elevated)] shadow-sm"
        >
          Lihat Seluruh Tech Stack
          <Icon icon="lucide:arrow-right" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.section>
  )
}
