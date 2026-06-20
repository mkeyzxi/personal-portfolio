/**
 * SectionKey — String literal union untuk semua section yang tersedia.
 * Digunakan sebagai kunci navigasi di AppShell, SidebarNav, dan BottomNav.
 */
export type SectionKey =
  | 'home'
  | 'about'
  | 'experience'
  | 'projects'
  | 'tech-stack'
  | 'testimonials'
  | 'story'
  | 'contact';

/**
 * NavItem — Konfigurasi item navigasi individual.
 * Properti `bottomNav` menentukan apakah item tampil di bottom navigation (mobile).
 * Item yang tidak ada di bottomNav akan ditampilkan di MobileDrawer.
 */
export interface NavItem {
  key: SectionKey;
  label: string;
  /** Nama ikon Lucide React (string reference) */
  icon: string;
  /** Jika true, item tampil di bottom navigation bar (mobile < 1024px) */
  bottomNav: boolean;
}

/**
 * SocialLink — Link media sosial yang ditampilkan di sidebar dan footer.
 */
export interface SocialLink {
  platform: string;
  url: string;
  /** Nama ikon Lucide React atau Iconify */
  icon: string;
  ariaLabel: string;
}

/**
 * OwnerInfo — Informasi pemilik portfolio.
 * Digunakan di sidebar, hero section, dan metadata SEO.
 */
export interface OwnerInfo {
  name: string;
  role: string;
  tagline: string;
  email: string;
  location: string;
  avatarPath: string;
}
