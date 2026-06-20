import type { NavItem, SocialLink, OwnerInfo } from '@/types';

/**
 * NAV_ITEMS — Daftar semua item navigasi sesuai PRD §8.5.
 * `bottomNav: true` → tampil di bottom nav bar (mobile).
 * `bottomNav: false` → hanya tampil di sidebar (desktop) dan drawer (mobile).
 */
export const NAV_ITEMS: NavItem[] = [
  { key: 'home', label: 'Home', icon: 'House', bottomNav: true },
  { key: 'about', label: 'About', icon: 'User', bottomNav: false },
  { key: 'experience', label: 'Experience', icon: 'Briefcase', bottomNav: false },
  { key: 'projects', label: 'Projects', icon: 'FolderOpen', bottomNav: true },
  { key: 'tech-stack', label: 'Tech Stack', icon: 'Layers', bottomNav: false },
  { key: 'testimonials', label: 'Testimonials', icon: 'MessageSquare', bottomNav: false },
  { key: 'story', label: 'Story', icon: 'BookOpen', bottomNav: false },
  { key: 'contact', label: 'Contact', icon: 'Mail', bottomNav: true },
];

/**
 * BOTTOM_NAV_ITEMS — Subset item yang tampil di bottom nav mobile.
 * Derived dari NAV_ITEMS untuk menghindari duplikasi data.
 */
export const BOTTOM_NAV_ITEMS = NAV_ITEMS.filter((item) => item.bottomNav);

/**
 * DRAWER_NAV_ITEMS — Subset item yang tampil di mobile drawer.
 * Adalah kebalikan dari BOTTOM_NAV_ITEMS.
 */
export const DRAWER_NAV_ITEMS = NAV_ITEMS.filter((item) => !item.bottomNav);

/**
 * VALID_SECTION_KEYS — Set untuk validasi cepat apakah suatu string
 * adalah SectionKey yang valid. Digunakan saat parsing URL hash.
 */
export const VALID_SECTION_KEYS = new Set(NAV_ITEMS.map((item) => item.key));

export const STORAGE_KEY_ACTIVE_SECTION = 'portfolio_active_section';

/**
 * SOCIAL_LINKS — Link media sosial pemilik portfolio.
 * Ditampilkan di sidebar footer dan contact section.
 */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/username',
    icon: 'Github',
    ariaLabel: 'Kunjungi profil GitHub',
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/username',
    icon: 'Linkedin',
    ariaLabel: 'Kunjungi profil LinkedIn',
  },
  {
    platform: 'Instagram',
    url: 'https://instagram.com/username',
    icon: 'Instagram',
    ariaLabel: 'Kunjungi profil Instagram',
  },
];

/**
 * OWNER_INFO — Informasi pemilik portfolio.
 * Placeholder — ganti dengan data asli sebelum deployment produksi.
 */
export const OWNER_INFO: OwnerInfo = {
  name: 'Nama Lengkap',
  role: 'Full Stack Developer',
  tagline: 'Full Stack Developer | Firebase Enthusiast',
  email: 'email@domain.com',
  location: 'Indonesia',
  avatarPath: '/profile.jpeg',
};
