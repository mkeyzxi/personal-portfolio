Saya ingin membangun fitur CMS (Content Management System) untuk bagian 'Jejak Langkah' (Journey/Milestones) di portofolio saya. Aplikasi ini dibangun menggunakan Next.js (App Router), Tailwind CSS, dan Firebase Firestore.

Saat ini, data perjalanan saya (seperti tahun 2019 belajar HTML, 2023 Full-Stack) masih di-hardcode di halaman utama. Saya ingin mengubahnya menjadi dinamis agar saya bisa menambah riwayat baru di masa depan melalui Dasbor Admin.

Tolong buatkan implementasi kode lengkap untuk 3 lapisan arsitektur berikut:

1. Skema Basis Data & Fungsi Pembantu (Firestore):
   Buatkan fungsi utilitas (misal di lib/firebase/journey.ts) untuk melakukan operasi CRUD pada koleksi Firestore bernama journeys.
   Dokumen harus memiliki struktur tipe data TypeScript seperti ini:

TypeScript
interface Journey {
id?: string;
year: number; // Untuk keperluan pengurutan (sorting) dari yang terlama ke terbaru
title: string; // Contoh: "Awal Ketertarikan"
description: string; // Contoh: "Pertama kali menyentuh HTML dan CSS..."
createdAt: string;
}
Pastikan ada fungsi getJourneys yang mengembalikan data yang sudah diurutkan berdasarkan year secara ascending (tahun lama ke tahun baru) atau descending (opsional, berikan parameternya).

2. Dasbor Admin (Manajemen Journey):
   Buatkan antarmuka di rute /admin/journey/page.tsx (Client Component atau kombinasi Server Component) yang berisi:

Formulir input untuk menambah/mengedit data (Tahun, Judul, Deskripsi).

Daftar (list/table) dari data journey yang sudah ada di Firestore, dilengkapi tombol Hapus dan Edit.

Syarat Mutlak: Pastikan rute ini dibungkus dengan komponen pelindung AdminGuard yang menggunakan validasi RBAC berbasis Google Auth (email master admin) yang sudah saya terapkan sebelumnya. Jangan buat sistem login baru.

3. UI Halaman Utama (Public Frontend):
   Perbarui komponen halaman utama saya tempat bagian ini berada.

Ubah menjadi Server Component (jika memungkinkan) untuk mengambil data getJourneys() langsung dari server Next.js saat build atau request.

Ganti ID pembungkus section menjadi id="journey" (jangan gunakan /story).

Petakan (mapping) data dari Firestore ke dalam antarmuka timeline (garis waktu) yang minimalis, responsif, dan mudah dipindai oleh mata menggunakan Tailwind CSS.

Pastikan semantic HTML digunakan (seperti <section>, <article>, atau list <ol> untuk urutan kronologis) agar memenuhi standar SEO dan Screen Reader (WCAG).

Berikan kode yang modular, bebas dari infinite loop, dan tangani error/loading state dengan baik."
