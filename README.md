# 🚀 Personal Portfolio Website & Admin CMS Dashboard

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19.2-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.2-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Framer_Motion-12.x-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion">
  <img src="https://img.shields.io/badge/Three.js-0.184-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js">
  <img src="https://img.shields.io/badge/Firebase-12.x-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase">
  <img src="https://img.shields.io/badge/Vercel-Production-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
</p>

---

Selamat datang di repositori **Personal Portfolio Website & Content Management System (CMS)**. Proyek ini dibekali dengan arsitektur **Single Page Application (SPA)** dengan navigasi **Client Side Rendering (CSR)** berkinerja tinggi yang mematikan reload halaman maupun scroll vertikal konvensional. Dibangun menggunakan teknologi terdepan seperti **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **Framer Motion**, **Three.js (3D Graphics)**, serta sistem **Firebase Serverless** yang hemat ongkos (100% gratis biaya bulanan).

---

## 📑 Daftar Isi

1. [Executive Summary & PRD Overview](#-1-executive-summary--prd-overview)
2. [Target Pengguna & Persona](#-2-target-pengguna--persona)
3. [Teknologi & Tech Stack Lengkap](#-3-teknologi--tech-stack-lengkap)
4. [Peta Arsitektur Rute & Endpoint (Paths System)](#-4-peta-arsitektur-rute--endpoint-paths-system)
   - [Navigasi SPA (Client Side Rendering)](#a-navigasi-spa-client-side-rendering)
   - [Public Dynamic Routes (SSR / ISR)](#b-public-dynamic-routes-ssr--isr)
   - [Admin CMS Dashboard Routes](#c-admin-cms-dashboard-routes)
   - [Serverless API Endpoints](#d-serverless-api-endpoints)
5. [Struktur Folder & Modularitas Kode](#-5-struktur-folder--modularitas-kode)
6. [Design System & Estetika (DESIGN.md & AturanDesign)](#-6-design-system--estetika-designmd--aturandesign)
   - [Filosofi & Token Warna Semantik](#a-filosofi--token-warna-semantik)
   - [Layout Adaptif (Sidebar vs Bottom Nav)](#b-layout-adaptif-sidebar-vs-bottom-nav)
   - [Micro-interactions & Animasi 3D](#c-micro-interactions--animasi-3d)
7. [Keamanan & Kebijakan Serverless Efisien](#-7-keamanan--kebijakan-serverless-efisien)
8. [Panduan Instalasi & Pengembangan Lokal](#-8-panduan-instalasi--pengembangan-lokal)
9. [Konfigurasi Environment Variables](#-9-konfigurasi-environment-variables)
10. [Deployment ke Vercel](#-10-deployment-ke-vercel)

---

## 🎯 1. Executive Summary & PRD Overview

Projek ini didesain sesuai dengan standar **Product Requirements Document (PRD)** profesional untuk menjawab tantangan branding bagi developer modern: resume PDF statis dinilai tidak lagi cukup untuk memvalidasi kematangan teknis seseorang.

### ✨ Tujuan Utama & Nilai Jual (USPs)
- **Zero-Scroll & Zero-Reload Experience**: Saat memilih menu, seluruh area konten digantikan seketika di tempat menggunakan transisi **Framer Motion**, menghadirkan *feelling* layaknya aplikasi desktop maupun native mobile app.
- **CMS Ready (Dashboard Admin Terintegrasi)**: Dilengkapi halaman admin dashboard di bawah rute `/admin` yang diamankan oleh **Firebase Auth & Google OAuth**. Anda dapat langsung menyegarkan data portofolio (Proyek, Pengalaman, Cerita Perjalanan, Testimoni, dan Bio) tanpa perlu mengetik ulang kode statis.
- **Rich Text & Interactive Content**: Menerapkan editor **BlockNote (Notion-style rich text)** untuk menghadirkan artikel spesifik pada halaman detail proyek dan cerita perjalanan.
- **Cost-Free Cloud Strategy**: Database memanfaatkan **Firebase Firestore tier Gratis (Spark Plan)**. Aset gambar seperti foto profil dan screenshot proyek disimpan langsung di dalam folder statis `/public` guna meniadakan tagihan penyimpanan *Firebase Storage* bulanan.

---

## 👥 2. Target Pengguna & Persona

Berdasarkan rancangan riset produk pada `PRD.md`, website ini dikhususkan untuk 4 persona utama dengan perilaku browsing dan ekspektasi yang berbeda:

| Persona | Tujuan Utama | Kebutuhan UX & Fitur |
| :--- | :--- | :--- |
| **💼 Rekruter / HR** | Menilai kualifikasi teknis kandidat secara cepat dalam < 3 menit. | Informasi terorganisir di section *Experience* & *Projects*; tombol *Contact* berposisi strategis. |
| **💻 Developer / Kolaborator** | Mengukur kompleksitas kode, estetika arsitektur, dan kecocokan Tech Stack. | Ikon visual teknologi terorganisir per kategori; link ke repositori GitHub di tiap card proyek. |
| **🚀 Klien Potensial** | Menakar apakah developer layak direkrut untuk pengerjaan proyek bisnis/freelance. | Portofolio terverifikasi, section *Testimonials* dari kolega, serta *Contact Form* berkecepatan tinggi. |
| **🌱 Komunitas / Follower** | Mempelajari kisah perjalanan karir profesional, motivasi, dan tutorial/artikel. | Narasi personal interaktif pada section *Story* (Timeline naratif); kemudahan navigasi di layar mobile. |

---

## 🛠️ 3. Teknologi & Tech Stack Lengkap

Repositori ini memanfaatkan paket-paket berspesifikasi modern (sesuai verifikasi `package.json` dan arsitektur Next.js 16):

### ⚡ Frontend Core & Application Engine
- **[Next.js 16.2.1](https://nextjs.org/)**: Framework React masa depan menggunakan arsitektur **App Router**, **Serverless API Routes**, serta **Incremental Static Regeneration (ISR)**.
- **[React 19.2.4](https://react.dev/) & React DOM**: Runtime UI tercanggih dengan keandalan manajemen state client dan server rendering.
- **[TypeScript 5.x](https://www.typescriptlang.org/)**: Dikonfigurasi dalam modus **Strict** guna mencegah cacat tipe (*runtime exceptions*) pada interface data, API payload, dan prop komponen.

### 🎨 Styling, Design System & Tailwind v4
- **[Tailwind CSS v4.2.2](https://tailwindcss.com/) & `@tailwindcss/postcss`**: Pemanfaatan standar Tailwind modern berkekuatan *CSS Custom Variables* (Semantic tokens).
- **Class Variance Authority (CVA), CLSX & Tailwind Merge**: Utilitas standar industrial untuk penyatu kelas dinamis dan pencegah konflik style CSS.
- **`next-themes` (v0.4.6)**: Integrasi pergantian tema otomatis (*Light*, *Dark*, dan *System*) yang transparan dan bebas kilatan layar putih (*Flashes of Unstyled Content / FOUC*).

### 🎬 Animasi, 3D Graphics & Micro-Interactions
- **[Framer Motion & Motion v12.40.0](https://www.framer.com/motion/)**: Transisi halus `<AnimatePresence mode="wait">` antar section, efek *stagger* pada senarai list, dan *shared-layout animations* (`layoutId`) untuk chip filter proyek.
- **[Three.js v0.184.0 & React Three Fiber v9.6.1](https://docs.pmnd.rs/react-three-fiber/)**: Rendering visualisasi grafis 3D interaktif pada area *Hero Section* (didukung oleh **`@react-three/drei`**, **`@react-three/rapier`**, dan **`meshline`**).
- **React Bits & ShinyText**: Ekstensi micro-animation mutakhitr untuk menegaskan identitas *Developer-Designer Hybrid*.

### 📝 CMS Editor & Content Rendering
- **[BlockNote (@blocknote/core, react & mantine) v0.51.4](https://www.blocknotejs.org/)**: Editor berbasis balok (Notion-style text editor) di halaman Admin dan komponen rendering terstruktur pada rute publik.
- **React Markdown & Remark GFM**: Peringkas rendering spesifikasi markdown GitHub-flavored untuk artikel cerita dan keterangan teknis proyek.

### 🧰 UI Components & Iconography
- **[Shadcn UI (v4.11.0) & Base UI React](https://ui.shadcn.com/)**: Koleksi komponen antarmuka yang sangat memiliki standar aksesibilitas tinggi (WAI-ARIA compliance: Cards, Dialogs, Toasts, Skeletons).
- **[Iconify React (v6.0.2)](https://iconify.design/)**: Menyediakan ratusan ikon logo teknologi mumpuni pada section *Tech Stack* (Next.js, Firebase, Git, Docker, TypeScript, dsb).
- **[Lucide React (v1.7.0)](https://lucide.dev/)**: Set ikon navigasi bersih, modern, dan simetris di seluruh tombol UI dan thanh navigasi.
- **[Sonner (v2.0.7)](https://sonner.emilkowal.ski/)**: Peningkat pengalaman notifikasi *Toast feedback* seketika saat formulir kontak dikirim atau pembaruan database terjadi.
- **QRCode React & Html-to-Image**: Fitur pembuat kode saji tautan cepat dan pengunduh gambar grafis.

### ☁️ Backend, Database & Cloud Connectivity
- **Firebase Client SDK v12.15.0**: Koneksi langsung dan sinkron ke **Cloud Firestore** untuk membaca testimoni dinamis, data proyek, dan pengiriman formulir kontak oleh pengunjung.
- **Firebase Admin SDK v13.4.0**: Pengelola akses database berkedip cepat melalui lingkungan aman sisi server (Serverless API Routes).
- **React Firebase Hooks v5.1.1 & SWR v2.4.2**: Hooks sinkronisasi state data berbasiskan *Stale-While-Revalidate* yang mengizinkan pemuatan offline fallback seketika.
- **Nodemailer v9.0.1**: Utilitas pengiriman email pemberitahuan otomatis ke kotak masuk pribadi setiap ada interaksi lead masuk.

### 🧪 DevOps, Code Quality & Testing
- **Vercel Engine**: Infrastruktur hosting Cloud Serverless siap pakai dengan integrasi CI/CD otomatis.
- **ESLint 9 & Next Configuration**: Penjamin kebersihan dan kepatuhan pola penulisan sintaks.
- **Jest v30.x & React Testing Library (RTL v16.3.2)**: Paket pengujian integrasi unit dan DOM secara intensif.

---

## 🗺️ 4. Peta Arsitektur Rute & Endpoint (Paths System)

Aplikasi dipisahkan secara hierarkis menjadi **4 Ekosistem Rute** guna membatasi beban bundle frontend agar tetap super ringan, seiring memberi ruang bagi fitur rendering server berdaya berat.

### A. Navigasi SPA (Client Side Rendering - Root Route `/`)
Di halaman utama (`app/page.tsx`), komponen `<AppShell />` memegang kendali state navigasi murni di browser (`activeSection`). Ketika sebuah rute diklik Dari Sidebar atau Bottom Nav, komponen diganti seketika tanpa perpindahan URL konvensional yang me-reload dokumen:

| Section Key | Komponen | Topik & Konten Khusus | Posisi di Mobile Bottom Nav |
| :--- | :--- | :--- | :---: |
| `home` | `<HeroSection />` | Perkenalan H1, Tagline profesi, Elemen Grafis 3D / ShinyText, serta 2 tombol CTA primer. | ✅ **Utama** |
| `about` | `<AboutSection />` | Foto profil rasio 1:1, Bio profesional 2-3 paragraf, dan statistik kartu *Count-Up animation*. | ❌ (Di dalam Drawer `☰`) |
| `experience`| `<ExperienceSection />`| Timeline kerja, organisasi & pendidikan bertingkat, dengan filter tab kategori yang instan. | ❌ (Di dalam Drawer `☰`) |
| `projects` | `<ProjectsSection />` | Etalase kartu proyek dengan filter kategori, link live demo/GitHub, dan pemanggil modal detail. | ✅ **Utama** |
| `tech-stack`| `<TechStackSection />` | 7 Kategori grid teknologi interaktif (Frontend, Backend, DB, DevOps, Cloud, Icons, Libraries). | ❌ (Di dalam Drawer `☰`) |
| `testimonials`| `<TestimonialsSection/>` | Carousel ucapan testimoni rekan/klien bergulir otomatis (ditarik dari Firestore/Stastis fallback). | ❌ (Di dalam Drawer `☰`) |
| `story` | `<JourneySection />` | Narasi reflektif riwayat hidup/karir dari awal menyentuh baris kode pertama hingga visi saat ini. | ❌ (Di dalam Drawer `☰`) |
| `contact` | `<ContactSection />` | Formulir komunikasi tervalidasi TypeScript, Toast feedback sonner, serta tautan jejaring sosial. | ✅ **Utama** |

> **💡 Catatan UX**: Pada ponsel (< 1024px), Bottom Nav menampilkan **Home, Projects, Contact**, serta satu tombol **Hamburger `☰` (More)** di sudut kanan yang jika ditarik ke atas akan memunculkan *MobileDrawer* berisi ke-5 rute sisanya.

### B. Public Dynamic Routes (SSR / ISR)
Untuk menjamin hasil pengindekan mesin pencuri (SEO) yang sempurna dan memori SPA utama tetap hemat, dokumen proyek mendetail dipusatkan di rute berbasis file standar:
- **`/projects/[slug]`**: Mengurai metadata spesifik proyek, pratinjau gambar HD, dan memajang dokumen ulasan perbaikan teknikal memanfaatkan parser `<BlockNoteRenderer />` / Markdown.
- **`/story` & `/story/[slug]`**: Halaman khusus untuk mengeksplorasi cerita dan pencapaian (journey milestones) dari developer secara mendalam.

### C. Admin CMS Dashboard Routes (`/admin/*`)
Area khusus pengelola yang dilindungi oleh pengecekan kredensial Firebase Auth / Google OAuth di sisi middleware dan Client Protection:
- **`/admin`**: Dasbor pemusatan status sistem dan navigasi pengelolaan konten.
- **`/admin/login`**: Gerbang autentikasi Google OAuth / Firebase terenkripsi.
- **`/admin/about`**: Editor data biografis dan statistik fakta personal.
- **`/admin/experiences`**: Form manajemen riwayat kerja, organisasi, dan gelar pendidikan.
- **`/admin/projects`**: Modul penulisan proyek, editor BlockNote terintegrasi, & manajemen badge stack.
- **`/admin/story` / `/admin/journey`**: Modul publikasi cerita timeline karir.
- **`/admin/testimonials`**: Dasbor kurasi dan persetujuan tampilan ucapan testimoni.

### D. Serverless API Endpoints (`/api/*`)
Fungsi backend berarsitektur RESTful yang ditelusuri dari **Next.js API Routes** di bawah direktori `app/api/`:

```
┌── app/api/
│   ├── /about          ➔ GET & POST data profil ke Firebase Admin DB
│   ├── /admin          ➔ Verifikasi sesi sandi dan validasi hak akses
│   ├── /categories     ➔ Manajemen tag klasifikasi proyek 
│   ├── /contact        ➔ POST pengiriman pesan baru + sistem Rate-Limiting Anti-Spam
│   ├── /experiences    ➔ GET & POST senarai riwayat timeline
│   ├── /projects       ➔ GET & POST katalog proyek
│   ├── /stories        ➔ GET & POST publikasi artikel perjalanan
│   └── /testimonials   ➔ GET testimoni publik & POST kurasi admin
```

---

## 📂 5. Struktur Folder & Modularitas Kode

Projek ini menerapkan arsitektur moduler pemisahan tanggung jawab (*Separation of Concerns*) berstandar enterprise masa kini:

```text
portofolio/
├── app/                          # NEXT.JS APP ROUTER ENGINE
│   ├── layout.tsx                # Layout Root global (Inter/Geist fonts, ThemeProvider, Toast)
│   ├── page.tsx                  # Entri utama pemanggil <AppShell /> (SPA Root)
│   ├── globals.css               # Pusat Single Source of Truth Tailwind CSS & Semantic Tokens
│   ├── [projects/ & story/]      # Halaman render sisi server untuk spesifikasi Slug artikel/proyek
│   ├── admin/                    # Kunci Rute Halaman Khusus CMS Dashboard 
│   └── api/                      # Backend Serverless API Handlers
│
├── src/                          # SOURCE DIRECTORY TERPUSAT
│   ├── components/               # Koleksi Komponen Antarmuka (React Components)
│   │   ├── global/               # Kerangka utama (AppShell, SidebarNav, BottomNav, MobileDrawer, Footer)
│   │   ├── sections/             # Modul per-section CSR (HeroSection, AboutSection, ProjectsSection, dll)
│   │   ├── public/               # Komponen spesifik area publik (seperti BlockNoteRenderer)
│   │   ├── admin/                # Komponen antarmuka kelola sistem dashboard admin
│   │   ├── skeletons/            # Komponen placeholder bayangan saat Suspense / data fetching SWR
│   │   ├── testimonials/         # Komponen presentasi grid/carousel ulasan testimoni
│   │   └── ui/                   # Reusable UI Primitives dari Shadcn UI (Button, Card, Input, Toast)
│   │
│   ├── data/                     # Source of Truth Data Statis & Fallback offline
│   │   ├── projects.ts, techstack.ts, experiences.ts, story.ts, testimonials.ts
│   │
│   ├── hooks/                    # Custom React Hooks (useSectionTitle, navigasi state, form logic)
│   ├── lib/                      # Utilitas koneksi Firebase Client, Firebase Admin DB, helper `cn()`
│   └── types/                    # TypeScript Type & Interface declarations untuk keandalan statis
│
├── public/                       # ASET STATIS BERBASIS STORAGE GRATIS
│   └── images/                   # Penampung foto avatar, og-image, & screenshot thumbnail proyek
│
├── [Dokumen Arsitektur System]    # Referensi Perencanaan Agentic AI & Human Devs
│   ├── PRD.md                    # Product Requirements Document terlengkap
│   ├── DESIGN.md                 # Penjabaran 35 poin Filosofi Desain & Standar Implementasi UI
│   ├── AGENTS.md                 # Buku Panduan komprehensif bagi Agen AI (Claude, Copilot, Gemini)
│   ├── AturanDesign.md           # Kerangka Filosofis rancang bangun antarmuka
│   └── SDD.md                    # Software Design Document / Rancangan Sistem
│
├── package.json, tsconfig.json   # Konfigurasi sistem dependensi & TypeScript Compiler
└── next.config.ts, tailwind...   # Pengaturan bundler Next.js dan PostCSS Tailwind v4
```

---

## 🎨 6. Design System & Estetika (`DESIGN.md` & `AturanDesign`)

Situs didasari pada filosofi **Developer-Designer Hybrid**, menggabungkan ketajaman rekayasa perangkat lunak dan kehalusan seni rupa digital interaktif:

```
┌─────────────────────────────────────────────────────────────┐
│                    FILOSOFI DESIGN SYSTEM                   │
├──────────────┬──────────────┬───────────────┬───────────────┤
│ Modern &     │ Premium &    │ Interactive & │ Content First │
│ Clean        │ Elegant      │ Dynamic       │ Performance   │
└──────────────┴──────────────┴───────────────┴───────────────┘
```

### A. Filosofi & Token Warna Semantik (CSS Custom Variables)
Alih-alih mengotori markup kode dengan class utility ganda seperti `bg-white dark:bg-black`, sistem menggunakan **Semantic Color Tokens** terpapar langsung di file `globals.css`:
- **Interactive Colors**: `var(--color-interactive)` dan `var(--color-interactive-text)` (mewakili identitas aksen indigo / cyan menyemangati).
- **Elevations (Kedalaman Lapisan)**: 
  - *Layer 1*: `bg-[var(--color-bg-main)]` — Permukaan halaman dasar tanpa bayangan.
  - *Layer 2*: `bg-[var(--color-bg-elevated)]` — Untuk kartu proyek & input form dengan `border` tipis 1px dan `shadow-sm`.
  - *Layer 3*: `bg-[var(--color-bg-surface)]` + **Glassmorphism** — Kombinasi opasitas transparan (`/50` atau `/60`) dengan `backdrop-blur-md` pada menu bar dan overlay modal dialog.
- **Tipografi**: Memadukan font profesional **Geist Sans** untuk keterbacaan berkelas tinggi dan **Geist Mono** untuk badge teknikal, blok kode, dan statistik.

### B. Layout Adaptif (Sidebar vs Bottom Nav)
Desain responsif diwujudkan secara radikal tergantung dari lebar dimensi layar (*Breakpoint*):
- **Desktop (≥ 1024px)**: Melangsingkan navigasi ke **SidebarNav vertikal statis `w-64`** meniti sisi kiri layar, menampilkan avatar pengguna, identitas, 8 menu penavigasi, dan tema saklar dwiwarna.
- **Mobile & Tablet (< 1024px)**: Mengonversi bar ke bawah menyerupai antarmuka *Mobile Native App* (`h-16 fixed bottom-0`), dilengkapi efek kaca buram dan tombol *Drawer `☰` (More)* model geser ke atas (*Slide-up Sheet*).

### C. Micro-interactions & Animasi 3D
- **Magnetic Buttons & Hover Cards**: Setiap elemen interaktif didukung sensasi terangkat ringan (*lift effect*: `hover:-translate-y-0.5` sampai `-1`) dibarengi ekspansi dimensi `shadow-md`.
- **Shared Layout Id (`layoutId`)**: Kapsul latar yang menaungi pil pembanding filter proyek berpindah mulus bak sirine melaju tanpa patah menggunakan *Framer Motion Layout ID*.
- **Wave Staggering**: Ikon-ikon teknologi di section *Tech Stack* bangkit teratur bak gelombang bergulir dari kiri menuju kanan saat elemen menyelinap masuk ke dalam pandangan Anda.

---

## 🔒 7. Keamanan & Kebijakan Serverless Efisien

Proyek memitigasi kemungkinan penyimpangan akses dan lonjakan pengeluaran server berlebih dengan sistem pengaman berikut:

1. **Zero Firebase Storage Fees**: Untuk menghindari jebakan biaya bulanan atas penulisan atau pengunduhan file di bucket berbayar, seluruh foto asli, tangkap layar web, dan aset ilustrasi disimpan statis pada direktori lokal `/public`.
2. **Proteksi Autentikasi Admin (Google OAuth)**: Seluruh aksi mutasi database (Create, Update, Delete) pada koleksi `testimonials`, `projects`, dan `messages` diamankan dengan **Firestore Security Rules**:
   ```javascript
   // Contoh Konsep Regulasi Firestore Security Rules
   allow write: if request.auth != null && request.auth.token.email == 'email_admin@anda.com';
   ```
3. **API Rate-Limiting Anti-Spam**: Endpoint `POST /api/contact` dilindungi dengan pembatas laju penulisan, memblokir pengajuan berurutan melebihi 3 pesan dari satu alamat IP dalam kurung waktu tertentu guna melindungi kapasitas baca/tulis tier gratis Anda.

---

## 🚀 8. Panduan Instalasi & Pengembangan Lokal

Ikuti langkah-langkah di bawah untuk mengatur lingkungan kerja dev di terminal mesin Anda:

### Prasyarat Sistem
- **Node.js**: Versi **18.x** atau **20.x+ (LTS disukai)**
- **Package Manager**: Disarankan menggunakan **pnpm** (atau `npm` / `yarn` / `bun`)
- **Git**: Terinstal untuk manajemen kontrol versi.
- **Firebase Account**: Sebuah proyek Firebase baru (opsional bila hanya ingin membatasi diri pada data fallback statis di folder `src/data`).

### Langkah-langkah Quick Setup

1. **Kloning Repositori ke Lokal Anda**
   ```bash
   git clone https://github.com/mkeyzxi/personal-portfolio.git
   cd portofolio
   ```

2. **Pasang Seluruh Dependensi Paket**
   ```bash
   pnpm install
   # atau menggunakan npm: npm install
   ```

3. **Duplikat File Contoh Kredensial Lingkungan (Env)**
   ```bash
   cp .env.example .env.local
   # Kemudian buka .env.local dan isikan kunci-kunci rahasia API Anda (Lihat poin 9)
   ```

4. **Jalankan Server Development Lokal**
   ```bash
   pnpm dev
   # Buka http://localhost:3000 pada peramban web Chrome atau browser favorit Anda!
   ```

5. **Perintah Kualitas Kode Alternatif (Scripts)**
   ```bash
   pnpm run lint          # Memeriksa standar kebersihan sintaks ESLint
   pnpm run test          # Menjalankan serangkaian unit tests Jest & RTL
   pnpm run build         # Mensimulasikan build untuk verifikasi kesiapan produksi
   ```

---

## ⚙️ 9. Konfigurasi Environment Variables

File `.env.local` memuat variabel krusial yang melatari jembatan antara aplikasi Next.js Anda, perambahan API, dan platform Firebase. **Jangan pernah meragukan penguncian file ini di dalam `.gitignore`**:

```ini
# ==========================================
# FIREBASE CLIENT SDK (Dapat diakses browser)
# ==========================================
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDpX_YourApiKeyHere...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-portfolio.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-portfolio-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-portfolio.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1029384756
NEXT_PUBLIC_FIREBASE_APP_ID=1:1029384756:web:abcd1234ef56
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-ABCDEFG

# ==========================================
# FIREBASE ADMIN SDK (Strictly Server-Side Only!)
# ==========================================
FIREBASE_PROJECT_ID=your-portfolio-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-portfolio.iam.gserviceaccount.com
# PERHATIAN: Pindahkan dengan tepat menyertakan tanda kutip jika memuat karakter baris baru (\n)
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEv...=\n-----END PRIVATE KEY-----\n"

# ==========================================
# CREDENTIALS TAMBAHAN (Admin Auth & Emails)
# ==========================================
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=rahasia_super_kriptografis_anda_disini
```

---

## 🌍 10. Deployment ke Vercel

Situs ini dipersiapkan secara native untuk memanfaatkan performa puncak CDN Edge Network milik [Vercel](https://vercel.com):

1. Masuk ke **Vercel Dashboard** Anda dan tekan tombol **Add New Project**.
2. Hubungkan akun GitHub Anda dan pilih repositori portofolio ini.
3. Di tab **Configure Project**, ekspan accordion bagian **Environment Variables**. Salin seluruh isi file `.env.local` Anda (tanpa baris komentar) dan tempelkan seutuhnya. Vercel akan membaca variabel kunci-nilai secara otomatis!
4. Tekan tombol hijau **Deploy** dan tunggu proses pembangunan bundle (< 2 menit).
5. Selamat! Setiap penyerakan komputasi commit baru ke cabang `main`/`master` akan memicu *CI/CD pipeline* untuk mendeploy portofolio Anda secara real-time ke seluruh penjuru dunia.

---

<p align="center">
  <b>Dibuat dengan ❤️, Ketepatan Arsitektural, dan Estetika Tinggi guna Menciptakan Kesan Tanpa Tanding.</b>
  <br/>
  <span>© 2026 Personal Portfolio Website & CMS Project</span>
</p>
