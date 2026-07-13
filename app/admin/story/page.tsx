'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import * as LucideIcons from 'lucide-react';
import dynamic from 'next/dynamic';

const BlockNoteEditor = dynamic(() => import('@/components/admin/BlockNoteEditor'), { ssr: false });

type ViewState = 'list' | 'create' | 'edit';

export default function AdminStoryDashboard() {
  const [user, setUser] = useState<import('firebase/auth').User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<ViewState>('list');
  const [stories, setStories] = useState<import('@/types').StoryDocument[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const router = useRouter();

  // Form State
  const [currentId, setCurrentId] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [categorySlug, setCategorySlug] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('draft');

  const fetchStories = async (currentUser: import('firebase/auth').User | null) => {
    try {
      const token = await currentUser?.getIdToken();
      const res = await fetch('/api/stories', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success) setStories(json.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const json = await res.json();
      if (json.success) setCategories(json.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchStories(currentUser);
        fetchCategories();
      } else {
        router.push('/admin');
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [router]);



  const handleCreate = () => {
    setCurrentId('');
    setTitle('');
    setSlug('');
    setCategorySlug('');
    setSummary('');
    setContent('');
    setStatus('draft');
    setView('create');
  };

  const handleEdit = (story: import('@/types').StoryDocument) => {
    setCurrentId(story.id);
    setTitle(story.title);
    setSlug(story.slug);
    setCategorySlug(story.categorySlug);
    setSummary(story.summary);
    setContent(story.content);
    setStatus(story.status);
    setView('edit');
  };

  const handleDelete = async (slugToDelete: string) => {
    if (!confirm('Hapus cerita ini beserta semua komentar dan likes?')) return;
    try {
      const token = await user?.getIdToken();
      const res = await fetch(`/api/stories/${slugToDelete}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchStories(user);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    try {
      const token = await user?.getIdToken();
      const payload = { title, slug, categorySlug, summary, content, status };
      const url = view === 'edit' ? `/api/stories/${slug}` : '/api/stories';
      const method = view === 'edit' ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setView('list');
        fetchStories(user);
      } else {
        const err = await res.json();
        alert('Gagal menyimpan: ' + (err instanceof Error ? err.message : String(err)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto min-h-screen bg-[var(--color-bg-main)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">Cerita & Blog (Story CMS)</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Tulis dan kelola artikel atau cerita Anda.</p>
        </div>
        {view === 'list' && (
          <button 
            onClick={handleCreate}
            className="flex items-center gap-2 bg-[var(--color-interactive)] text-[var(--color-interactive-text)] px-4 py-2 rounded-xl font-medium hover:bg-[var(--color-interactive-hover)] transition-colors"
          >
            <LucideIcons.Plus className="w-5 h-5" /> Buat Cerita
          </button>
        )}
      </div>

      {view === 'list' ? (
        <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)]">
                <tr>
                  <th className="p-4 font-semibold">Judul</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Tanggal</th>
                  <th className="p-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {stories.map(story => (
                  <tr key={story.id} className="border-t border-[var(--color-border)] align-top">
                    <td className="p-4 font-medium text-[var(--color-text-primary)]">{story.title}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${story.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {story.status}
                      </span>
                    </td>
                    <td className="p-4 text-[var(--color-text-secondary)]">{new Date(story.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => handleEdit(story)} className="text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors" title="Edit">
                        <LucideIcons.Edit className="w-5 h-5 inline-block" />
                      </button>
                      <button onClick={() => handleDelete(story.slug)} className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors" title="Delete">
                        <LucideIcons.Trash2 className="w-5 h-5 inline-block" />
                      </button>
                    </td>
                  </tr>
                ))}
                {stories.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-[var(--color-text-muted)]">Belum ada cerita yang ditulis.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-[var(--color-bg-surface)] p-6 md:p-8 border border-[var(--color-border)] rounded-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--color-text-secondary)]">Judul Cerita *</label>
              <input 
                type="text" placeholder="Misal: Perjalanan Karir Saya" value={title} onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-interactive)]" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--color-text-secondary)]">Slug (URL) *</label>
              <input 
                type="text" placeholder="misal: perjalanan-karir-saya" value={slug} onChange={(e) => setSlug(e.target.value)}
                className="w-full p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-interactive)]" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--color-text-secondary)]">Kategori (Opsional)</label>
              <select 
                value={categorySlug} onChange={(e) => setCategorySlug(e.target.value)}
                className="w-full p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-interactive)]" 
              >
                <option value="">Pilih Kategori</option>
                {categories.map(cat => (
                  <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--color-text-secondary)]">Status *</label>
              <select 
                value={status} onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-interactive)]"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--color-text-secondary)]">Ringkasan Singkat (Summary) *</label>
            <textarea 
              placeholder="Ceritakan sedikit tentang artikel ini..." value={summary} onChange={(e) => setSummary(e.target.value)}
              className="w-full p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-primary)] min-h-[100px] focus:outline-none focus:border-[var(--color-interactive)]" 
            />
          </div>
          
          <div className="mt-4 flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--color-text-secondary)]">Konten Artikel (BlockNote Editor) *</label>
            <div className="rounded-xl overflow-hidden border border-[var(--color-border)]">
              <BlockNoteEditor initialContent={content} onChange={setContent} />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-[var(--color-border)] mt-8">
            <button 
              onClick={() => setView('list')} 
              className="px-6 py-2 border border-[var(--color-border)] rounded-xl text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-main)] font-medium transition-colors"
            >
              Batal
            </button>
            <button 
              onClick={handleSave} 
              className="flex items-center gap-2 px-6 py-2 bg-[var(--color-interactive)] text-[var(--color-interactive-text)] rounded-xl hover:bg-[var(--color-interactive-hover)] font-medium transition-colors"
            >
              <LucideIcons.Save className="w-5 h-5" /> Simpan Cerita
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
