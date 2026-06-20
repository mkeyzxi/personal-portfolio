import AppShell from '@/components/global/AppShell';

/**
 * Page — Entry point utama aplikasi.
 * 
 * Halaman ini hanya merender AppShell yang mengelola
 * seluruh state navigasi dan layout (sidebar + konten area).
 * 
 * Tidak ada file-based routing lain yang digunakan
 * karena aplikasi ini adalah SPA dengan CSR navigation.
 */
export default function Page() {
  return <AppShell />;
}
