🛠️ System Design Document (SDD)Personal Portfolio Website (Monochrome Professional Edition)FieldDetailDokumenSystem Design Document (SDD)Versi1.0.0StatusApprovedTech StackNext.js (App Router), TypeScript, Tailwind CSS, FirebaseDeploymentVercel (Edge Network)1. Arsitektur Sistem UtamaSistem ini adalah Single Page Application (SPA) yang secara artifisial disematkan ke dalam infrastruktur Server-Side Rendering (SSR) Next.js. Ini adalah sebuah kompromi arsitektural (architectural trade-off) untuk mendapatkan kecepatan transisi CSR dengan tetap mengamankan Deep-Linking melalui sinkronisasi URL Hash.1.1 Topologi Komponen (Component Tree)RootLayout (app/layout.tsx)
└── Page (app/page.tsx)
└── AppShell (State Manager: activeSection)
├── SidebarNav (Desktop: viewport >= 1024px)
├── MainContentArea [Framer Motion: AnimatePresence]
│ └── <ActiveSectionComponent /> (Di-render via Dynamic Imports)
├── BottomNav (Mobile: viewport < 1024px)
└── MobileDrawer (Triggered by BottomNav Hamburger Menu)
1.2 Sinkronisasi Routing (CSR + Hash Sync)Karena kita mengabaikan file-based routing Next.js untuk section individu (demi UX transisi SPA), logika sinkronisasi state ke peramban (browser) wajib diimplementasikan di level AppShell.Logika Eksekusi:Initial Load: Saat aplikasi dimuat, AppShell memeriksa window.location.hash. Jika terdapat hash (misal: /#projects), state activeSection diubah untuk merender komponen ProjectsSection.Navigation Event: Saat pengguna menekan menu, fungsi pembaruan state harus menyuntikkan hash baru ke dalam objek History peramban tanpa me-reload halaman (history.pushState(null, '', '#section')).Session Persistence: Menyimpan state di sessionStorage agar refresh halaman tanpa hash tidak mengembalikan pengguna ke halaman Home secara paksa.2. Struktur Direktori CodebaseDirektori memisahkan komponen presentasional (dumb components) dari lapisan data dan lapisan API secara ketat.├── app/
│ ├── api/
│ │ ├── contact/route.ts # Endpoint POST (Honeypot + Firestore)
│ │ └── testimonials/route.ts # Endpoint GET (Firestore Reader)
│ ├── layout.tsx # Konfigurasi Font (Geist) & Metadata Base
│ └── page.tsx # Entri Utama (Client Component Injection)
├── components/
│ ├── global/ # Komponen layout terpusat (Navigasi, AppShell)
│ ├── sections/ # Komponen per-section (Wajib di-export default)
│ └── ui/ # Reusable elements (Shadcn UI tersesuaikan)
├── data/ # Berkas statis fallback (_Source of Truth_ Non-DB)
│ ├── experiences.ts
│ ├── projects.ts
│ ├── techstack.ts
│ └── story.ts
├── lib/
│ ├── firebase.ts # Klien Firebase SDK (Singelton)
│ ├── firebase-admin.ts # Firebase Admin SDK (Khusus environment Server)
│ └── utils.ts # Helper utilitas (Tailwind merge, clsx) 3. Optimasi Performa & MemoriMemuat seluruh komponen situs web ke dalam satu halaman (Single Page) akan menghancurkan Initial Load Time jika tidak dimitigasi.Strategi Mitigasi Wajib:Lazy Loading / Dynamic Imports: Semua komponen di dalam folder components/sections/ wajib diimpor menggunakan next/dynamic di dalam AppShell.Contoh: const ProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection'))Aset Statis Lokal: Firebase Storage dilarang digunakan untuk aset portofolio dasar. Semua gambar dan ikon harus disajikan langsung dari direktori /public/images/ untuk menekan Network Latency dan memaksimalkan Edge Caching Vercel.Image Optimization: Setiap tag gambar wajib menggunakan komponen <Image /> bawaan Next.js (next/image) untuk konversi format otomatis ke WebP/AVIF.4. Design System: Monokrom ProfesionalSistem ini melarang keras penggunaan warna kromatik (biru, merah, hijau, dll) dalam elemen UI. Skema visual murni bergantung pada kontras antara hitam, putih, dan spektrum abu-abu (neutral).4.1 Tailwind CSS Variables MappingElemen UILight Mode (class)Dark Mode (dark:class)Main Background#FFFFFF (bg-white)#0A0A0A (bg-neutral-950)Surface/Card/Drawer#FAFAFA (bg-neutral-50)#171717 (bg-neutral-900)Border / Divider#E5E5E5 (border-neutral-200)#262626 (border-neutral-800)Text Primary (H1-H4)#171717 (text-neutral-900)#FAFAFA (text-neutral-50)Text Secondary (P)#525252 (text-neutral-600)#A3A3A3 (text-neutral-400)Text Muted#A3A3A3 (text-neutral-400)#525252 (text-neutral-600)Button Primary / Active#000000 (bg-black text-white)#FFFFFF (bg-white text-black)4.2 TipografiMenggunakan Next.js Font Optimization (next/font/google atau next/font/local).Main Text (Geist Sans): Digunakan untuk semua Heading dan Body Paragraph. Heading menggunakan tracking-tight (spasi huruf rapat).Data/Metrics (Geist Mono): Wajib digunakan untuk badge angka pencapaian, tag tech stack, dan elemen visual mirip kode.4.3 Spesifikasi Visual & AnimasiFilter Gambar: Semua thumbnail proyek dan avatar secara default wajib dipaksa menjadi monokrom menggunakan kelas grayscale. Warna asli hanya dirender secara transisi penuh (hover:grayscale-0 duration-500) saat pointer berada di atas elemen.Transisi Section: Animasi transisi menggunakan Framer Motion dilarang menggunakan manipulasi dimensi lebar/tinggi untuk menghindari Reflow/Layout Shift. Hanya gunakan opacity dan transform y (translasi).Interaksi Elemen: Tombol dan kartu menggunakan elevasi transform halus (hover:-translate-y-1) tanpa perlu mempertebal efek bayangan berlebihan.5. Keamanan & Skema DatabaseKomunikasi antara klien dan basis data Firestore dijembatani secara eksklusif oleh rute API Serverless Next.js, menutupi SDK Admin. Kredensial Firebase tidak diekspos ke klien untuk operasi modifikasi (write).5.1 Skema FirestoreCollection: messagesname (String, required)email (String, required)subject (String, required)message (String, required, min 10 chars)createdAt (Timestamp, server-generated)read (Boolean, default: false)ipHash (String, hashed value untuk perlindungan privasi)Collection: testimonialsname (String)position (String)relationship (String)text (String)rating (Number)5.2 Strategi Perlindungan API (Honeypot & Rate Limiting)Rute /api/contact wajib melaksanakan tiga lapisan pertahanan berikut secara berurutan, sebelum menyentuh koneksi Firebase:Lapisan 1: Honeypot Validation (Client-to-Server)Terdapat sebuah input tersembunyi (<input type="text" name="honeypot" class="hidden" autocomplete="off" />). Jika API mendeteksi kolom honeypot dalam payload request terisi karakter sekecil apa pun, sistem langsung mengembalikan status 200 OK (Palsu) ke klien. Pesan dibuang, tidak ada operasi Firestore yang dijalankan.Lapisan 2: Structural ValidationValidasi RegEx terhadap format email dan pengecekan jumlah karakter string. Gagal pada tahap ini menghasilkan error HTTP 400 Bad Request.Lapisan 3: IP Hash Rate LimitingJika lolos Lapisan 1 dan 2, IP Address pemohon diambil, lalu dienkripsi satu arah (SHA-256 Hash). API memeriksa query Firestore: Apakah terdapat lebih dari 3 entri dengan IP Hash ini dalam 60 menit terakhir? Jika Ya, batalkan transaksi dan tolak dengan HTTP 429 Too Many Requests. Jika Tidak, masukkan pesan baru ke database.5.3 Firestore Security Rules (Rules_version = '2')Meskipun penulisan pesan difilter oleh API Route, perlindungan absolut harus ditegakkan pada tingkat basis data.rules_version = '2';
service cloud.firestore {
match /databases/{database}/documents {
// Verifikator Hak Akses Admin
function isAdmin() {
return request.auth != null && request.auth.token.email == 'YOUR_ADMIN_EMAIL@domain.com';
}

    match /messages/{docId} {
      // Server Admin SDK otomatis melewati aturan ini.
      // Rule ini mencegah user luar merekayasa penulisan pesan langsung ke Firestore client SDK.
      allow create: if false;
      allow read, update, delete: if isAdmin();
    }

    match /testimonials/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }

}
} 6. Persyaratan Penerimaan Arsitektur (Technical Acceptance Criteria)Sistem dianggap gagal produksi jika tidak memenuhi seluruh parameter metrik ini saat tahap rilis:TAC-01 (Bundle Size): Pemuatan awal JS (Initial JS Payload) tidak boleh melebihi 150kB sebelum Gzip/Brotli compression. (Verifikasi: Dynamic imports berfungsi).TAC-02 (Navigation Integrity): Memasukkan parameter /#tech-stack secara langsung di Address Bar peramban pada halaman Incognito baru wajib merender AppShell langsung pada state tech-stack tanpa melintasi status Home yang kasatmata.TAC-03 (Security Efficacy): Skrip bot otomatis yang mengisi elemen <form> secara paksa (termasuk kolom yang disembunyikan via CSS) harus mendapat respons API positif tetapi basis data Firestore harus tetap kosong.TAC-04 (Performance Benchmark): Google Lighthouse Audit (Mobile Configuration) dilarang keras jatuh di bawah skor 95 pada matriks Performance, Accessibility, Best Practices, dan SEO.
