# 📄 Product Requirements Document (PRD)

## Personal Portfolio Website

---

| Field              | Detail                        |
| ------------------ | ----------------------------- |
| **Dokumen**        | Product Requirements Document |
| **Versi**          | 1.0.0                         |
| **Status**         | Active                        |
| **Dibuat**         | 2025                          |
| **Pemilik Produk** | Pemilik Portfolio             |
| **Target Rilis**   | Vercel (Production)           |

---

## Daftar Isi

1. [Executive Summary](#1-executive-summary)
2. [Latar Belakang & Motivasi](#2-latar-belakang--motivasi)
3. [Tujuan Produk](#3-tujuan-produk)
4. [Target Pengguna](#4-target-pengguna)
5. [User Stories](#5-user-stories)
6. [Scope & Batasan](#6-scope--batasan)
7. [Arsitektur & Tech Stack](#7-arsitektur--tech-stack)
8. [Navigasi & Layout](#8-navigasi--layout)
9. [Fitur & Spesifikasi Fungsional](#9-fitur--spesifikasi-fungsional)
10. [Spesifikasi Non-Fungsional](#10-spesifikasi-non-fungsional)
11. [Design System](#11-design-system)
12. [Spesifikasi API](#12-spesifikasi-api)
13. [Database Schema](#13-database-schema)
14. [Keamanan](#14-keamanan)
15. [Aksesibilitas](#15-aksesibilitas)
16. [SEO & Metadata](#16-seo--metadata)
17. [Kriteria Penerimaan (Acceptance Criteria)](#17-kriteria-penerimaan-acceptance-criteria)
18. [Risiko & Mitigasi](#18-risiko--mitigasi)
19. [Rencana Rilis](#19-rencana-rilis)
20. [Glossary](#20-glossary)

---

## 1. Executive Summary

Personal Portfolio Website adalah sebuah **Single Page Application (SPA)** yang dibangun untuk menampilkan identitas profesional, karya, pengalaman, dan cerita perjalanan pemilik kepada khalayak umum — terutama rekruter, kolaborator potensial, dan komunitas developer.

Website ini menggunakan pola navigasi **Client Side Rendering (CSR)**: ketika pengguna mengklik menu, konten berganti di tempat tanpa perpindahan halaman maupun scroll vertikal, menciptakan pengalaman seperti aplikasi native. Tampilan navigasi adaptif: **sidebar vertikal di kiri** pada desktop, dan **bottom navigation bar** bergaya aplikasi mobile di perangkat genggam.

Produk ini bersifat **gratis untuk dioperasikan** — tidak ada layanan berbayar yang digunakan. Aset gambar disimpan secara statis, dan Firebase hanya digunakan pada tier gratis (Firestore + Authentication).

---

## 2. Latar Belakang & Motivasi

Di era digital saat ini, seorang developer profesional membutuhkan identitas online yang kuat. Resume PDF statis tidak cukup untuk menunjukkan kemampuan teknis secara mendalam. Sebuah portfolio website yang dibangun dengan baik berfungsi sebagai:

- **Bukti nyata kemampuan teknis** — website itu sendiri adalah contoh hasil kerja
- **Pusat informasi terpadu** — satu URL untuk semua yang perlu diketahui tentang pemilik
- **Sarana personal branding** — memproyeksikan kepribadian dan nilai profesional
- **Alat konversi** — mengubah pengunjung menjadi rekruter yang tertarik atau klien potensial

Proyek ini dibangun dari nol (_greenfield_) menggunakan tech stack modern yang relevan dengan industri: Next.js, TypeScript, Tailwind CSS, Firebase, dan Framer Motion.

---

## 3. Tujuan Produk

### 3.1 Tujuan Utama

| #    | Tujuan                                              | Metrik Keberhasilan                                 |
| ---- | --------------------------------------------------- | --------------------------------------------------- |
| T-01 | Menampilkan profil profesional secara komprehensif  | Semua 8 section terisi dan dapat diakses            |
| T-02 | Memberikan pengalaman navigasi yang cepat dan mulus | Perpindahan konten < 300ms, animasi 60fps           |
| T-03 | Memungkinkan pengunjung menghubungi pemilik         | Form kontak berfungsi, pesan tersimpan di Firestore |
| T-04 | Dapat diakses dengan baik di semua perangkat        | Lighthouse score ≥ 90 di semua kategori             |
| T-05 | Beroperasi tanpa biaya bulanan                      | Tidak ada layanan berbayar yang aktif               |

### 3.2 Tujuan Sekunder

- Menjadi referensi portofolio teknis yang menunjukkan kemampuan full stack
- Mendapatkan kepercayaan pengunjung melalui tampilan profesional dan testimoni
- Mempermudah rekruter menemukan informasi relevan tanpa perlu menggali dalam

---

## 4. Target Pengguna

### 4.1 Persona Utama

#### 🎯 Persona 1 — Rekruter / HR

- **Siapa:** Staf rekrutmen perusahaan teknologi atau startup
- **Tujuan:** Menilai kualifikasi kandidat secara cepat
- **Perilaku:** Membuka dari desktop, waktu kunjungan singkat (< 3 menit), langsung ke Experience dan Projects
- **Kebutuhan:** Informasi yang padat, jelas, dan mudah di-scan; tombol kontak yang mudah ditemukan
- **Frustrasi:** Website lambat, informasi tersebar, tidak ada cara cepat untuk menghubungi

#### 🎯 Persona 2 — Developer / Kolaborator

- **Siapa:** Developer lain yang ingin berkolaborasi atau berjejaring
- **Tujuan:** Melihat tech stack, proyek, dan cara berpikir pemilik
- **Perilaku:** Membuka dari desktop/mobile, menghabiskan waktu di Projects dan Tech Stack, mungkin membuka GitHub
- **Kebutuhan:** Detail teknis proyek, link ke kode sumber, tech stack yang digunakan
- **Frustrasi:** Tidak ada link ke GitHub, screenshot proyek tidak jelas, tidak ada deskripsi teknis

#### 🎯 Persona 3 — Klien Potensial

- **Siapa:** Pebisnis atau individu yang butuh jasa development
- **Tujuan:** Menilai apakah pemilik bisa mengerjakan proyek mereka
- **Perilaku:** Melihat Projects dan Testimonials, kemudian langsung ke Contact
- **Kebutuhan:** Bukti hasil kerja, testimoni dari klien sebelumnya, form kontak yang mudah
- **Frustrasi:** Tidak ada testimoni, proyek tidak relevan, form kontak tidak berfungsi

#### 🎯 Persona 4 — Komunitas / Follower

- **Siapa:** Teman, anggota komunitas, atau follower di media sosial
- **Tujuan:** Mengenal pemilik lebih dalam secara personal dan profesional
- **Perilaku:** Membuka dari mobile, membaca Story dan About, melihat-lihat semua section
- **Kebutuhan:** Konten yang personal, mudah dibaca di mobile, navigasi yang intuitif
- **Frustrasi:** Tampilan mobile yang buruk, konten yang terlalu formal

---

## 5. User Stories

### 5.1 Navigasi

| ID     | Sebagai...         | Saya ingin...                                          | Agar...                                                     |
| ------ | ------------------ | ------------------------------------------------------ | ----------------------------------------------------------- |
| US-N01 | Pengunjung desktop | melihat daftar menu di sisi kiri layar                 | saya bisa berpindah section kapan saja tanpa mencari tombol |
| US-N02 | Pengunjung mobile  | melihat menu utama di bawah layar                      | navigasi terasa seperti aplikasi, bukan website             |
| US-N03 | Pengunjung mobile  | membuka semua menu via tombol hamburger di kanan bawah | bisa mengakses section yang tidak tampil di bottom bar      |
| US-N04 | Semua pengunjung   | melihat konten berubah di tempat saat klik menu        | tidak perlu menunggu halaman baru dimuat                    |
| US-N05 | Semua pengunjung   | melihat menu mana yang sedang aktif                    | saya tahu sedang berada di section mana                     |
| US-N06 | Semua pengunjung   | menyimpan progress navigasi saat refresh               | tidak perlu kembali ke Home setiap saat                     |

### 5.2 Konten Section

| ID     | Sebagai...       | Saya ingin...                                                | Agar...                                                           |
| ------ | ---------------- | ------------------------------------------------------------ | ----------------------------------------------------------------- |
| US-H01 | Rekruter         | melihat nama, posisi, dan tagline di Home                    | saya langsung tahu siapa pemilik website ini                      |
| US-H02 | Semua pengunjung | menekan tombol CTA di Home                                   | saya bisa langsung lompat ke Projects atau Contact                |
| US-A01 | Kolaborator      | membaca bio dan latar belakang pemilik                       | saya bisa memutuskan apakah kepribadiannya cocok untuk kolaborasi |
| US-E01 | Rekruter         | melihat riwayat pengalaman dalam bentuk timeline             | saya bisa menilai rekam jejak secara kronologis                   |
| US-E02 | Rekruter         | memfilter pengalaman berdasarkan tipe                        | saya bisa fokus pada pengalaman kerja saja                        |
| US-P01 | Rekruter/Klien   | melihat portofolio proyek dalam bentuk grid card             | saya bisa menilai kualitas dan variasi karya                      |
| US-P02 | Developer        | mengklik proyek untuk melihat detail teknis dan link GitHub  | saya bisa menilai kualitas kode                                   |
| US-P03 | Klien            | memfilter proyek berdasarkan kategori                        | saya bisa menemukan proyek yang relevan dengan kebutuhan saya     |
| US-T01 | Semua pengunjung | melihat semua teknologi yang dikuasai pemilik                | saya bisa menilai kecocokan tech stack                            |
| US-T02 | Developer        | melihat ikon visual per teknologi dikelompokkan per kategori | mudah di-scan dan dipahami                                        |
| US-V01 | Klien potensial  | membaca testimoni dari kolega atau klien sebelumnya          | saya mendapat kepercayaan sebelum menghubungi                     |
| US-S01 | Komunitas        | membaca perjalanan personal pemilik                          | saya bisa mengenal pemilik lebih manusiawi                        |
| US-C01 | Semua pengunjung | mengisi dan mengirim form kontak                             | saya bisa menghubungi pemilik tanpa keluar dari website           |
| US-C02 | Semua pengunjung | mendapat konfirmasi setelah kirim pesan                      | saya tahu pesan saya sudah diterima                               |
| US-C03 | Semua pengunjung | melihat info sosial media dan email                          | saya punya alternatif cara menghubungi                            |

### 5.3 UX & Visual

| ID      | Sebagai...        | Saya ingin...                                 | Agar...                                        |
| ------- | ----------------- | --------------------------------------------- | ---------------------------------------------- |
| US-UX01 | Semua pengunjung  | mengaktifkan dark mode                        | nyaman membuka di malam hari                   |
| US-UX02 | Semua pengunjung  | melihat animasi yang halus saat konten muncul | website terasa hidup dan profesional           |
| US-UX03 | Pengunjung mobile | bottom nav tidak menutupi konten              | saya bisa membaca seluruh konten dengan nyaman |
| US-UX04 | Semua pengunjung  | website memuat dengan cepat                   | tidak perlu menunggu lama                      |

---

## 6. Scope & Batasan

### 6.1 Dalam Scope (In Scope)

- Website portfolio satu halaman (SPA) dengan 8 section
- Navigasi CSR tanpa scroll antar section
- Layout responsif: sidebar desktop + bottom nav mobile
- Dark mode / light mode toggle
- Form kontak dengan penyimpanan ke Firestore
- Data testimoni dari Firestore dengan fallback statis
- Animasi UI menggunakan Framer Motion
- Deploy ke Vercel dengan CI/CD otomatis

### 6.2 Di Luar Scope (Out of Scope)

| Item                               | Alasan                                                 |
| ---------------------------------- | ------------------------------------------------------ |
| Panel admin untuk mengelola konten | Di luar kebutuhan MVP; konten dikelola via kode        |
| Blog / artikel                     | Konten terlalu banyak untuk scope awal                 |
| Multi-bahasa (i18n)                | Tidak diperlukan; satu bahasa dipilih secara konsisten |
| Firebase Storage                   | Berbayar; gambar disimpan statis di `public/`          |
| Unit testing / E2E testing         | Di luar scope MVP; diganti testing manual              |
| Halaman terpisah per proyek        | Modal cukup untuk detail proyek                        |
| Fitur pencarian konten             | Tidak diperlukan untuk skala ini                       |
| Analytics (Google Analytics, dll.) | Bisa ditambahkan di iterasi berikutnya                 |
| PWA / offline mode                 | Di luar scope MVP                                      |
| Real-time chat                     | Digantikan form kontak statis                          |

### 6.3 Asumsi

- Pemilik sudah memiliki akun Firebase (tier gratis / Spark Plan)
- Pemilik sudah memiliki akun Vercel
- Semua konten (teks bio, deskripsi proyek, foto) disediakan oleh pemilik
- Domain kustom bersifat opsional; deployment default ke `*.vercel.app`

---

## 7. Arsitektur & Tech Stack

### 7.1 Gambaran Arsitektur

```
┌─────────────────────────────────────────────────────┐
│                    Browser (Client)                  │
│                                                      │
│  ┌──────────────┐    ┌──────────────────────────┐   │
│  │  SidebarNav  │    │      Content Area         │   │
│  │  (desktop)   │    │  (CSR: section berganti)  │   │
│  │              │    │                           │   │
│  │  BottomNav   │    │  HeroSection              │   │
│  │  (mobile)    │    │  AboutSection             │   │
│  │              │    │  ExperienceSection   ...  │   │
│  │  MobileDrawer│    │                           │   │
│  │  (slide-up)  │    │                           │   │
│  └──────────────┘    └──────────────────────────┘   │
└─────────────────────────────────────────────────────┘
              │ fetch (Next.js API Routes)
              ▼
┌─────────────────────────────────────────────────────┐
│               Next.js API Routes (Server)            │
│                                                      │
│   POST /api/contact      GET /api/testimonials       │
└─────────────────────────────────────────────────────┘
              │ Firebase Admin SDK
              ▼
┌─────────────────────────────────────────────────────┐
│              Firebase (Google Cloud)                 │
│                                                      │
│   Firestore DB          Firebase Authentication      │
│   ├── messages          (Google OAuth - admin only)  │
│   └── testimonials                                   │
└─────────────────────────────────────────────────────┘
```

### 7.2 Tech Stack Detail

#### Frontend

| Teknologi    | Versi               | Peran                                |
| ------------ | ------------------- | ------------------------------------ |
| Next.js      | Latest (App Router) | Framework utama, routing, API routes |
| React        | via Next.js         | UI rendering                         |
| TypeScript   | Strict mode         | Type safety di seluruh codebase      |
| Tailwind CSS | Latest              | Utility-first styling                |

#### UI & Animasi

| Teknologi     | Peran                                                  |
| ------------- | ------------------------------------------------------ |
| Framer Motion | Animasi transisi antar section, animasi on-view        |
| Shadcn UI     | Komponen aksesibel (Button, Card, Dialog, Toast, dll.) |
| React Bits    | Komponen animasi interaktif (background effects, dll.) |
| Lucide React  | Set ikon konsisten untuk navigasi dan UI               |
| Iconify       | Set ikon luas untuk logo teknologi di Tech Stack       |

#### Backend & Database

| Teknologi               | Peran                                             |
| ----------------------- | ------------------------------------------------- |
| Next.js API Routes      | Server-side endpoint (contact form, testimonials) |
| Firebase Firestore      | Database pesan kontak & testimoni                 |
| Firebase Authentication | Autentikasi admin via Google OAuth                |
| Firebase Admin SDK      | Akses Firestore dari server-side secara aman      |

#### DevOps & Tools

| Teknologi    | Peran                              |
| ------------ | ---------------------------------- |
| Vercel       | Hosting, CI/CD, edge deployment    |
| Git + GitHub | Version control, source of truth   |
| Postman      | Testing API endpoint secara manual |

---

## 8. Navigasi & Layout

### 8.1 Model Navigasi

Website menggunakan **Client Side Rendering (CSR) Navigation**:

- Satu `activeSection` state dikontrol di `AppShell.tsx`
- Klik menu → `setActive(key)` → section lama unmount → section baru mount
- Transisi antar section menggunakan `AnimatePresence` dari Framer Motion (`mode="wait"`)
- **Tidak ada scroll** antar section; setiap section mengisi penuh area konten
- State `activeSection` disimpan ke `sessionStorage` agar tidak reset saat refresh halaman

### 8.2 Layout Desktop (≥ 1024px)

```
┌──────────┬────────────────────────────────────┐
│          │                                    │
│  Sidebar │        Area Konten Utama           │
│  (w-64)  │        (flex-1, overflow-y-auto)   │
│          │                                    │
│ [Avatar] │   ┌────────────────────────────┐  │
│ [Nama]   │   │                            │  │
│ [Role]   │   │   <ActiveSection />        │  │
│──────────│   │   (berubah via CSR)        │  │
│ 🏠 Home  │   │                            │  │
│ 👤 About │   └────────────────────────────┘  │
│ 💼 Exp.  │                                    │
│ 🚀 Proj. │                                    │
│ 🧰 Stack │                                    │
│ 💬 Testi.│                                    │
│ 📖 Story │                                    │
│ 📬 Cont. │                                    │
│──────────│                                    │
│ 🌙 [GH]  │                                    │
└──────────┴────────────────────────────────────┘
```

**Spesifikasi Sidebar:**

- Posisi: `fixed left-0 top-0 h-full`, lebar `w-64`
- Konten dari atas ke bawah: avatar + nama + role → daftar 8 nav link → divider → theme toggle + ikon sosial media
- Link aktif: background highlight warna `primary-500`, teks tebal
- Link non-aktif: teks muted, hover dengan background ringan
- Hanya tampil di breakpoint `lg` ke atas (`hidden lg:flex flex-col`)

### 8.3 Layout Mobile (< 1024px)

```
┌───────────────────────────────────┐
│                                   │
│        Area Konten Utama          │
│        (full width,               │
│         padding-bottom: 4rem)     │
│                                   │
│   <ActiveSection />               │
│   (berubah via CSR)               │
│                                   │
│                                   │
├───────────────────────────────────┤
│  🏠      🚀       📬      ☰      │  ← Bottom Nav (h-16, fixed bottom)
│ Home  Projects  Contact   More    │
└───────────────────────────────────┘
```

**Spesifikasi Bottom Nav:**

- Posisi: `fixed bottom-0 left-0 right-0`, tinggi `h-16`
- Background: surface color + `backdrop-blur`
- Border atas: tipis, warna muted
- Berisi **3 menu utama** + **1 tombol hamburger** di pojok kanan
- 3 menu default: **Home**, **Projects**, **Contact**
- Tiap item: ikon Lucide di atas + label teks kecil di bawah
- Item aktif: warna `primary-500`
- Hanya tampil di breakpoint di bawah `lg` (`flex lg:hidden`)

### 8.4 Mobile Drawer (Menu Tambahan)

**Trigger:** Tombol hamburger `☰` di pojok kanan bottom nav

**Spesifikasi Drawer:**

- Tampilan: panel slide-up dari bawah layar
- Overlay: backdrop gelap `bg-black/50`, klik overlay = tutup
- Header drawer: label "Menu" di kiri + tombol `✕` di kanan
- Berisi 5 menu yang tidak tampil di bottom bar:
  - About, Experience, Tech Stack, Testimonials, Story
- Tiap item: ikon + label, ukuran lebih besar dari bottom nav (mudah di-tap)
- Klik item → navigasi ke section + drawer menutup otomatis

**Animasi Drawer:**

```
Buka:  y: 100% → y: 0, opacity: 0 → 1
Tutup: y: 0 → y: 100%, opacity: 1 → 0
Easing: spring (damping: 25, stiffness: 300)
```

### 8.5 Konfigurasi Nav Links

Ketiga menu yang tampil di bottom nav dapat dikonfigurasikan via properti `bottomNav: true` di `lib/constants.ts`. Default:

| Key            | Label        | Ikon          | Bottom Nav  |
| -------------- | ------------ | ------------- | ----------- |
| `home`         | Home         | House         | ✅          |
| `about`        | About        | User          | ❌ (drawer) |
| `experience`   | Experience   | Briefcase     | ❌ (drawer) |
| `projects`     | Projects     | FolderOpen    | ✅          |
| `tech-stack`   | Tech Stack   | Layers        | ❌ (drawer) |
| `testimonials` | Testimonials | MessageSquare | ❌ (drawer) |
| `story`        | Story        | BookOpen      | ❌ (drawer) |
| `contact`      | Contact      | Mail          | ✅          |

---

## 9. Fitur & Spesifikasi Fungsional

### 9.1 FR-01 — Home (Hero Section)

**Prioritas:** P0 (Must Have)

**Deskripsi:** Section pertama yang dilihat pengunjung saat membuka website. Berfungsi sebagai "halaman sampul" yang memperkenalkan pemilik secara ringkas.

**Elemen yang harus ada:**

- Nama lengkap pemilik (heading H1)
- Tagline / posisi (contoh: "Full Stack Developer | Firebase Enthusiast")
- Deskripsi singkat 1-2 kalimat tentang spesialisasi dan nilai yang ditawarkan
- Tombol CTA Primer: **"Lihat Proyek"** → memanggil `setActive('projects')`
- Tombol CTA Sekunder: **"Hubungi Saya"** → memanggil `setActive('contact')`
- Elemen visual animasi background (React Bits: particle, gradient, atau mesh)
- Foto profil atau ilustrasi (opsional, posisi kanan di desktop)

**Animasi:**

- Teks muncul dengan efek stagger (nama dulu, lalu tagline, lalu deskripsi, lalu tombol)
- Setiap elemen: `opacity: 0 → 1` + `y: 20 → 0` dengan delay bertahap
- Background animasi berjalan secara looping

**Acceptance Criteria:**

- [ ] Nama, tagline, dan deskripsi tampil jelas dan terbaca
- [ ] Tombol "Lihat Proyek" membawa pengguna ke section Projects
- [ ] Tombol "Hubungi Saya" membawa pengguna ke section Contact
- [ ] Animasi berjalan mulus tanpa frame drop
- [ ] Tampilan responsif di semua breakpoint

---

### 9.2 FR-02 — About

**Prioritas:** P0 (Must Have)

**Deskripsi:** Memperkenalkan pemilik secara personal dan profesional. Memberikan konteks kepada pengunjung tentang siapa pemilik di luar proyek dan CV.

**Elemen yang harus ada:**

- Foto profil berbentuk bulat dengan efek border/animasi
- Bio dalam 2-3 paragraf (latar belakang, passion, nilai yang dipegang)
- Fakta singkat dalam kartu kecil: lokasi, status pendidikan, bahasa, hobi
- Kartu pencapaian dengan angka (contoh: "10+ Proyek", "2+ Tahun Coding", "5+ Teknologi")
- Angka pencapaian dianimasikan (count-up saat elemen masuk viewport)

**Layout:**

- Desktop: 2 kolom (foto kiri 40%, teks kanan 60%)
- Mobile: 1 kolom (foto di atas, teks di bawah)

**Animasi:**

- Foto: slide-in dari kiri
- Teks: slide-in dari kanan
- Kartu pencapaian: fade-in + count-up animasi

**Acceptance Criteria:**

- [ ] Foto profil tampil dengan rasio aspek 1:1 (tidak terdistorsi)
- [ ] Teks bio terbaca dengan baik di semua ukuran layar
- [ ] Animasi count-up hanya berjalan sekali saat section pertama kali tampil
- [ ] Kartu fakta menampilkan informasi yang akurat

---

### 9.3 FR-03 — Experience

**Prioritas:** P0 (Must Have)

**Deskripsi:** Menampilkan riwayat pengalaman kerja, magang, dan organisasi dalam format timeline yang mudah di-scan.

**Elemen yang harus ada:**

- Timeline vertikal dengan garis penghubung di tengah (desktop) atau kiri (mobile)
- Filter tab di atas: "Semua" | "Kerja" | "Organisasi" | "Pendidikan"
- Tiap item timeline berisi:
  - Logo perusahaan/organisasi (opsional; fallback ke ikon default jika tidak ada)
  - Nama perusahaan / organisasi
  - Posisi / jabatan
  - Periode (format: "Bulan Tahun – Bulan Tahun" atau "– Sekarang")
  - Deskripsi tugas dan pencapaian (1-3 poin atau paragraf)
  - Badge teknologi yang digunakan (opsional)

**Data source:** File statis `data/experiences.ts`

**TypeScript Interface:**

```typescript
interface Experience {
  id: string
  type: 'work' | 'organization' | 'education'
  company: string
  position: string
  period: string
  description: string
  logo?: string
  technologies?: string[]
}
```

**Behavior Filter:**

- Default: "Semua" (semua tipe tampil)
- Klik tab → filter list secara instan (tanpa loading)
- Transisi filter: `AnimatePresence` + stagger animasi

**Animasi:**

- Item timeline muncul satu per satu dari atas (stagger 100ms per item)
- Muncul saat section pertama kali dirender (bukan scroll-based)

**Acceptance Criteria:**

- [ ] Semua item pengalaman tampil dengan benar dalam urutan kronologis terbaru di atas
- [ ] Filter berfungsi dengan benar untuk ketiga tipe
- [ ] Garis timeline terhubung antar item
- [ ] Tampilan rapi di mobile (timeline pindah ke sisi kiri)

---

### 9.4 FR-04 — Projects

**Prioritas:** P0 (Must Have)

**Deskripsi:** Etalase utama karya pemilik. Menampilkan proyek-proyek terbaik dalam bentuk grid card yang bisa difilter.

**Elemen yang harus ada:**

- Filter pill/chip di atas: "Semua" | "Web" | "Mobile" | "API" | "Lainnya"
- Grid card proyek (3 kolom desktop, 2 kolom tablet, 1 kolom mobile)
- Tiap card berisi:
  - Thumbnail / screenshot proyek
  - Badge kategori
  - Nama proyek
  - Deskripsi singkat (maks. 2 baris, truncate jika lebih)
  - Badge tech stack yang digunakan
  - Tombol link: GitHub (ikon) dan Live Demo (ikon) — opsional jika tidak ada
- Klik card → buka modal detail proyek (Shadcn Dialog)
- Modal berisi: deskripsi panjang, semua tech stack, gambar, link lengkap

**Data source:** File statis `data/projects.ts`

**TypeScript Interface:**

```typescript
interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  category: 'web' | 'mobile' | 'api' | 'other'
  thumbnail: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  year: number
}
```

**Behavior:**

- Proyek dengan `featured: true` selalu tampil pertama dalam grid
- Filter tidak mereset sorting (featured tetap di atas)
- Tombol GitHub/Live Demo di card membuka tab baru (`target="_blank"`)
- Jika `githubUrl` atau `liveUrl` kosong, tombol tersebut tidak tampil

**Animasi:**

- Saat filter berubah: card lama keluar, card baru masuk dengan `AnimatePresence`
- Card hover: translate-y ke atas + box-shadow lebih dalam

**Acceptance Criteria:**

- [ ] Semua proyek tampil dengan thumbnail yang benar
- [ ] Filter berfungsi untuk semua kategori
- [ ] Modal detail terbuka saat card diklik
- [ ] Link GitHub dan Live Demo membuka tab baru
- [ ] Grid responsif di semua breakpoint

---

### 9.5 FR-05 — Tech Stack

**Prioritas:** P1 (Should Have)

**Deskripsi:** Menampilkan semua teknologi yang dikuasai pemilik dalam tampilan visual yang terorganisir per kategori.

**Elemen yang harus ada:**

- 7 kategori teknologi, masing-masing punya heading dan grid ikon:
  1. Frontend
  2. Backend
  3. Database
  4. Tools & DevOps
  5. Libraries & Components
  6. Authentication & Cloud
  7. Icons & Assets
- Tiap item teknologi: ikon berwarna (Iconify) + nama teknologi
- Badge level (Beginner / Intermediate / Advanced) — opsional, ditampilkan jika ada
- Tooltip muncul saat hover (menampilkan nama teknologi jika ikon sudah jelas)

**Data source:** File statis `data/techstack.ts`

**Daftar teknologi per kategori:**

| Kategori               | Teknologi                                            |
| ---------------------- | ---------------------------------------------------- |
| Frontend               | Next.js, React, TypeScript, Tailwind CSS, React Bits |
| Backend                | Node.js, Express.js, REST API                        |
| Database               | Firebase Firestore                                   |
| Tools & DevOps         | Git, GitHub, Postman, Vercel                         |
| Libraries & Components | React Bits, Shadcn UI, Framer Motion                 |
| Authentication & Cloud | Firebase Authentication, Google OAuth                |
| Icons & Assets         | Iconify, Lucide React                                |

**Animasi:**

- Ikon hover: `scale(1.1)` + glow effect sesuai warna brand teknologi
- Saat section tampil: ikon muncul bergelombang (wave stagger dari kiri ke kanan)

**Acceptance Criteria:**

- [ ] Semua teknologi tampil dengan ikon yang benar
- [ ] Pengelompokan per kategori jelas dan rapi
- [ ] Animasi hover berjalan di semua ikon
- [ ] Nama teknologi terbaca (tidak tertutup ikon)

---

### 9.6 FR-06 — Testimonials

**Prioritas:** P1 (Should Have)

**Deskripsi:** Membangun kepercayaan pengunjung melalui pernyataan positif dari kolega, mentor, atau klien yang pernah bekerja sama dengan pemilik.

**Elemen yang harus ada:**

- Carousel atau masonry grid testimoni
- Tiap card testimoni berisi:
  - Avatar / foto (fallback ke inisial nama jika tidak ada foto)
  - Nama lengkap
  - Posisi dan hubungan dengan pemilik (contoh: "Senior Dev di PT XYZ — Mentor")
  - Teks testimoni (maks. 3-4 baris, truncate dengan "Baca selengkapnya" jika lebih panjang)
  - Rating bintang 1-5 (opsional)
  - Tanggal / periode (opsional)

**Data source:** Firestore collection `testimonials` (dengan fallback ke `data/testimonials.ts` jika gagal fetch)

**TypeScript Interface:**

```typescript
interface Testimonial {
  id: string
  name: string
  position: string
  relationship: string
  avatar?: string
  text: string
  rating?: number
  date?: string
}
```

**Behavior Carousel:**

- Auto-play setiap 5 detik
- Pause saat hover / fokus
- Tombol navigasi kiri-kanan (prev/next)
- Indikator dot di bawah (menunjukkan posisi saat ini)
- Infinite loop

**Data fetching:**

- Fetch dari `/api/testimonials` saat section pertama kali di-render
- Tampilkan skeleton loading selama fetch
- Jika fetch gagal → gunakan data statis dari `data/testimonials.ts`

**Acceptance Criteria:**

- [ ] Testimoni tampil dari Firestore atau data statis sebagai fallback
- [ ] Auto-play berjalan dan pause saat hover
- [ ] Navigasi prev/next berfungsi
- [ ] Skeleton loading tampil saat data sedang dimuat
- [ ] Avatar fallback ke inisial jika foto tidak tersedia

---

### 9.7 FR-07 — Story

**Prioritas:** P2 (Nice to Have)

**Deskripsi:** Narasi perjalanan personal pemilik dari awal ketertarikan pada teknologi hingga kondisi saat ini. Berbeda dari Experience (CV), Story bersifat lebih personal dan bercerita.

**Elemen yang harus ada:**

- Timeline naratif vertikal
- Tiap milestone berisi:
  - Tahun atau periode
  - Emoji / ikon yang mewakili momen
  - Judul momen (singkat, 3-6 kata)
  - Cerita (1-3 paragraf, bahasa santai dan manusiawi)
- Milestone penting (`highlight: true`) tampil lebih menonjol (ukuran lebih besar atau warna berbeda)

**Data source:** File statis `data/story.ts`

**TypeScript Interface:**

```typescript
interface StoryMilestone {
  id: string
  year: string
  title: string
  description: string
  icon?: string
  highlight?: boolean
}
```

**Contoh konten yang bisa dimasukkan:**

- Pertama kali menulis kode dan perasaannya
- Proyek pertama yang "benar-benar jadi"
- Momen gagal yang menjadi pelajaran penting
- Bergabung komunitas atau organisasi teknologi
- Pertama kali berkontribusi ke open source
- Pencapaian yang paling dibanggakan
- Visi dan rencana ke depan

**Animasi:**

- Tiap milestone reveal saat masuk viewport (dalam konteks CSR, di-trigger saat section ini di-mount dan elemen terlihat)
- Efek: `opacity: 0 → 1` + `x: -20 → 0` dengan stagger

**Acceptance Criteria:**

- [ ] Semua milestone tampil dalam urutan kronologis
- [ ] Milestone highlighted tampil lebih menonjol
- [ ] Animasi reveal berjalan smooth
- [ ] Teks cerita mudah dibaca (line-height cukup, font-size sesuai)

---

### 9.8 FR-08 — Contact

**Prioritas:** P0 (Must Have)

**Deskripsi:** Gerbang utama bagi pengunjung untuk menghubungi pemilik. Form kontak yang fungsional dan validasi yang baik adalah kunci dari section ini.

**Elemen yang harus ada:**

- Form kontak dengan field:
  - **Nama** (text input, required)
  - **Email** (email input, required)
  - **Subject** (text input, required)
  - **Pesan** (textarea, required, min. 10 karakter)
  - Tombol **"Kirim Pesan"** dengan loading state
- Info kontak alternatif (di samping/bawah form):
  - Alamat email langsung
  - Link profil LinkedIn
  - Link profil GitHub
  - Link Instagram (opsional)
  - Lokasi (kota, negara)
- Toast notifikasi: sukses (hijau) atau gagal (merah) setelah submit

**Behavior Form:**

| Kondisi                     | Tampilan                                |
| --------------------------- | --------------------------------------- |
| Field kosong dan klik kirim | Pesan error merah di bawah field        |
| Format email salah          | Pesan error: "Format email tidak valid" |
| Sedang mengirim             | Tombol disabled + spinner loading       |
| Berhasil terkirim           | Toast sukses + form direset             |
| Gagal terkirim (error API)  | Toast error + form tidak direset        |

**Validasi Client-side:**

- Nama: min. 2 karakter
- Email: format valid (regex standar)
- Subject: min. 3 karakter
- Pesan: min. 10 karakter

**Validasi Server-side (API Route):**

- Semua field wajib harus ada
- Email harus valid (re-validasi di server)
- Rate limiting: maks. 3 pesan per IP per jam (implementasi sederhana via Firestore timestamp check)

**API Flow:**

```
User submit form
      ↓
Client-side validation
      ↓ (valid)
POST /api/contact
      ↓
Server validation + simpan ke Firestore collection 'messages'
      ↓
Response { success: true/false, message: string }
      ↓
Toast notification + reset form (jika sukses)
```

**Acceptance Criteria:**

- [ ] Semua validasi client-side berjalan sebelum request dikirim
- [ ] Tombol kirim menampilkan loading spinner selama proses
- [ ] Pesan tersimpan di Firestore setelah submit berhasil
- [ ] Toast sukses/gagal muncul dengan feedback yang jelas
- [ ] Form direset setelah submit berhasil
- [ ] Link sosial media dapat diklik dan membuka tab baru

---

### 9.9 FR-09 — Dark Mode

**Prioritas:** P1 (Should Have)

**Deskripsi:** Toggle antara mode terang dan gelap untuk kenyamanan pengguna.

**Implementasi:**

- Tailwind `darkMode: 'class'`
- Preferensi disimpan di `localStorage` dengan key `'theme'`
- Default: mengikuti `prefers-color-scheme` sistem
- Toggle button tersedia di: sidebar (desktop) dan di dalam drawer (mobile)

**Acceptance Criteria:**

- [ ] Toggle berfungsi dan mengubah tema secara instan
- [ ] Preferensi tersimpan dan diingat saat refresh halaman
- [ ] Semua komponen memiliki varian dark mode yang konsisten
- [ ] Tidak ada flash of unstyled content (FOUC) saat halaman dimuat

---

## 10. Spesifikasi Non-Fungsional

### 10.1 Performa

| Metrik                         | Target      | Metode Pengukuran             |
| ------------------------------ | ----------- | ----------------------------- |
| Lighthouse Performance Score   | ≥ 90        | Lighthouse di Chrome DevTools |
| First Contentful Paint (FCP)   | < 1.5 detik | Lighthouse                    |
| Largest Contentful Paint (LCP) | < 2.5 detik | Lighthouse                    |
| Cumulative Layout Shift (CLS)  | < 0.1       | Lighthouse                    |
| Time to Interactive (TTI)      | < 3 detik   | Lighthouse                    |
| Perpindahan section (CSR)      | < 300ms     | Observasi manual              |

**Strategi untuk mencapai target:**

- `next/image` untuk optimasi gambar otomatis (WebP, lazy load, size hints)
- `next/font` untuk font tanpa layout shift
- Lazy load komponen berat dengan `dynamic()` Next.js
- Animasi hanya menggunakan properti `transform` dan `opacity` (tidak layout properties)
- Firebase hanya diinisialisasi sekali via singleton pattern
- Gambar disimpan statis di `public/` (tidak ada latency dari storage cloud)

### 10.2 Responsivitas

| Breakpoint | Nama                             | Lebar          | Navigasi            |
| ---------- | -------------------------------- | -------------- | ------------------- |
| `sm`       | Mobile kecil                     | 320px – 639px  | Bottom nav + drawer |
| `md`       | Mobile besar / Tablet portrait   | 640px – 767px  | Bottom nav + drawer |
| `lg`       | Tablet landscape / Desktop kecil | 768px – 1023px | Bottom nav + drawer |
| `xl`       | Desktop                          | 1024px+        | Sidebar kiri        |

> **Catatan:** Breakpoint transisi sidebar ↔ bottom nav ada di `1024px` (Tailwind `lg`).

### 10.3 Browser Support

| Browser         | Versi Minimum |
| --------------- | ------------- |
| Google Chrome   | 90+           |
| Mozilla Firefox | 90+           |
| Safari          | 14+           |
| Microsoft Edge  | 90+           |

### 10.4 Ketersediaan (Availability)

- Target uptime: 99.9% (mengikuti SLA Vercel Hobby plan)
- Recovery dari error: komponen dengan error ditangani via React Error Boundary

---

## 11. Design System

### 11.1 Palet Warna

```
Primary (Sky Blue):
  50:  #f0f9ff  — background terang ringan
  500: #0ea5e9  — warna aksi utama (button, link aktif)
  600: #0284c7  — hover state
  900: #0c4a6e  — teks di dark mode

Accent (Indigo):
  DEFAULT: #6366f1  — highlight, badge, secondary action

Surface:
  light: #ffffff  — background utama light mode
  dark:  #0f172a  — background utama dark mode

Muted:
  light: #f1f5f9  — background card, sidebar light
  dark:  #1e293b  — background card, sidebar dark

Text:
  primary:   #0f172a (light) / #f8fafc (dark)
  secondary: #64748b (light) / #94a3b8 (dark)
  muted:     #94a3b8 (light) / #475569 (dark)
```

### 11.2 Tipografi

| Elemen       | Font          | Ukuran             | Berat          |
| ------------ | ------------- | ------------------ | -------------- |
| Heading H1   | Inter / Geist | 2.25rem – 3.75rem  | 700 (Bold)     |
| Heading H2   | Inter / Geist | 1.875rem – 2.25rem | 600 (Semibold) |
| Heading H3   | Inter / Geist | 1.25rem – 1.5rem   | 600 (Semibold) |
| Body text    | Inter         | 1rem               | 400 (Regular)  |
| Body small   | Inter         | 0.875rem           | 400 (Regular)  |
| Caption      | Inter         | 0.75rem            | 400 (Regular)  |
| Code / Badge | Geist Mono    | 0.875rem           | 400 (Regular)  |

### 11.3 Spacing & Radius

```
Spacing scale (mengikuti Tailwind default):
  4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px

Border radius:
  sm: 4px   — badge, input
  md: 8px   — card, button
  lg: 12px  — card besar, modal
  full: 9999px  — avatar, pill badge

Box shadow:
  sm:  0 1px 2px rgba(0,0,0,0.05)
  md:  0 4px 6px rgba(0,0,0,0.07)
  lg:  0 10px 15px rgba(0,0,0,0.10)
  card-hover: 0 20px 25px rgba(0,0,0,0.15)
```

### 11.4 Animasi Standar

| Nama               | Properti                      | Durasi | Easing                    |
| ------------------ | ----------------------------- | ------ | ------------------------- |
| Fade in            | opacity: 0 → 1                | 300ms  | ease-out                  |
| Slide up           | y: 20 → 0 + fade              | 350ms  | ease-out                  |
| Slide in left      | x: -20 → 0 + fade             | 350ms  | ease-out                  |
| Section transition | opacity + y (AnimatePresence) | 250ms  | ease-in-out               |
| Stagger delay      | 100ms per anak                | —      | —                         |
| Card hover lift    | translateY(-4px)              | 200ms  | ease-out                  |
| Drawer slide up    | y: 100% → 0                   | spring | damping:25, stiffness:300 |

### 11.5 Komponen Shadcn yang Digunakan

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
npx shadcn@latest add skeleton
npx shadcn@latest add tabs
```

---

## 12. Spesifikasi API

### 12.1 POST /api/contact

**Deskripsi:** Menerima pesan dari form kontak dan menyimpannya ke Firestore.

**Request:**

```
Method:       POST
Content-Type: application/json
```

```json
{
  "name": "string (required, min 2 char)",
  "email": "string (required, valid email format)",
  "subject": "string (required, min 3 char)",
  "message": "string (required, min 10 char)"
}
```

**Response Sukses (200):**

```json
{
  "success": true,
  "message": "Pesan kamu berhasil terkirim! Saya akan membalas secepatnya."
}
```

**Response Error Validasi (400):**

```json
{
  "success": false,
  "message": "Data tidak valid.",
  "errors": {
    "email": "Format email tidak valid",
    "message": "Pesan minimal 10 karakter"
  }
}
```

**Response Error Server (500):**

```json
{
  "success": false,
  "message": "Terjadi kesalahan. Silakan coba lagi atau hubungi langsung via email."
}
```

**Data yang disimpan ke Firestore (`messages` collection):**

```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string",
  "createdAt": "Timestamp (Firestore)",
  "read": false,
  "ipHash": "string (hash dari IP, untuk rate limiting)"
}
```

---

### 12.2 GET /api/testimonials

**Deskripsi:** Mengambil daftar testimoni dari Firestore.

**Request:**

```
Method: GET
```

**Response Sukses (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "position": "string",
      "relationship": "string",
      "avatar": "string (URL) | null",
      "text": "string",
      "rating": "number (1-5) | null",
      "date": "string | null"
    }
  ]
}
```

**Response Error (500):**

```json
{
  "success": false,
  "message": "Gagal mengambil data testimoni."
}
```

> **Catatan:** Jika API ini gagal, client harus fallback ke data statis di `data/testimonials.ts` tanpa menampilkan error ke pengguna.

---

## 13. Database Schema

### 13.1 Collection: `messages`

| Field       | Tipe      | Required | Deskripsi                               |
| ----------- | --------- | -------- | --------------------------------------- |
| `name`      | string    | ✅       | Nama pengirim                           |
| `email`     | string    | ✅       | Email pengirim                          |
| `subject`   | string    | ✅       | Subjek pesan                            |
| `message`   | string    | ✅       | Isi pesan                               |
| `createdAt` | Timestamp | ✅       | Waktu pesan dikirim (auto)              |
| `read`      | boolean   | ✅       | Status baca oleh admin (default: false) |
| `ipHash`    | string    | ❌       | Hash IP untuk rate limiting             |

**Akses:**

- `create`: semua pengguna (public)
- `read, update, delete`: hanya admin yang terautentikasi

---

### 13.2 Collection: `testimonials`

| Field          | Tipe   | Required | Deskripsi                                    |
| -------------- | ------ | -------- | -------------------------------------------- |
| `name`         | string | ✅       | Nama pemberi testimoni                       |
| `position`     | string | ✅       | Posisi/jabatan                               |
| `relationship` | string | ✅       | Hubungan dengan pemilik                      |
| `text`         | string | ✅       | Isi testimoni                                |
| `avatar`       | string | ❌       | URL foto (dari `public/` atau URL eksternal) |
| `rating`       | number | ❌       | Rating 1-5                                   |
| `date`         | string | ❌       | Tanggal atau periode                         |
| `order`        | number | ❌       | Urutan tampil (ascending)                    |

**Akses:**

- `read`: semua pengguna (public)
- `write (create, update, delete)`: hanya admin yang terautentikasi

---

### 13.3 Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper function: cek apakah pengguna adalah admin
    function isAdmin() {
      return request.auth != null
        && request.auth.token.email == 'YOUR_ADMIN_EMAIL@gmail.com';
    }

    // Collection: messages
    // - Siapapun bisa membuat pesan (form kontak)
    // - Hanya admin yang bisa membaca, mengupdate, atau menghapus
    match /messages/{docId} {
      allow create: if request.resource.data.keys()
        .hasAll(['name', 'email', 'subject', 'message', 'createdAt', 'read'])
        && request.resource.data.name is string
        && request.resource.data.email is string
        && request.resource.data.message.size() >= 10;
      allow read, update, delete: if isAdmin();
    }

    // Collection: testimonials
    // - Semua pengguna bisa membaca
    // - Hanya admin yang bisa menulis
    match /testimonials/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

---

## 14. Keamanan

### 14.1 Perlindungan API

| Ancaman                             | Mitigasi                                                                   |
| ----------------------------------- | -------------------------------------------------------------------------- |
| Spam form kontak                    | Rate limiting berbasis IP hash (maks. 3 pesan/jam/IP) di API route         |
| Injeksi script (XSS)                | React secara default meng-escape HTML; tidak ada `dangerouslySetInnerHTML` |
| Akses tidak sah ke Firestore        | Firestore Security Rules membatasi akses sesuai role                       |
| Kebocoran kredensial Firebase Admin | Env vars server-only (tidak ada prefix `NEXT_PUBLIC_`)                     |
| CSRF                                | Next.js API Routes hanya menerima `Content-Type: application/json`         |

### 14.2 Environment Variables

- Semua kredensial sensitif disimpan di `.env.local` (tidak di-commit ke Git)
- Firebase Client SDK keys (`NEXT_PUBLIC_*`) boleh terekspos ke client (by design Firebase)
- Firebase Admin SDK keys (`FIREBASE_*`) hanya tersedia di server (tidak ada prefix `NEXT_PUBLIC_`)
- File `.env.local` wajib ada di `.gitignore`
- File `.env.example` (tanpa nilai) di-commit sebagai template

### 14.3 Dependency Security

- Gunakan `npm audit` secara berkala untuk mengecek vulnerability
- Batasi dependency — hanya install library yang benar-benar dibutuhkan
- Hindari library yang tidak aktif dirawat (last update > 2 tahun)

---

## 15. Aksesibilitas

Target: **WCAG 2.1 Level AA**

### 15.1 Checklist Aksesibilitas

| Area            | Requirement                                                                            |
| --------------- | -------------------------------------------------------------------------------------- |
| Gambar          | Semua `<img>` dan `next/image` harus punya `alt` yang deskriptif                       |
| Semantik HTML   | Gunakan `<main>`, `<nav>`, `<section>`, `<article>`, `<header>`, `<footer>`            |
| ARIA            | Tiap section punya `aria-label`; navigasi punya `aria-current="page"` untuk item aktif |
| Form            | Setiap `<input>` dan `<textarea>` punya `<label>` yang terhubung via `htmlFor`         |
| Kontras warna   | Rasio kontras teks ≥ 4.5:1 (WCAG AA) untuk semua kombinasi warna                       |
| Keyboard nav    | Seluruh interaksi (navigasi, form, modal, drawer) bisa dilakukan tanpa mouse           |
| Focus indicator | Outline focus terlihat jelas pada semua elemen interaktif                              |
| Motion          | Hormati `prefers-reduced-motion`: matikan animasi jika pengguna memilih ini            |
| Screen reader   | Drawer dan modal menggunakan `role="dialog"` dan `aria-modal="true"`                   |
| Tab order       | Urutan tab logis mengikuti alur visual; tidak ada "tab trap" yang tidak disengaja      |

---

## 16. SEO & Metadata

### 16.1 Meta Tags

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: '[Nama Kamu] | Full Stack Developer',
  description:
    'Portfolio [Nama Kamu] — Full Stack Developer spesialisasi Next.js, React, TypeScript, dan Firebase. Lihat proyek, pengalaman, dan hubungi saya.',
  keywords: [
    'portfolio',
    'developer',
    'full stack',
    'next.js',
    'react',
    'typescript',
    'firebase',
    'web development',
    '[kota kamu]',
  ],
  authors: [{name: '[Nama Kamu]'}],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    title: '[Nama Kamu] | Full Stack Developer',
    description: 'Portfolio [Nama Kamu] ...',
    images: [{url: '/images/og-image.jpg', width: 1200, height: 630}],
    siteName: '[Nama Kamu] Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: '[Nama Kamu] | Full Stack Developer',
    description: '...',
    images: ['/images/og-image.jpg'],
  },
}
```

### 16.2 Teknis SEO

| Item            | Implementasi                                |
| --------------- | ------------------------------------------- |
| Canonical URL   | Tag `<link rel="canonical">` di root layout |
| Favicon         | `/public/favicon.ico` + variasi ukuran      |
| OG Image        | `/public/images/og-image.jpg` (1200×630px)  |
| Sitemap         | `/app/sitemap.ts` (Next.js built-in)        |
| robots.txt      | `/public/robots.txt`                        |
| Structured Data | JSON-LD untuk Person schema di `<head>`     |

### 16.3 JSON-LD Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "[Nama Kamu]",
  "jobTitle": "Full Stack Developer",
  "url": "https://yourwebsite.vercel.app",
  "sameAs": ["https://github.com/username", "https://linkedin.com/in/username"],
  "knowsAbout": ["Next.js", "React", "TypeScript", "Firebase"]
}
```

> **Catatan SEO untuk SPA:** Karena website ini CSR, konten section tidak di-index oleh crawler secara default. Namun karena hanya satu halaman (`/`), SEO tetap optimal — semua metadata ada di `<head>` dan halaman utama ter-render dengan benar oleh Next.js.

---

## 17. Kriteria Penerimaan (Acceptance Criteria)

### 17.1 Navigasi

- [ ] **AC-N01:** Klik menu apapun di sidebar (desktop) mengubah konten area utama tanpa reload halaman
- [ ] **AC-N02:** Klik menu di bottom nav (mobile) mengubah konten dengan animasi transisi
- [ ] **AC-N03:** Klik tombol hamburger membuka drawer yang berisi 5 menu tambahan
- [ ] **AC-N04:** Klik item di drawer menutup drawer dan berpindah ke section tersebut
- [ ] **AC-N05:** Klik area overlay di luar drawer menutup drawer
- [ ] **AC-N06:** Refresh halaman mempertahankan section yang sedang aktif (via sessionStorage)
- [ ] **AC-N07:** Menu aktif memiliki visual highlight yang jelas di sidebar maupun bottom nav

### 17.2 Fungsionalitas

- [ ] **AC-F01:** Form kontak menerima input dan mengirim data ke Firestore setelah submit valid
- [ ] **AC-F02:** Validasi error muncul di bawah field yang bermasalah sebelum data dikirim
- [ ] **AC-F03:** Toast sukses muncul dan form direset setelah submit berhasil
- [ ] **AC-F04:** Toast error muncul dan form tidak direset jika submit gagal
- [ ] **AC-F05:** Filter proyek menampilkan hanya proyek kategori yang dipilih
- [ ] **AC-F06:** Modal detail proyek terbuka saat card proyek diklik
- [ ] **AC-F07:** Dark mode toggle mengubah tema dan menyimpan preferensi ke localStorage
- [ ] **AC-F08:** Testimoni tampil dari Firestore; jika gagal, tampil dari data statis

### 17.3 Tampilan & Responsivitas

- [ ] **AC-R01:** Sidebar tampil di kiri layar pada viewport ≥ 1024px
- [ ] **AC-R02:** Bottom nav tampil di bawah layar pada viewport < 1024px
- [ ] **AC-R03:** Konten tidak tertutup sidebar (desktop) atau bottom nav (mobile)
- [ ] **AC-R04:** Semua section tampil rapi di lebar 320px (mobile minimum)
- [ ] **AC-R05:** Grid proyek berubah dari 1 → 2 → 3 kolom sesuai breakpoint

### 17.4 Performa

- [ ] **AC-P01:** Lighthouse Performance score ≥ 90
- [ ] **AC-P02:** Lighthouse Accessibility score ≥ 90
- [ ] **AC-P03:** Lighthouse SEO score ≥ 90
- [ ] **AC-P04:** Lighthouse Best Practices score ≥ 90
- [ ] **AC-P05:** Tidak ada error atau warning di browser console saat production build

### 17.5 Browser

- [ ] **AC-B01:** Tampil dan berfungsi dengan benar di Chrome 90+
- [ ] **AC-B02:** Tampil dan berfungsi dengan benar di Firefox 90+
- [ ] **AC-B03:** Tampil dan berfungsi dengan benar di Safari 14+
- [ ] **AC-B04:** Tampil dan berfungsi dengan benar di Edge 90+

---

## 18. Risiko & Mitigasi

| #    | Risiko                                                  | Probabilitas  | Dampak        | Mitigasi                                                                             |
| ---- | ------------------------------------------------------- | ------------- | ------------- | ------------------------------------------------------------------------------------ |
| R-01 | Firebase Firestore quota habis (free tier)              | Rendah        | Sedang        | Monitor usage; form kontak gagal gracefully dengan pesan yang jelas                  |
| R-02 | API `/api/contact` mengalami spam                       | Sedang        | Sedang        | Rate limiting berbasis IP hash; field honeypot tersembunyi (anti-bot)                |
| R-03 | Animasi menyebabkan performa buruk di perangkat lama    | Rendah        | Sedang        | Hormati `prefers-reduced-motion`; gunakan hanya `transform`/`opacity`                |
| R-04 | Gambar tidak dioptimasi menyebabkan LCP tinggi          | Sedang        | Tinggi        | Wajib gunakan `next/image`; kompres gambar sebelum dimasukkan ke `public/`           |
| R-05 | Konten tidak terupdate mudah (hard-coded di data files) | Sedang        | Rendah        | Dokumen jelas tentang di mana mengedit konten; pertimbangkan CMS di versi berikutnya |
| R-06 | Cross-browser inconsistency pada animasi                | Rendah        | Rendah        | Test di semua browser target sebelum release                                         |
| R-07 | Kredensial Firebase Admin bocor via env vars            | Sangat Rendah | Sangat Tinggi | Tidak pernah prefix FIREBASE*\* dengan NEXT_PUBLIC*; audit .gitignore                |

---

## 19. Rencana Rilis

### 19.1 Fase Development

| Fase                     | Lingkup                                                                                                        | Estimasi |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- | -------- |
| **Fase 1 — Fondasi**     | Setup project (Next.js, TypeScript, Tailwind, Shadcn, Firebase), AppShell, SidebarNav, BottomNav, MobileDrawer | 2-3 hari |
| **Fase 2 — Section P0**  | Home, About, Experience, Contact (termasuk API + Firestore)                                                    | 3-4 hari |
| **Fase 3 — Section P1**  | Projects (dengan modal + filter), Tech Stack, Testimonials (dengan Firestore fetch)                            | 3-4 hari |
| **Fase 4 — Section P2**  | Story section                                                                                                  | 1-2 hari |
| **Fase 5 — Polish**      | Dark mode, animasi, responsivitas, aksesibilitas, SEO                                                          | 2-3 hari |
| **Fase 6 — QA & Deploy** | Testing manual, bug fixes, deploy ke Vercel                                                                    | 1-2 hari |

**Total estimasi: 12-18 hari kerja**

### 19.2 Checklist Pra-Rilis

**Konten:**

- [ ] Semua teks diganti dari placeholder ke konten asli
- [ ] Foto profil asli dimasukkan ke `public/images/avatar.jpg`
- [ ] Minimal 3 proyek dimasukkan ke `data/projects.ts` dengan thumbnail asli
- [ ] Data pengalaman diisi di `data/experiences.ts`
- [ ] Milestone cerita diisi di `data/story.ts`
- [ ] Minimal 2 testimoni tersedia (di Firestore atau `data/testimonials.ts`)
- [ ] Link sosial media (GitHub, LinkedIn) diperbarui di `lib/constants.ts`

**Teknis:**

- [ ] Semua env vars diisi di Vercel Dashboard
- [ ] Firestore Security Rules sudah di-deploy
- [ ] `og-image.jpg` sudah dibuat (1200×630px)
- [ ] `favicon.ico` sudah diperbarui
- [ ] Admin email di Security Rules diperbarui
- [ ] Build production berhasil tanpa error (`npm run build`)
- [ ] Lighthouse score semua kategori ≥ 90

---

## 20. Glossary

| Istilah                | Definisi                                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **SPA**                | Single Page Application — website yang hanya memiliki satu halaman HTML; konten diperbarui secara dinamis via JavaScript |
| **CSR**                | Client Side Rendering — rendering konten dilakukan di browser (client), bukan di server                                  |
| **AppShell**           | Komponen wrapper utama yang mengelola layout (sidebar + konten) dan state navigasi aktif                                 |
| **Section**            | Satu "halaman" konten dalam website ini (Home, About, dst.) yang dirender secara bergantian                              |
| **activeSection**      | State yang menyimpan key section yang sedang ditampilkan saat ini                                                        |
| **AnimatePresence**    | Komponen Framer Motion yang memungkinkan animasi exit pada komponen React yang di-unmount                                |
| **Firestore**          | Database NoSQL berbasis dokumen milik Google Firebase (digunakan untuk pesan kontak dan testimoni)                       |
| **Firebase Admin SDK** | SDK Firebase untuk digunakan di server-side dengan hak akses penuh (bypasses security rules)                             |
| **Bottom Nav**         | Navigasi yang terletak di bagian bawah layar, umum digunakan di aplikasi mobile                                          |
| **Drawer**             | Panel yang slide masuk dari tepi layar, digunakan untuk menu tambahan di mobile                                          |
| **Lighthouse**         | Tool audit performa, aksesibilitas, SEO, dan best practices dari Google, terintegrasi di Chrome DevTools                 |
| **WCAG**               | Web Content Accessibility Guidelines — standar aksesibilitas web internasional                                           |
| **LCP**                | Largest Contentful Paint — metrik yang mengukur waktu render elemen terbesar di viewport                                 |
| **CLS**                | Cumulative Layout Shift — metrik yang mengukur stabilitas visual halaman                                                 |
| **P0/P1/P2**           | Tingkat prioritas fitur: P0 = Must Have, P1 = Should Have, P2 = Nice to Have                                             |
| **Greenfield**         | Proyek yang dibangun dari nol tanpa mewarisi kode atau infrastruktur yang sudah ada                                      |

---

_Dokumen ini bersifat living document dan akan diperbarui seiring perkembangan project. Setiap perubahan signifikan pada requirements harus tercermin di dokumen ini sebelum diimplementasikan._
