'use client'

import {motion} from 'framer-motion'
import { Icon } from '@iconify/react'
import ShinyText from '@/components/ShinyText'
import {sectionVariants} from './shared'
import {SOCIAL_LINKS} from '@/lib/constants'

export function ContactCTA({navigateTo}: {navigateTo: (section: string) => void}) {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{once: true, margin: '-100px'}}
      className="w-full"
    >
      <div className="relative overflow-hidden rounded-[36px] border-2 border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-8 md:p-16 shadow-lg text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10 transition-all duration-500 hover:border-[var(--color-text-muted)]">
        <div
          className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full pointer-events-none opacity-15"
          style={{
            background: 'radial-gradient(circle, var(--color-text-muted) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-xl space-y-5">
          <span className="inline-flex items-center gap-2.5 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border)] px-4 py-1.5 shadow-sm">
            <Icon icon="lucide:mail" className="w-3.5 h-3.5 text-[var(--color-text-primary)]" />
            <ShinyText
              text="Get In Touch"
              disabled={false}
              speed={3}
              className="font-mono font-bold tracking-wider text-xs uppercase text-[var(--color-text-primary)]"
            />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] font-heading leading-tight">
            Mari Bangun Solusi Digital Yang Luar Biasa Bersama
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Saya senantiasa siap berdiskusi untuk kolaborasi proyek baru, peluang freelance,
            konsultasi arsitektur, maupun posisi pengembangan penuhwaktu.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row w-full md:w-auto gap-4 shrink-0">
          <button
            onClick={() => navigateTo('contact')}
            className="group flex items-center justify-center gap-3 rounded-full bg-[var(--color-interactive)] px-9 py-4 font-bold text-[var(--color-interactive-text)] shadow-md transition-all duration-300 hover:scale-[1.03] hover:bg-[var(--color-interactive-hover)]"
          >
            Hubungi Saya Sekarang
            <Icon icon="lucide:arrow-right" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href={SOCIAL_LINKS.find((s) => s.platform === 'WhatsApp')?.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-8 py-4 font-bold text-[var(--color-text-primary)] shadow-sm transition-all hover:bg-[var(--color-bg-main)] hover:border-[var(--color-text-muted)]"
          >
            WhatsApp
            <Icon icon="lucide:external-link" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </motion.section>
  )
}
