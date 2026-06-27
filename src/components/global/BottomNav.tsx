'use client';

import { House, FolderOpen, Mail, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BOTTOM_NAV_ITEMS } from '@/lib/constants';
import type { SectionKey } from '@/types';

// ============================================================
// Ikon Pemetaan Dinamis
// ============================================================
const iconMap: Record<string, React.ElementType> = {
  House, FolderOpen, Mail
};

const getIcon = (iconName: string) => {
  const Icon = iconMap[iconName];
  return Icon ? <Icon className="h-5 w-5 mb-1" /> : null;
};

// ============================================================
// PROPS
// ============================================================
interface BottomNavProps {
  active: SectionKey;
  onNavigate: (key: SectionKey) => void;
  onOpenDrawer: () => void;
}

/**
 * BottomNav — Komponen Navigasi Mobile (PRD §8.3)
 *
 * Ditampilkan di bagian bawah layar pada breakpoint mobile (< 1024px).
 * Hanya memuat 3 item utama dan tombol hamburger untuk membuka laci (drawer).
 */
export default function BottomNav({ active, onNavigate, onOpenDrawer }: BottomNavProps) {
  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t',
        'bg-[var(--color-bg-surface)]/80 backdrop-blur-md border-[var(--color-border)]',
        'lg:hidden'
      )}
      aria-label="Bottom Navigation"
    >
      {/* ── 3 Menu Utama ─────────────────────────────────────── */}
      {BOTTOM_NAV_ITEMS.map((item) => {
        const isActive = active === item.key;
        return (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            className={cn(
              'flex flex-1 flex-col items-center justify-center h-full transition-colors',
              isActive
                ? 'text-[var(--color-text-primary)] font-semibold'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            <span
              className={cn(
                'transition-transform',
                isActive ? 'scale-110' : ''
              )}
            >
              {getIcon(item.icon)}
            </span>
            <span className="text-[10px] uppercase tracking-wider">{item.label}</span>
          </button>
        );
      })}

      {/* ── Tombol Hamburger (More) ──────────────────────────── */}
      <button
        onClick={onOpenDrawer}
        className="flex flex-1 flex-col items-center justify-center h-full text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
        aria-label="Open Menu Drawer"
      >
        <Menu className="h-5 w-5 mb-1" />
        <span className="text-[10px] uppercase tracking-wider">More</span>
      </button>
    </nav>
  );
}
