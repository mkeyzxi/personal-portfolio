'use client';

import { useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { DRAWER_NAV_ITEMS, ADMIN_NAV_ITEMS } from '@/lib/constants';
import type { SectionKey } from '@/types';

// ============================================================
// Ikon Pemetaan Dinamis
// ============================================================
const getIcon = (iconName: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[iconName];
  return Icon ? <Icon className="h-5 w-5" /> : null;
};

// ============================================================
// PROPS
// ============================================================
interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  active: SectionKey;
  onNavigate: (key: SectionKey) => void;
  isAdmin?: boolean;
}

// ============================================================
// ANIMASI FRAMER MOTION — PRD §8.4
// ============================================================
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring' as const, damping: 25, stiffness: 300 } 
  },
  exit: { 
    y: '100%', 
    opacity: 0,
    transition: { type: 'spring' as const, damping: 25, stiffness: 300 } 
  },
};

/**
 * MobileDrawer — Komponen Navigasi Laci Mobile (PRD §8.4)
 *
 * Menampilkan item menu tambahan yang tidak muat di BottomNav.
 * Animasi dikelola custom via Framer Motion agar memenuhi spesifikasi.
 */
export default function MobileDrawer({ isOpen, onClose, active, onNavigate, isAdmin = false }: MobileDrawerProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Cegah body scrolling saat drawer terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('portfolio-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('portfolio-theme', 'dark');
    }
  };

  const handleLogout = async () => {
    try {
      const { auth } = await import('@/lib/firebase');
      await auth.signOut();
      localStorage.removeItem('admin-auth');
      window.dispatchEvent(new Event('admin-auth-changed'));
      onClose();
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Overlay Backdrop ──────────────────────────────── */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* ── Panel Drawer ──────────────────────────────────── */}
          <motion.div
            className={cn(
              'fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-2xl border-t',
              'bg-[var(--color-bg-main)] border-[var(--color-border)] shadow-2xl',
              'lg:hidden max-h-[85vh]'
            )}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Header / Grab Handle */}
            <div className="flex items-center justify-between border-b border-[var(--color-border-muted)] px-6 py-4">
              <h3 className="font-semibold text-[var(--color-text-primary)]">Menu</h3>
              <button
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-text-muted)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
                aria-label="Close Menu"
              >
                <LucideIcons.X className="h-5 w-5" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
              <nav className="flex flex-col gap-2">
                {DRAWER_NAV_ITEMS.map((item) => {
                  const isActive = active === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => {
                        onNavigate(item.key);
                        onClose(); // Tutup otomatis setelah memilih
                      }}
                      className={cn(
                        'flex items-center gap-4 rounded-xl px-4 py-4 text-left transition-colors',
                        isActive
                          ? 'bg-[var(--color-interactive)] text-[var(--color-interactive-text)] font-semibold'
                          : 'bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {getIcon(item.icon)}
                      <span className="text-lg">{item.label}</span>
                    </button>
                  );
                })}

                {isAdmin && (
                  <>
                    <div className="my-2 border-t border-[var(--color-border)]" />
                    {ADMIN_NAV_ITEMS.map((item) => {
                      const isActive = item.href === '/admin' ? pathname === item.href : pathname.startsWith(item.href);
                      return (
                        <Link
                          key={item.key}
                          href={item.href}
                          onClick={onClose}
                          className={cn(
                            'flex items-center gap-4 rounded-xl px-4 py-4 text-left transition-colors',
                            isActive
                              ? 'bg-[var(--color-interactive)] text-[var(--color-interactive-text)] font-semibold'
                              : 'bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]'
                          )}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          {getIcon(item.icon)}
                          <span className="text-lg">{item.label}</span>
                        </Link>
                      );
                    })}
                    
                    <div className="my-2 border-t border-[var(--color-border)]" />
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-4 rounded-xl px-4 py-4 text-left text-red-500 hover:bg-red-500/10 hover:text-red-600 transition-colors"
                    >
                      <LucideIcons.LogOut className="h-5 w-5" />
                      <span className="text-lg">Logout</span>
                    </button>
                  </>
                )}
              </nav>

              {/* Theme Toggle di Drawer */}
              <div className="mt-8 border-t border-[var(--color-border-muted)] pt-6 px-4 flex justify-between items-center">
                <span className="text-sm font-medium text-[var(--color-text-secondary)]">Ubah Tema</span>
                <button
                  onClick={toggleTheme}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border-muted)] shadow-sm"
                  aria-label="Toggle Dark Mode"
                >
                  <LucideIcons.Moon className="h-5 w-5 hidden dark:block" />
                  <LucideIcons.Sun className="h-5 w-5 block dark:hidden" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
