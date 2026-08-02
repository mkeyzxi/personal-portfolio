# 📑 Panduan Lengkap Isi, Struktur Data & Contoh Tampilan Setiap Menu (`menuku.md`)

> Dokumen ini merupakan katalog spesifik dan panduan ekstensif mengenai **apa saja yang dicetak dan ditampilkan oleh setiap menu (section)** dalam arsitektur website portofolio Monokrom Profesional **Muhammad Makbul N (@Mkeyzxi)**. Dilengkapi dengan bedahan komponen antarmuka (UI), struktur skema data dari **Firebase Firestore & Static Fallbacks**, serta contoh nyata output cetakan informasi pada layar.

---

## 🧭 Arsitektur Sistem Menu & Rendering
Website portofolio ini beroperasi sebagai **Single Page Application (SPA)** dengan metode **Client Side Rendering (CSR)** berdayakan `Next.js App Router`. Seluruh menu publik dikendalikan oleh komponen master `AppShell.tsx` melalui mekanisme sinkronisasi tiga arah (*Hash URL*, *sessionStorage*, dan *React State*).

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                   WEB PORTFOLIO CORE ENGINE (Next.js 16 App Router)                  │
└───────────┬──────────────────────────────────────────────────────────────┬───────────┘
            │                                                              │
            ▼                                                              ▼
┌───────────────────────────────┐                             ┌─────────────────────────┐
│     PUBLIK NAVIGATION (SPA)   │                             │  ADMIN & DETAIL PAGES   │
│   (AppShell CSR #section-key) │                             │   (SSR File-Based CSR)  │
└───────────┬───────────────────┘                             └────────────┬────────────┘
            │                                                              │
            ├─ 🏠 #home (Hero Section)                                     ├─ 🔐 /admin (CMS Dashboard)
            ├─ 👤 #about (Profile & Bio)                                   ├─ 📝 /admin/projects (BlockNote Editor)
            ├─ 💼 #experience (Career & Org)                               ├─ 📊 /admin/testimonials (Review Moderation)
            ├─ 🚀 #projects (Portfolio Grid)                               ├─ 🔍 /projects/[id] (Deep-Dive Reader)
            ├─ 🧰 #tech-stack (Skills & Tools)                             └─ 💬 /testimonials (Full Reviews)
            ├─ 💬 #testimonials (Client Feedback)
            ├─ 📖 #story / #journey (Life Milestones)
            └─ 📬 #contact (Form & Social Links)
```

Setiap menu dimuat secara nirkabel (*Lazy Loading* & *Dynamic Import*) dengan dukungan *Suspense Boundaries*, yang menampilkan komponen *Skeleton Loader* bertema monokrom jika data sedang diambil dari jaringan.

---

## 1. 🏠 Menu Home (`#home`) — Hero Section

Menu awal yang langsung menyambut penonton saat situs diakses. Menu ini dirancang untuk menciptakan kesan pertama yang sangat kuat (*First Impression WOW Factor*) dengan mengandalkan kontras tipografi berkelas, animasi teks bercahaya, dan latar belakang partikel geometri kontemplatif.

### 🎨 Elemen UI & Komponen yang Dicetak
1. **Status Badge Aktif (`ShinyText`)**: Kapsul melingkar di atas judul dengan animasi kilau cahaya berjalan ke kiri, menandakan ketersediaan pengembang untuk proyek baru atau rekrutmen.
2. **Heading Utama (H1)**: Nama lengkap pemilik portofolio yang dicetak dengan ukuran raksasa (`text-5xl` hingga `text-7xl`) menggunakan font Geist Sans bernotasi `tracking-tight` dan ketebalan `font-extrabold`.
3. **Tagline Profesi (H2)**: Spesialisasi utama atau bidang ketertarikan rekayasa sistem antarmuka modern (`text-xl` hingga `text-2xl`) warna sekunder.
4. **Paragraf Pengantar (P)**: Ringkasan 2-3 kalimat berorientasi nilai (*Value-driven summary*) yang menceritakan fokus pengembangan, estetika, dan arsitektur kode.
5. **Tombol Call-to-Action (2 CTA Button)**: 
   - Tombol Primer (`bg-[var(--color-interactive)]`): **"Lihat Proyek"** disertai ikon anak panah bergeser (`ArrowRight`). Saat diklik menembakkan perubahan hash ke `#projects`.
   - Tombol Sekunder (Border Monokrom Transparan 2px): **"Hubungi Saya"** disertai ikon amplop surat (`Mail`). Saat diklik memindahkan layar ke `#contact`.
6. **Background Partikel 3D / Subtle Mesh**: Efek gelombang ganda (Blob) bersatu bernuansa monokromatrik berketebalan rendah (`opacity-10` di Dark Mode) yang bergerak terus menerus melayang melintasi koordinat `x/y`.

### 📋 Contoh Nyata Cetakan Informasi di Layar
> **[ ✨ Tersedia untuk proyek baru ]**
> # **Muhammad Makbul N**
> ### Full Stack Developer
> 
> Saya mengembangkan aplikasi web yang modern, cepat, dan berorientasi pada pengalaman pengguna. Dengan memadukan desain yang bersih, arsitektur yang baik, dan kode yang berkualitas, saya membangun solusi digital yang efisien, mudah dipelihara, dan memberikan nilai bagi bisnis.
> 
> `[ Lihat Proyek ➔ ]`   `[ ✉ Hubungi Saya ]`

---

## 2. 👤 Menu About (`#about`) — Tentang Saya & Bio Ekstensif

Menu ini menceritakan identitas personal, latar belakang teknis, prestasi akademis, serta indikator kuantitatif jam terbang pengembang dalam bentuk tata letak dua kolom responsif.

### 🎨 Elemen UI & Komponen yang Dicetak
1. **Header Section**: Judul H1 *"Tentang Saya"* dilandaskan garis batas solid aksen monokrom (`h-1 w-20 bg-[var(--color-text-primary)]`).
2. **Kolom Kiri (Identitas & Fakta Singkat)**:
   - **Foto Profil Eksklusif (`/profile.jpeg`)**: Bingkai bundar presisi berdimensi 256x256px hingga 288x288px yang dikenakan efek `.img-mono` (100% Grayscale default, melingkar berotasi 360° dengan border putus-putus *spin 10s linear infinite*, berlumur warna asli saat kursor bersemayam).
   - **Kartu Fakta Terverifikasi**: Kotak melengkung `rounded-[24px]` berisi tiga baris informasi ikonik: Lokasi Geografis (`MapPin`), Status Kerja/Karier (`Briefcase`), dan Jenjang Pendidikan (`GraduationCap`).
3. **Kolom Kanan (Narasikan Kompetensi & Kartu Sorotan)**:
   - **Biografi Multi-Paragraf**: Blok narasi rekam jejak teknis dengan sistem *Markdown Parser* internal yang mengubah tanda `**` menjadi cetakan **huruf tebal putih terang (`strong text-[var(--color-text-primary)]`)** dan `*` menjadi *garis miring elegan*.
   - **2 Kartu Sorotan Prestasi (Count-Up Metric Cards)**: Grid dua kolom bergaris kelambu tipis berbatu ikon (`Code2` dan `Terminal`) yang menaikkan angka secara animasi saat elemen disentuh viewport monitor.

### 📦 Skema Data & Sumber (SWR / Fallback)
Data ditarik secara dinamis dari **Firebase Firestore** via endpoint `/api/about` menggunakan React Hook `useSWR` dengan waktu *deduping interval* selama 60 menit dan *Suspense fallback* (`AboutSkeleton`). Jika Firestore gagal atau belum diinisialisasi, sistem menggunakan fallback ke obyek statis di `constants.ts`.

### 📋 Contoh Nyata Cetakan Informasi di Layar
```
┌─────────────────────────────────────┬───────────────────────────────────────────────────────────────┐
│                                     │ Halo! Saya adalah seorang pengembang perangkat lunak yang     │
│             ╭─────────╮             │ memiliki hasrat mendalam terhadap desain antarmuka dan        │
│          ╭──╯  Foto   ╰──╮          │ arsitektur sistem. Fokus utama saya adalah membangun aplikasi │
│          │   Grayscale   │          │ web yang CEPAT, AMAN, DAN MUDAH DIAKSES oleh semua orang.     │
│          │  (Hoverable)  │          │                                                               │
│          ╰──╮  Avatar ╭──╯          │ Berbekal pengalaman dengan ekosistem modern seperti React,   │
│             ╰─────────╯             │ Next.js, dan infrastruktur serverless (Firebase/Vercel), saya │
│                                     │ menikmati proses menerjemahkan masalah bisnis yang kompleks   │
│  ┌───────────────────────────────┐  │ menjadi solusi teknis yang elegan.                            │
│  │ 📍 Indonesia, Makassar         │  │                                                               │
│  │ 💼 Freelance                  │  │ Ketika saya tidak sedang berhadapan dengan layar editor kode, │
│  │ 🎓 Informatics Engineering    │  │ saya biasanya menghabiskan waktu mempelajari teknologi baru,  │
│  │    Student                    │  │ berkontribusi pada proyek open source, atau meracik kopi.    │
│  └───────────────────────────────┘  │                                                               │
│                                     │  ┌───────────────────────────┐ ┌───────────────────────────┐  │
│                                     │  │ [ </> ]                   │ │ [ >_ ]                    │  │
│                                     │  │ 5+                        │ │ 3+                        │  │
│                                     │  │ Proyek Terselesaikan      │ │ Tahun Pengalaman          │  │
│                                     │  └───────────────────────────┘ └───────────────────────────┘  │
└─────────────────────────────────────┴───────────────────────────────────────────────────────────────┘
```

---

## 3. 💼 Menu Experience (`#experience`) — Riwayat Pengalaman Kerja & Organisasi

Menu ini merinci rekam jejak karier, magang, asisten laboratorium hukum, pengabdian komunitas teknologik, hingga riwayat akademis dalam susunan garis waktu kronologis (*Vertical Timeline*).

### 🎨 Elemen UI & Komponen yang Dicetak
1. **Header Section**: Judul H1 *"Pengalaman Kerja & Organisasi"* dan penjelasan dedikasi lintas disiplin.
2. **Kapsul Filter Tab Dinamis**: Deretan pil interaktif `rounded-full` berfilterkan **"Semua"**, **"Kerja" (`work`)**, **"Organisasi" (`organization`)**, dan **"Pendidikan" (`education`)**. Saat dipilih, kapsul hitam/putih melompat mulus menutupi tab aktif didorong properti *Framer Motion `layoutId`*.
3. **Pohon Timeline Kronologis**:
   - Garis vertikal 1px membatasi sumbu kiri.
   - Titik Simpul (Node Circle): Bulatkan lingkar monokrom yang menandakan setiap entri.
   - **Kartu Riwayat Pengalaman**: Setiap blok merender **Nama Perusahaan/Institusi**, **Jabatan/Posisi**, **Periode Waktu (Bulan Tahun - Selesai/Sekarang)**, **Deskripsi Tanggung Jawab**, serta deretan **Badge Teknologi Terkait** (pill-size font-mono).
   - Animasi kemunculan ter-stagger satu per satu turun dari atas ke bawah.

### 📦 Skema TypeScript (`types/experience.ts`)
```ts
interface Experience {
  id: string;
  type: 'work' | 'organization' | 'education';
  company: string;
  position: string;
  period: string;
  description: string;
  logo?: string;
  technologies?: string[];
}
```

### 📋 Contoh Nyata Cetakan dari Data Proyek Asli (`src/data/experiences.ts`)
Berikut adalah 5 entri riwayat otentik yang akan dicetak di layar portofolio:

1. **💼 [WORK] UIN Alauddin Makassar**
   - **Posisi**: Teaching Assistant for Front-End Web Programming
   - **Periode**: Okt 2025 - Des 2025
   - **Deskripsi yang Dicetak**: *Membimbing mahasiswa dalam teknologi front-end dasar, mengevaluasi lebih dari 21 proyek untuk memperbaiki kesalahan logika dan memberikan solusi debugging, serta memfasilitasi sesi praktikum terkait manipulasi DOM dan desain responsif.*
   - **Badge Teknologi**: `[ HTML5 ]` `[ CSS3 ]` `[ JavaScript ]`

2. **💼 [WORK] Coding Camp (DBS Foundation × Dicoding)**
   - **Posisi**: Full-Stack Developer Apprentice
   - **Periode**: Feb 2025 - Jul 2025
   - **Deskripsi yang Dicetak**: *Berkolaborasi dalam tim agile untuk membangun proyek capstone "Cek Jerawat" dengan skor 92.1/100, serta menyiapkan arsitektur frontend untuk penanganan request dan manajemen error pada integrasi API Machine Learning. Menyelesaikan kurikulum intensif selama 910 jam pembelajaran.*
   - **Badge Teknologi**: `[ JavaScript ]` `[ Tailwind CSS ]`

3. **💼 [WORK] PT. Sinar Galesong Pratama**
   - **Posisi**: Web Development Intern
   - **Periode**: Feb 2025 - Mar 2025
   - **Deskripsi yang Dicetak**: *Mengembangkan aplikasi web internal perusahaan menggunakan HTML, CSS, JavaScript, dan Laravel. Membangun komponen UI responsif, membantu integrasi backend, serta melakukan debugging untuk memastikan stabilitas sistem di tahap production.*
   - **Badge Teknologi**: `[ HTML ]` `[ CSS ]` `[ JavaScript ]` `[ Laravel ]`

4. **🤝 [ORGANIZATION] GDG on Campus UIN Alauddin Makassar**
   - **Posisi**: Core Team, Web Development
   - **Periode**: Okt 2025 - Sekarang
   - **Deskripsi yang Dicetak**: *Membangun situs web resmi komunitas menggunakan React.js, TypeScript, dan Firebase, menerjemahkan prototipe Figma menjadi UI responsif dengan Tailwind CSS. Mempresentasikan platform secara langsung untuk mengumpulkan feedback serta mengelola version control menggunakan Git & GitHub.*
   - **Badge Teknologi**: `[ React.js ]` `[ TypeScript ]` `[ Firebase ]` `[ Tailwind CSS ]` `[ Git & GitHub ]`

5. **🎓 [EDUCATION] Universitas Islam Negeri Alauddin Makassar**
   - **Posisi**: Informatics Engineering (S1 Teknik Informatika)
   - **Periode**: Agu 2022 - Sekarang
   - **Deskripsi yang Dicetak**: *Menjalani studi dengan IPK 3.81/4.00 serta mempelajari mata kuliah inti seperti Pemrograman Web, Object-Oriented Programming (OOP), Sistem Basis Data, dan Rekayasa Perangkat Lunak. Mempertahankan nilai akademik untuk mempertahankan Beasiswa KIP Kuliah.*
   - **Badge Teknologi**: `[ Web Programming ]` `[ OOP ]` `[ Data Structures & Algorithms ]` `[ Database Systems ]`

---

## 4. 🚀 Menu Projects (`#projects`) — Koleksi Portofolio Proyek

Menu ini adalah jantung pembuktian keahlian (*Showcase of Evidence*), merender karya-karya rekayasa sistem antarmuka maupun backend ke dalam katalog bergaya Grid modern, lengkap dengan kategorisasi cerdas, efek interaktif berbobot tinggi, dan tautan eksplorasi mandiri.

### 🎨 Elemen UI & Komponen yang Dicetak
1. **Header Section**: Judul H1 *"Proyek"* dan penjelasan ulasan portofolio terbaik.
2. **Kapsul Filter Kategori Pintar**: Kapsul melingkar berisian **"Semua"**, **"Web"**, **"Mobile"**, **"API"**, dan **"Lainnya"**. Sistem dibangun secara cerdas dimana tab kategori *hanya akan di-render di layar jika ada minimal 1 proyek yang menempati kategori tersebut!*
3. **Grid Kartu Proyek (`ProjectCard.tsx`)**:
   - Susunan 1 Kolom (Mobile), 2 Kolom (Tablet), dan 3 Kolom (Desktop `lg:grid-cols-3`).
   - **Thumbnail Proyek (`/public/images/projects/` atau Gambar Firestore)**: Diperkuat efek kelas `.img-mono`, menjadikannya berhias Hitam-Putih 100% saat sunyi, dan meledak menjadi Full Color 4K saat pointer merapat di atas kartu.
   - **Badge Kategori**: Label sudut kiri bawah melampirkan divisi proyek (misal: `WEB` atau `MOBILE`).
   - **Judul Proyek (H3)**: Dicetak tegas bertembak font Geist Sans.
   - **Deskripsi Singkat**: Rangkuman padatan nilai komersial maupun terobosan teknis proyek dalam 2 baris teks (*Line Clamp 2*).
   - **Deretan Badge Teknologi**: Pengulangan pil monokrom bertanda nama library/tool (misalnya: `React.js`, `Vite`, `TailwindCSS`).
   - **Tombol Pintasan Eksternal**: Tombol logo `Git/Github` ke repository source code dan tombol Ikon `ExternalLink` menuju live website atau memicu lompatan ke **Halaman/Modal Detail Proyek**.
4. **Sistem Paginasi Navigatif**: Menjaga efisiensi memori, setiap halaman dibatasi maksimal **9 proyek** dengan tombol kontrol arah `< Sebelumnya`, angka halamn `[1] [2]`, dan `Selanjutnya >`.

### 📦 Skema TypeScript (`types/project.ts`)
```ts
interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string; // Berisi JSON murni hasil renderan BlockNote Studio
  category: 'web' | 'mobile' | 'api' | 'other';
  thumbnail: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean; // Jika true, selalu diundi teratas oleh sortProjectsByFeatured()
  year: number;
}
```

### 📋 Contoh Nyata Data dari Firestore (Dokumen Asli di `IsiProjectFirebase.md`)
Berikut adalah bedah lengkap proyek unggulan **"Diyah Gift"** yang dicetak pada menu Proyek dan halaman bacaan detailnya:

```
┌────────────────────────────────────────────────────────────┐
│ ┌────────────────────────────────────────────────────────┐ │
│ │                  THUMBNAIL SCREENSHOT                  │ │
│ │        [ Grayscale by Default → Color on Hover ]       │ │
│ │                                                        │ │
│ │                                               [ WEB ]  │ │
│ └────────────────────────────────────────────────────────┘ │
│                                                            │
│  ★ FEATURED PROJECT                        [ 🐙 ]  [ ↗ ]   │
│  Diyah Gift - Katalog Kado Wisuda                          │
│                                                            │
│  Platform pemasaran digital dan katalog hadiah wisuda      │
│  interaktif berteknologi React, Vite, dan TailwindCSS      │
│  dengan performa super cepat serta navigasi instan.       │
│                                                            │
│  [ React.js ]  [ Vite ]  [ TailwindCSS ]  [ React Router ] │
└────────────────────────────────────────────────────────────┘
```

#### 📑 Isi Cetakan Informasi di Halaman Detail (Dilompati dari JSON BlockNote):
Saat kartu Diyah Gift diklik, sistem membuka tampilan pembaca bergaya Medium/Notion (`.story-reader-content`) yang menceritakan:
- **Latar Belakang & Masalah**: Momen wisuda identik dengan buket bunga dan selempang, namun penjual kerap terhantam kendala komunikasi manual via media sosial tanpa katalog terstruktur.
- **Solusi Arsitektural**: Single Page Application (SPA) berdayakan **React & Vite** berlandasan **TailwindCSS** dengan penyimpanan lokal (*Local Storage*) untuk *Dark Mode Preference* dan manajemen data katalog dinamis via file JSON agar penambahan item baru tidak memerlukan perombakan logika core.
- **Fitur Utama yang Dicetak**:
  1. **Katalog Produk Interaktif**: Grid responsif untuk 3 Kategori Utama: *Selempang Wisuda* (**11 Item**: Satin, Rumbai, Pita, Satu/Dua Sisi), *Buket Bunga* (**26 Item**), dan *Produk Lainnya* (**9 Item** polaroid & aksesoris). Total **46 Item Katalog Dinamis**!
  2. **Sistem Favorit Produk**: Bookmark interaktif untuk menyelingi interaksi pengguna (*User Engagement*).
  3. **Integrasi Dual Kontak**: Tombol penembak konversi kilat via **WhatsApp** dan **Email** resmi penjual.
  4. **Performa Unggulan**: Skeleton loader dan optimasi build Vite menciptakan waktu render instan di sembarang perangkat.

---

## 5. 🧰 Menu Tech Stack (`#tech-stack`) — Alat Kerja & Kejuruan

Menu ini menyusun klasifikasi kepustakaan bahasa pemrograman, framework antarmuka, serverless cloud, hingga perkakas kecerdasan buatan (*AI & Data Integrations*) yang dikuasai secara profesional, ditata dalam grid kartu-kartu ikon beresolusi vektor universal (*Iconify & Lucide*).

### 🎨 Elemen UI & Komponen yang Dicetak
1. **Header Section**: Judul H1 *"Tech Stack & Kejuruan"* dan subjudul penguasaan teknologi sistem.
2. **Kelompok Blok Kategori (6 Kategori Utama)**: Setiap divisi dibentengi judul seksi mandiri dengan batas border lapis.
3. **Kartu/Badge Ikonik (`TechBadge` / Grid Item)**:
   - Diperkuat latar `bg-[var(--color-bg-surface)]` dan border tipis kontras melintang.
   - **Ikon Vektor Universal**: Dirender via `@iconify/react` (misalnya: `logos:javascript`, `logos:react`, `logos:firebase`).
   - **Nama Teknologi**: Dicetak cetak tebal beresolusi jelas.
   - **Badge Level Penguasaan**: Label sudut bertuliskan font Geist Mono bernada **Advanced** atau **Intermediate**, memperjelas bobot keilmuan pada tools terkait.
4. **Animasi Gelombang (Wave Stagger)**: Saat digantung ke viewport, ikon-ikon melompat berurutan dan membengkak ringan (scale-up 105%) saat disorot tetikus (*Hover Glow*).

### 📋 Daftar Lengkap 43+ Cetakan Teknologi Asli dari `src/data/techstack.ts`
Berikut adalah seluruh daftar teknologi terverifikasi yang dicetak dalam layar portofolio:

| Kategori Utama | Teknologi yang Dicetak | Ikon (Iconify / Lucide) | Level Penguasaan |
| :--- | :--- | :--- | :--- |
| **Bahasa Pemrograman** | **JavaScript (ES6+)** | `logos:javascript` | `Advanced` |
| | **TypeScript** | `logos:typescript-icon` | `Intermediate` |
| | **PHP** | `logos:php` | `Intermediate` |
| | **Python** | `logos:python` | `Intermediate` |
| **Frontend & Mobile** | **React.js** | `logos:react` | `Advanced` |
| | **Next.js** | `logos:nextjs-icon` | `Advanced` |
| | **Tailwind CSS** | `logos:tailwindcss-icon` | `Advanced` |
| | **Livewire** | `logos:laravel` | `Intermediate` |
| | **Flutter** | `logos:flutter` | `Intermediate` |
| **Backend & Runtime** | **Node.js** | `logos:nodejs-icon` | `Intermediate` |
| | **Laravel** | `logos:laravel` | `Intermediate` |
| | **Hapi.js** | `logos:hapi` | `Intermediate` |
| **Database & Cloud** | **Firebase (Auth / Firestore)** | `logos:firebase` | `Advanced` |
| | **MySQL** | `logos:mysql` | `Intermediate` |
| | **MongoDB** | `logos:mongodb-icon` | `Intermediate` |
| | **Supabase** | `logos:supabase-icon` | `Intermediate` |
| | **Vercel** | `logos:vercel-icon` | `Intermediate` |
| | **Netlify** | `logos:netlify-icon` | `Intermediate` |
| **Infrastruktur & Tools** | **Git & GitHub** | `logos:git-icon` | `Advanced` |
| | **Vite** | `logos:vitejs` | `Intermediate` |
| | **Postman** | `logos:postman-icon` | `Intermediate` |
| | **BlockNote** | `mdi:file-document-edit-outline`| `Intermediate` |
| | **Google Search Console** | `logos:google-icon` | `Intermediate` |
| **Data, AI & Integrasi** | **Arsitektur RAG (Retrieval-Augmented)**| `carbon:machine-learning-model` | `Intermediate` |
| | **HyDE (Hypothetical Doc Embeddings)**| `carbon:machine-learning-model` | `Intermediate` |
| | **Midtrans Payment Gateway** | `mdi:credit-card-outline`| `Intermediate` |

---

## 6. 💬 Menu Testimonials (`#testimonials`) — Ulasan & Komentar

Menu ini bertindak sebagai alat validasi sosial (*Social Proof*) dengan merender testimoni, ulasan kualitas kerja, dan penilaian kepuasan dari dosen pembimbing, rekan developer, mentor magang, hingga klien komersial.

### 🎨 Elemen UI & Komponen yang Dicetak
1. **Header Section**: Judul H1 *"Testimoni & Komentar"* serta keterangan: *"Tinggalkan masukan Anda menggunakan akun sosial."*
2. **Tombol Otentikasi Google OAuth**: Tombol interaktif yang mengizinkan penonton log-in menggunakan Akun Google mereka secara aman (via Firebase Auth) guna meninggalkan ulasan atau komentar nyata secara langsung (*Interactive Feedback System*)!
3. **Grid Kartu Testimoni (`TestimonialCard.tsx` in `TestimonialList`)**:
   - **Avatar Reviewer**: Foto bundar profil pengulas yang bersumber dari foto akun sosial atau ilustrasi abjad fallback.
   - **Identitas Pengirim**: Nama lengkap pengulas, bersandingan dengan **Jabatan & Perusahaan** (misal: *Senior Web Developer at Dicoding*) atau **Hubungan Kerja** (*Mentor*, *Rekan Tim Capstone*, *Klien*).
   - **Rating Bintang**: Deretan ilustrasi bintang monokromatik/emas berbobot 1 hingga 5 Bintang.
   - **Teks Komentar**: Paragraf ulasan yang mempersonalisasikan pengalaman kolaborasi, ketepatan waktu pengiriman kode (*On-Time Delivery*), dan keandalan komunikasi pengembang.
   - **Tanggal Cetak**: Rentang tanggal validasi pesan disimpan.
4. **Alur Proteksi Anti-Spam**: Komentar baru disimpan di koleksi Firestore `testimonials` dan tunduk pada validasi Firestore Security Rules.

### 📋 Contoh Skema Cetakan Testimoni
```
┌─────────────────────────────────────────────────────────────┐
│ ┌───────────┐  Budi Santoso                  ★★★★★          │
│ │   Foto    │  Senior Software Engineer at XYZ               │
│ │  Avatar   │  Hubungan: Mentor Magang • 14 Mar 2025        │
│ └───────────┘                                               │
│                                                             │
│ "Makbul adalah developer muda yang luar biasa cepat dalam    │
│ menerjemahkan arsitektur kompleks menjadi UI Next.js yang   │
│ super bersih. Saat mengerjakan capstone Cek Jerawat, logika │
│ debugging dan ketanangannya di bawah deadline sangat solid. │
│ Sangat merekomendasikan Makbul untuk tim engineering mana pun!" │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. 📖 Menu Story / Jejak Langkah (`#story`) — Narasi Perjalanan

Menu ini menceritakan titik balik bersejarah, momen kesadaran, dan perjuangan emosional/spiritual dalam menempuh jalan kerajinan perangkat lunak, membedakan dokumentasi ini dari sekadar CV kering menjadi dokumentasi kemanusiaan yang inspiratif (*Storytelling Approach*).

### 🎨 Elemen UI & Komponen yang Dicetak
1. **Header Section**: Judul H1 *"Jejak Langkah"* serta subteks: *"Bagaimana saya memulai perjalanan dan menemukan ketertarikan di dunia perangkat lunak."*
2. **Timeline Naratif Vertikal**: Garis batas perak memotong sisi kiri (`w-0.5`).
3. **Lingkar Ikon Simbolis Dinamis (`getIcon()`)**: Algoritma mendeteksi kata kunci dari judul tonggak sejarah untuk memilih ikon bertema khusus:
   - Keyword `"awal"` atau `"terminal"` → Ikon **`TerminalSquare`**
   - Keyword `"kode"` atau `"code"` → Ikon **`Code`**
   - Keyword `"mobile"` atau `"app"` → Ikon **`MonitorSmartphone`**
   - Keyword `"launch"` atau `"rocket"` → Ikon **`Rocket`**
4. **Sorotan Tonggak Milestones (Highlight Cards)**: Momen paling transformatif diberi bobot font tebal dan penempatan bercahaya. Data ditarik secara urut naik (`asc`) dari Firestore `journeys-asc` atau statik di `src/data/story.ts`.

### 📋 Contoh Nyata 4 Tonggak Sejarah Asli yang Dicetak di Layar (`src/data/story.ts`)
```
[ 2019 ] ─── ▣ [TerminalSquare] ─► AWAL KETERTARIKAN
                                   Pertama kali menyentuh HTML dan CSS. Terpesona oleh bagaimana 
                                   baris kode bisa berubah menjadi tampilan visual yang interaktif.
                                   
[ 2020 ] ─── </> [Code] ─────────► EKSPLORASI JAVASCRIPT
                                   Mulai memahami logika pemrograman dengan JavaScript vanilla. 
                                   Membuat aplikasi kalkulator dan to-do list pertama.
                                   
[ 2021 ] ─── 📱 [Smartphone] ────► MENGENAL REACT & FRONTEND MODERN ★ [Highlighted]
                                   Belajar React.js dan menyadari betapa mudahnya membangun UI 
                                   berbasis komponen masa kini.
                                   
[ 2023 ] ─── 🚀 [Rocket] ────────► MASUK KE DUNIA FULL STACK ★ [Highlighted]
                                   Menguasai Next.js dan Firebase. Membangun dan meluncurkan 
                                   aplikasi produksi pertama untuk klien nyata.
```

---

## 8. 📬 Menu Contact (`#contact`) — Hubungi Saya & Media Sosial

Menu konversi akhir tempat pengunjung, penawaran pekerjaan (*Job Offers*), atau calon kolaborator bisnis dapat berkomunikasi langsung baik lewat pengajuan formulir terintegrasi maupun jalur komunikasi pintar di jaringan sosial.

### 🎨 Elemen UI & Komponen yang Dicetak
1. **Header Section**: Judul H1 *"Hubungi Saya"* dan sambutan hangat untuk berdiskusi maupun penawaran kolaborasi.
2. **Panel Kiri — Box Informasi Kontak Resmi**:
   - **Kotak Email**: Cetakan ikon `Mail` bersanding alamat `muhmakbul6@gmail.com` (tertaut otomatis ke protokol `mailto:`).
   - **Kotak Lokasi**: Cetakan ikon `MapPin` menorehkan koordinat domisili `Indonesia, Makassar`.
   - **Deretan Tombol Media Sosial Interaktif**: 5 tombol lingkaran bergaya elevasi lapis 2 (`bg-[var(--color-bg-elevated)]`) berbongkahan vektor Iconify yang melompat naik saat disorot:
     - **GitHub**: `@Mkeyzxi` (Tautan ke repositori open-source).
     - **LinkedIn**: `Muhammad Makbul N` (Profil profesional S1 Teknik Informatika).
     - **Instagram**: `@mkeyzxi` (Katalog visual & keseharian developer).
     - **Facebook**: Tautan sosial media personal.
     - **WhatsApp**: Tombol pesan langsung (*Direct API WA*) menuju nomor **`+62 853-4218-1132`** dengan teks prabayar: *"Halo mbul, saya dapat kontak kamu dari portofolio yang kamu miliki."*
3. **Panel Kanan — Contact Form Modern (`ContactForm.tsx`)**:
   - **Input Nama Lengkap** (`name`): Validasi minimal 2 karakter.
   - **Input Alamat Email** (`email`): Validasi regex format surel valid.
   - **Input Subjek Pesan** (`subject`): Validasi minimal 3 karakter, memudahkan pemilahan pesan.
   - **Textarea Isi Pesan** (`message`): Kotak pesan lapang bertema monokrom, validasi minimal 10 karakter.
   - **Perisai Anti-Spam (Honeypot Trap)**: Field input rahasia yang tidak terlihat oleh mata manusia namun sering dideteksi robot spam. Jika robot mengisinya, API Next.js otomatis membatalkan pengiriman pesan tanpa membebani database!
   - **Tombol Kirim Pesan**: Berbekal status animasi *Loading Spinner*, yang saat sukses mencetak notifikasi mengambang (*Shadcn Toast Notification*) berupa konfeti atau centang sukses ke layar pemirsa!

### 📋 Contoh Visual Panel Kontak
```
┌───────────────────────────────────────┬───────────────────────────────────────────────┐
│ INFORMASI KONTAK                      │ KIRIM PESAN                                   │
│                                       │                                               │
│ ✉  Email                              │ Nama Lengkap                                  │
│    muhmakbul6@gmail.com               │ [ Budi Santoso                              ] │
│                                       │                                               │
│ 📍 Lokasi                             │ Alamat Email                                  │
│    Indonesia, Makassar                │ [ budi@perusahaan.com                       ] │
│                                       │                                               │
│ ───────────────────────────────────── │ Subjek Pesan                                  │
│ MEDIA SOSIAL                          │ [ Tawaran Proyek Aplikasi Web Next.js       ] │
│                                       │                                               │
│ [ 🐙 GitHub ]   [ 💼 LinkedIn ]       │ Tuliskan Pesan Anda                           │
│ [ 📸 Instagram ] [ 💬 WhatsApp ]       │ [ Halo Makbul, saya melihat portofoliomu    ] │
│                                       │ [ dan sangat tertarik mengikat kerjasama... ] │
│ (Klik WhatsApp langsung membuka       │                                               │
│  pesan obrolan siap kirim!)           │ [ 🚀 KIRIM PESAN SEKARANG ] (Loading Spinner) │
└───────────────────────────────────────┴───────────────────────────────────────────────┘
```

---

## 🔐 Bonus: Menu Khusus Admin Dashboard & Editor CMS (`/admin/*`)

Selain 8 Menu Publik di atas, website ini dilengkapi dengan sistem back-office tersembunyi berbantukan otorisasi **Firebase Admin & Google OAuth** murni terbatas untuk email `muhmakbul6@gmail.com`. Pada menu admin ini, pengembang mencetak dan memodifikasi konten secara *Zero-Code Update*:

1. **Dashboard Utama (`/admin`)**: Mencetak ikhtisar statistik pesanan kontak yang masuk di koleksi `messages`, jumlah proyek aktif, dan antrean testimoni menunggu persetujuan (*Approve/Reject*).
2. **Projects Editor (`/admin/projects`)**: Mencetak antarmuka **BlockNote Editor Studio** (integrasi library berbasis blok sekelas Notion). Pengembang dapat mengunggah paragraf, tabel, atau pemisah baris untuk cerita studi kasus proyek, yang akan diubah ke struktur JSON String dan diinjeksi seketika ke dokumen Firestore.
3. **About & Tech CMS (`/admin/about` & `/admin/experiences`)**: Formulir interaktif untuk memperbarui angka jam terbang (misal menaikan "5+ Proyek" menjadi "20+ Proyek") atau menambah entri riwayat magang baru tanpa perlu melakukan *re-deploy* atau mengubah source code di GitHub!

---

## 🏆 Ringkasan Keselarasan Informasi
Seluruh menu di atas bersinergi merangkai sebuah cerita portofolio yang **Jelas**, **Kuat**, **Elegan**, dan **Penuh Nilai Bukti**. Penggunaan estetika *Monochrome Professional*, proteksi keamanan serverless modern, dan akurasi data otentik **Muhammad Makbul N (@Mkeyzxi)** menetapkan standar standar emas dalam rekayasa sistem presentasi profil profesional kelas dunia! 🚀🏁
