🚀 Feature Design Document (FDD)

Modul: Dynamic Project CMS & SSR Integration

Versi: 1.0.0

Target: Vercel Production

Modul Utama: Firestore (Data Layer), Next.js App Router (SSR Routes), BlockNote (WYSIWYG Editor), NextAuth (Admin Guard).

1. Analisis Pergeseran Arsitektur & Mitigasi UX

Mengubah sumber data statis (data/projects.ts) menjadi data dinamis di Firestore dan menambahkan halaman SSR baru membutuhkan restrukturisasi routing App Router.

Pemisahan Entitas: Komponen ProjectsSection di beranda (SPA) tidak lagi memuat seluruh detail proyek. Ia hanya akan melakukan fetch data thumbnail dan metadata dasar (Judul, Kategori, Teknologi).

Deep-Linking SSR: Saat kartu proyek diklik, pengguna tidak lagi membuka modal Dialog bawaan Shadcn seperti rencana awal. Mereka akan diarahkan ke rute fisik /projects/[slug] menggunakan komponen <Link> Next.js dengan fitur prefetching agar transisi terasa sama cepatnya dengan SPA.

2. Skema Koleksi Database Baru

Tinggalkan file statis Anda. Buat koleksi baru di Firestore bernama projects.

Struktur Dokumen projects/{documentId}:

{
"slug": "string (unik, contoh: 'sistem-booking-futsal')",
"title": "string",
"shortDescription": "string (maks 120 karakter untuk kartu depan)",
"content": "array of objects (JSON mentah dari BlockNote editor)",
"category": "string (web, mobile, api)",
"thumbnailUrl": "string (URL Firebase Storage atau public URL)",
"technologies": ["React", "Firebase", "Tailwind"],
"githubUrl": "string | null",
"liveUrl": "string | null",
"featured": "boolean",
"createdAt": "Timestamp"
}

3. Topologi Routing (Next.js App Router)

Tambahkan struktur folder ini ke dalam direktori app/ Anda:

app/
├── admin/
│ └── projects/
│ ├── page.tsx # Halaman daftar proyek (Admin View)
│ └── new/
│ └── page.tsx # Halaman form tambah proyek dengan WYSIWYG
├── projects/
│ └── [slug]/
│ ├── page.tsx # Halaman SSR Detail Proyek (Public)
│ └── loading.tsx # Skeleton loader untuk transisi
└── api/
└── projects/
└── route.ts # Endpoint POST & GET terproteksi

4. Spesifikasi Integrasi WYSIWYG (BlockNote)

Menggunakan textarea biasa untuk rich text akan mengacaukan manipulasi DOM. Gunakan BlockNote karena pustaka ini menghasilkan array blok JSON murni, bukan string HTML kotor yang rentan terhadap serangan injeksi silang situs (XSS).

4.1 Logika Form Admin (app/admin/projects/new/page.tsx)

Halaman ini wajib dijaga oleh middleware atau Higher-Order Component yang memverifikasi sesi NextAuth. Jika bukan email Anda yang sedang login, tendang kembali ke beranda.

Alur Kerja Form:

Admin memasukkan Title. Sistem secara otomatis melakukan format regex untuk menciptakan Slug huruf kecil tanpa spasi (mengganti spasi dengan tanda hubung).

Admin mengetik konten di komponen <BlockNoteView />.

Saat ditekan tombol "Simpan", fungsi mengambil data menggunakan editor.document.

Kirim payload berformat JSON utuh ke /api/projects.

4.2 Spesifikasi Komponen BlockNote

'use client';
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css"; // Timpa dengan kelas Tailwind Anda nanti

export default function WYSIWYGEditor({ onChange }: { onChange: (json: any) => void }) {
const editor = useCreateBlockNote();

return (
<div className="min-h-[400px] border border-neutral-200 dark:border-neutral-800 rounded-md bg-white dark:bg-neutral-900">
<BlockNoteView
editor={editor}
theme="light" // Sinkronkan dengan state dark mode Anda
onChange={() => {
// Ekstrak struktur blok JSON, bukan HTML
onChange(editor.document);
}}
/>
</div>
);
}

5. Implementasi SSR Detail Proyek (app/projects/[slug]/page.tsx)

Ini adalah titik di mana Anda memanfaatkan kemampuan Server Components Next.js secara penuh. Tidak ada use client di sini. Data ditarik langsung dari Firestore di sisi server sebelum dikirim ke peramban klien.

Prinsip Eksekusi Server:

Tangkap parameter slug dari URL.

Gunakan Firebase Admin SDK (lib/firebase-admin.ts) untuk melakukan kueri ke Firestore berdasarkan slug.

Jika tidak ditemukan, panggil fungsi notFound() bawaan Next.js.

Lakukan render blok JSON dari Firestore kembali ke antarmuka menggunakan komponen renderer BlockNote atau secara manual memetakan tipografi Tailwind monokrom Anda.

Sintaks Target (Server Component):

import { notFound } from 'next/navigation';
import { db } from '@/lib/firebase-admin';
import { Metadata } from 'next';

// 1. Generate Metadata untuk SEO (Penting untuk portofolio)
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
const snapshot = await db.collection('projects').where('slug', '==', params.slug).limit(1).get();
if (snapshot.empty) return { title: 'Proyek Tidak Ditemukan' };

const project = snapshot.docs[0].data();
return {
title: `${project.title} | Portofolio`,
description: project.shortDescription,
};
}

// 2. Main Page Render
export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
const snapshot = await db.collection('projects').where('slug', '==', params.slug).limit(1).get();

if (snapshot.empty) {
notFound();
}

const project = snapshot.docs[0].data();

return (
<article className="max-w-4xl mx-auto py-20 px-6">
{/_ Header Monokrom _/}
<h1 className="text-4xl font-bold font-geist-sans text-neutral-900 dark:text-neutral-50 mb-4">
{project.title}
</h1>

      {/* Badge Teknologi (Geist Mono) */}
      <div className="flex gap-2 mb-10 flex-wrap">
        {project.technologies.map((tech: string) => (
          <span key={tech} className="font-mono text-sm px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-700">
            {tech}
          </span>
        ))}
      </div>

      {/* Render Konten WYSIWYG di sini */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {/* Render JSON Blocks to React Components */}
      </div>
    </article>

);
}

6. Protokol Keamanan API (/api/projects/route.ts)

Rute ini akan menerima instruksi dari form CMS Admin.

Wajib mengimpor getServerSession dari NextAuth.

Jika session kosong atau session.user.email tidak cocok dengan surel Anda, tolak dengan status HTTP 401 Unauthorized.

Validasi bahwa atribut slug tidak mengandung spasi atau karakter spesial untuk mencegah kerusakan routing.

7. Peninjauan Biaya Peluang (Opportunity Cost)

Menambahkan sistem CMS terpadu berarti Anda menyingkirkan kemudahan deployment statis. Setiap kali seseorang menekan halaman proyek Anda, sistem melakukan Read ke Firestore. Pada tier gratis Spark Plan (batas 50.000 bacaan/hari), ini aman. Tapi jika lalu lintas membengkak, tagihan operasional bisa naik. Pastikan Anda mengimplementasikan ISR (Incremental Static Regeneration) dengan menambahkan opsi export const revalidate = 3600; di file SSR Anda agar Next.js men- cache halaman tersebut selama satu jam.
