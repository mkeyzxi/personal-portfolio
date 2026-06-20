# Langkah 1: Fondasi & Konfigurasi Global

## Ringkasan Masalah

Proyek saat ini menggunakan **Pages Router** (`src/pages/`) dan struktur lama yang tidak sesuai dengan spesifikasi AGENTS.md dan SDD. Perlu restrukturisasi total ke **App Router** dengan design system monokromatik yang ditentukan oleh SDD.

## Analisis Arsitektural

### Konflik PRD vs SDD — Resolusi Warna

| Sumber    | Spesifikasi Warna                           | Keputusan    |
| --------- | ------------------------------------------- | ------------ |
| PRD §11.1 | Sky Blue (`#0ea5e9`), Indigo (`#6366f1`)    | ❌ Diabaikan |
| SDD §4.1  | Murni Monokrom (hitam, putih, neutral gray) | ✅ Dipatuhi  |

Per instruksi Anda: **SDD dipatuhi secara membabi buta**. Tidak ada `text-blue-500`, `bg-sky-500`, atau hex kromatik apapun.

### Tailwind CSS v4 — Perubahan Paradigma

Proyek sudah menggunakan Tailwind v4 (`@tailwindcss/postcss: ^4.2.2`). Di v4, **`tailwind.config.ts` tidak lagi digunakan**. Konfigurasi dilakukan di dalam CSS menggunakan `@theme` directive.

> [!IMPORTANT]
> File `tailwind.config.ts` **TIDAK akan dibuat**. Semua custom theme (warna monokrom, font, spacing) didefinisikan di `app/globals.css` menggunakan `@theme {}`.

### Restrukturisasi Direktori

Proyek harus berpindah dari `src/pages/` (Pages Router) ke `app/` (App Router). Semua file lama di `src/` akan **dihapus** dan diganti dengan struktur baru.

---

## User Review Required

> [!IMPORTANT]
> **Penghapusan kode lama:** Seluruh isi `src/pages/`, `src/components/`, `src/layout/`, `src/utils/`, dan `src/styles/` akan dihapus karena menggunakan Pages Router yang tidak kompatibel dengan spesifikasi. Apakah ada kode di sana yang perlu dipertahankan?

> [!IMPORTANT]  
> **Tailwind v4 vs v3:** Proyek sudah di Tailwind v4 yang menggunakan CSS-first config (`@theme` di CSS). Ini berbeda dari AGENTS.md yang menyebutkan `tailwind.config.ts`. Saya akan mengikuti Tailwind v4 karena itu yang terinstall. Setuju?

---

## Proposed Changes

### 1. Persiapan CLI — Install Dependencies

Sebelum menulis kode, install dependencies yang dibutuhkan untuk Langkah 1:

```bash
pnpm add framer-motion
pnpm add tailwind-merge
```

> Shadcn UI, Firebase, Iconify, dll. akan diinstall di langkah-langkah selanjutnya.

---

### 2. Hapus Struktur Lama

#### [DELETE] Seluruh isi `src/pages/`

#### [DELETE] Seluruh isi `src/components/`

#### [DELETE] Seluruh isi `src/layout/`

#### [DELETE] Seluruh isi `src/utils/`

#### [DELETE] Seluruh isi `src/styles/`

Direktori `src/` sendiri tetap ada karena `tsconfig.json` sudah menggunakan path alias `@/* → ./src/*`.

---

### 3. Konfigurasi Global CSS (Tailwind v4 Theme)

#### [NEW] [globals.css](file:///c:/belajarku/Belajar%20NextJS/portofolio/app/globals.css)

Menggantikan `src/styles/globals.css`. Berisi:

- `@import "tailwindcss"` (v4 directive)
- `@theme {}` block mendefinisikan:
  - Warna monokrom dari SDD §4.1 (neutral-50 sampai neutral-950)
  - Font family Geist Sans & Geist Mono
  - Custom spacing dan radius
- Dark mode via class `.dark`
- CSS variables untuk surface, border, text
- Base styles: anti-aliased, box-sizing, focus ring

---

### 4. Root Layout (App Router)

#### [NEW] [layout.tsx](file:///c:/belajarku/Belajar%20NextJS/portofolio/app/layout.tsx)

- Import Geist Sans & Geist Mono via `next/font/google`
- SEO metadata (title, description, openGraph, twitter) — dari PRD §16
- Inject `className` font ke `<html>` tag
- Dark mode: script di `<head>` untuk membaca `localStorage` dan menambah class `dark` sebelum render (mencegah FOUC)
- `suppressHydrationWarning` pada `<html>` (karena class `dark` ditambahkan client-side)

#### [NEW] [page.tsx](file:///c:/belajarku/Belajar%20NextJS/portofolio/app/page.tsx)

- Client component injection point
- Render `<AppShell />` saja

---

### 5. AppShell — State Manager + Hash Sync

#### [NEW] [AppShell.tsx](file:///c:/belajarku/Belajar%20NextJS/portofolio/src/components/global/AppShell.tsx)

**Ini adalah komponen inti arsitektur** — mengelola `activeSection` state dengan logika sinkronisasi yang ditentukan SDD §1.2:

```
Alur Sinkronisasi:
1. Initial Load → cek window.location.hash → fallback ke sessionStorage → default 'home'
2. Navigation Event → setActive(key) → history.pushState('#key') + sessionStorage.set
3. Browser Back/Forward → onpopstate → baca hash → setActive
```

**Fitur yang diimplementasikan:**

- `useState<SectionKey>` untuk `activeSection`
- `useEffect` untuk initial hash/sessionStorage resolution
- `useEffect` untuk `popstate` listener (browser back/forward)
- `handleNavigate` function: update state + `history.pushState` + `sessionStorage`
- `AnimatePresence mode="wait"` untuk transisi section
- Animasi hanya menggunakan `opacity` dan `transform y` (SDD §4.3)
- **Section components dimuat via `next/dynamic`** (SDD §3 — Lazy Loading)
- Placeholder section components (stub `<div>` sementara) untuk memastikan shell berfungsi

---

### 6. TypeScript Types

#### [NEW] [types/index.ts](file:///c:/belajarku/Belajar%20NextJS/portofolio/src/types/index.ts)

Definisi `SectionKey` type literal dan `NavItem` interface yang akan digunakan di seluruh codebase.

---

### 7. Utility Functions

#### [NEW] [lib/utils.ts](file:///c:/belajarku/Belajar%20NextJS/portofolio/src/lib/utils.ts)

- `cn()` function: menggabungkan `clsx` + `tailwind-merge` untuk conditional className

---

### 8. Nav Constants

#### [NEW] [lib/constants.ts](file:///c:/belajarku/Belajar%20NextJS/portofolio/src/lib/constants.ts)

- Array `NAV_ITEMS` dengan semua 8 section, ikon Lucide, dan flag `bottomNav`
- Social media links
- Owner info placeholder

---

## Daftar File Langkah 1

| Aksi   | File                                                                             | Deskripsi                      |
| ------ | -------------------------------------------------------------------------------- | ------------------------------ |
| DELETE | `src/pages/*`, `src/styles/*`, `src/components/*`, `src/utils/*`, `src/layout/*` | Hapus Pages Router             |
| NEW    | `app/globals.css`                                                                | Tailwind v4 theme monokromatik |
| NEW    | `app/layout.tsx`                                                                 | Root layout + font + metadata  |
| NEW    | `app/page.tsx`                                                                   | Entry point → AppShell         |
| NEW    | `src/components/global/AppShell.tsx`                                             | State manager + hash sync      |
| NEW    | `src/types/index.ts`                                                             | SectionKey & NavItem types     |
| NEW    | `src/lib/utils.ts`                                                               | cn() utility                   |
| NEW    | `src/lib/constants.ts`                                                           | Nav items & constants          |
| MODIFY | `src/components/sections/*.tsx`                                                  | 8 placeholder stub sections    |

---

## Verification Plan

### Manual Verification

1. `pnpm dev` → server berjalan tanpa error
2. Buka `http://localhost:3000` → menampilkan HeroSection (placeholder)
3. Buka `http://localhost:3000/#projects` → langsung render ProjectsSection stub
4. Refresh halaman → section tetap pada posisi terakhir (sessionStorage)
5. Tidak ada warna kromatik di output (hanya hitam/putih/abu-abu)
6. Dark mode toggle tidak FOUC (flash of unstyled content)
