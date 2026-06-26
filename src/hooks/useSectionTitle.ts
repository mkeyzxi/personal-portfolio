'use client';

import { useEffect } from 'react';

const sectionTitles: Record<string, string> = {
  home:         'Portfolio | Full Stack Developer',
  about:        'Tentang Saya — Portfolio',
  experience:   'Pengalaman — Portfolio',
  projects:     'Proyek — Portfolio',
  'tech-stack': 'Tech Stack — Portfolio',
  testimonials: 'Testimoni — Portfolio',
  story:        'Cerita Saya — Portfolio',
  contact:      'Kontak — Portfolio',
};

export function useSectionTitle(activeSection: string) {
  useEffect(() => {
    document.title = sectionTitles[activeSection] ?? sectionTitles.home;
  }, [activeSection]);
}
