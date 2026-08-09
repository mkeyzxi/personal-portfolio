'use client'

import {motion} from 'framer-motion'
import {Layers, FolderOpen, Terminal, Briefcase, FileText, ExternalLink, ArrowRight} from 'lucide-react'
import ShinyText from '@/components/ShinyText'
import {ParallaxLayer, sectionVariants} from './shared'
import {OWNER_INFO} from '@/lib/constants'

export function ExecutiveSnapshot({
  dynamicProjectsCount,
  cvDownloadUrl,
  navigateTo,
}: {
  dynamicProjectsCount: string
  cvDownloadUrl: string
  navigateTo: (section: string) => void
}) {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{once: true, margin: '-100px'}}
      className="w-full flex flex-col gap-6"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="inline-flex items-center gap-2.5 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border)] px-4 py-1.5 shadow-sm">
          <Layers className="w-3.5 h-3.5 text-[var(--color-text-primary)]" />
          <ShinyText
            text="Executive Snapshot"
            disabled={false}
            speed={3}
            className="font-mono font-bold tracking-wider text-xs uppercase text-[var(--color-text-primary)]"
          />
        </span>
      </div>

      <div className="rounded-[32px] border border-[var(--color-border)]/90 bg-[var(--color-bg-surface)]/80 backdrop-blur-xl p-8 md:p-12 shadow-md transition-all duration-300">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] leading-[1.25] mb-6 font-heading">
            Saya membangun solusi digital modern yang tangguh memadukan React, Next.js, Laravel,
            Cloud Architecture, dan AI Integration.
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8">
            Berbasis di {OWNER_INFO.location}, saya memfokuskan rekayasa pada kualitas
            arsitektur sistem, performa tinggi tanpa kompromi, dan ketajaman desain antarmuka
            bernilai tinggi.
          </p>
        </div>

        {/* Asymmetric Bento Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 pt-8 border-t border-[var(--color-border)]/60">
          <ParallaxLayer offset={12}>
            <div className="rounded-2xl border border-[var(--color-border)]/60 bg-[var(--color-bg-elevated)] p-6 h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">
                  Proyek Terpublikasi
                </span>
                <div className="p-2 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)]/70 shadow-sm">
                  <FolderOpen className="w-5 h-5 text-[var(--color-text-primary)]" />
                </div>
              </div>
              <div>
                <span className="font-mono text-3xl font-extrabold text-[var(--color-text-primary)]">
                  {dynamicProjectsCount}
                </span>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium">
                  Aplikasi Web &amp; Mobile Modern
                </p>
              </div>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={24}>
            <div className="rounded-2xl border border-[var(--color-border)]/60 bg-[var(--color-bg-elevated)] p-6 h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">
                  Rekam Jejak
                </span>
                <div className="p-2 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)]/70 shadow-sm">
                  <Terminal className="w-5 h-5 text-[var(--color-text-primary)]" />
                </div>
              </div>
              <div>
                <span className="font-mono text-3xl font-extrabold text-[var(--color-text-primary)]">
                  2+ Tahun
                </span>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium">
                  Pengalaman Rekayasa Perangkat Lunak
                </p>
              </div>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={16}>
            <div className="rounded-2xl border border-[var(--color-border)]/60 bg-[var(--color-bg-elevated)] p-6 h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">
                  Keterbukaan Kolaborasi
                </span>
                <div className="p-2 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)]/70 shadow-sm">
                  <Briefcase className="w-5 h-5 text-[var(--color-text-primary)]" />
                </div>
              </div>
              <div>
                <span className="font-mono text-xl font-bold text-[var(--color-text-primary)] tracking-tight">
                  Tersedia untuk Proyek
                </span>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium">
                  Freelance • Remote • Full Time
                </p>
              </div>
            </div>
          </ParallaxLayer>
        </div>

        {/* Action Bar with CV Download Button */}
        <div className="mt-10 pt-6 border-t border-[var(--color-border)]/50 flex flex-wrap items-center justify-between gap-4">
          <a
            href={cvDownloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[var(--color-interactive)] px-7 py-3.5 font-semibold text-sm text-[var(--color-interactive-text)] shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-[var(--color-interactive-hover)]"
          >
            <FileText className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            <span>Unduh CV / Resume</span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
          </a>

          <button
            onClick={() => navigateTo('about')}
            className="group inline-flex items-center gap-2 font-semibold text-sm text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)] transition-colors py-2 px-2"
          >
            <span>Eksplorasi Profil &amp; Filosofi</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.section>
  )
}
