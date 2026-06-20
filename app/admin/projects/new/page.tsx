'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';

// Lazy load BlockNote editor
const WYSIWYGEditor = dynamic(() => import('@/components/ui/WYSIWYGEditor'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] flex items-center justify-center bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl animate-pulse text-[var(--color-text-muted)]">Memuat Editor...</div>
});

export default function NewProjectPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    category: 'web',
    thumbnail: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    featured: false,
  });
  const [content, setContent] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.push('/admin');
      else setUser(currentUser);
    });
    return () => unsubscribe();
  }, [router]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    
    setFormData(prev => ({ ...prev, title, slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || content.length === 0) {
      toast.error('Konten proyek tidak boleh kosong');
      return;
    }

    setIsLoading(true);

    try {
      // Mendapatkan token untuk auth backend
      const token = await user.getIdToken();

      const payload = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
        content,
      };

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        toast.success('Proyek berhasil disimpan!');
        router.push('/admin/projects');
      } else {
        toast.error('Gagal menyimpan proyek', { description: json.message });
      }
    } catch (error) {
      toast.error('Terjadi kesalahan koneksi');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-[var(--color-bg-main)] p-6 md:p-10 pb-24">
      <div className="mx-auto w-full max-w-4xl flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
              <LucideIcons.PlusSquare className="h-6 w-6" />
              Tambah Proyek Baru
            </h1>
            <Link href="/admin/projects" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mt-1 inline-flex items-center gap-1">
              <LucideIcons.ArrowLeft className="h-4 w-4" /> Kembali ke Daftar Proyek
            </Link>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 md:p-8 shadow-sm">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-[var(--color-text-secondary)]">Judul Proyek *</label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-main)] px-4 py-3 text-[var(--color-text-primary)] focus:border-[var(--color-focus-ring)] focus:outline-none"
                placeholder="Misal: Aplikasi E-Commerce Futsal"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-[var(--color-text-secondary)]">Slug (URL) *</label>
              <input
                required
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/\s/g, '-') }))}
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-3 text-[var(--color-text-muted)] focus:outline-none"
                placeholder="otomatis-dari-judul"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[var(--color-text-secondary)]">Deskripsi Singkat (Kartu Depan) *</label>
            <textarea
              required
              maxLength={120}
              rows={2}
              value={formData.shortDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-main)] px-4 py-3 text-[var(--color-text-primary)] focus:border-[var(--color-focus-ring)] focus:outline-none resize-none"
              placeholder="Deskripsi singkat maksimal 120 karakter..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-[var(--color-text-secondary)]">Kategori *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-main)] px-4 py-3 text-[var(--color-text-primary)] focus:border-[var(--color-focus-ring)] focus:outline-none"
              >
                <option value="web">Web Development</option>
                <option value="mobile">Mobile App</option>
                <option value="api">Backend / API</option>
                <option value="other">Lainnya</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-[var(--color-text-secondary)]">Teknologi (Pisahkan dgn Koma) *</label>
              <input
                required
                type="text"
                value={formData.technologies}
                onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-main)] px-4 py-3 text-[var(--color-text-primary)] focus:border-[var(--color-focus-ring)] focus:outline-none"
                placeholder="React, Firebase, Tailwind"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[var(--color-text-secondary)]">URL Thumbnail Gambar *</label>
            <input
              required
              type="url"
              value={formData.thumbnail}
              onChange={(e) => setFormData(prev => ({ ...prev, thumbnail: e.target.value }))}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-main)] px-4 py-3 text-[var(--color-text-primary)] focus:border-[var(--color-focus-ring)] focus:outline-none"
              placeholder="https://... atau /images/projects/1.jpg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-[var(--color-text-secondary)]">GitHub URL (Opsional)</label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-main)] px-4 py-3 text-[var(--color-text-primary)] focus:border-[var(--color-focus-ring)] focus:outline-none"
                placeholder="https://github.com/..."
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-[var(--color-text-secondary)]">Live Demo URL (Opsional)</label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-main)] px-4 py-3 text-[var(--color-text-primary)] focus:border-[var(--color-focus-ring)] focus:outline-none"
                placeholder="https://..."
              />
            </div>
          </div>

          <label className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-main)] cursor-pointer hover:border-[var(--color-focus-ring)] transition-colors">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              className="h-5 w-5 rounded border-gray-300 text-[var(--color-interactive)] focus:ring-[var(--color-interactive)]"
            />
            <div>
              <span className="block font-semibold text-[var(--color-text-primary)]">Jadikan Featured</span>
              <span className="block text-xs text-[var(--color-text-muted)]">Proyek ini akan tampil di bagian atas dengan badge khusus.</span>
            </div>
          </label>

          {/* BlockNote WYSIWYG */}
          <div className="space-y-2 mt-4">
            <label className="text-sm font-medium text-[var(--color-text-secondary)]">Konten Detail Proyek *</label>
            <WYSIWYGEditor onChange={setContent} />
          </div>

          <div className="pt-6 border-t border-[var(--color-border-muted)] flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 rounded-xl bg-[var(--color-interactive)] px-8 py-3 font-bold text-[var(--color-interactive-text)] transition-colors hover:bg-[var(--color-interactive-hover)] disabled:opacity-70"
            >
              {isLoading ? <LucideIcons.Loader2 className="h-5 w-5 animate-spin" /> : <LucideIcons.Save className="h-5 w-5" />}
              {isLoading ? 'Menyimpan...' : 'Simpan Proyek'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
