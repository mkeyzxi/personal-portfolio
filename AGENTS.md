<!-- BEGIN:nextjs-agent-rules -->

# 🤖 AGENTS.md — Portfolio Website

> Dokumen ini adalah panduan lengkap untuk AI agent (Claude, Cursor, Copilot, dll.) dalam membangun website portofolio ini dari awal hingga selesai. Baca seluruh dokumen sebelum mulai mengerjakan tugas apapun.

---

## 📋 Project Overview

**Nama Project:** Personal Portfolio Website  
**Tujuan:** Menampilkan profil, pengalaman, proyek, tech stack, testimoni, cerita, dan kontak pemilik secara profesional dan interaktif.  
**Status:** Greenfield (mulai dari nol)  
**Deployment Target:** Vercel

---

## 🗂️ Navigasi & Halaman

Website ini adalah **Single Page Application (SPA)** dengan navigasi **Client Side Rendering (CSR)**. Saat menu diklik, **konten berubah di tempat** — tidak ada scroll ke bawah. Hanya satu section yang tampil pada satu waktu, dirender secara dinamis di area konten utama.

| Section      | Key            | Deskripsi                                     |
| ------------ | -------------- | --------------------------------------------- |
| Home         | `home`         | Hero section dengan nama, tagline, CTA button |
| About        | `about`        | Foto, bio singkat, kepribadian                |
| Experience   | `experience`   | Timeline pengalaman kerja / organisasi        |
| Projects     | `projects`     | Card grid proyek dengan filter kategori       |
| Tech Stack   | `tech-stack`   | Grid ikon teknologi yang digunakan            |
| Testimonials | `testimonials` | Carousel/grid testimoni dari orang lain       |
| Story        | `story`        | Cerita perjalanan personal (timeline naratif) |
| Contact      | `contact`      | Form kontak + info sosial media               |

---

## 🛠️ Tech Stack

### Frontend

- **Next.js** (App Router, versi terbaru)
- **React** (via Next.js)
- **TypeScript** (strict mode aktif)
- **Tailwind CSS** (utility-first styling)

### Backend

- **Node.js** (runtime)
- **Express.js** (jika diperlukan custom API route di luar Next.js API Route)
- **REST API** (pola komunikasi)

### Database & Cloud

- **Firebase Firestore** (menyimpan data kontak, testimoni)
- **Firebase Authentication** (autentikasi admin)
- **Google OAuth** (login via akun Google untuk admin)

> ⚠️ **Firebase Storage TIDAK digunakan** — semua aset gambar (foto profil, thumbnail proyek, screenshot) disimpan di folder `public/` dan di-serve secara statis. Ini menghindari biaya storage berbayar dan menyederhanakan deployment.

### UI & Animasi

- **React Bits** (komponen UI interaktif)
- **Shadcn UI** (komponen aksesibel berbasis Radix UI)
- **Framer Motion** (animasi halus dan transisi)

### Icons & Assets

- **Iconify** (koleksi ikon universal)
- **Lucide React** (ikon bersih dan konsisten)

### Tools & DevOps

- **Git** (version control)
- **GitHub** (remote repository)
- **Postman** (testing API)
- **Vercel** (hosting & CI/CD)

---

## 📁 Struktur Direktori

```
portfolio/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (font, metadata global)
│   ├── page.tsx                  # Entry point → redirect ke /home atau render shell
│   ├── globals.css               # CSS global + Tailwind directives
│   └── api/                      # API Routes Next.js
│       ├── contact/
│       │   └── route.ts          # POST /api/contact → simpan ke Firestore
│       └── testimonials/
│           └── route.ts          # GET /api/testimonials → ambil dari Firestore
│
├── components/                   # Semua komponen React
│   ├── layout/
│   │   ├── AppShell.tsx          # Shell utama: sidebar kiri (desktop) + area konten
│   │   ├── SidebarNav.tsx        # Navigasi vertikal kiri (desktop ≥ 1024px)
│   │   ├── BottomNav.tsx         # Bottom navigation bar (mobile < 1024px)
│   │   ├── BottomNavHamburger.tsx# Hamburger di pojok kanan bottom nav → drawer menu sisa
│   │   ├── MobileDrawer.tsx      # Drawer slide-up untuk menu tambahan di mobile
│   │   ├── Footer.tsx            # Footer (hanya di desktop, di dalam area konten)
│   │   └── ThemeToggle.tsx       # Toggle dark/light mode
│   │
│   ├── sections/                 # Komponen per-section (dirender CSR)
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── TechStackSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── StorySection.tsx
│   │   └── ContactSection.tsx
│   │
│   └── ui/                       # Komponen UI reusable
│       ├── AnimatedText.tsx      # Teks dengan animasi Framer Motion
│       ├── ProjectCard.tsx       # Card proyek individual
│       ├── TechBadge.tsx         # Badge ikon teknologi
│       ├── TestimonialCard.tsx   # Card testimoni
│       ├── TimelineItem.tsx      # Item timeline untuk Experience & Story
│       └── ContactForm.tsx       # Form kontak dengan validasi
│
├── lib/                          # Utilitas dan konfigurasi
│   ├── firebase.ts               # Inisialisasi Firebase client-side
│   ├── firebase-admin.ts         # Firebase Admin SDK (server-side)
│   ├── constants.ts              # Data statis (nav links, sosmed, dll.)
│   └── utils.ts                  # Helper functions (cn, formatDate, dll.)
│
├── hooks/                        # Custom React hooks
│   ├── useActiveSection.ts       # State section aktif (CSR navigation)
│   ├── useAnimateOnView.ts       # Trigger animasi saat elemen masuk viewport
│   └── useContactForm.ts         # Logic form kontak
│
├── store/                        # State management ringan
│   └── navigationStore.ts        # Zustand/useState store untuk activeSection
│
├── types/                        # TypeScript type definitions
│   ├── index.ts                  # Re-export semua types
│   ├── project.ts                # Type Project
│   ├── experience.ts             # Type Experience
│   ├── testimonial.ts            # Type Testimonial
│   └── contact.ts                # Type ContactForm
│
├── data/                         # Data statis portofolio
│   ├── projects.ts               # Array data proyek
│   ├── experiences.ts            # Array data pengalaman
│   ├── techstack.ts              # Array data tech stack
│   ├── testimonials.ts           # Array data testimoni (fallback)
│   └── story.ts                  # Array data cerita/milestone
│
├── public/                       # Aset statis (SEMUA gambar disimpan di sini)
│   ├── images/
│   │   ├── avatar.jpg            # Foto profil
│   │   ├── og-image.jpg          # Open Graph image
│   │   └── projects/             # Screenshot & thumbnail proyek
│   └── favicon.ico
│
├── .env.local                    # Environment variables (tidak di-commit)
├── .env.example                  # Contoh env vars (di-commit)
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── components.json               # Konfigurasi Shadcn UI
└── package.json
```

---

## ⚙️ Environment Variables

Buat file `.env.local` di root project dengan isi berikut:

```env
# Firebase Client SDK
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin SDK (server-side only, JANGAN prefix NEXT_PUBLIC_)
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# Google OAuth (untuk admin login)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
```

> ⚠️ **JANGAN PERNAH** commit file `.env.local`. Pastikan sudah ada di `.gitignore`.

---

## 🎨 Design System

### Warna (Tailwind Custom Colors)

```ts
// tailwind.config.ts
colors: {
  primary: {
    50:  '#f0f9ff',
    500: '#0ea5e9',  // warna utama
    600: '#0284c7',
    900: '#0c4a6e',
  },
  accent: '#6366f1',  // indigo untuk highlight
  surface: {
    light: '#ffffff',
    dark:  '#0f172a',
  }
}
```

### Typography

- **Font Heading:** `Inter` atau `Geist` (via `next/font`)
- **Font Body:** `Inter`
- **Font Mono:** `Geist Mono` (untuk kode/badge teknologi)

### Spacing & Layout

- Sidebar lebar: `w-64` (desktop), tersembunyi di mobile
- Area konten: `ml-64` di desktop, `mb-16` di mobile (ruang untuk bottom nav)
- Max width konten: `max-w-4xl mx-auto`
- Padding konten: `p-6 md:p-10`
- Gap grid proyek: `gap-6`

### Dark Mode

- Implementasi via Tailwind `darkMode: 'class'`
- Toggle disimpan di `localStorage`
- Default: ikut preferensi sistem (`prefers-color-scheme`)

---

## 🔧 Setup & Installation

### Prasyarat

- Node.js >= 18.x
- npm >= 9.x atau pnpm >= 8.x
- Akun Firebase (dengan Firestore dan Authentication aktif — **Storage tidak dipakai**)
- Akun Vercel (untuk deployment)

### Langkah Setup

```bash
# 1. Clone repository
git clone https://github.com/username/portfolio.git
cd portfolio

# 2. Install dependencies
npm install
# atau
pnpm install

# 3. Setup Shadcn UI
npx shadcn@latest init

# 4. Install Framer Motion
npm install framer-motion

# 5. Install Iconify
npm install @iconify/react

# 6. Install Firebase
npm install firebase firebase-admin

# 7. Salin env example dan isi nilainya
cp .env.example .env.local

# 8. Jalankan development server
npm run dev
```

### Shadcn UI Components yang Digunakan

Jalankan perintah berikut untuk menginstall komponen yang dibutuhkan:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add toast
npx shadcn@latest add dialog
npx shadcn@latest add sheet
npx shadcn@latest add separator
npx shadcn@latest add avatar
```

---

## 📄 Spesifikasi Per Section

### 1. 🏠 HeroSection (`#home`)

**Tujuan:** Kesan pertama yang kuat. Perkenalkan siapa kamu dan apa yang kamu lakukan.

**Elemen:**

- Nama lengkap (heading H1, animasi type-writer atau fade-in)
- Tagline / role (contoh: "Full Stack Developer | Firebase Enthusiast")
- Deskripsi singkat 1-2 kalimat
- Dua CTA button: "Lihat Proyek" (setActiveSection('projects')) & "Hubungi Saya" (setActiveSection('contact'))
- Animasi background: subtle gradient atau particle (gunakan React Bits)
- Foto profil / ilustrasi (opsional, di sisi kanan pada desktop)

**Animasi:**

- Teks masuk dengan `motion.div` Framer Motion (stagger children)
- Background animasi menggunakan React Bits component

**Komponen:**

```tsx
// components/sections/HeroSection.tsx
export default function HeroSection()
```

---

### 2. 👤 AboutSection (`#about`)

**Tujuan:** Memperkenalkan diri secara personal dan profesional.

**Elemen:**

- Foto profil (bulat, dengan border animasi)
- Bio paragraf (2-3 paragraf)
- Fakta singkat: lokasi, status pendidikan, hobi
- Highlight card: angka pencapaian (misal: "5+ Projects", "2+ Years Coding")

**Layout:** 2 kolom di desktop (foto kiri, teks kanan), 1 kolom di mobile

**Animasi:**

- Foto slide-in dari kiri
- Teks slide-in dari kanan
- Counter angka pencapaian (animate on view)

---

### 3. 💼 ExperienceSection (`#experience`)

**Tujuan:** Menampilkan riwayat kerja, magang, atau organisasi secara kronologis.

**Elemen:**

- Timeline vertikal (garis di tengah untuk desktop, kiri untuk mobile)
- Tiap item: nama perusahaan/organisasi, posisi, periode, deskripsi singkat, logo (opsional)
- Filter tab: "Semua" | "Kerja" | "Organisasi" | "Pendidikan"

**Type:**

```ts
// types/experience.ts
interface Experience {
  id: string
  type: 'work' | 'organization' | 'education'
  company: string
  position: string
  period: string // contoh: "Jan 2023 – Des 2023"
  description: string
  logo?: string // URL logo
  technologies?: string[] // teknologi yang digunakan
}
```

**Animasi:**

- Item muncul satu per satu saat di-scroll (stagger dari atas)

---

### 4. 🚀 ProjectsSection (`#projects`)

**Tujuan:** Menampilkan portofolio proyek terbaik.

**Elemen:**

- Filter kategori: "Semua" | "Web" | "Mobile" | "API" | "Lainnya"
- Grid card proyek (3 kolom desktop, 2 tablet, 1 mobile)
- Tiap card: thumbnail, nama, deskripsi singkat, tech stack badges, link GitHub & live demo

**Type:**

```ts
// types/project.ts
interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  category: 'web' | 'mobile' | 'api' | 'other'
  thumbnail: string
  technologies: string[] // nama teknologi
  githubUrl?: string
  liveUrl?: string
  featured: boolean // tampil di urutan pertama
  year: number
}
```

**Interaksi:**

- Klik card → buka modal detail proyek (gunakan Shadcn Dialog)
- Hover card → subtle lift effect + overlay

**Animasi:**

- Card masuk dengan stagger animation
- Filter menggunakan `AnimatePresence` Framer Motion untuk transisi halus

---

### 5. 🧰 TechStackSection (`#tech-stack`)

**Tujuan:** Menampilkan teknologi yang dikuasai secara visual dan terorganisir.

**Elemen:**

- Group berdasarkan kategori (sesuai requirements):
  - Frontend
  - Backend
  - Database
  - Tools & DevOps
  - Libraries & Components
  - Authentication & Cloud
  - Icons & Assets
- Tiap item: ikon (Iconify), nama teknologi, badge level (Beginner/Intermediate/Advanced) — opsional

**Data struktur:**

```ts
// data/techstack.ts
interface TechItem {
  name: string
  icon: string // Iconify icon string, contoh: "logos:nextjs-icon"
  category: string
  level?: 'beginner' | 'intermediate' | 'advanced'
}

const techStack: Record<string, TechItem[]> = {
  Frontend: [
    {name: 'Next.js', icon: 'logos:nextjs-icon', category: 'Frontend', level: 'advanced'},
    {name: 'React', icon: 'logos:react', category: 'Frontend', level: 'advanced'},
    {
      name: 'TypeScript',
      icon: 'logos:typescript-icon',
      category: 'Frontend',
      level: 'intermediate',
    },
    {name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon', category: 'Frontend', level: 'advanced'},
    {name: 'React Bits', icon: 'simple-icons:react', category: 'Frontend', level: 'intermediate'},
  ],
  Backend: [
    {name: 'Node.js', icon: 'logos:nodejs-icon', category: 'Backend', level: 'intermediate'},
    {name: 'Express.js', icon: 'logos:express', category: 'Backend', level: 'intermediate'},
    {name: 'REST API', icon: 'mdi:api', category: 'Backend', level: 'intermediate'},
  ],
  Database: [
    {name: 'Firebase', icon: 'logos:firebase', category: 'Database', level: 'intermediate'},
  ],
  'Tools & DevOps': [
    {name: 'Git', icon: 'logos:git-icon', category: 'Tools & DevOps', level: 'intermediate'},
    {name: 'GitHub', icon: 'logos:github-icon', category: 'Tools & DevOps', level: 'intermediate'},
    {
      name: 'Postman',
      icon: 'logos:postman-icon',
      category: 'Tools & DevOps',
      level: 'intermediate',
    },
    {name: 'Vercel', icon: 'logos:vercel-icon', category: 'Tools & DevOps', level: 'intermediate'},
  ],
  'Libraries & Components': [
    {
      name: 'React Bits',
      icon: 'simple-icons:react',
      category: 'Libraries & Components',
      level: 'intermediate',
    },
    {
      name: 'Shadcn UI',
      icon: 'simple-icons:shadcnui',
      category: 'Libraries & Components',
      level: 'intermediate',
    },
    {
      name: 'Framer Motion',
      icon: 'logos:framer',
      category: 'Libraries & Components',
      level: 'intermediate',
    },
  ],
  'Authentication & Cloud': [
    {
      name: 'Firebase Auth',
      icon: 'logos:firebase',
      category: 'Authentication & Cloud',
      level: 'intermediate',
    },
    {
      name: 'Google OAuth',
      icon: 'logos:google-icon',
      category: 'Authentication & Cloud',
      level: 'intermediate',
    },
  ],
  'Icons & Assets': [
    {
      name: 'Iconify',
      icon: 'simple-icons:iconify',
      category: 'Icons & Assets',
      level: 'intermediate',
    },
    {
      name: 'Lucide React',
      icon: 'simple-icons:lucide',
      category: 'Icons & Assets',
      level: 'intermediate',
    },
  ],
}
```

**Animasi:**

- Ikon hover: scale up + glow effect
- Section masuk: ikon muncul bergelombang (wave stagger)

---

### 6. 💬 TestimonialsSection (`#testimonials`)

**Tujuan:** Membangun kepercayaan melalui testimoni dari kolega, mentor, atau klien.

**Elemen:**

- Carousel (auto-play + manual control) atau masonry grid
- Tiap card: foto avatar, nama, posisi/hubungan, teks testimoni, bintang rating (opsional)
- Data bisa dari Firestore (dinamis) atau file statis (fallback)

**Type:**

```ts
// types/testimonial.ts
interface Testimonial {
  id: string
  name: string
  position: string // contoh: "Senior Developer at XYZ"
  relationship: string // contoh: "Mentor", "Rekan Kerja", "Klien"
  avatar?: string
  text: string
  rating?: number // 1-5
  date?: string
}
```

**API Route:**

```ts
// app/api/testimonials/route.ts
// GET → ambil dari Firestore collection 'testimonials'
// Fallback ke data statis jika Firestore error
```

**Animasi:**

- Carousel slide dengan Framer Motion `AnimatePresence`
- Auto-play setiap 5 detik, pause saat hover

---

### 7. 📖 StorySection (`#story`)

**Tujuan:** Bercerita tentang perjalanan personal — bagaimana kamu mulai coding, momen penting, dan visi ke depan.

**Elemen:**

- Timeline naratif vertikal
- Tiap milestone: tahun, judul event, cerita singkat, emoji/ikon
- Tone: personal, jujur, manusiawi (bukan seperti CV)

**Type:**

```ts
// types/story.ts (bisa digabung dengan experience)
interface StoryMilestone {
  id: string
  year: string
  title: string
  description: string
  icon?: string // emoji atau Iconify icon
  highlight?: boolean // milestone penting, tampil lebih menonjol
}
```

**Konten yang bisa dimasukkan:**

- Pertama kali menulis kode
- Proyek pertama yang "jadi"
- Bergabung komunitas / organisasi
- Mulai belajar tech stack ini
- Pencapaian yang dibanggakan
- Rencana ke depan

**Animasi:**

- Timeline reveal saat scroll (gunakan `useInView` Framer Motion)
- Teks muncul dengan fade + slide up

---

### 8. 📬 ContactSection (`#contact`)

**Tujuan:** Memudahkan orang untuk menghubungi kamu.

**Elemen:**

- Form kontak: Nama, Email, Subject, Pesan, tombol Kirim
- Validasi client-side (TypeScript + custom hook)
- Feedback: loading state, success toast, error toast (Shadcn Toast)
- Info kontak: email, LinkedIn, GitHub, Instagram (opsional)
- Lokasi (kota/negara)

**Type:**

```ts
// types/contact.ts
interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}
```

**API Route:**

```ts
// app/api/contact/route.ts
// POST → validasi → simpan ke Firestore collection 'messages'
// Response: { success: boolean, message: string }
```

**Validasi:**

- Name: minimal 2 karakter
- Email: format valid
- Subject: minimal 3 karakter
- Message: minimal 10 karakter

**Animasi:**

- Form slide-in dari bawah
- Tombol submit: loading spinner saat proses
- Success: konfeti ringan atau checkmark animation

---

## 🔗 Firebase Configuration

### Inisialisasi Client SDK

```ts
// lib/firebase.ts
import {initializeApp, getApps} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const db = getFirestore(app)
export const auth = getAuth(app)
export default app
```

### Firestore Collections

| Collection     | Deskripsi              | Akses                           |
| -------------- | ---------------------- | ------------------------------- |
| `messages`     | Pesan dari form kontak | Write: public, Read: admin only |
| `testimonials` | Testimoni              | Write: admin only, Read: public |

### Firestore Security Rules (Contoh)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Pesan: siapa saja bisa kirim, hanya admin yang bisa baca
    match /messages/{docId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null
        && request.auth.token.email == 'admin@email.com';
    }

    // Testimoni: hanya admin yang bisa tulis, semua bisa baca
    match /testimonials/{docId} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.email == 'admin@email.com';
    }
  }
}
```

---

## 🧭 Sistem Navigasi CSR

Website menggunakan **Client Side Rendering navigation** — tidak ada scroll, tidak ada routing halaman. Klik menu → konten lama di-unmount → konten baru di-mount dengan animasi transisi. State section aktif dikelola via React state (`useState`) di `AppShell.tsx`.

### Konsep AppShell

```tsx
// components/layout/AppShell.tsx
'use client'

import {useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import SidebarNav from './SidebarNav'
import BottomNav from './BottomNav'
import * as Sections from '@/components/sections'

type SectionKey =
  | 'home'
  | 'about'
  | 'experience'
  | 'projects'
  | 'tech-stack'
  | 'testimonials'
  | 'story'
  | 'contact'

const sectionMap: Record<SectionKey, React.ComponentType> = {
  home: Sections.HeroSection,
  about: Sections.AboutSection,
  experience: Sections.ExperienceSection,
  projects: Sections.ProjectsSection,
  'tech-stack': Sections.TechStackSection,
  testimonials: Sections.TestimonialsSection,
  story: Sections.StorySection,
  contact: Sections.ContactSection,
}

export default function AppShell() {
  const [active, setActive] = useState<SectionKey>('home')
  const ActiveSection = sectionMap[active]

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar: hanya tampil di desktop */}
      <SidebarNav active={active} onNavigate={setActive} />

      {/* Area konten utama */}
      <main className="flex-1 overflow-y-auto lg:ml-64 pb-16 lg:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{opacity: 0, y: 16}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -16}}
            transition={{duration: 0.25, ease: 'easeInOut'}}
          >
            <ActiveSection />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Nav: hanya tampil di mobile */}
      <BottomNav active={active} onNavigate={setActive} />
    </div>
  )
}
```

---

### 🖥️ Desktop — SidebarNav (kiri, `lg:flex`, hidden di mobile)

```tsx
// components/layout/SidebarNav.tsx
```

**Spesifikasi:**

- Posisi: `fixed left-0 top-0 h-full w-64` — selalu terlihat di kiri layar
- Background: surface warna solid + border kanan tipis
- Berisi: logo/nama di atas, daftar 8 menu vertikal, theme toggle & sosmed di bawah
- Link aktif: highlight dengan warna `primary-500`, ikon + label
- Hover: subtle background highlight
- Sembunyikan di mobile: `hidden lg:flex`

**Struktur visual:**

```
┌──────────────────┐
│  [Avatar] Nama   │  ← foto kecil + nama pemilik
│  Full Stack Dev  │
├──────────────────┤
│  🏠 Home         │  ← active state: background highlight
│  👤 About        │
│  💼 Experience   │
│  🚀 Projects     │
│  🧰 Tech Stack   │
│  💬 Testimonials │
│  📖 Story        │
│  📬 Contact      │
├──────────────────┤
│  [🌙] [GH] [LI] │  ← theme toggle + sosmed icons
└──────────────────┘
```

---

### 📱 Mobile — BottomNav (bawah layar, `flex lg:hidden`)

```tsx
// components/layout/BottomNav.tsx
```

**Spesifikasi:**

- Posisi: `fixed bottom-0 left-0 right-0 h-16` — selalu di bawah layar
- Background: surface warna + backdrop blur
- Berisi: **3 menu paling sering dikunjungi** + **1 tombol hamburger** di pojok kanan
- Total: 4 item di bottom bar

**3 Menu Utama yang tampil di bottom bar (dapat dikustomisasi oleh pemilik):**

| Posisi          | Menu     | Ikon                   |
| --------------- | -------- | ---------------------- |
| 1               | Home     | `house` (Lucide)       |
| 2               | Projects | `folder-open` (Lucide) |
| 3               | Contact  | `mail` (Lucide)        |
| 4 (pojok kanan) | ☰ More  | hamburger icon         |

**Struktur visual mobile:**

```
┌─────────────────────────────────────┐
│  🏠 Home  │ 🚀 Projects │ 📬 Contact │ ☰ │
└─────────────────────────────────────┘
```

---

### 📱 Mobile — MobileDrawer (menu tambahan via hamburger)

```tsx
// components/layout/MobileDrawer.tsx
```

**Spesifikasi:**

- Trigger: klik ikon hamburger `☰` di pojok kanan bottom nav
- Tampilan: **drawer slide-up** dari bawah (gunakan Framer Motion `AnimatePresence`)
- Overlay: backdrop gelap semi-transparan, klik overlay = tutup drawer
- Berisi: 5 menu yang tidak tampil di bottom bar:
  - About
  - Experience
  - Tech Stack
  - Testimonials
  - Story
- Di atas drawer: tombol `✕` (tutup) + label "Menu"
- Tiap item: ikon + label, klik → navigate + tutup drawer otomatis

**Animasi drawer:**

```ts
// Slide up dari bawah
initial:  { y: '100%', opacity: 0 }
animate:  { y: 0, opacity: 1 }
exit:     { y: '100%', opacity: 0 }
transition: { type: 'spring', damping: 25, stiffness: 300 }
```

---

### Nav Links Config

```ts
// lib/constants.ts
export type SectionKey =
  | 'home'
  | 'about'
  | 'experience'
  | 'projects'
  | 'tech-stack'
  | 'testimonials'
  | 'story'
  | 'contact'

export interface NavLink {
  key: SectionKey
  label: string
  icon: string // Lucide icon name
  bottomNav?: boolean // true = tampil di bottom bar mobile
}

export const NAV_LINKS: NavLink[] = [
  {key: 'home', label: 'Home', icon: 'House', bottomNav: true},
  {key: 'about', label: 'About', icon: 'User', bottomNav: false},
  {key: 'experience', label: 'Experience', icon: 'Briefcase', bottomNav: false},
  {key: 'projects', label: 'Projects', icon: 'FolderOpen', bottomNav: true},
  {key: 'tech-stack', label: 'Tech Stack', icon: 'Layers', bottomNav: false},
  {key: 'testimonials', label: 'Testimonials', icon: 'MessageSquare', bottomNav: false},
  {key: 'story', label: 'Story', icon: 'BookOpen', bottomNav: false},
  {key: 'contact', label: 'Contact', icon: 'Mail', bottomNav: true},
]

// Menu yang tampil di drawer (semua yang bottomNav: false)
export const DRAWER_LINKS = NAV_LINKS.filter((l) => !l.bottomNav)
// Menu yang tampil di bottom bar (bottomNav: true)
export const BOTTOM_NAV_LINKS = NAV_LINKS.filter((l) => l.bottomNav)
```

---

## 🪝 Custom Hooks

### `useActiveSection`

```ts
// hooks/useActiveSection.ts
// Mengelola state section aktif untuk CSR navigation
// Menyimpan ke sessionStorage agar tidak reset saat refresh
export function useActiveSection(defaultSection: SectionKey = 'home'): {
  active: SectionKey
  setActive: (key: SectionKey) => void
}
```

### `useAnimateOnView`

```ts
// hooks/useAnimateOnView.ts
// Wrapper untuk useInView dari Framer Motion
// Mengembalikan { ref, isInView }
export function useAnimateOnView(options?: IntersectionObserverInit)
```

### `useContactForm`

```ts
// hooks/useContactForm.ts
// State management dan submit handler untuk form kontak
export function useContactForm(): {
  formData: ContactForm
  errors: Partial<ContactForm>
  isLoading: boolean
  handleChange: (e: ChangeEvent) => void
  handleSubmit: (e: FormEvent) => Promise<void>
}
```

---

## ✅ Coding Standards & Conventions

### TypeScript

- Aktifkan `strict: true` di `tsconfig.json`
- Selalu definisikan tipe untuk props komponen
- Gunakan `interface` untuk object shapes, `type` untuk union/primitive
- Hindari `any`, gunakan `unknown` jika tipe tidak diketahui

### Komponen

- Satu file = satu komponen utama
- Named export untuk komponen yang dipakai di banyak tempat
- Default export untuk komponen section/page
- Props interface ditulis di atas komponen di file yang sama

### Penamaan

- Komponen: `PascalCase` (contoh: `ProjectCard.tsx`)
- Hooks: `camelCase` dengan prefix `use` (contoh: `useScrollActive.ts`)
- Constants: `SCREAMING_SNAKE_CASE` (contoh: `NAV_LINKS`)
- File data: `camelCase` (contoh: `projects.ts`)

### Styling

- Utamakan Tailwind CSS utility classes
- Gunakan `cn()` dari `lib/utils.ts` untuk conditional classes
- Komponen Shadcn tidak dimodifikasi langsung, buat wrapper jika perlu
- Warna selalu dari design system (jangan hardcode hex)

### Komit Git

Format: `type(scope): pesan singkat`

```
feat(hero): tambah animasi typewriter pada heading
fix(contact): perbaiki validasi email kosong
style(navbar): update warna active link
refactor(projects): pisahkan ProjectCard ke komponen terpisah
docs: update README dengan instruksi setup
```

---

## 🚀 Deployment ke Vercel

### Langkah Deployment

```bash
# 1. Push ke GitHub
git push origin main

# 2. Import project di vercel.com
# 3. Tambahkan semua env variables di Vercel Dashboard
# 4. Deploy otomatis akan berjalan
```

### Vercel Configuration (`vercel.json`)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["sin1"]
}
```

### Environment Variables di Vercel

Tambahkan semua variabel dari `.env.example` di:  
**Vercel Dashboard → Project Settings → Environment Variables**

---

## ♿ Aksesibilitas (a11y)

- Semua gambar harus punya `alt` attribute yang deskriptif
- Gunakan semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`
- Tiap section punya `aria-label` atau `aria-labelledby`
- Form input selalu punya `<label>` yang terhubung
- Warna teks harus memenuhi WCAG AA contrast ratio (4.5:1)
- Keyboard navigable: semua interaksi bisa dilakukan tanpa mouse
- Focus indicator terlihat jelas

---

## 📊 SEO & Performance

### Metadata (di `app/layout.tsx`)

```ts
export const metadata: Metadata = {
  title: 'Nama Kamu | Full Stack Developer',
  description:
    'Portfolio website [Nama Kamu] — Full Stack Developer spesialisasi Next.js, React, TypeScript, dan Firebase.',
  keywords: ['portfolio', 'developer', 'next.js', 'react', 'typescript'],
  openGraph: {
    title: 'Nama Kamu | Full Stack Developer',
    description: '...',
    images: ['/images/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}
```

### Performance Checklist

- [ ] Gunakan `next/image` untuk semua gambar (auto-optimize)
- [ ] Font dimuat via `next/font` (no layout shift)
- [ ] Komponen berat di-lazy load dengan `dynamic()` Next.js
- [ ] Animasi menggunakan `will-change: transform` (bukan layout properties)
- [ ] Firebase hanya diinisialisasi sekali (singleton pattern)
- [ ] API routes menggunakan caching header yang tepat

---

## 🧪 Testing Manual (Checklist QA)

Sebelum deploy, pastikan semua item ini ✅:

### Fungsionalitas

- [ ] Semua menu navigasi (sidebar desktop & bottom nav mobile) berganti konten dengan benar
- [ ] Tombol hamburger di mobile membuka drawer dengan 5 menu tambahan
- [ ] Klik item di drawer otomatis menutup drawer dan berpindah section
- [ ] CTA button di HeroSection ("Lihat Proyek", "Hubungi Saya") berpindah section dengan benar
- [ ] Form kontak terkirim dan data masuk ke Firestore
- [ ] Toast notifikasi muncul saat form berhasil/gagal
- [ ] Filter proyek berfungsi dengan benar
- [ ] Dark mode toggle berfungsi dan tersimpan di localStorage
- [ ] Semua link eksternal (GitHub, live demo) bisa diklik

### Responsivitas

- [ ] Tampilan rapi di mobile (320px - 767px): bottom nav terlihat, sidebar tersembunyi
- [ ] Tampilan rapi di tablet (768px - 1023px): bottom nav terlihat, sidebar tersembunyi
- [ ] Tampilan rapi di desktop (1024px+): sidebar terlihat di kiri, bottom nav tersembunyi
- [ ] Drawer mobile slide-up berfungsi dan bisa ditutup via overlay atau tombol ✕
- [ ] Area konten tidak tertutup sidebar (desktop) atau bottom nav (mobile)

### Performa

- [ ] Lighthouse score Performance ≥ 90
- [ ] Lighthouse score Accessibility ≥ 90
- [ ] Lighthouse score SEO ≥ 90
- [ ] Tidak ada error di browser console

### Browser

- [ ] Chrome (terbaru)
- [ ] Firefox (terbaru)
- [ ] Safari (jika ada Mac/iOS)
- [ ] Edge (terbaru)

---

## ❓ FAQ untuk Agent

**Q: Boleh menambahkan section baru yang tidak ada di spec?**  
A: Tidak, stick ke 8 section yang sudah ditentukan. Jika ada ide, tanyakan dulu.

**Q: Apakah ada scroll antar section?**  
A: Tidak. Ini adalah CSR navigation — konten berubah di tempat tanpa scroll. Jangan implementasikan scroll-based navigation atau anchor links antar section.

**Q: Bagaimana menyimpan state section aktif agar tidak hilang saat refresh?**  
A: Gunakan `sessionStorage` di `useActiveSection` hook. Saat komponen mount, cek sessionStorage terlebih dahulu sebelum default ke `'home'`.

**Q: Bagaimana jika Firebase tidak terkoneksi?**  
A: Testimoni fallback ke data statis di `data/testimonials.ts`. Form kontak tampilkan error yang jelas ke user.

**Q: Apakah perlu halaman terpisah untuk setiap proyek?**  
A: Tidak. Gunakan modal (Shadcn Dialog) untuk detail proyek. Tidak perlu routing tambahan.

**Q: Boleh menggunakan library animasi lain selain Framer Motion?**  
A: Tidak. Semua animasi menggunakan Framer Motion untuk konsistensi.

**Q: Di mana menyimpan gambar? Apakah pakai Firebase Storage?**  
A: Tidak pakai Firebase Storage. Semua gambar (avatar, thumbnail proyek, OG image) disimpan di folder `public/images/`. Gunakan `next/image` untuk optimasi otomatis.

**Q: Apakah bisa mengganti 3 menu yang tampil di bottom nav?**  
A: Ya, ubah properti `bottomNav: true/false` di `NAV_LINKS` di `lib/constants.ts`. Pastikan hanya 3 item yang `bottomNav: true`.

**Q: Bagaimana dengan i18n (multi-bahasa)?**  
A: Tidak diperlukan untuk scope ini. Website dalam Bahasa Indonesia atau Bahasa Inggris, pilih satu dan konsisten.

**Q: Apakah perlu unit testing?**  
A: Tidak ada dalam scope ini. Fokus ke testing manual sesuai checklist QA di atas.

---

_Dokumen ini bersifat living document. Update setiap ada perubahan signifikan pada arsitektur atau requirements._

<!-- END:nextjs-agent-rules -->
