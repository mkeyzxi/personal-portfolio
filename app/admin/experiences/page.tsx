'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import * as LucideIcons from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';

export default function AdminExperiencesDashboard() {
  const [user, setUser] = useState<import('firebase/auth').User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [experiences, setExperiences] = useState<import('@/types').Experience[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<string>('');
  const router = useRouter();

  // Form State
  const [type, setType] = useState('work');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [period, setPeriod] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [credentialUrl, setCredentialUrl] = useState('');

  const fetchExperiences = async (currentUser: import('firebase/auth').User | null) => {
    try {
      const token = await currentUser?.getIdToken();
      const res = await fetch('/api/admin/experiences', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success) setExperiences(json.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchExperiences(currentUser);
      } else {
        router.push('/admin/login');
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [router]);



  const resetForm = () => {
    setType('work');
    setCompany('');
    setPosition('');
    setPeriod('');
    setDescription('');
    setTechnologies('');
    setCredentialUrl('');
    setCurrentId('');
    setIsEditMode(false);
  };

  const handleOpenModal = (exp?: import('@/types').Experience) => {
    if (exp) {
      setIsEditMode(true);
      setCurrentId(exp.id);
      setType(exp.type);
      setCompany(exp.company || '');
      setPosition(exp.position || '');
      setPeriod(exp.period || '');
      setDescription(exp.description || '');
      setTechnologies(exp.technologies ? exp.technologies.join(', ') : '');
      setCredentialUrl(exp.credentialUrl || '');
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
    try {
      const token = await user?.getIdToken();
      
      const payload: Record<string, unknown> = {
        type,
        company,
        position,
        period,
      };

      if (type === 'certificate') {
        payload.credentialUrl = credentialUrl;
      } else {
        payload.description = description;
        payload.technologies = technologies.split(',').map(t => t.trim()).filter(Boolean);
      }

      const url = isEditMode ? `/api/admin/experiences/${currentId}` : '/api/admin/experiences';
      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        fetchExperiences(user);
        handleCloseModal();
      } else {
        const json = await res.json();
        alert('Gagal menyimpan: ' + json.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus item ini secara permanen?')) return;
    try {
      const token = await user?.getIdToken();
      const res = await fetch(`/api/admin/experiences/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchExperiences(user);
      } else {
        const json = await res.json();
        alert('Gagal menghapus: ' + json.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto min-h-screen bg-[var(--color-bg-main)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">Experience CMS</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Kelola riwayat pekerjaan, organisasi, dan pendidikan Anda.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()} 
          className="flex items-center gap-2 bg-[var(--color-interactive)] text-[var(--color-interactive-text)] px-4 py-2 rounded-xl font-medium hover:bg-[var(--color-interactive-hover)] transition-colors"
        >
          <LucideIcons.Plus className="w-5 h-5" /> Tambah Baru
        </button>
      </div>

      <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)]">
              <tr>
                <th className="p-4">Tipe</th>
                <th className="p-4">Perusahaan / Instansi</th>
                <th className="p-4">Posisi / Judul</th>
                <th className="p-4">Periode</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map(exp => (
                <tr key={exp.id} className="border-t border-[var(--color-border)] align-top">
                  <td className="p-4">
                    <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 capitalize">
                      {exp.type}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-[var(--color-text-primary)]">{exp.company}</td>
                  <td className="p-4 text-[var(--color-text-secondary)]">{exp.position}</td>
                  <td className="p-4 text-sm text-[var(--color-text-muted)]">{exp.period}</td>
                  <td className="p-4 text-right space-x-2">
                    <button 
                      onClick={() => handleOpenModal(exp)} 
                      className="text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors"
                      title="Edit"
                    >
                      <LucideIcons.Edit className="w-5 h-5 inline-block" />
                    </button>
                    <button 
                      onClick={() => handleDelete(exp.id)} 
                      className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                      title="Delete"
                    >
                      <LucideIcons.Trash2 className="w-5 h-5 inline-block" />
                    </button>
                  </td>
                </tr>
              ))}
              {experiences.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[var(--color-text-muted)]">
                    Belum ada data pengalaman.
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
            <DialogTitle>{isEditMode ? 'Edit Item' : 'Tambah Baru'}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Tipe</label>
              <select 
                value={type} 
                onChange={(e) => setType(e.target.value)}
                className="p-2 rounded border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-interactive)]"
              >
                <option value="work">Kerja</option>
                <option value="organization">Organisasi</option>
                <option value="education">Pendidikan</option>
                <option value="certificate">Sertifikat</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                {type === 'certificate' ? 'Penerbit (Publisher)' : 'Perusahaan / Instansi'}
              </label>
              <input 
                type="text" 
                value={company} 
                onChange={(e) => setCompany(e.target.value)}
                className="p-2 rounded border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-interactive)]"
                placeholder={type === 'certificate' ? 'Misal: BNSP' : 'Misal: Google'}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                {type === 'certificate' ? 'Judul Sertifikat' : 'Posisi / Gelar'}
              </label>
              <input 
                type="text" 
                value={position} 
                onChange={(e) => setPosition(e.target.value)}
                className="p-2 rounded border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-interactive)]"
                placeholder={type === 'certificate' ? 'Misal: Junior Web Developer' : 'Misal: Frontend Engineer'}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Periode / Tahun</label>
              <input 
                type="text" 
                value={period} 
                onChange={(e) => setPeriod(e.target.value)}
                className="p-2 rounded border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-interactive)]"
                placeholder="Misal: Jan 2024 - Sekarang"
              />
            </div>

            {type === 'certificate' ? (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Credential URL (Tautan Sertifikat)</label>
                <input 
                  type="url" 
                  value={credentialUrl} 
                  onChange={(e) => setCredentialUrl(e.target.value)}
                  className="p-2 rounded border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-interactive)]"
                  placeholder="https://..."
                />
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Deskripsi</label>
                  <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="p-2 rounded border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-interactive)]"
                    placeholder="Jelaskan peran Anda..."
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Teknologi (Pisahkan dengan koma)</label>
                  <input 
                    type="text" 
                    value={technologies} 
                    onChange={(e) => setTechnologies(e.target.value)}
                    className="p-2 rounded border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-interactive)]"
                    placeholder="React, TypeScript, Tailwind"
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter className="mt-4">
            <button 
              onClick={handleCloseModal} 
              className="px-4 py-2 border border-[var(--color-border)] rounded-md hover:bg-[var(--color-bg-main)] text-[var(--color-text-secondary)]"
            >
              Batal
            </button>
            <button 
              onClick={handleSave} 
              className="px-4 py-2 bg-[var(--color-interactive)] text-[var(--color-interactive-text)] rounded-md hover:bg-[var(--color-interactive-hover)]"
            >
              Simpan
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
