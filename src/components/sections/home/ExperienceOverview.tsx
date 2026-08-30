'use client'

import {motion} from 'framer-motion'
import { Icon } from '@iconify/react'
import ShinyText from '@/components/ShinyText'
import {sectionVariants, itemVariants} from './shared'
import type {Experience} from '@/types'

export function ExperienceOverview({
  featuredExperiences,
  navigateTo,
}: {
  featuredExperiences: Experience[]
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
              <Icon icon="lucide:award" className="w-3.5 h-3.5 text-[var(--color-text-primary)]" />
              <ShinyText
                text="Experience Overview"
                disabled={false}
                speed={3}
                className="font-mono font-bold tracking-wider text-xs uppercase text-[var(--color-text-primary)]"
              />
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] font-heading">
            Pengalaman &amp; Rekam Jejak
          </h3>
          <p className="text-[var(--color-text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed">
            Kredibilitas profesional, keaktifan kepemimpian di ekosistem komunitas developer,
            serta kontribusi di dunia nyata.
          </p>
        </div>

        <button
          onClick={() => navigateTo('experience')}
          className="group hidden sm:inline-flex items-center gap-2 rounded-3xl rounded-tr-md rounded-bl-md border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-3.5 font-semibold text-sm text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-text-muted)] shadow-sm"
        >
          Lihat Riwayat Karir Lengkap
          <Icon icon="lucide:arrow-right" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Redesigned Editorial Split-Row Matrix */}
      <div className="flex flex-col gap-4 w-full">
        {featuredExperiences.map((exp, idx) => (
          <motion.div
            key={exp.id || idx}
            variants={itemVariants}
            onClick={() => navigateTo('experience')}
            className="group cursor-pointer rounded-[28px] border border-[var(--color-border)]/70 bg-[var(--color-bg-surface)]/80 p-7 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all duration-300 hover:border-[var(--color-text-muted)] hover:-translate-y-1 hover:bg-[var(--color-bg-elevated)]/50 shadow-sm"
          >
            {/* Kolom Kiri: Tahun & Tipe */}
            <div className="flex lg:flex-col items-center lg:items-start gap-3 lg:w-52 shrink-0">
              <span className="inline-flex items-center rounded-xl bg-[var(--color-bg-elevated)] px-3 py-1.5 font-mono text-xs font-bold text-[var(--color-text-primary)] border border-[var(--color-border)] shadow-2xs">
                {exp.period}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">
                {exp.type === 'work'
                  ? 'Professional'
                  : exp.type === 'organization'
                    ? 'Organization'
                    : 'Education'}
              </span>
            </div>

            {/* Kolom Tengah: Posisi & Narasi */}
            <div className="flex-1 max-w-2xl">
              <h4 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-text-secondary)] transition-colors font-heading">
                {exp.position}
              </h4>
              <p className="text-sm font-bold font-mono text-[var(--color-text-secondary)] mb-3">
                @{exp.company}
              </p>
              <p className="text-sm text-[var(--color-text-secondary)]/90 leading-relaxed line-clamp-2">
                {exp.description}
              </p>
            </div>

            {/* Kolom Kanan: Tech Pills & Indicator */}
            <div className="flex flex-wrap lg:flex-col lg:items-end gap-2 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-[var(--color-border)]/30">
              <div className="flex flex-wrap lg:justify-end gap-1.5 max-w-xs">
                {exp.technologies?.slice(0, 3).map((tech: string) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-full font-mono text-xs font-semibold text-[var(--color-text-primary)] bg-[var(--color-bg-main)] border border-[var(--color-border)]/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center font-mono text-xs text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors mt-1">
                Detail Pengalaman
                <Icon icon="lucide:chevron-right" className="w-4 h-4 ml-0.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex sm:hidden justify-center mt-2">
        <button
          onClick={() => navigateTo('experience')}
          className="w-full justify-center group inline-flex items-center gap-2 rounded-3xl rounded-tr-md rounded-bl-md border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-3.5 font-semibold text-sm text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bg-elevated)] shadow-sm"
        >
          Lihat Riwayat Karir Lengkap
          <Icon icon="lucide:arrow-right" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.section>
  )
}
