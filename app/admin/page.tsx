'use client';

import Link from 'next/link';
import * as LucideIcons from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto min-h-screen bg-[var(--color-bg-main)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">Admin Dashboard</h1>
          <p className="text-[var(--color-text-secondary)] mt-2">Selamat datang di pusat kendali portofolio Anda.</p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">Modul Pengelola (CMS)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/about" className="group">
          <div className="bg-[var(--color-bg-surface)] p-6 rounded-xl border border-[var(--color-border)] shadow-sm h-full transition-all hover:border-[var(--color-interactive)] hover:shadow-md">
            <LucideIcons.User className="w-8 h-8 text-[var(--color-interactive)] mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Tentang Saya</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">Kelola profil, lokasi, dan teks biografi Anda.</p>
          </div>
        </Link>

        <Link href="/admin/projects" className="group">
          <div className="bg-[var(--color-bg-surface)] p-6 rounded-xl border border-[var(--color-border)] shadow-sm h-full transition-all hover:border-[var(--color-interactive)] hover:shadow-md">
            <LucideIcons.FolderGit2 className="w-8 h-8 text-[var(--color-interactive)] mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Proyek</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">Tambah, edit, atau hapus portofolio proyek Anda.</p>
          </div>
        </Link>

        <Link href="/admin/experiences" className="group">
          <div className="bg-[var(--color-bg-surface)] p-6 rounded-xl border border-[var(--color-border)] shadow-sm h-full transition-all hover:border-[var(--color-interactive)] hover:shadow-md">
            <LucideIcons.Briefcase className="w-8 h-8 text-[var(--color-interactive)] mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Pengalaman</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">Perbarui riwayat pekerjaan, organisasi, dan pendidikan.</p>
          </div>
        </Link>

        <Link href="/admin/journey" className="group">
          <div className="bg-[var(--color-bg-surface)] p-6 rounded-xl border border-[var(--color-border)] shadow-sm h-full transition-all hover:border-[var(--color-interactive)] hover:shadow-md">
            <LucideIcons.Route className="w-8 h-8 text-[var(--color-interactive)] mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Perjalanan (Journey)</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">Catat peristiwa atau pencapaian penting dari waktu ke waktu.</p>
          </div>
        </Link>

        <Link href="/admin/testimonials" className="group">
          <div className="bg-[var(--color-bg-surface)] p-6 rounded-xl border border-[var(--color-border)] shadow-sm h-full transition-all hover:border-[var(--color-interactive)] hover:shadow-md">
            <LucideIcons.MessageSquare className="w-8 h-8 text-[var(--color-interactive)] mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Testimoni</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">Tinjau, setujui, atau hapus testimoni dari pengunjung.</p>
          </div>
        </Link>

        <Link href="/admin/story" className="group">
          <div className="bg-[var(--color-bg-surface)] p-6 rounded-xl border border-[var(--color-border)] shadow-sm h-full transition-all hover:border-[var(--color-interactive)] hover:shadow-md">
            <LucideIcons.FileText className="w-8 h-8 text-[var(--color-interactive)] mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Cerita/Blog</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">Tulis artikel atau cerita untuk dibagikan kepada audiens.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
