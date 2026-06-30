'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';
import { use } from 'react';

// Lazy load BlockNote editor
const BlockNoteEditor = dynamic(() => import('@/components/admin/BlockNoteEditor'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] flex items-center justify-center bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl animate-pulse text-[var(--color-text-muted)]">Memuat Editor...</div>
});

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [user, setUser] = useState<import('firebase/auth').User | null>(null);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  
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
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/admin');
      } else {
        setUser(currentUser);
        fetchProjectData(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router, id]);

  const fetchProjectData = async (currentUser: import('firebase/auth').User) => {
    setIsFetching(true);
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch(`/api/projects/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const json = await res.json();
      
      if (res.ok && json.success) {
        const project = json.data;
        setFormData({
          title: project.title || '',
          slug: project.slug || '',
          shortDescription: project.shortDescription || '',
          category: project.category || 'web',
          thumbnail: project.thumbnail || '',
          technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : (project.technologies || ''),
          githubUrl: project.githubUrl || '',
          liveUrl: project.liveUrl || '',
          featured: project.featured || false,
        });
        
        // BlockNoteEditor mengekspektasikan JSON string.
        let contentString = project.content;
        if (typeof contentString !== 'string') {
          contentString = JSON.stringify(contentString);
        }
        setContent(contentString);
      } else {
        toast.error('Gagal memuat data proyek');
        router.push('/admin/projects');
      }
    } catch (error) {
      console.error(error);
      toast.error('Terjadi kesalahan jaringan');
    } finally {
      setIsFetching(false);
    }
  };

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
    if (!content || content.length === 0 || content === '[]') {
      toast.error('Konten proyek tidak boleh kosong');
      return;
    }

    setIsLoading(true);

    try {
      const token = await user?.getIdToken();

      const payload = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
        content,
      };

      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        toast.success('Proyek berhasil diperbarui!');
        router.push('/admin/projects');
      } else {
        toast.error('Gagal memperbarui proyek', { description: json.message });
      }
    } catch (error) {
      toast.error('Terjadi kesalahan koneksi');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--color-bg-main)]">
        <LucideIcons.Loader2 className="h-8 w-8 animate-spin text-[var(--color-text-muted)]" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto min-h-screen bg-[var(--color-bg-main)] pb-24">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">Edit Proyek</h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">Perbarui detail portofolio proyek Anda.</p>
          </div>
          <Link
            href="/admin/projects"
            className="px-4 py-2 border border-[var(--color-border)] rounded-xl hover:bg-[var(--color-bg-main)] text-[var(--color-text-secondary)] font-medium transition-colors"
          >
            Batal
          </Link>
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
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-[var(--color-text-secondary)]">Live Demo URL (Opsional)</label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-main)] px-4 py-3 text-[var(--color-text-primary)] focus:border-[var(--color-focus-ring)] focus:outline-none"
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

          <div className="space-y-2 mt-4">
            <label className="text-sm font-medium text-[var(--color-text-secondary)]">Konten Detail Proyek *</label>
            {content && (
              <BlockNoteEditor initialContent={content} onChange={setContent} />
            )}
          </div>

          <div className="pt-6 border-t border-[var(--color-border-muted)] flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 rounded-xl bg-[var(--color-interactive)] px-8 py-3 font-bold text-[var(--color-interactive-text)] transition-colors hover:bg-[var(--color-interactive-hover)] disabled:opacity-70"
            >
              {isLoading ? <LucideIcons.Loader2 className="h-5 w-5 animate-spin" /> : <LucideIcons.Save className="h-5 w-5" />}
              {isLoading ? 'Menyimpan...' : 'Perbarui Proyek'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
