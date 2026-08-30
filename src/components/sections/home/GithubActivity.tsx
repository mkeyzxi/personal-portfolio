'use client'

import {motion} from 'framer-motion'

import {Icon} from '@iconify/react'
import ShinyText from '@/components/ShinyText'
import {sectionVariants} from './shared'

export function GithubActivity() {
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
              <Icon icon="mdi:github" className="w-4 h-4 text-[var(--color-text-primary)]" />
              <ShinyText
                text="Open Source & Git Stats"
                disabled={false}
                speed={3}
                className="font-mono font-bold tracking-wider text-xs uppercase text-[var(--color-text-primary)]"
              />
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] font-heading">
            Aktivitas GitHub (mkeyzxi)
          </h3>
          <p className="text-[var(--color-text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed">
            Representasi visual konsistensi pengkodean dan komitmen pengembangan ekosistem
            terbuka secara real-time.
          </p>
        </div>

        <a
          href="https://github.com/mkeyzxi"
          target="_blank"
          rel="noopener noreferrer"
          className="group hidden sm:inline-flex items-center gap-2 rounded-3xl rounded-tr-md rounded-bl-md border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-3.5 font-semibold text-sm text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-text-muted)] shadow-sm"
        >
          Kunjungi Repositori GitHub
          <Icon icon="lucide:external-link" className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      <div className="rounded-[32px] border border-[var(--color-border)]/90 bg-[var(--color-bg-surface)]/80 backdrop-blur-xl p-6 md:p-10 shadow-sm flex flex-col gap-8">
        {/* Pacman Contribution Graph */}
        <div className="w-full overflow-x-auto py-3 flex justify-center bg-[var(--color-bg-main)]/50 rounded-[24px] border border-[var(--color-border)]/50 p-4 shadow-inner">
          <picture className="max-w-full flex justify-center">
            <source
              media="(prefers-color-scheme: dark)"
              srcSet="https://raw.githubusercontent.com/mkeyzxi/mkeyzxi/output/pacman-contribution-graph-dark.svg"
            />
            <source
              media="(prefers-color-scheme: light)"
              srcSet="https://raw.githubusercontent.com/mkeyzxi/mkeyzxi/output/pacman-contribution-graph.svg"
            />
            <img
              src="https://raw.githubusercontent.com/mkeyzxi/mkeyzxi/output/pacman-contribution-graph-dark.svg"
              alt="GitHub Contribution Pacman Graph mkeyzxi"
              loading="lazy"
              className="max-w-full h-auto rounded-xl object-contain img-mono hover:grayscale-0 transition-all duration-700"
            />
          </picture>
        </div>

        {/* GitHub Realtime Meta Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-[22px] border border-[var(--color-border)]/60 bg-[var(--color-bg-elevated)] p-6 flex flex-col gap-1.5">
            <span className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">
              Akun GitHub
            </span>
            <span className="font-mono text-lg font-extrabold text-[var(--color-text-primary)] flex items-center gap-2">
              @mkeyzxi
              <Icon icon="lucide:check-circle2" className="w-4 h-4 text-[var(--color-text-primary)] shrink-0" />
            </span>
          </div>

          <div className="rounded-[22px] border border-[var(--color-border)]/60 bg-[var(--color-bg-elevated)] p-6 flex flex-col gap-1.5">
            <span className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">
              Fokus Rekayasa
            </span>
            <span className="font-mono text-base font-bold text-[var(--color-text-primary)]">
              TypeScript, Next.js &amp; Laravel
            </span>
          </div>

          <div className="rounded-[22px] border border-[var(--color-border)]/60 bg-[var(--color-bg-elevated)] p-6 flex flex-col gap-1.5">
            <span className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">
              Status Aktivitas
            </span>
            <span className="font-mono text-base font-bold text-[var(--color-text-primary)] flex items-center gap-2">
              {/* <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-text-primary)] animate-pulse shadow-[0_0_8px_var(--color-text-primary)]" /> */}
              Aktif Mengembangkan
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
