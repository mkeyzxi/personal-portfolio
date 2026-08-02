# 🎨 Panduan Lengkap Design System: Monochrome Professional Edition (`designku.md`)

<p align="center">
  <img src="https://img.shields.io/badge/Design_Theme-Monochrome_Professional-000000?style=for-the-badge&logo=css3&logoColor=white" alt="Theme">
  <img src="https://img.shields.io/badge/Typography-Geist_Sans_%26_Mono-20232A?style=for-the-badge&logo=google-fonts&logoColor=white" alt="Typography">
  <img src="https://img.shields.io/badge/UI_Library-Shadcn_UI_%2B_React_Bits-0055FF?style=for-the-badge&logo=radix-ui&logoColor=white" alt="UI Library">
  <img src="https://img.shields.io/badge/Motion-Framer_Motion_12-000000?style=for-the-badge&logo=framer&logoColor=white" alt="Motion">
  <img src="https://img.shields.io/badge/Lighthouse_Target-≥_95%25_Score-00C853?style=for-the-badge&logo=lighthouse&logoColor=white" alt="Lighthouse">
</p>

---

Dokumen ini merupakan **Alkitab Desain (Design Bible)** resmi yang menjabarkan secara selengkap-lengkapnya arsitektur visual, filosofi warna, komponen antarmuka, tata letak (*layout*), sistem tipografi, hingga perilaku animasi interaktif pada proyek **Personal Portfolio Website**. 

Sistem desain ini merangkum ketepatan standar rekayasa perangkat lunak (*System Design Document* / `SDD.md`) dan keindahan visual maksimal (`DESIGN.md` & `AturanDesign.md`).

---

## 📑 Daftar Isi

1. [Filosofi Desain & Identitas Visual](#1-filosofi-desain--identitas-visual)
2. [Sistem Warna Lengkap (Semantic Color Tokens)](#2-sistem-warna-lengkap-semantic-color-tokens)
   - [Tabel Pemantapan Hex Code & Variabel CSS](#a-tabel-pemantapan-hex-code--variabel-css)
   - [Mekanisme Tema (Light, Dark & Auto Mode)](#b-mekanisme-tema-light-dark--auto-mode)
3. [Spesifikasi Visual Eksklusif: Grayscale Signature Effect](#3-spesifikasi-visual-eksklusif-grayscale-signature-effect)
4. [Tipografi & Hierarki Font (Geist Architecture)](#4-tipografi--hierarki-font-geist-architecture)
   - [Font Utama (Geist Sans) vs Font Data (Geist Mono)](#a-font-utama-geist-sans-vs-font-data-geist-mono)
   - [Skala Tipografi & Read-Only Blog Styling](#b-skala-tipografi--read-only-blog-styling)
5. [Sistem Menu & Struktur Navigasi (SPA + Hash Sync)](#5-sistem-menu--struktur-navigasi-spa--hash-sync)
   - [Topologi 8 Section Navigasi CSR](#a-topologi-8-section-navigasi-csr)
   - [Layout Desktop: Vertical Fixed SidebarNav](#b-layout-desktop-vertical-fixed-sidebarnav)
   - [Layout Mobile: Glassmorphic BottomNav & Slide-Up Drawer](#c-layout-mobile-glassmorphic-bottomnav--slide-up-drawer)
6. [Spacing, Grid Layout & Elevation Hierarchy](#6-spacing-grid-layout--elevation-hierarchy)
   - [Sistem Kedalaman Lapisan (3-Layer Elevation)](#a-sistem-kedalaman-lapisan-3-layer-elevation)
   - [Glassmorphism & Sudut Lengkung (Border Radius)](#b-glassmorphism--sudut-lengkung-border-radius)
7. [Animasi, Motion & Micro-Interactions](#7-animasi-motion--micro-interactions)
   - [Aturan Anti-Reflow & Page Transitions](#a-aturan-anti-reflow--page-transitions)
   - [Shared Layout ID (`layoutId`) & Wave Staggering](#b-shared-layout-id-layoutid--wave-staggering)
   - [Visual 3D & React Bits Micro-animations](#c-visual-3d--react-bits-micro-animations)
8. [Aksesibilitas (A11y), Ergonomi & Target Performa](#8-aksesibilitas-a11y-ergonomi--target-performa)

---

## 1. Filosofi Desain & Identitas Visual

Website ini tidak sekadar bertindak sebagai kumpulan informasi rekam jejak karir, melainkan perwujudan dari kepribadian **Developer-Designer Hybrid**: teknis, bersih, elegan, tanpa kompromi performa.

### 🌟 Mengapa "Monochrome Professional Edition"?
Dalam standar desain konvensional, web portofolio sering kali terjebak dalam jebakan warna-warni mencolok (kromatik berlebih) yang justru mendistraksi mata pengunjung dari esensi utama: **Konten, Kode, dan Hasil Karya**.
Oleh karena itu, aturan teratas sistem desain kita menetapkan:

> **🚨 ATURAN BESI DESAIN**: Sistem warna **HANYA** menggunakan spektrum neutral profesional (hitam, putih, dan degradasi abu-abu). **Warna kromatik (biru, merah, hijau, kuning pekat) DILARANG KERAS** dipakai sebagai warna elemen antarmuka (UI) dasar! Keindahan visual murni bersumber dari kontras rasio yang prima, ketepatan ruang napas (*whitespace*), serta efek animasi transparan (*glassmorphism*).

### 📐 12 Pilar Filosofis Rancang Bangun UI
1. **Modern**: Mengadopsi tren arsitektur antarmuka dekaden terkini (Notion-like minimalism & linear borders).
2. **Clean**: Bersih dari elemen visual atau garis pemisah yang berlebihan dan menyemakkan mata.
3. **Premium & Elegant**: Paduan warna monokrom berkelas dengan opasitas berlapis.
4. **Professional & Minimal**: Menonjolkan sisi dewasa seorang software engineer senior.
5. **Interactive**: Menyertakan timbal balik (*feedback*) responsif instan pada setiap klik dan geseran kursor.
6. **Content First**: Antarmuka bertindak sebagai bingkai pameran; karya proyek dan narasi adalah lukisannya.
7. **Performance First**: Animasi diluncurkan tanpa membebani performa pemproses grafis atau GPU ponsel murah.
8. **Accessibility First**: Berempati pada pengguna tuna netra (Screen Readers) dan penderita sensitivitas gerakan.
9. **Consistency First**: Aturan token tunggal terpusat di `globals.css` untuk mencegah inkonsistensi styling antar halaman.
10. **Discoverability**: Tata letak elemen penting (seperti tombol Kontak atau Github) dirancang agar instan ditemukan < 3 detik.
11. **Error Prevention**: Mengunci formulir saat memroses pengiriman untuk memblokir klik ganda atau *race conditions*.
12. **Progressive Disclosure**: Konten artikel panjang disembunyikan dalam modal atau rute khusus agar halaman Home tetap ringan bak kilatan cahaya.

---

## 2. Sistem Warna Lengkap (Semantic Color Tokens)

Sistem styling membuang pola penamaan warna statis (misal: `bg-white dark:bg-black`), dan sepenuhnya bertumpu pada **Semantic Design Tokens** (Variabel Kustom CSS). Dengan demikian, ketika tema diubah dari Terang (*Light*) ke Gelap (*Dark*), sistem hanya memuat ulang nilai Hex di variabel root tanpa harus me-rerender nama class pada DOM HTML.

### A. Tabel Pemantapan Hex Code & Variabel CSS
Berikut adalah katalog lengkap token warna semantik yang didefinisikan pada `:root` dan `.dark` di `app/globals.css`:

| Token Semantik (CSS Var) | Class Tailwind v4 | Light Mode (Hex) | Dark Mode (Hex) | Deskripsi & Peran Penggunaan UI |
| :--- | :--- | :---: | :---: | :--- |
| `--color-bg-main` | `bg-[var(--color-bg-main)]` | `#FFFFFF` *(White)* | `#0A0A0A` *(Neutral-950)* | **Layar Belakang Utama**: Warna latar dasar seluruh halaman website. |
| `--color-bg-surface` | `bg-[var(--color-bg-surface)]` | `#FAFAFA` *(Neutral-50)* | `#171717` *(Neutral-900)* | **Permukaan Layer 2**: Warna latar untuk Sidebar, Bottom Nav, dan Mobile Drawer. |
| `--color-bg-elevated` | `bg-[var(--color-bg-elevated)]` | `#F5F5F5` *(Neutral-100)* | `#262626` *(Neutral-800)* | **Permukaan Layer 3**: Warna untuk Kartu Proyek, Kartu Testimoni, dan Input Form. |
| `--color-border` | `border-border` | `#E5E5E5` *(Neutral-200)* | `#262626` *(Neutral-800)* | **Border Pembatas Standar**: Garis tipis 1px pemotong kartu, tabel, dan form. |
| `--color-border-muted`| `border-[var(--color-border-muted)]`| `#F0F0F0` *(Neutral-100)*| `#1F1F1F` *(Neutral-900)* | **Border Sekunder**: Garis pemisah halus (divider internal di dalam card/sidebar). |
| `--color-text-primary`| `text-[var(--color-text-primary)]`| `#171717` *(Neutral-900)* | `#FAFAFA` *(Neutral-50)* | **Teks Primer (H1 - H6)**: Warna untuk judul utama, nama pemilik, dan label menu. |
| `--color-text-secondary`| `text-[var(--color-text-secondary)]`| `#525252` *(Neutral-600)* | `#A3A3A3` *(Neutral-400)* | **Teks Sekunder (P)**: Untuk paragraf bio, deskripsi proyek, dan sub-judul. |
| `--color-text-muted` | `text-[var(--color-text-muted)]`| `#919191` *(Neutral-400)* | `#525252` *(Neutral-600)* | **Teks Redup (Muted)**: Untuk placeholder input, tanggal, dan metadata waktu. |
| `--color-interactive` | `bg-[var(--color-interactive)]` | `#000000` *(Black)* | `#FFFFFF` *(White)* | **Tombol Aksi Utama**: Background tombol primary CTA dan indikator menu aktif. |
| `--color-interactive-text`| `text-[var(--color-interactive-text)]`| `#FFFFFF` *(White)*| `#000000` *(Black)* | **Teks Tombol Utama**: Warna teks di dalam tombol primary agar kontras maksimal. |
| `--color-interactive-hover`| `hover:bg-[var(--color-interactive-hover)]`| `#171717` *(Neutral-900)*| `#E5E5E5` *(Neutral-200)*| **Hover State Tombol**: Warna perubahan instan saat tombol primary disentuh kursor. |
| `--color-focus-ring` | `outline-ring` | `#A3A3A3` *(Neutral-400)* | `#525252` *(Neutral-600)* | **Ring Fokus Aksesibilitas**: Garis menyala 2px untuk navigasi pengguna keyboard (Tab). |

### B. Mekanisme Tema (Light, Dark & Auto Mode)
Sistem tema diatur secara terpusat oleh perpustakaan `next-themes`:
- **Light Theme**: Memberikan presentasi putih bersih yang sangat tajam, cocok di lingkungan kantor benderang.
- **Dark Theme**: Menghadirkan nuansa malam bersudut elegan (`#0A0A0A` bukan hitam pekat `#000000`, sehingga mengurangi kelelahan mata / *eye-strain* dan mencegah masalah pantulan warna OLED).
- **System / Auto Mode**: Secara cerdas menyelaraskan diri dengan preferensi tingkat sistem operasi pengguna (`prefers-color-scheme`).
- **Transisi Mulus Tanpa Kilau (No-FOUC)**: Pergantian warna diinjeksikan sebelum render client HTML terjadi di `app/layout.tsx`.

---

## 3. Spesifikasi Visual Eksklusif: Grayscale Signature Effect

salah satu daya tarik estetika paling ikonik dan berani dari website ini adalah penerapan aturan **Grayscale Signature Effect** sesuai pasala spesifikasi `SDD.md §4.3` dan `globals.css`:

```css
/* Kutipan langsung dari app/globals.css */
.img-mono {
  filter: grayscale(100%);
  transition: filter 500ms ease;
}

.img-mono:hover {
  filter: grayscale(0%);
}
```

### 🎯 Cara Kerja & Alasan Filosofis
1. **Peredam Kebisingan Visual (*Visual Noise Reduction*)**: Dalam senarai kartu proyek (Projects Section) atau testimoni, tangkapan layar website sering kali memiliki skema warna yang berbeda-beda (ada proyek berlatar merah, biru, hijau, atau ungu). Jika disajikan apa adanya, website akan terlihat seperti badut yang tidak rapi.
2. **Keadaan Mula Monokrom (100% Grayscale)**: Dengan memberi class `.img-mono`, seluruh thumbnail foto proyek, foto avatar kolega, dan tangkap layar secara default **dipaksa berubah menjadi Hitam-Putih terestetis**. Hal ini menyatukan seluruh elemen visual ke dalam satu harmoni *Monochrome Professional*.
3. **Bunga Warna Saat Hover (Grayscale 0%)**: Begitu kursor pengguna menatap atau melewati sebuah kartu proyek, foto secara halus berangsur memekar memunculkan warna aslinya dalam kurun waktu **500 milidetik (`duration-500 ease`)**. Efek interaktif ini memunculkan rasa takjub (*WOW Factor*) bagi rekruter!

---

## 4. Tipografi & Hierarki Font (3-Tier Luxury Typographic System)

Proyek ini telah meningkatkan standar estetika antarmuka dari tipografi standar menjadi **3-Tier Luxury Typographic Architecture** yang diinjeksikan secara berkinerja tinggi melalui sistem `next/font/google` (tanpa pemanggilan jaringan eksternal maupun *layout shift* saat pemuatan perdana). Komposisi ini memadukan kemegahan editorial modern dengan akurasi rekayasa perangkat lunak kelas dunia.

```
┌────────────────────────────────────────────────────────────────────────────────────────────┐
│                       3-TIER LUXURY TYPOGRAPHIC HIERARCHY                                  │
├──────────────────────────────┬──────────────────────────────┬──────────────────────────────┤
│           OUTFIT             │      PLUS JAKARTA SANS       │        JETBRAINS MONO        │
│   (Headings & Display H1-H6) │   (Body Articles & UI Menu)  │   (Data, Metrics & Badges)   │
└──────────────────────────────┴──────────────────────────────┴──────────────────────────────┘
```

### A. Pembagian Peran 3 Font Eksklusif (Heading vs Body vs Technical)
- **1. Heading Font (Outfit — `--font-heading` / `font-heading`)**: Font bergaya geometri modern bernuansa editorial prestise tinggi. Secara otomatis disematkan pada seluruh judul elemen (**H1 sampai H6**), teks utama Hero Section, header modal proyek, dan judul seksi. Memberikan kelengkungan maskulin, tegas, namun berkelas berpadatan `tracking-tight` untuk memancarkan aura kemewahan modern.
- **2. Primary UI & Body Font (Plus Jakarta Sans — `--font-sans` / `font-sans`)**: Karya standar emas antarmuka produk teknologi masa kini (dipakai oleh ekosistem desain top dunia sekelas Stripe & Vercel). Dirancang dengan x-height optimal dan keharmonisan bentuk huruf, font ini mengemban tugas merender paragraf biografi, deskripsi proyek, menu navigasi, tombol CTA, dan formulir pesan dengan keterbacaan (*readability*) yang mulus bak majalah desain.
- **3. Monospace & Technical Font (JetBrains Mono — `--font-mono` / `font-mono`)**: Jawara universal di kalangan software engineer berkarakter IDE profesional. **Wajib dipasangkan khusus pada elemen data teknis dan kalkulator angka**:
  - Angka penghitungan statistik pencapaian di section *About* (misal: `5+ Proyek`, `3+ Tahun Pengalaman`).
  - Badge tagar penunjuk teknologi (misal: `[React.js]`, `[TypeScript]`, `[Firebase]`, `[Tailwind CSS]`).
  - Stempel tahun dan rentang tanggal pada timeline riwayat karir (*Experience* & *Story*).
  - Blok kode ulasan dan cuplikan JSON pada artikel dokumentasi.

### B. Skala Tipografi & Read-Only Blog Styling
Aturan ukuran font ditetapkan dengan hierarki kontras yang harmonis:
- **Heading H1 (Hero & Title Section)**: `text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--color-text-primary)] font-heading` (Karakter dominan berbobot berat dengan lekukan Outfit).
- **Heading H2 (Section Subtitle & Nama Proyek Modals)**: `text-2xl sm:text-3xl font-semibold tracking-tight font-heading`.
- **Heading H3 (Card Title & Timeline Company)**: `text-lg sm:text-xl font-semibold font-heading`.
- **Body Regular (Paragraf, Bio & Deskripsi)**: `text-sm md:text-base leading-relaxed text-[var(--color-text-secondary)] font-sans` (Menyala jernih dengan Plus Jakarta Sans).
- **Micro Data & Badges**: `font-mono text-xs md:text-sm px-3 py-1.5` (Presisi teknis dari JetBrains Mono).

> **📖 Kustomisasi Artikel BlockNote (`.story-reader-content`)**:
> Saat pengguna membuka halaman detail artikel atau cerita perjalanan di `/projects/[slug]` atau `/story/[slug]`, sistem menonaktifkan seluruh *chrome editor* (border & shadow menu editor BlockNote) via `globals.css` sehingga artikel merender kombinasi elegan **Outfit** pada judul bab dan **Plus Jakarta Sans** pada paragraf dengan jarak baris (`line-height: 1.8`) serta font size `1.05rem`, memberikan kenyamanan membaca kelas atas selevel medium.com atau Notion Enterprise.

---

## 5. Sistem Menu & Struktur Navigasi (SPA + Hash Sync)

Situs menerapkan kejeniusan rekayasa **SPA di atas SSR Next.js**: navigasi memanfaatkan pola **Client Side Rendering (CSR)** tanpa scroll vertikal antar halaman maupun loading layar putih. Semua rute diatur di dalam memori state `<AppShell />` dan diselaraskan secara artifisial dengan *History Address Bar peramban (`#hash` syntax)*!

### A. Topologi 8 Section Navigasi CSR
Berikut adalah tabel rekam jejak 8 Menu Section yang hidup saling bertukar tempat secara dinamis di area konten utama:

| Key Rute | Label Menu | Ikon Lucide | Peran & Konten Internal Section | Penampilan di Bottom Nav Mobile |
| :--- | :--- | :--- | :--- | :---: |
| `home` | **Home** | `House` | H1 Nama, Tagline Profesions, 3D Hero Visual, ShinyText, & 2 Tombol CTA Utama. | ✅ **Tampil di Bar Utama** |
| `about` | **About** | `User` | Foto Profil lingkar (1:1), Bio deskriptif 3 paragraf, & Kartu Statistik *Count-Up*. | ❌ (Terletak di dalam Drawer `☰`) |
| `experience`| **Experience** | `Briefcase` | Timeline kronologis vertikal (Kerja, Organisasi, Pendidikan) + Filter tab cepat. | ❌ (Terletak di dalam Drawer `☰`) |
| `projects` | **Projects** | `FolderOpen`| Grid etalase kartu proyek dengan filter pil, link Live Demo/Github & pemicu Modal Detail.| ✅ **Tampil di Bar Utama** |
| `tech-stack`| **Tech Stack** | `Layers` | 7 Kategori matriks ikon teknologi interaktif berbumbu *Wave Stagger Reveal*. | ❌ (Terletak di dalam Drawer `☰`) |
| `testimonials`|**Testimonials**|`MessageSquare`| Carousel testimoni kolega & klien (otomatis geser tiap 5s, terhubung ke Firestore). | ❌ (Terletak di dalam Drawer `☰`) |
| `story` | **Story** | `BookOpen` | Narasi reflektif riwayat perjalanan programming dengan emoji dan milestone sorotan. | ❌ (Terletak di dalam Drawer `☰`) |
| `contact` | **Contact** | `Mail` | Formulir komunikasi tervalidasi TypeScript, Toast feedback sonner, & tautan sosmed.| ✅ **Tampil di Bar Utama** |

---

### B. Layout Desktop: Vertical Fixed SidebarNav
Ketika diakses menggunakan laptop atau monitor desktop (lebar viewport $\ge 1024px$, breakpoint `lg:` Tailwind), navigasi dirender sebagai kolom vertikal di sebelah kiri:

```
┌─────────────┬────────────────────────────────────────────────────────┐
│  SIDEBAR    │                  MAIN CONTENT AREA                     │
│  (w-64)     │              (flex-1, overflow-y-auto)                 │
│             │                                                        │
│ [Foto 1:1]  │   ┌────────────────────────────────────────────────┐   │
│  Nama Anda  │   │                                                │   │
│  Full Stack │   │   <ActiveSection />                            │   │
│ ─────────── │   │   (Dirender via Dynamic Import Tanpa Reload)   │   │
│ 🏠 Home     │   │   • Transisi masuk menggunakan AnimatePresence  │   │
│ 👤 About    │   │   • Kanan ke kiri / Atas ke bawah halus        │   │
│ 💼 Exp.     │   │                                                │   │
│ 🚀 Proj.    │   └────────────────────────────────────────────────┘   │
│ 🧰 Stack    │                                                        │
│ 💬 Testi.   │   ┌────────────────────────────────────────────────┐   │
│ 📖 Story    │   │                  Footer Desktop                │   │
│ 📬 Cont.    │   └────────────────────────────────────────────────┘   │
│ ─────────── │                                                        │
│ 🌙 Mode/GH  │                                                        │
└─────────────┴────────────────────────────────────────────────────────┘
```
- **Spesifikasi Posisi**: `fixed left-0 top-0 h-full w-64` (Lebar pasti `16rem` / 256 pixel).
- **Styling Background**: Latar solid menggunakan `bg-[var(--color-bg-surface)]` dilingkupi garis pemotong kanan tipis `border-r border-[var(--color-border)]`.
- **State Link Aktif**: Menu terpantau bercahaya dengan latar belakang kontras mutlak `bg-[var(--color-interactive)]` dan huruf putih berkilat `text-[var(--color-interactive-text)] rounded-xl font-medium shadow-sm`.

---

### C. Layout Mobile: Glassmorphic BottomNav & Slide-Up Drawer
Pada perjumpaan dengan smartphone maupun tablet (< 1024px), kolom sidebar **dilenyap total** (`hidden lg:flex`). Sistem menyulap diri menjadi pola antarmuka bergaya **Mobile Native Application**:

```
┌────────────────────────────────────────────────────────────┐
│                  MAIN CONTENT AREA                         │
│                  (full width, pb-20)                       │
│                                                            │
│   <ActiveSection />                                        │
│   (Ruang bawah diberikan padding agar tidak tertimbun bar) │
│                                                            │
├────────────────────────────────────────────────────────────┤
│  🏠 Home         🚀 Projects      📬 Contact      ☰ More  │ ◄── BottomNav (h-16 fixed)
└────────────────────────────────────────────────────────────┘
                              │
                    (Klik tombol ☰ More / Hamburger)
                              ▼
                ┌────────────────────────────┐
                │  DRAWER MENU (Slide-Up)    │
                │  ------------------------  │
                │  👤 About                  │
                │  💼 Experience             │
                │  🧰 Tech Stack             │
                │  💬 Testimonials           │
                │  📖 Story                  │
                └────────────────────────────┘
```
- **BottomNav Bar**: `fixed bottom-0 left-0 right-0 h-16 z-50`. Dibungkus dengan **Glassmorphism berat** (`bg-[var(--color-bg-surface)]/80 backdrop-blur-md border-t border-[var(--color-border)]`).
- **3 Menu Utama + 1 Hamburger (`☰` More)**: Menemani ibu jari Anda untuk klik tercepat menuju Home, Projects, dan Contact.
- **MobileDrawer (Slide-up Sheet)**: Jika tombol Hamburger disentuh, tirai latar gelap (`bg-black/60 backdrop-blur-sm`) menutupi layar dan sebuah panel laci membusur ke atas dari bawah layar (`y: 100% ➔ 0` menggunakan *Framer Motion Spring Physics*: `damping: 25, stiffness: 300`). Tombol dalam laci berukuran lebih jumbo agar ramah ketukan jari (*touch friendly*).

---

## 6. Spacing, Grid Layout & Elevation Hierarchy

Untuk memastikan konten terhindar dari kesan berjubel dan sesak, tata letak berdasar pada ritme vertikal proporsional dan kedalaman dimensi visual 3 Lapis.

### A. Sistem Kedalaman Lapisan (3-Layer Elevation System)
Konsep kedalaman elemen diciptakan tanpa ketergantungan pada bayangan hitam (*drop shadow*) kotor, melainkan menggunakan graduasi kecerahan warna permukaan (*Surface Levels*):
1. **Layer 1 (Lantai Dasar / Page Main)**: `bg-[var(--color-bg-main)]`. Tidak memiliki bayangan. Dipakai untuk alas konten utama.
2. **Layer 2 (Komponen Statis & Kartu / Cards)**: `bg-[var(--color-bg-elevated)]`. Digunakan pada *Project Card*, *Testimonial Card*, dan Kotak Input Formulir. Dilengkapi border sangat tipis `border border-[var(--color-border)]` dan bayangan sepoi `shadow-sm`.
3. **Layer 3 (Melayang, Sticky Nav & Modal Dialogs)**: `bg-[var(--color-bg-surface)]/90`. Dipakai pada *Bottom Nav*, *Mobile Drawer*, dan *Dialog Modals*. Diperkuat bayangan dinamis `shadow-md` hingga `shadow-2xl` serta blur latar.

### B. Glassmorphic & Sudut Lengkung (Border Radius System)
- **Glassmorphism**: Diterapkan secara ekstensif pada bar navigasi, header cover proyek (`/projects/[slug]`), serta overlay modal dengan memodulasi rasio opasitas `bg-neutral-900/60` dipersatukan bersama `backdrop-blur-md` atau `backdrop-blur-lg`.
- **Sistem Lengkungan Sudut (Smooth Border Radius)**:
  - `rounded-full` (Pil Kapsul): Disematkan pada Badge kategori, Tombol Utama CTA, dan indikator pemfilter.
  - `rounded-2xl` / `rounded-3xl` (Lengkung Halus Modern): Disematkan pada struktur Kartu Proyek, bingkai foto utama, dan jendela Modal Dialog Shadcn UI agar selaras dengan estetika iOS/macOS terkini.
  - **Grid Responsif**: Pada section *Projects* dan *Testimonials*, susunan kontainer diadaptasikan dari: `grid-cols-1` di HP ➔ `sm:grid-cols-2` di Tablet ➔ `lg:grid-cols-3` di Desktop Lebar dengan jarak renggang konsisten `gap-6` (`24px`).

---

## 7. Animasi, Motion & Micro-Interactions

Pergerakan antarmuka ditangani eksklusif oleh gabungan perpustakaan **Framer Motion v12**, **React Bits**, dan **React Three Fiber (3D)**.

### A. Aturan Anti-Reflow & Page Transitions
> **⚠️ HUKUM PERFORMA ANIMASI (`SDD.md §4.3`)**: Animasi transisi **DILARANG KERAS** memodifikasi properti dimensi geomteri seperti `width`, `height`, `margin`, atau `padding` karena akan mengacaukan kalkulasi ulang layout CPU (*Reflow / Layout Shifts*). Animasi **HANYA diizinkan memutar, menggeser koordinat (`transform: translateY / translateX`), serta mengontrol `opacity`!**

- **Transisi Antar Section SPA (`AppShell.tsx`)**:
  ```tsx
  <AnimatePresence mode="wait">
    <motion.div
      key={activeSection}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <ActiveSection />
    </motion.div>
  </AnimatePresence>
  ```
  Saat menu diubah, section lama melayang pudar sedikit ke atas (`y: -16px`), sebelum section baru menyubur masuk dari bawah (`y: 16px`) hanya dalam tempo cepat 250 milidetik!

### B. Shared Layout ID (`layoutId`) & Wave Staggering
- **Kapsul Filter Proyek (`layoutId`)**: Ketika pengunjung memilih filter *"Web"*, *"Mobile"*, atau *"API"* pada katalog proyek, blok warna hitam/putih yang menandai tab aktif tidak meluncur kaku, melainkan meluncur melentuk melintasi tombol bak gumpalan magnet menggunakan fitur sihir `layoutId="category-pill"` dari Framer Motion.
- **Wave Staggering (Gelombang Ikon Tech Stack)**: Pada section *Tech Stack*, ke-30+ ikon teknologi (Next, Tailwind, Express, Docker, dll.) muncul bergantian dari kiri ke kanan dengan penundaan beruntun (`delay: index * 0.05s`), menghadirkan tontonan gelombang kinetik yang menghayati.
- **Magnetic Card & Button Lift**: Setiap elemen tombol dan kartu proyek diberi kepekaan gerak halus di mana kursor mouse akan mengangkat objek sekitar 2 hingga 4 pixel ke atas (`hover:-translate-y-1 transition-all duration-300`).

### C. Visual 3D & React Bits Micro-animations
Di arena *Hero Section* (`home`), identitas visual puncak diperdengarkan lewat kolosal interaksi modern:
- **3D Floating Elements (React Three Fiber & Three.js)**: Menyuguhkan partikel grafis tiga dimensi yang peka terhadap rotasi mouse atau kemeringan sensor giroskop pada perangkat mobile, diatur agar tetap ringan menggunakan `@react-three/drei` dan `meshline`.
- **ShinyText (React Bits Component)**: Tulisan spesialisasi profesi berputar memendarkan cahaya perak melintasi tubuh huruf secara siklis tanpa harus membebani stylesheet tambahan.

---

## 8. Aksesibilitas (A11y), Ergonomi & Target Performa

Desain yang indah akan sia-sia jika gagal dijangkau oleh semua kaum atau kandas dalam pengujian Google Lighthouse. Sistem kami mematok kepatuhan penuh terhadap standar kesesuaian Web Intensional (WAI-ARIA):

### ♿ Infrastruktur Aksesibilitas (A11y)
1. **HTML Semantik Murni**: Struktur DOM didistribusikan memposisikan `<header>`, `<nav>`, `<main>`, `<aside>`, `<section>`, dan `<article>` secara akurat. Setiap ikon non-teks dibekali dengan atribut `aria-label="Nama Aksi"`.
2. **Focus Ring yang Sangat Nyata**: Untuk memuliakan pengguna yang berselancar menggunakan tombol papan ketik (`Tab` & `Enter`), setiap elemen aktif memiliki garis batas:
   ```css
   *:focus-visible {
     outline: 2px solid var(--color-focus-ring);
     outline-offset: 2px;
   }
   ```
3. **Tombol Melompat Rahasia (`.skip-link`)**: Pengguna Screen Reader dapat menekan tombol *Tab* pertama kali saat muatrai untuk melepaskan tautan tersembunyi berbunyi *"Lumpat Langsung Ke Konten Utama"*, menghindarkan mereka dari bosannya membacakan menu sidebar satu demi satu.
4. **Empati Sensitivitas Gerakan (Reduced Motion Support)**:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
       scroll-behavior: auto !important;
     }
   }
   ```
   Bagi pasien penderita insomnia vertiginous atau gangguan penglihatan terhadap gerak bergelak, sistem akan mempekerjakan CSS Query di atas guna membubuhkan durasi animasi menjadi nyaris `0 ms`—mengubah website seketika menjadi tenang, statis, namun tetap sepenuhnya fungsional.

### 🏆 Benchmark Performa Tak Tertandingi (`SDD.md §6 - TAC-04`)
Sebagai komitment tertinggi, arsitektur visual ini diikat oleh undang-undang **Technical Acceptance Criteria (TAC-04)** yang melarang keras deployment jika skor pengujian mengalami pelemahan:

```
┌─────────────────────────────────────────────────────────────┐
│             GOOGLE LIGHTHOUSE BENCHMARK TARGETS             │
├──────────────────────────┬──────────────────────────────────┤
│ Matrix Audit             | Skor Minimal yang diwajibkan     │
├──────────────────────────┼──────────────────────────────────┤
│ 🚀 Performance           │ ≥ 95% (Target Ideal: 100%)      │
│ ♿ Accessibility          │ ≥ 95% (Target Ideal: 100%)      │
│ 🛡️ Best Practices         │ 100%                             │
│ 🔍 SEO Optimization      │ 100%                             │
└──────────────────────────┴──────────────────────────────────┘
```
Kecepatan istimewa ini bisa digapai karena:
- Pemotongan berkas kode (*Code Splitting*) dan Lazy Loading memadai melalui `next/dynamic`.
- Seluruh file foto dikonversi secara cerdas ke format masa depan **WebP/AVIF** dengan kompresi tingkat tinggi dari komponen `<Image />` bawaan Next.js.
- Peniadaan pembiasan warna kromatik dari DOM berkat keajaiban CSS kustom token di Tailwind v4.

---

<p align="center">
  <b>🌟 Didesain Berdasarkan Prinsip Presisi Matematika, Performa Tanpa Tandingan, dan Karya Seni Antarmuka Masa Depan. 🌟</b>
  <br/>
  <span>© 2026 Personal Portfolio Website — Monochrome Professional Edition</span>
</p>
