# 🚀 Personal Portfolio Website

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-black?logo=framer&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?logo=firebase&logoColor=white)

Sebuah website portofolio personal yang dibangun menggunakan Next.js (App Router) sebagai Single Page Application (SPA) dengan navigasi Client Side Rendering (CSR). Website ini dirancang untuk menampilkan identitas profesional, pengalaman, proyek, dan cerita perjalanan secara interaktif dan modern.

## ✨ Fitur Utama

- **Single Page Application (SPA)**: Navigasi mulus tanpa reload halaman. Konten berganti secara dinamis di tempat.
- **Desain Responsif**: 
  - **Desktop**: Sidebar navigasi vertikal di sisi kiri.
  - **Mobile**: Bottom navigation bar bergaya aplikasi mobile dengan menu laci (drawer) tambahan.
- **8 Section Komprehensif**: Home, About, Experience, Projects, Tech Stack, Testimonials, Story, dan Contact.
- **Animasi Interaktif**: Transisi antar halaman dan micro-interactions menggunakan Framer Motion dan React Bits.
- **Mode Gelap (Dark Mode)**: Dukungan bawaan untuk tema terang dan gelap.
- **Sistem Database Serverless**: Menyimpan pesan kontak dan mengambil testimoni dinamis langsung dari Firebase Firestore.
- **Autentikasi Aman**: Admin login menggunakan Firebase Authentication (Google OAuth).
- **SEO & Aksesibilitas**: Teroptimasi untuk mesin pencari dengan struktur HTML semantik dan menggunakan komponen aksesibel dari Shadcn UI.

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js (App Router)
- **Library Utama**: React
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS 
- **Komponen UI**: Shadcn UI, React Bits
- **Animasi**: Framer Motion
- **Ikon**: Lucide React, Iconify
- **3D Render**: React Three Fiber (opsional/hero)

### Backend & Database
- **API**: Next.js API Routes (Serverless)
- **Database**: Firebase Firestore
- **Autentikasi**: Firebase Auth & Admin SDK
- **Email (Opsional)**: Nodemailer

## 📦 Prasyarat

Sebelum memulai, pastikan Anda memiliki:
- Node.js (versi 18.x atau lebih baru)
- npm, yarn, pnpm, atau bun
- Akun Firebase (dengan Firestore dan Authentication aktif)

## 🚀 Cara Menjalankan Secara Lokal

1. **Clone repository ini**
   ```bash
   git clone <URL_REPOSITORY_ANDA>
   cd portofolio
   ```

2. **Install dependensi**
   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   ```

3. **Konfigurasi Environment Variables**
   Buat file `.env.local` di root proyek dan tambahkan konfigurasi Firebase Anda (lihat bagian [Environment Variables](#-environment-variables)).

4. **Jalankan development server**
   ```bash
   npm run dev
   # atau
   yarn dev
   # atau
   pnpm dev
   ```

5. **Buka di Browser**
   Buka [http://localhost:3000](http://localhost:3000) untuk melihat hasilnya.

## ⚙️ Environment Variables

Buat file `.env.local` berdasarkan file `.env` atau konfigurasi berikut:

```env
# Firebase Client SDK
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Firebase Admin SDK (Server-Side)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY="your_private_key"

# Opsional untuk email sender/admin auth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```
> **Catatan Penting**: Jangan pernah men-commit file `.env.local` ke repositori publik!

## 📂 Struktur Proyek

- `/app`: Routing utama Next.js, API routes, dan global CSS.
- `/src/components`: Semua komponen React yang dapat digunakan ulang (layout, sections, UI).
- `/public`: Aset statis seperti gambar dan logo.
- `/src/hooks`: Custom React hooks.
- `/src/lib`: Utilitas, konfigurasi Firebase, dan konstanta statis.
- `/src/types`: Definisi antarmuka (interface) TypeScript.

## 🌍 Deployment

Cara termudah untuk mendeploy aplikasi ini adalah menggunakan [Vercel](https://vercel.com).
1. Buat proyek baru di Vercel dan hubungkan dengan repository GitHub Anda.
2. Tambahkan semua Environment Variables dari `.env.local` ke pengaturan *Environment Variables* di Vercel.
3. Vercel akan secara otomatis membangun dan men-deploy situs Anda setiap kali ada perubahan di branch utama (`main`/`master`).

---

Dibuat dengan ❤️ untuk portofolio yang interaktif dan profesional.
