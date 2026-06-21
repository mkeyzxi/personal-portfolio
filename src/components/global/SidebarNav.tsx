'use client'

import {useMemo} from 'react'
import * as LucideIcons from 'lucide-react'
import {motion} from 'framer-motion'
import {cn} from '@/lib/utils'
import {NAV_ITEMS, OWNER_INFO} from '@/lib/constants'
import type {SectionKey} from '@/types'

// ============================================================
// Ikon Pemetaan Dinamis dari Lucide
// ============================================================
const getIcon = (iconName: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[iconName]
  return Icon ? <Icon className="h-5 w-5" /> : null
}

// ============================================================
// PROPS
// ============================================================
interface SidebarNavProps {
  active: SectionKey
  onNavigate: (key: SectionKey) => void
}

/**
 * SidebarNav — Komponen Navigasi Desktop (PRD §8.2)
 *
 * Ditampilkan statis di sisi kiri layar pada breakpoint lg (>= 1024px).
 * Menerapkan skema warna monokromatik murni dari SDD §4.1.
 */
export default function SidebarNav({active, onNavigate}: SidebarNavProps) {
  // Toggle fungsi dark mode yang mengakses classList HTML
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark')
    if (isDark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('portfolio-theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('portfolio-theme', 'dark')
    }
  }

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 hidden h-full w-64 flex-col justify-between border-r',
        'bg-[var(--color-bg-surface)] border-[var(--color-border)]',
        'lg:flex',
      )}
      aria-label="Sidebar Navigation"
    >
      <div className="flex flex-col overflow-y-auto">
        {/* ── Header: Avatar & Info ────────────────────────── */}
        <div className="flex flex-col items-center p-8 text-center">
          <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border border-[var(--color-border)]">
            {/* 
              Menggunakan tag img standar sementara. 
              SDD §4.3: Wajib ada class img-mono (grayscale).
            */}
            <img
              src={OWNER_INFO.avatarPath}
              alt={OWNER_INFO.name}
              className="h-full w-full object-cover img-mono"
            />
          </div>
          <h2 className="text-lg font-bold tracking-tight text-[var(--color-text-primary)]">
            {OWNER_INFO.name}
          </h2>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{OWNER_INFO.role}</p>
        </div>

        {/* ── Navigasi Links ───────────────────────────────── */}
        <nav className="flex flex-col gap-1 px-4 pb-8">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.key

            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={cn(
                  'group flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors transition-all ',
                  isActive
                    ? 'bg-[var(--color-interactive)] text-[var(--color-interactive-text)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]',
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <span
                  className={cn(
                    'transition-transform group-hover:scale-110',
                    isActive ? 'scale-110 -rotate-14 delay-200' : '',
                  )}
                >
                  {getIcon(item.icon)}
                </span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* ── Footer: Theme Toggle & Social Links ──────────── */}
      <div className="mt-auto border-t border-[var(--color-border)] p-4">
        <div className="mb-4 flex items-center justify-between px-2">
          <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
            Theme
          </span>
          <button
            onClick={toggleTheme}
            className="flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            aria-label="Toggle Dark Mode"
            title="Toggle Dark Mode"
          >
            {/* Ikon statis Sun/Moon toggle bisa lebih optimal, kita letakkan default Moon */}
            <LucideIcons.Moon className="h-4 w-4 hidden dark:block" />
            <LucideIcons.Sun className="h-4 w-4 block dark:hidden" />
          </button>
        </div>
      </div>
    </aside>
  )
}
