# DESIGN SYSTEM & GUIDELINES

Dokumen ini merupakan penjabaran lengkap 35 poin kerangka desain (AturanDesign) yang diselaraskan secara spesifik dengan arsitektur proyek portofolio ini (Next.js App Router, Tailwind CSS dengan Semantic Variables, Framer Motion, dan Shadcn UI).

---

## 1. Design Philosophy
- **Modern & Clean**: Antarmuka minimalis, bebas dari elemen visual yang tidak perlu.
- **Premium & Elegant**: Penggunaan warna yang berimbang dengan *glassmorphism* dan ruang napas (whitespace) yang luas.
- **Interactive**: Sangat bergantung pada micro-animations untuk merespon interaksi sekecil apapun dari pengguna.
- **Content First**: Konten (proyek, pengalaman) menjadi pusat perhatian, didukung oleh desain, bukan sebaliknya.
- **Performance & Accessibility First**: Performa rendering optimal melalui Next.js (SSR/ISR) dan markup HTML yang semantik.
- **Consistency First**: Aturan yang sama diterapkan di seluruh komponen (Single Source of Truth di `globals.css`).

## 2. Color System
Menggunakan *Semantic Color Tokens* untuk perpindahan transparan antara Light/Dark Theme.
- **Primary/Accent**: Diwakili oleh `var(--color-interactive)` dan `var(--color-interactive-text)` (biasanya nuansa biru/indigo).
- **Backgrounds**: `bg-main` (halaman), `bg-surface` (layer 1), `bg-elevated` (layer atas, card).
- **Text**: `text-primary` (putih/hitam dominan), `text-secondary` (deskripsi), `text-muted` (placeholder/disabled).
- **Borders & Dividers**: `color-border` digunakan secara seragam di seluruh elemen pembatas.
- **Dark/Light Mode**: Dikelola secara terpusat tanpa utility `dark:` pada class, melainkan melalui perubahan nilai HEX di blok `:root` dan `@media (prefers-color-scheme: dark)` di `globals.css`.

## 3. Typography
- **Primary Font**: **Geist** (`font-geist-sans`). Font utama untuk semua antarmuka pengguna.
- **Monospace Font**: **Geist Mono** (`font-mono`). Untuk kode, badge teknologi, dan tag meta.
- **Hierarchy & Scale**:
  - `text-6xl` hingga `text-4xl` untuk `<h1>` (Hero/Judul Proyek) dengan `tracking-tight` dan `font-bold`.
  - `text-lg` hingga `text-xl` untuk subtitle/pembuka.
  - `text-sm` hingga `text-base` untuk body text reguler dengan `leading-relaxed`.

## 4. Spacing System
- **Base Scale**: Memanfaatkan sistem grid dan spacing Tailwind (`gap-2`, `gap-6`, `p-6`, `py-12`, `mb-12`).
- **Container**: `max-w-4xl` atau `max-w-5xl` dengan auto margin horizontal (`mx-auto`) agar terpusat di layar besar.
- **Section Padding**: Menggunakan spacing vertikal yang luas (misal: `py-24` di desktop, `py-16` di mobile).

## 5. Layout System
- **AppShell**: Single Page Application feel untuk halaman utama (kiri untuk navigasi, kanan untuk area render CSR).
- **Grid System**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` untuk section seperti Projects dan Testimonials.
- **Flex Layout**: Flexbox sangat dominan (`flex-col`, `items-center`, `justify-between`) untuk penempatan tata letak elemen internal (Header, Hero).

## 6. Border Radius System
- Secara garis besar menggunakan sudut lengkung lembut (Soft/Smooth Rounded).
- **Buttons / Pills**: `rounded-full` untuk badge kategori, CTA button, dan tombol navigasi.
- **Cards & Dialogs**: `rounded-2xl` atau `rounded-3xl` untuk memberikan kesan premium.
- **Images**: Selalu dipotong lengkung (`rounded-xl` atau inherit dari container `overflow-hidden`).

## 7. Elevation System
- Lapisan kedalaman visual yang dikombinasikan antara warna background dan shadow.
- **Layer 1**: `bg-[var(--color-bg-main)]` (Tanpa bayangan).
- **Layer 2 (Cards)**: `bg-[var(--color-bg-elevated)]` + `border` + `shadow-sm`.
- **Layer 3 (Floating, Modals, Nav)**: `bg-[var(--color-bg-surface)]` + `shadow-md` + Glassmorphism.

## 8. Glassmorphism
- Efek kaca buram digunakan luas pada elemen sticky dan overlay.
- **Implementasi Utama**: Kombinasi transparan (`bg-[var(--color-bg-surface)]/50` atau `/60`) dan blur (`backdrop-blur-md` atau `backdrop-blur-sm`).
- Sering ditemui pada: SidebarNav, BottomNav, Header Cover Proyek, dan overlay modal.

## 9. Shadows
- **Soft Shadow**: `shadow-sm` secara default untuk memberi kesan dimensi tanpa terlalu mencolok.
- **Hover Shadow**: `hover:shadow-md` pada card dan tombol.
- Drop Shadow text (`drop-shadow-sm` / `md`) sering dipakai pada teks di atas gambar (seperti judul di halaman proyek).

## 10. Borders
- **Standard Border**: `border border-[var(--color-border)]` untuk card, input, dan panel. Dibuat sangat tipis (1px) dengan warna subtle.
- **Active/Focus Border**: Pada input form atau filter yang aktif, sering digantikan dengan background fill (`bg-[var(--color-interactive)]`) atau border menyala.

## 11. Icons
- Menggunakan **Lucide React** (`lucide-react`) untuk ikon interface standar (Arrow, Home, Contact, chevron).
- Menggunakan **Iconify** (`@iconify/react`) untuk logo teknologi/brand (Next.js, Tailwind, GitHub).
- **Size**: Default `w-4 h-4` untuk inline, dan `w-5 h-5` atau `w-6 h-6` untuk menu.

## 12. Buttons
- Mengacu pada komponen Button Shadcn yang telah disesuaikan semantic tokkennya.
- **Primary**: `bg-[var(--color-interactive)] text-[var(--color-interactive-text)]` berbentuk `rounded-full`.
- **Outline/Ghost**: Bordered atau transparan, berubah background `hover:bg-black/5` (diadaptasi secara dinamis untuk dark mode).
- Memiliki efek `hover:-translate-y-0.5` dan transisi 300ms.

## 13. Forms
- **Contact Form**: Menggunakan form terpusat yang divalidasi.
- **Input/Textarea**: Border tipis (`var(--color-border)`), background solid `bg-[var(--color-bg-elevated)]`, dan transisi ring pada saat `focus:`.
- Feedback instan disajikan via *Toaster* (Shadcn UI).

## 14. Cards
- **Project Card**: Image thumbnail di atas (`aspect-video`), judul, deksripsi, stack teknis, dan call to action (Github/Demo).
- **Hover Effect**: Card terangkat sedikit (`hover:-translate-y-1`) dipadu dengan `hover:shadow-md`.
- **Loading Skeleton**: Selalu disiapkan versi skeleton yang persis menyerupai bentuk card saat state *loading* via `Suspense`.

## 15. Badges
- **Technology Badge**: Desain mono/teknis (`font-mono text-xs px-3 py-1.5`) dengan border tipis dan latar `elevated`.
- **Category Badge**: Pill berbentuk `rounded-full`, memiliki state aktif transisi smooth via Framer Motion `layoutId`.

## 16. Navigation
- **Sidebar (Desktop)**: Vertical nav (`w-64`) tetap di sisi kiri layar dengan avatar profile, tautan menu, dan toggle tema.
- **Bottom Nav (Mobile)**: Glassmorphism bar di bawah layar dengan icon menu dan laci (drawer) hamburger untuk menu ekstra.
- Menggunakan SPA *active indicator* yang responsif.

## 17. Hero Section
- Judul nama tebal (H1) diiringi tagline deskriptif.
- Biasanya memiliki dua CTA (Call to Action): Primary ("Lihat Proyek") dan Outline ("Hubungi").
- Latar belakang memanfaatkan subtle particle/gradient effect untuk menegaskan estetika modern.

## 18. Sections
- Di-render dalam satu halaman (SPA) yang dimount secara dinamis lewat `AppShell.tsx`:
  - `HeroSection` (Perkenalan)
  - `AboutSection` (Bio)
  - `ExperienceSection` (Timeline vertikal)
  - `ProjectsSection` (Grid dengan pagination dan filter)
  - `TechStackSection` (Grid ikon teknologi)
  - `TestimonialsSection`
  - `StorySection`
  - `ContactSection`

## 19. Animation System
- **Framer Motion**: Pustaka animasi utama.
- **Page Transition**: Menggunakan `<AnimatePresence mode="wait">` untuk transisi antar section SPA (fade-in & slide-up `y: 16`).
- **Stagger**: Item berulang seperti list pengalaman dan list proyek muncul bergantian (`delay` interval berurutan).

## 20. Motion Timing
- Cepat dan Elegan. Durasi transisi elemen (seperti hover) menggunakan Tailwind `transition-all duration-300`.
- Animasi masuk section `duration: 0.25, ease: 'easeInOut'`.

## 21. Micro Interactions
- Tombol dan Card: Efek *Magnetic* ringan (lift) saat di-hover (`-translate-y-0.5`).
- *Click state*: Scale down sedikit (`active:translate-y-0`).
- Transisi Active Category (Filter Project): Background berbentuk kapsul yang berpindah mulus menggunakan properti `layoutId` dari framer-motion.

## 22. Background Effects
- Subtle noise texture / gradients yang diinisiasi dari global CSS.
- Pada header project (`/projects/[slug]`), efek transisi gradient ke arah transparan yang tajam namun memiliki blur (`backdrop-blur`).

## 23. Images & Media
- **Image Cover Proyek**: Wajib memiliki aspect ratio `aspect-video md:aspect-[21/9]` dengan batas `max-h-[70vh]` dan gaya `object-cover`.
- Disimpan di `public/images/` untuk efisiensi render dan menghemat biaya bandwidth server eksternal, kecuali thumbnail khusus.

## 24. Accessibility (a11y)
- Seluruh elemen warna telah menggunakan semantic yang memastikan kontras warna terbaca di Dark maupun Light mode.
- Tagging HTML semantik (`section`, `aside`, `nav`, struktur heading H1-H6 logis).
- Penggunaan icon *Lucide* disertai aria-label ketika tidak didampingi teks.

## 25. Performance
- **Client Side Navigation**: Perpindahan tab (menu) di AppShell sangat cepat karena komponen telah dimuat di client.
- **Data Fetching**: Halaman proyek (`/projects/[slug]`) memanfaatkan render sisi server / Incremental Static Regeneration (ISR) dari Firebase Admin.

## 26. Responsive Design
- Menggunakan standar Tailwind `sm:`, `md:`, `lg:`.
- **Mobile First**: Semua base class didesain untuk mobile (tumpukan 1 kolom, font lebih kecil).
- **Desktop Adaptation**: Navigasi pindah dari bawah ke sisi kiri (Sidebar), dan grid melebar ke 3 kolom.

## 27. Theme System
- Sistem tema sepenuhnya otomatis (`Light`, `Dark`, `System`) dengan dukungan `next-themes`.
- Tidak perlu class berulang (tidak ada styling seperti `dark:bg-black`). Warna akan membalik dengan mulus menyesuaikan set CSS Variabel di root.

## 28. Component States
- **Hover**: Transisi warna latar dan efek bayangan/angkat.
- **Active/Focus**: Fokus interaktif (misalnya pada input contact).
- **Disabled**: Penurunan opasitas (opacity 30-50%) dan cursor not-allowed (contoh: tombol pagination yang nonaktif).

## 29. Feedback Components
- Penggunaan library **Sonner** (`components/ui/sonner.tsx`) untuk memberikan toast feedback saat formulir kontak berhasil dikirim atau jika terjadi error pada request Firebase.
- **Skeletons**: Terdapat fallback layout kerangka di komponen Suspense saat menunggu SWR loading (misal: `<ProjectsSkeleton />`).

## 30. Portfolio Identity
- Identitas didasari oleh kesan teknikal namun elegan (Developer-Designer hybrid).
- Signature efek ada pada tipografi *Geist* dipadukan interaksi layout yang mulus (AppShell style).

## 31. SEO & Metadata
- **Dynamic Metadata**: Digenerate secara dinamis di server (`generateMetadata` pada `/projects/[slug]`) sehingga judul, deskripsi, dan *OpenGraph image/Twitter Card* otomatis beradaptasi dengan metadata Firebase.

## 32. Code Standards
- **File Structure**: Rutin menjaga pemisahan UI murni (`src/components/ui/`) dan komponen fungsional per bagian (`src/components/sections/`).
- **Data Access**: Logic pengambilan data berada di `lib/firebase.ts` (client) dan `lib/firebase-admin-db.ts` (server/API).
- **Formatting**: Terintegrasi ESLint dan TypeScript Strict (tidak ada *any* sebisa mungkin tanpa alasan kuat).

## 33. UX Principles
- **No-reload Experience**: Navigasi dalam portfolio terasa seperti aplikasi native tanpa jeda muat putih.
- **Progressive Disclosure**: Konten berat seperti rendering `BlockNote`/Markdown disajikan secara lazy atau diletakkan di rute terpisah agar *Home* tetap ngebut.

## 34. Quality Checklist
- Memastikan rasio dan proporsi gambar sampul tetap sama walau gambar diubah (`object-cover`).
- Memastikan tidak ada *layout shift* yang mengganggu mata saat data sedang difetch (menggunakan Skeletons).

## 35. Future Scalability
- Proyek sudah disiapkan (CMS Ready) menggunakan **Firebase Firestore**, artinya jika kelak ingin dibuatkan panel admin dashboard, semua data proyek, testimoni, dan *messages* bisa langsung dihubungkan tanpa mengubah arsitektur front-end klien ini secara radikal.
