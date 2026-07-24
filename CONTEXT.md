# Project Context: Personal Portfolio Website

Dokumen ini berisi informasi lengkap mengenai fitur, arsitektur, dan struktur folder dari proyek website portofolio ini. Dokumen ini dibuat agar AI Agent (seperti Cursor, Claude, Copilot, dll) dapat langsung memahami konteks proyek tanpa harus mencari-cari file secara manual.

---

## 🎯 Instruksi Khusus untuk AI (AI System Prompt)

**PERINTAH WAJIB UNTUK AI:**
Setiap kali kamu (AI) memberikan kode untuk diubah atau ditambahkan, dan saya (User) menekan tombol **"Accept"** (menerima perubahan tersebut) pada file di dalam proyek ini, kamu **WAJIB** memberikan ringkasan (summary) singkat mengenai apa saja yang baru saja ditambahkan, diubah, atau diperbaiki. 
Jika memungkinkan, perbarui file `CHANGELOG.md` (jika ada) atau berikan respons konfirmasi yang jelas di chat tentang modifikasi yang sukses diterapkan. Selalu pastikan kodemu selaras dengan arsitektur dan gaya desain (Tailwind CSS variables) yang sudah ada di bawah ini.

---

## 🚀 Fitur Utama Website

Website ini adalah **Personal Portfolio** modern yang dibangun menggunakan pendekatan **Single Page Application (SPA)** secara visual pada halaman utama (Client Side Rendering navigasi untuk section), namun menggunakan **Next.js App Router** untuk kerangka utama dan routing halaman dinamis.

1. **Client-Side Section Navigation**: Halaman utama (`/`) menggunakan `AppShell` di mana menu navigasi tidak berpindah URL secara hard-reload, melainkan me-render section komponen secara dinamis (Home, About, Experience, Projects, Tech Stack, Testimonials, Story, Contact) dengan animasi Framer Motion.
2. **Dynamic Project Detail Pages (`/projects/[slug]`)**: Halaman khusus untuk detail proyek yang di-render secara dinamis di server (SSR/ISR). Mendukung rendering konten menggunakan Markdown (`react-markdown`) dan JSON blocks (`BlockNote`).
3. **Firebase Backend integration**:
   - **Firestore**: Menyimpan data dinamis seperti Proyek, Testimoni, dan Pesan dari form kontak.
   - **Firebase Admin SDK**: Digunakan di sisi server/API Route untuk mengambil data secara aman.
4. **Desain Modern & Responsif**:
   - Styling menggunakan **Tailwind CSS** dengan pendekatan Semantic Custom Properties (`var(--color-bg-main)`, `--color-interactive)`, dll) untuk mempermudah transisi Dark/Light Mode.
   - Komponen interaktif menggunakan **Framer Motion** (animasi transisi) dan **Shadcn UI** / **Radix UI**.
5. **SEO & Performa**: Metadata dinamis untuk SEO (termasuk OpenGraph dan Twitter Card) di-generate langsung dari data Firestore pada halaman detail proyek.

---

## 📁 Struktur Folder Proyek

Berikut adalah peta struktur direktori utama yang digunakan pada proyek ini:

```text
portfolio/
├── app/                          # Next.js App Router (Server Components & Routing)
│   ├── layout.tsx                # Root layout (Font, metadata global, provider)
│   ├── page.tsx                  # Halaman utama (Entry point untuk AppShell)
│   ├── globals.css               # CSS global, Tailwind directives, & CSS Variables (Warna/Tema)
│   ├── api/                      # Next.js API Routes (Backend Endpoints)
│   │   ├── projects/             # API untuk mengambil daftar proyek
│   │   ├── contact/              # API untuk mengirim pesan kontak
│   │   └── testimonials/         # API untuk testimoni
│   └── projects/                 # Dynamic routes
│       └── [slug]/page.tsx       # Halaman detail proyek (SSR/ISR)
│
├── src/                          # Folder utama source code aplikasi
│   ├── components/               # Semua komponen React UI
│   │   ├── global/               # Komponen layout global (AppShell, SidebarNav, BottomNav, ThemeToggle)
│   │   ├── sections/             # Komponen per-section untuk halaman utama (dirender via CSR di AppShell)
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ProjectsSection.tsx # Terdapat fitur Pagination & Filter Kategori
│   │   │   └── ... (Experience, Contact, Story, dll)
│   │   ├── ui/                   # Komponen UI reusable (Shadcn UI, ProjectCard, Badge, Button, Input)
│   │   └── skeletons/            # Loading skeletons untuk Suspense fallback
│   │
│   ├── hooks/                    # Custom React hooks (contoh: useSectionTitle, dll)
│   ├── lib/                      # Utilitas dan Konfigurasi
│   │   ├── firebase.ts           # Inisialisasi Firebase Client
│   │   ├── firebase-admin-db.ts  # Inisialisasi Firebase Admin SDK (Server)
│   │   ├── fetcher.ts            # SWR fetcher utility
│   │   └── utils.ts              # Helper functions (cn untuk Tailwind, format tanggal, dll)
│   ├── types/                    # TypeScript interfaces & types definition (Project, dsb.)
│   └── store/                    # State management (Zustand/Context jika ada)
│
├── public/                       # Aset statis (Gambar, favicon, OG images, logo)
├── tailwind.config.ts            # Konfigurasi Tailwind (Plugin, custom theme setup)
├── next.config.ts                # Konfigurasi Next.js (Image domains, headers)
└── .env.local                    # Environment Variables (Firebase Keys, dll)
```

## 🎨 Panduan Gaya Desain & Konsep Visual (Styling Guidelines)

Desain website ini mengusung tema **Modern, Clean, & Premium** dengan sentuhan antarmuka yang sangat dinamis dan interaktif. Semua elemen didesain dengan memprioritaskan estetika (vibrant colors/sleek dark modes, micro-animations, glassmorphism) dan pengalaman pengguna (UX).

### 1. Sistem Warna & Tema (Semantic Custom Properties)
- Selalu gunakan variabel CSS bawaan dari `globals.css` (semantic tokens).
- **Background**: `bg-[var(--color-bg-main)]`, `bg-[var(--color-bg-surface)]`, `bg-[var(--color-bg-elevated)]`.
- **Teks**: `text-[var(--color-text-primary)]`, `text-[var(--color-text-secondary)]`, `text-[var(--color-text-muted)]`.
- **Elemen Interaktif & Border**: `bg-[var(--color-interactive)]`, `text-[var(--color-interactive-text)]`, `border-[var(--color-border)]`.
- **Aturan Ketat**: DILARANG menggunakan hardcoded utility Tailwind (seperti `bg-blue-500` atau `text-gray-300`) kecuali untuk kasus sangat khusus. Sistem semantic ini menjamin perpindahan antara **Dark Mode** dan **Light Mode** berjalan sempurna tanpa harus menulis kelas `dark:` berulang kali.

### 2. Tipografi (Typography)
- **Font Utama (Sans-serif)**: Menggunakan **Geist** (`font-geist-sans`). Digunakan untuk semua teks bacaan, heading, tombol, dan antarmuka umum.
- **Font Monospace**: Menggunakan **Geist Mono** (`font-mono`). Digunakan secara spesifik untuk badge teknologi, kode, dan elemen teknis lainnya.
- Kombinasikan dengan hirarki visual yang jelas: gunakan `tracking-tight` untuk heading besar dan `leading-relaxed` untuk paragraf.

### 3. Efek Visual & Elemen UI
- **Glassmorphism**: Gunakan kombinasi background semi-transparan dengan efek blur untuk elemen overlay atau floating (contoh: `bg-[var(--color-bg-surface)]/50 backdrop-blur-md`).
- **Shadows & Borders**: Gunakan `shadow-sm` dan `border border-[var(--color-border)]` untuk card dan penampung (container) guna memberikan efek depth/kedalaman visual yang elegan.
- **Shape**: Desain condong pada sudut melengkung yang mulus (smooth rounded corners). Gunakan `rounded-2xl`, `rounded-3xl`, atau `rounded-full` sesuai konteks.

### 4. Animasi & Interaksi
- **Micro-animations**: Interaksi harus terasa responsif. Gunakan hover state standar seperti `hover:-translate-y-0.5`, `active:translate-y-0`, `hover:shadow-md`, dan transisi warna `transition-colors`.
- **Framer Motion**: Digunakan untuk transisi masuk antar section saat navigasi (AppShell) dengan `AnimatePresence`, efek *popLayout*, *staggered children* pada list item (seperti proyek), serta feedback visual saat hover (seperti background highlight aktif pada filter kategori).
- **React Bits**: Untuk komponen animasi atau latar belakang dinamis yang sangat spesifik (jika ada).

### 5. Responsivitas (Mobile-First)
- Selalu terapkan gaya mobile-first. Gunakan prefix `md:` (tablet) dan `lg:` (desktop) untuk menyesuaikan grid, padding, tinggi container (`h-[40vh] md:h-[55vh]`), dan ukuran teks.

---

> **PENTING UNTUK AI:**
> Gunakan dokumen ini sebagai referensi utama Anda. Jika Anda melihat kode tidak mematuhi panduan ini (misalnya menggunakan hardcoded `bg-slate-900`), perbaikilah ke versi semantic property (`bg-[var(--color-bg-...)]`) secara proaktif!
