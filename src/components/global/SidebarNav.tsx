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
  isCollapsed: boolean
  onToggleCollapse: () => void
}

/**
 * SidebarNav — Komponen Navigasi Desktop (PRD §8.2)
 *
 * Ditampilkan statis di sisi kiri layar pada breakpoint lg (>= 1024px).
 * Menerapkan skema warna monokromatik murni dari SDD §4.1.
 */
export default function SidebarNav({
  active,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
}: SidebarNavProps) {
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
        'fixed left-0 top-0 z-40 hidden h-full flex-col justify-between border-r transition-[width] duration-300 ease-in-out',
        isCollapsed ? 'w-20' : 'w-64',
        'bg-[var(--color-bg-surface)] border-[var(--color-border)]',
        'lg:flex',
      )}
      aria-label="Sidebar Navigation"
    >
      <div className="flex flex-col overflow-y-auto">
        {/* ── Header: Avatar & Info ────────────────────────── */}
        <div
          className={cn(
            'flex flex-col items-center text-center transition-all duration-300',
            isCollapsed ? 'p-4' : 'p-8',
          )}
        >
          <div
            className={cn(
              'relative overflow-hidden rounded-full border border-[var(--color-border)] transition-all duration-300',
              isCollapsed ? 'mb-2 h-10 w-10' : 'mb-4 h-20 w-20',
            )}
          >
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
          <div
            className={cn(
              'flex flex-col items-center overflow-hidden whitespace-nowrap transition-all duration-300',
              isCollapsed ? 'opacity-0 h-0' : 'opacity-100 h-auto',
            )}
          >
            <h2 className="text-lg font-bold tracking-tight text-[var(--color-text-primary)]">
              {OWNER_INFO.name}
            </h2>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{OWNER_INFO.role}</p>
          </div>
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
                  'group flex items-center rounded-md text-sm font-medium transition-all duration-300',
                  isCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3',
                  isActive
                    ? 'bg-[var(--color-interactive)] text-[var(--color-interactive-text)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]',
                )}
                title={isCollapsed ? item.label : undefined}
                aria-current={isActive ? 'page' : undefined}
              >
                <span
                  className={cn(
                    'transition-transform group-hover:scale-110 shrink-0',
                    isActive ? 'scale-110 -rotate-14 delay-200' : '',
                  )}
                >
                  {getIcon(item.icon)}
                </span>
                <span
                  className={cn(
                    'overflow-hidden whitespace-nowrap transition-all duration-300',
                    isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100',
                  )}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* ── Footer: Theme Toggle & Social Links ──────────── */}
      <div className="mt-auto border-t border-[var(--color-border)] p-4 flex flex-col gap-2">
        <button
          onClick={onToggleCollapse}
          className={cn(
            'flex items-center rounded-md text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]',
            isCollapsed ? 'justify-center h-11 w-11 mx-auto' : 'px-3 py-2 gap-3',
          )}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? (
            <LucideIcons.PanelLeftOpen className="h-5 w-5 shrink-0" />
          ) : (
            <LucideIcons.PanelLeftClose className="h-5 w-5 shrink-0" />
          )}
          <span
            className={cn(
              'font-medium text-sm overflow-hidden whitespace-nowrap transition-all duration-300',
              isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100',
            )}
          >
            Collapse
          </span>
        </button>

        <div
          className={cn(
            'flex items-center',
            isCollapsed ? 'justify-center' : 'justify-between px-2 mt-2',
          )}
        >
          <span
            className={cn(
              'text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider overflow-hidden whitespace-nowrap transition-all duration-300',
              isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100',
            )}
          >
            Theme
          </span>
          <button
            onClick={toggleTheme}
            className="flex shrink-0 h-11 w-11 items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            aria-label="Toggle Dark Mode"
            title="Toggle Dark Mode"
          >
            <LucideIcons.Moon className="h-4 w-4 hidden dark:block" />
            <LucideIcons.Sun className="h-4 w-4 block dark:hidden" />
          </button>
        </div>
      </div>
    </aside>
  )
}
