'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { SectionKey } from '@/types';
import { VALID_SECTION_KEYS, STORAGE_KEY_ACTIVE_SECTION } from '@/lib/constants';

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

  useSectionTitle(activeSection);

  // Focus management: move focus to main content when section changes
  useEffect(() => {
    if (pathname === '/') {
      const mainEl = document.getElementById('main-content');
      if (mainEl) {
        // slight delay to wait for Framer Motion animation to start
        setTimeout(() => mainEl.focus(), 100);
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
      
      <SidebarNav active={activeSection} onNavigate={handleNavigate} />

      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 overflow-y-auto lg:ml-64 pb-16 lg:pb-0"
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
