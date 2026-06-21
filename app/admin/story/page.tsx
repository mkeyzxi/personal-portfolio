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
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<ViewState>('list');
  const [stories, setStories] = useState<any[]>([]);
  const router = useRouter();

  // Form State
  const [currentId, setCurrentId] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [categorySlug, setCategorySlug] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('draft');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchStories(currentUser);
      } else {
        router.push('/admin');
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const fetchStories = async (currentUser: any) => {
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch('/api/stories', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success) setStories(json.data);
    } catch (e) {
      console.error(e);
    }
  };

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

  const handleEdit = (story: any) => {
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
      const token = await user.getIdToken();
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
      const token = await user.getIdToken();
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
        alert('Gagal menyimpan: ' + err.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto min-h-screen bg-[var(--color-bg-main)]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">Story CMS</h1>
        {view === 'list' && (
          <button 
            onClick={handleCreate}
            className="flex items-center gap-2 bg-[var(--color-interactive)] text-[var(--color-interactive-text)] px-4 py-2 rounded-lg"
          >
            <LucideIcons.Plus className="w-4 h-4" /> Buat Cerita
          </button>
        )}
      </div>

      {view === 'list' ? (
        <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)]">
              <tr>
                <th className="p-4">Judul</th>
                <th className="p-4">Status</th>
                <th className="p-4">Tanggal</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {stories.map(story => (
                <tr key={story.id} className="border-t border-[var(--color-border)]">
                  <td className="p-4">{story.title}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${story.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {story.status}
                    </span>
                  </td>
                  <td className="p-4">{new Date(story.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleEdit(story)} className="text-blue-500 mr-4">Edit</button>
                    <button onClick={() => handleDelete(story.slug)} className="text-red-500">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-[var(--color-bg-surface)] p-6 border border-[var(--color-border)] rounded-xl space-y-4">
          <div className="flex gap-4">
            <input 
              type="text" placeholder="Judul" value={title} onChange={(e) => setTitle(e.target.value)}
              className="flex-1 border p-2 rounded bg-[var(--color-bg-main)] text-[var(--color-text-primary)]" 
            />
            <input 
              type="text" placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)}
              className="flex-1 border p-2 rounded bg-[var(--color-bg-main)] text-[var(--color-text-primary)]" 
            />
          </div>
          <div className="flex gap-4">
            <input 
              type="text" placeholder="Kategori Slug" value={categorySlug} onChange={(e) => setCategorySlug(e.target.value)}
              className="flex-1 border p-2 rounded bg-[var(--color-bg-main)] text-[var(--color-text-primary)]" 
            />
            <select 
              value={status} onChange={(e) => setStatus(e.target.value)}
              className="flex-1 border p-2 rounded bg-[var(--color-bg-main)] text-[var(--color-text-primary)]"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <textarea 
            placeholder="Ringkasan Singkat" value={summary} onChange={(e) => setSummary(e.target.value)}
            className="w-full border p-2 rounded bg-[var(--color-bg-main)] text-[var(--color-text-primary)] min-h-[100px]" 
          />
          
          <div className="mt-4">
            <label className="block mb-2 font-semibold">Konten (BlockNote)</label>
            <BlockNoteEditor initialContent={content} onChange={setContent} />
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button onClick={() => setView('list')} className="px-4 py-2 border rounded">Batal</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Simpan Cerita</button>
          </div>
        </div>
      )}
    </div>
  );
}
