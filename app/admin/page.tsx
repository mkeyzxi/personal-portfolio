'use client';

import Link from 'next/link';
import * as LucideIcons from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto min-h-screen bg-[var(--color-bg-main)]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">Admin Dashboard</h1>
        <p className="text-[var(--color-text-secondary)] mt-2">Selamat datang di pusat kendali portofolio Anda.</p>
      </div>

      {/* Placeholder Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[var(--color-bg-surface)] p-6 rounded-2xl border border-[var(--color-border)] shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">Total Proyek</p>
              <h3 className="text-3xl font-bold text-[var(--color-text-primary)]">12</h3>
            </div>
            <div className="bg-blue-500/10 p-3 rounded-lg text-blue-500">
              <LucideIcons.FolderGit2 className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="bg-[var(--color-bg-surface)] p-6 rounded-2xl border border-[var(--color-border)] shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">Testimoni</p>
              <h3 className="text-3xl font-bold text-[var(--color-text-primary)]">24</h3>
            </div>
            <div className="bg-green-500/10 p-3 rounded-lg text-green-500">
              <LucideIcons.MessageSquare className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="bg-[var(--color-bg-surface)] p-6 rounded-2xl border border-[var(--color-border)] shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">Cerita Diterbitkan</p>
              <h3 className="text-3xl font-bold text-[var(--color-text-primary)]">8</h3>
            </div>
            <div className="bg-purple-500/10 p-3 rounded-lg text-purple-500">
              <LucideIcons.FileText className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Pengelola CMS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/projects" className="group">
          <div className="bg-[var(--color-bg-surface)] p-6 rounded-2xl border border-[var(--color-border)] shadow-sm h-full transition-all hover:border-[var(--color-interactive)] hover:shadow-md">
            <LucideIcons.FolderGit2 className="w-8 h-8 text-[var(--color-interactive)] mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Kelola Projects</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">Tambah, edit, atau hapus portofolio proyek Anda.</p>
          </div>
        </Link>
        <Link href="/admin/testimonials" className="group">
          <div className="bg-[var(--color-bg-surface)] p-6 rounded-2xl border border-[var(--color-border)] shadow-sm h-full transition-all hover:border-[var(--color-interactive)] hover:shadow-md">
            <LucideIcons.MessageSquare className="w-8 h-8 text-[var(--color-interactive)] mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Kelola Testimonials</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">Tinjau dan setujui ulasan dari klien atau rekan kerja.</p>
          </div>
        </Link>
        <Link href="/admin/story" className="group">
          <div className="bg-[var(--color-bg-surface)] p-6 rounded-2xl border border-[var(--color-border)] shadow-sm h-full transition-all hover:border-[var(--color-interactive)] hover:shadow-md">
            <LucideIcons.FileText className="w-8 h-8 text-[var(--color-interactive)] mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Kelola Stories</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">Tulis artikel, blog, atau cerita perjalanan Anda.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
