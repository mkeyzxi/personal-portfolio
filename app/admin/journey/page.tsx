'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import * as LucideIcons from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { getJourneys, addJourney, updateJourney, deleteJourney } from '@/lib/firebase/journey';
import type { Journey } from '@/types';
import { toast } from 'sonner';

export default function AdminJourneyDashboard() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<string>('');
  const router = useRouter();

  // Form State
  const [year, setYear] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchJourneysData();
      } else {
        router.push('/admin/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchJourneysData = async () => {
    setIsLoading(true);
    try {
      const data = await getJourneys('asc');
      setJourneys(data);
    } catch (e) {
      console.error(e);
      toast.error('Gagal mengambil data Jejak Langkah');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setYear('');
    setTitle('');
    setDescription('');
    setCurrentId('');
    setIsEditMode(false);
  };

  const handleOpenModal = (item?: Journey) => {
    if (item) {
      setIsEditMode(true);
      setCurrentId(item.id || '');
      setYear(item.year.toString());
      setTitle(item.title);
      setDescription(item.description);
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSave = async () => {
    if (!year || !title || !description) {
      toast.error('Semua kolom wajib diisi!');
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        year: parseInt(year, 10),
        title,
        description
      };

      if (isEditMode) {
        await updateJourney(currentId, payload);
        toast.success('Berhasil memperbarui data!');
      } else {
        await addJourney(payload);
        toast.success('Berhasil menambah data baru!');
      }

      fetchJourneysData();
      handleCloseModal();
    } catch (e) {
      console.error(e);
      toast.error('Gagal menyimpan data.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus item ini secara permanen?')) return;
    try {
      await deleteJourney(id);
      toast.success('Berhasil menghapus data!');
      fetchJourneysData();
    } catch (e) {
      console.error(e);
      toast.error('Gagal menghapus data.');
    }
  };

  if (isLoading && !user) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen bg-[var(--color-bg-main)]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">Jejak Langkah (Journey)</h1>
        <button 
          onClick={() => handleOpenModal()} 
          className="flex items-center gap-2 bg-[var(--color-interactive)] text-[var(--color-interactive-text)] px-4 py-2 rounded-md hover:bg-[var(--color-interactive-hover)] transition-colors"
        >
          <LucideIcons.Plus className="w-5 h-5" /> Tambah Baru
        </button>
      </div>

      <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)]">
              <tr>
                <th className="p-4 w-24">Tahun</th>
                <th className="p-4 w-64">Judul</th>
                <th className="p-4">Deskripsi</th>
                <th className="p-4 text-right w-32">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-[var(--color-text-muted)]">
                    <LucideIcons.Loader2 className="w-6 h-6 animate-spin mx-auto" />
                  </td>
                </tr>
              ) : journeys.length > 0 ? (
                journeys.map((item) => (
                  <tr key={item.id} className="border-t border-[var(--color-border)] align-top">
                    <td className="p-4 font-bold text-[var(--color-text-primary)]">{item.year}</td>
                    <td className="p-4 font-medium text-[var(--color-text-primary)]">{item.title}</td>
                    <td className="p-4 text-[var(--color-text-secondary)]">{item.description}</td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => handleOpenModal(item)} 
                        className="text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors"
                        title="Edit"
                      >
                        <LucideIcons.Edit className="w-5 h-5 inline-block" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id!)} 
                        className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                        title="Delete"
                      >
                        <LucideIcons.Trash2 className="w-5 h-5 inline-block" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-[var(--color-text-muted)]">
                    Belum ada data perjalanan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={(open: boolean) => !open && handleCloseModal()}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto bg-[var(--color-bg-surface)] border-[var(--color-border)] text-[var(--color-text-primary)]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Jejak Langkah' : 'Tambah Baru'}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Tahun</label>
              <input 
                type="number" 
                value={year} 
                onChange={(e) => setYear(e.target.value)}
                className="p-2 rounded border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-interactive)]"
                placeholder="Misal: 2024"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Judul</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 rounded border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-interactive)]"
                placeholder="Misal: Belajar Next.js"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Deskripsi</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="p-2 rounded border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-interactive)]"
                placeholder="Jelaskan momen penting ini..."
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <button 
              onClick={handleCloseModal} 
              disabled={isSaving}
              className="px-4 py-2 border border-[var(--color-border)] rounded-md hover:bg-[var(--color-bg-main)] text-[var(--color-text-secondary)] disabled:opacity-50"
            >
              Batal
            </button>
            <button 
              onClick={handleSave} 
              disabled={isSaving}
              className="px-4 py-2 bg-[var(--color-interactive)] text-[var(--color-interactive-text)] rounded-md hover:bg-[var(--color-interactive-hover)] disabled:opacity-50 flex items-center justify-center min-w-[100px]"
            >
              {isSaving ? <LucideIcons.Loader2 className="w-5 h-5 animate-spin" /> : 'Simpan'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
