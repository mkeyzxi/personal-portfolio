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
    url: 'https://github.com/Mkeyzxi',
    icon: 'Github',
    iconify: 'logos:github-icon',
    ariaLabel: 'Kunjungi profil GitHub',
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/muhammad-makbul-n-ab30a4280/',
    icon: 'Linkedin',
    iconify: 'skill-icons:linkedin',
    ariaLabel: 'Kunjungi profil LinkedIn',
  },
  {
    platform: 'Instagram',
    url: 'https://www.instagram.com/mkeyzxi/?hl=en',
    icon: 'Instagram',
    iconify: 'skill-icons:instagram',
    ariaLabel: 'Kunjungi profil Instagram',
  },
  {
    platform: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=100008627230468',
    icon: 'Facebook',
    iconify: 'logos:facebook',
    ariaLabel: 'Kunjungi profil Facebook',
  },
  {
    platform: 'WhatsApp',
    url: 'https://api.whatsapp.com/send/?phone=6285342181132&text=Halo%20mbul%2C%20saya%20dapat%20kontak%20kamu%20dari%20portofolio%20yang%20kamu%20miliki.&type=phone_number&app_absent=0',
    icon: 'MessageCircle',
    iconify: 'logos:whatsapp-icon',
    ariaLabel: 'Hubungi via WhatsApp',
  },
];

/**
 * OWNER_INFO — Informasi pemilik portfolio.
 * Placeholder — ganti dengan data asli sebelum deployment produksi.
 */
export const OWNER_INFO: OwnerInfo = {
  name: 'Muhammad Makbul N',
  role: 'Full Stack Developer',
  tagline: 'Full Stack Developer',
  email: 'muhmakbul6@gmail.com',
  location: 'Indonesia, Makassar',
  avatarPath: '/profile.jpeg',
};
