'use client'

import {useEffect} from 'react'

const sectionTitles: Record<string, string> = {
  home: 'Makbul N',
  about: 'Tentang Saya | Makbul N',
  experience: 'Pengalaman | Makbul N',
  projects: 'Proyek | Makbul N',
  'tech-stack': 'Teknologi | Makbul N',
  testimonials: 'Testimoni | Makbul N',
  story: 'Cerita Saya | Makbul N',
  contact: 'Kontak | Makbul N',
}

export function useSectionTitle(activeSection: string) {
  useEffect(() => {
    document.title = sectionTitles[activeSection] ?? sectionTitles.home
  }, [activeSection])
}
