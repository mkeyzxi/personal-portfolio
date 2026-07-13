# 📖 Story Share Card Generator

## Generate Story Image (9:16) untuk WriteMbul (Muhammad Makbul N)

---

# Tujuan

Saat pengguna menekan tombol **Share**, selain membagikan URL seperti biasa, tersedia opsi baru:
- ❤️ Love
- 🔗 Copy Link
- 📤 Share Link
- 🖼️ Generate Story Image

Fitur **Generate Story Image** akan membuat gambar otomatis berukuran **1080 × 1920 (Aspect Ratio 9:16)** yang siap diposting ke Instagram Story, WhatsApp Status, Facebook Story, TikTok Story, dll.

---

# Tujuan Desain

Story dirancang agar terlihat seperti kartu promosi profesional yang memperlihatkan identitas website portofolio saat ini. Desain kartu bersifat **tunggal (hanya 1 layout dan template)** dan konsisten menggunakan bahasa desain **Monokrom Profesional** (Grayscale/Neutral) agar menyatu sempurna dengan estetika website Anda.

Kartu ini akan menampilkan:
- Branding website & Logo
- Foto profil & Nama Penulis
- Judul Story
- Ringkasan/Deskripsi singkat
- Cover Story (Thumbnail proyek/artikel dengan efek monokrom)
- QR Code / Link URL unik
- CTA (Call To Action)

---

# Ukuran

```
Width  : 1080px
Height : 1920px
Aspect Ratio: 9:16
```

*Catatan: Render component pada layer/DOM dilakukan dengan ukuran **360px × 640px** dan diekspor menggunakan opsi `pixelRatio: 3` untuk menghasilkan resolusi tajam 1080 × 1920.*

---

# Layout Desain (Tunggal)

```
+--------------------------------------------------+
|                                                  |
|                   [LOGO] WRITEMBUL               |
|                 Stories that inspire             |
|                                                  |
|  ----------------------------------------------  |
|                                                  |
|                   COVER STORY                    |
|                (Thumbnail Grayscale)             |
|                                                  |
|  ----------------------------------------------  |
|                                                  |
|  Judul Story yang Menarik                        |
|                                                  |
|  Deskripsi singkat cerita atau ringkasan proyek |
|  maksimal 3-4 baris untuk kenyamanan             |
|  membaca di layar ponsel...                      |
|                                                  |
|  ----------------------------------------------  |
|                                                  |
|  ❤️ 1,234 Likes        📅 14 Juli 2026            |
|                                                  |
|  👤 Muhammad Makbul N                            |
|     Creator & Full Stack Developer               |
|                                                  |
|  ----------------------------------------------  |
|                                                  |
|                   [ QR CODE ]                    |
|                                                  |
|             writembul.com/story/slug             |
|                                                  |
|  ----------------------------------------------  |
|                                                  |
|              [ READ FULL STORY ]                 |
|                                                  |
|            Created with WriteMbul                |
|                                                  |
+--------------------------------------------------+
```

---

# Informasi yang Ditampilkan

## Header
- Logo website (Monokrom)
- Nama Website: `WriteMbul`
- Tagline: `Stories that inspire.`

## Cover
- Menggunakan thumbnail dari story terkait.
- Menggunakan filter monokrom (`filter: grayscale(100%)`) untuk menyelaraskan estetika.
- Jika tidak ada thumbnail, gunakan solid background / fallback neutral surface (`#FAFAFA` / `#171717`).

## Judul
- Menggunakan font sans-serif tebal.
- Contoh: `Belajar Flutter Sampai Deploy iOS`

## Ringkasan
- Diambil otomatis dari ringkasan konten (maksimal 180 karakter).
- Jika melebihi batas, dipotong secara otomatis dengan ellipsis (`...`).

## Author
- Foto profil bulat (avatar) dengan border halus.
- Nama Penulis: `Muhammad Makbul N`
- Role/Jabatan: `Creator & Full Stack Developer`

## Like & Metadata
- Jumlah suka dengan ikon hati: `❤️ 1,234 Likes`
- Tanggal Publikasi: `📅 14 Juli 2026`

## Link & QR Code
- QR Code dinamis berisi tautan langsung ke halaman story terkait.
- URL teks bersih di bawah QR Code: `writembul.com/story/[slug]`

## CTA & Branding Footer
- Tombol aksi utama (non-interaktif pada gambar, tapi berfungsi sebagai visual cue): `READ FULL STORY` dengan border tegas atau solid fill yang kontras.
- Label branding kecil: `Created with WriteMbul • writembul.com`

---

# Sistem Warna (Monokrom Profesional)

Sesuai dengan `globals.css` (Monokrom Profesional), sistem warna pada Story Card **tidak menggunakan warna kromatik** (tanpa warna merah, biru, atau gradient warna-warni). Warna diadaptasi secara dinamis berdasarkan active theme (Light/Dark mode) dari website saat ini:

| Elemen | Light Mode (Warna) | Dark Mode (Warna) |
| :--- | :--- | :--- |
| **Background Utama** | `#FFFFFF` | `#0A0A0A` |
| **Card / Container Surface** | `#FAFAFA` | `#171717` |
| **Teks Utama (Primary)** | `#171717` | `#FAFAFA` |
| **Teks Sekunder (Secondary)** | `#525252` | `#A3A3A3` |
| **Border / Garis Pembatas** | `#E5E5E5` | `#262626` |
| **CTA Button Background** | `#000000` | `#FFFFFF` |
| **CTA Button Text** | `#FFFFFF` | `#000000` |
| **Thumbnail / Cover** | `grayscale(100%)` | `grayscale(100%)` |

---

# Font & Tipografi

Mengikuti token font utama pada website Anda:
- **Heading & Body Text**: `Geist` (Sans-serif)
- **Metadata, Link & Code**: `Geist Mono` (Monospace)

---

# Struktur Data (TypeScript)

```ts
export interface StoryCardData {
  title: string;
  description: string;
  thumbnail?: string;
  slug: string;
  likes: number;
  authorName: string;
  authorPhoto: string;
  authorRole: string;
  websiteUrl: string;
  publishDate: string;
}
```

---

# Komponen Card

```
StoryShareCard (Width: 360px, Height: 640px)
├── Header (Logo, Title, Tagline)
├── Thumbnail/Cover (Grayscale image / Neutral Fallback)
├── Title & Description
├── Meta Info (Likes Count & Publish Date)
├── Author Profile (Avatar, Name, Role)
├── QR Code Section (QR Canvas & Clean URL text)
└── Footer CTA (Solid Button Style & Branding Text)
```

---

# Alur Kerja Fitur

```
Klik "Share" di halaman Detail Story
               │
               ▼
Tampil Bottom Sheet/Modal Opsi Share
               │
               ▼
Klik "🖼️ Generate Story Image"
               │
               ▼
Sistem merender komponen "StoryShareCard" secara invisible (di luar viewport)
               │
               ▼
Konversi DOM ke berkas gambar PNG menggunakan library 'html-to-image'
               │
               ▼
Unduh berkas PNG otomatis ke perangkat pengguna
               │
               ▼
Pengguna mengunggah gambar ke Instagram Story / WhatsApp Status
```

---

# Library & Integrasi

Gunakan library **`html-to-image`** karena hasil rendering teks dan gambar terbukti paling tajam dan presisi pada layout CSS modern.

### Instalasi Dependensi
```bash
npm install html-to-image
# atau
pnpm add html-to-image
```

### Implementasi Ekspor Gambar
```tsx
import { toPng } from 'html-to-image';

export const exportStoryCard = async (elementId: string, filename: string = 'story-card.png') => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const dataUrl = await toPng(element, {
      pixelRatio: 3, // Mengubah 360x640 menjadi 1080x1920
      cacheBust: true,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
      }
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Gagal menghasilkan gambar story:', error);
  }
};
```

---

# Ukuran Komponen & Konversi Resolusi

Komponen di-render di dalam browser dengan dimensi web mobile standar untuk menjaga kualitas perbandingan font:
- **Dimensi Render (DOM)**: `360px × 640px` (Aspect Ratio 9:16)
- **Faktor Skala (pixelRatio)**: `3`
- **Dimensi Hasil Ekspor (PNG)**: `1080px × 1920px` (Siap untuk Instagram/WhatsApp Story tanpa pecah)

---

# Desain Antarmuka Bottom Sheet Share

Bottom Sheet minimalis yang muncul saat menekan tombol share:
```
┌──────────────────────────────────────┐
│             Share Story              │
├──────────────────────────────────────┤
│  ❤️  Suka Story Ini                  │
│  🔗  Salin Tautan                    │
│  📤  Bagikan Tautan                  │
│  🖼️  Buat Gambar Instagram Story     │
│                                      │
│  [ Batal ]                           │
└──────────────────────────────────────┘
```

---

# State Animasi Loading

Saat proses rendering gambar sedang berlangsung, tampilkan overlay loading semi-transparan di atas layar pengguna dengan animasi ringkas:
- **Teks**: `Menyiapkan Gambar Story...`
- **Visual**: Spinner minimalis berputar lambat (menggunakan Geist Mono).
- **Setelah Selesai**: Mengunduh berkas secara instan dan menampilkan toast sukses `Berhasil mengunduh gambar!`.

---

# Panduan Optimasi Rendering

1. **Efek Monokrom Konsisten**: Pastikan thumbnail artikel dan avatar menggunakan filter CSS monokrom agar menyatu dengan palet situs saat ini.
2. **Preload Font**: Ekspor hanya boleh berjalan setelah font `Geist` selesai dimuat (gunakan `document.fonts.ready`) agar teks tidak berubah menjadi font sistem default saat diunduh.
3. **CORS Images**: Foto profil (avatar) dan thumbnail dari Firebase/sumber eksternal harus mengizinkan CORS agar tidak menyebabkan error "tainted canvas" saat diekspor ke PNG.
4. **Render Tersembunyi (Off-screen)**: Komponen `StoryShareCard` dirender dengan posisi absolut jauh di luar viewport (`left: -9999px` or `position: fixed; top: 100vh; pointer-events: none`) sehingga proses render tidak merusak UI halaman aktif.

---

# Metadata Dinamis

Seluruh informasi kartu disuplai secara dinamis dari detail story yang sedang dibuka:
- Judul proyek/cerita
- Gambar thumbnail cover
- Ringkasan singkat
- Jumlah apresiasi (likes)
- Nama lengkap penulis
- Jabatan & Foto profil penulis
- Tanggal rilis/publikasi
- URL Tautan & Slug unik untuk QR Code

---

# Hasil Akhir Yang Diharapkan

Fitur ini menghasilkan kartu promosi vertikal beresolusi tinggi yang bersih, berestetika premium, dan konsisten penuh dengan filosofi desain **Monokrom Profesional** situs Anda. Tanpa distraksi opsi tema warna-warni, kartu ini memprioritaskan tipografi yang rapi, kontras yang jelas, serta kemudahan akses instan melalui QR Code untuk mengarahkan traffic pembaca kembali ke situs web Anda.
