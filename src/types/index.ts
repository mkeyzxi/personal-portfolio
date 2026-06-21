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
  /** Nama ikon Iconify untuk warna (e.g. logos:github-icon) */
  iconify: string;
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

// ============================================================
// TYPES — Data Statis
// ============================================================

export interface Experience {
  id: string;
  type: 'work' | 'organization' | 'education' | 'certificate';
  company: string;
  position: string;
  period: string;
  description: string;
  logo?: string;
  technologies?: string[];
  credentialUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description?: string; // Tanda tanya untuk backward compatibility jika diperlukan
  shortDescription: string;
  content: any[]; // JSON mentah dari BlockNote editor
  category: 'web' | 'mobile' | 'api' | 'other';
  thumbnail: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  year?: number;
  createdAt?: string;
}

export interface TechItem {
  name: string;
  icon: string; // Iconify icon string
  category: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
}

export interface StoryMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  icon?: string;
  highlight?: boolean;
}

export interface Testimonial {
  id: string;
  uid: string;
  name: string;
  email: string;
  avatar: string;
  provider: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  status: "approved" | "pending" | "rejected";
  isEdited: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ============================================================
// TYPES — CMS Story Data Models
// ============================================================

export interface CategoryDocument {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
}

export interface StoryDocument {
  id: string;
  title: string;
  slug: string;
  categorySlug: string;
  content: string; // JSON string from BlockNote
  summary: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  views: number;
  likeCount: number;
  commentCount: number;
}

export interface LikeDocument {
  storyId: string;
  userId: string;
  createdAt: string;
}

export interface CommentDocument {
  id: string;
  storyId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
}
