'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { SectionKey } from '@/types';
import { VALID_SECTION_KEYS, STORAGE_KEY_ACTIVE_SECTION } from '@/lib/constants';
import { cn } from '@/lib/utils';

import SidebarNav from './SidebarNav';
import BottomNav from './BottomNav';
import MobileDrawer from './MobileDrawer';
import Footer from '@/components/global/Footer';
import { Toaster } from '@/components/ui/sonner';
import { useSectionTitle } from '@/hooks/useSectionTitle';

function isValidSectionKey(value: string): value is SectionKey {
  return VALID_SECTION_KEYS.has(value as SectionKey);
}

function getHashSection(): SectionKey | null {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash.replace('#', '').trim();
  if (hash && isValidSectionKey(hash)) return hash as SectionKey;
  return null;
}

function getStoredSection(): SectionKey | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY_ACTIVE_SECTION);
    if (stored && isValidSectionKey(stored)) return stored as SectionKey;
  } catch {}
  return null;
}

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [activeSection, setActiveSection] = useState<SectionKey>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useSectionTitle(activeSection);

  useEffect(() => {
    const stored = localStorage.getItem('sidebar-collapsed');
    if (stored === 'true') {
      setIsSidebarCollapsed(true);
    }
  }, []);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('sidebar-collapsed', String(next));
      return next;
    });
  }, []);

  // Focus & Scroll management: reset scroll to top and move focus when section changes
  useEffect(() => {
    const mainEl = document.getElementById('main-content');
    if (mainEl) {
      if (pathname === '/') {
        // Tunggu animasi exit selesai (250ms) sebelum reset scroll
        // agar tidak terjadi efek lompat (flicker) yang mengganggu
        setTimeout(() => {
          mainEl.scrollTo({ top: 0, behavior: 'instant' });
          mainEl.focus({ preventScroll: true });
        }, 250);
      } else {
        // Untuk halaman lain, reset seketika
        mainEl.scrollTo({ top: 0, behavior: 'instant' });
        mainEl.focus({ preventScroll: true });
      }
    }
  }, [activeSection, pathname]);

  // Sync active section with Pathname or Hash
  useEffect(() => {
    const updateActiveSection = () => {
      if (pathname.startsWith('/story')) {
        setActiveSection('story');
      } else if (pathname === '/') {
        const hashSection = getHashSection() ?? getStoredSection() ?? 'home';
        setActiveSection(hashSection);
      } else {
         // other paths like /admin
      }
    };

    updateActiveSection();

    window.addEventListener('hashchange', updateActiveSection);
    window.addEventListener('popstate', updateActiveSection);
    
    return () => {
      window.removeEventListener('hashchange', updateActiveSection);
      window.removeEventListener('popstate', updateActiveSection);
    };
  }, [pathname]);

  const handleNavigate = useCallback((key: SectionKey) => {
    setActiveSection(key);
    
    try {
      sessionStorage.setItem(STORAGE_KEY_ACTIVE_SECTION, key);
    } catch {}

    if (key === 'story') {
      router.push('/story');
    } else {
      if (pathname === '/') {
        // We are on home, use hash navigation
        window.history.pushState(null, '', `#${key}`);
        window.dispatchEvent(new Event('hashchange')); // trigger update for AppShell
      } else {
        // We are on another page, navigate to home with hash
        router.push(`/#${key}`);
      }
    }
  }, [pathname, router]);

  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <>
        {children}
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            className: 'bg-[var(--color-bg-elevated)] border-[var(--color-border)] text-[var(--color-text-primary)]',
          }}
        />
      </>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <a href="#main-content" className="skip-link">Lewati navigasi, langsung ke konten</a>
      
      <SidebarNav active={activeSection} onNavigate={handleNavigate} isCollapsed={isSidebarCollapsed} onToggleCollapse={handleToggleSidebar} />

      <main
        id="main-content"
        tabIndex={-1}
        className={cn(
          "flex-1 overflow-y-auto pb-16 lg:pb-0 transition-[margin] duration-300 ease-in-out",
          isSidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        )}
        role="main"
        aria-label="Konten utama"
        aria-live="polite"
      >
        {children}
        <Footer />
      </main>

      <BottomNav 
        active={activeSection} 
        onNavigate={handleNavigate} 
        onOpenDrawer={() => setIsDrawerOpen(true)} 
      />

      <MobileDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        active={activeSection}
        onNavigate={handleNavigate}
      />
      
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          className: 'bg-[var(--color-bg-elevated)] border-[var(--color-border)] text-[var(--color-text-primary)]',
        }}
      />
    </div>
  );
}
