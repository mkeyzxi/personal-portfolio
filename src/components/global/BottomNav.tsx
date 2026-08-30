'use client';

import { cn } from '@/lib/utils';
import { BOTTOM_NAV_ITEMS } from '@/lib/constants';
import type { SectionKey } from '@/types';

// ============================================================
// PROPS
// ============================================================
interface BottomNavProps {
  active: SectionKey;
  onNavigate: (key: SectionKey) => void;
  onOpenDrawer: () => void;
}

const getIcon = (iconName: string, className: string) => {
  switch (iconName) {
    case 'lucide:house':
      return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>;
    case 'lucide:folder-open':
      return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"/></svg>;
    case 'lucide:mail':
      return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
    default:
      return null;
  }
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
              {getIcon(item.icon, "h-5 w-5 mb-1")}
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
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mb-1"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        <span className="text-[10px] uppercase tracking-wider">More</span>
      </button>
    </nav>
  );
}
