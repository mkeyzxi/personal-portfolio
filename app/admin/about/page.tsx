'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import * as LucideIcons from 'lucide-react';
import { AboutData } from '@/types';

export default function AdminAboutDashboard() {
  const [user, setUser] = useState<import('firebase/auth').User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  // Form State
  const [location, setLocation] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [education, setEducation] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState<number>(0);
  const [bio, setBio] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchAboutData();
      } else {
        router.push('/admin/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchAboutData = async () => {
    try {
      const res = await fetch('/api/about');
      const json = await res.json();
      if (json.success && json.data) {
        const data = json.data as AboutData;
        setLocation(data.location || '');
        setEmploymentStatus(data.employmentStatus || '');
        setEducation(data.education || '');
        setYearsOfExperience(data.yearsOfExperience || 0);
        setBio(data.bio || '');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      const token = await user.getIdToken();
      
      const payload = {
        location,
        employmentStatus,
        education,
        yearsOfExperience,
        bio
      };

      const res = await fetch('/api/about', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      const json = await res.json();
      if (res.ok && json.success) {
        alert('Data About berhasil diperbarui!');
      } else {
        alert('Gagal menyimpan: ' + json.message);
      }
    } catch (e) {
      console.error(e);
      alert('Terjadi kesalahan saat menyimpan data.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto min-h-screen bg-[var(--color-bg-main)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">About CMS</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Kelola informasi profil, status, pendidikan, dan pengalaman Anda.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="flex items-center gap-2 bg-[var(--color-interactive)] text-[var(--color-interactive-text)] px-4 py-2 rounded-xl font-medium hover:bg-[var(--color-interactive-hover)] transition-colors disabled:opacity-50"
        >
          {isSaving ? <LucideIcons.Loader2 className="w-5 h-5 animate-spin" /> : <LucideIcons.Save className="w-5 h-5" />}
          {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>

      <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--color-text-primary)]">Lokasi</label>
            <input 
              type="text" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)}
              className="p-3 rounded border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-interactive)]"
              placeholder="Misal: Indonesia, Makassar"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--color-text-primary)]">Status Pekerjaan</label>
            <input 
              type="text" 
              value={employmentStatus} 
              onChange={(e) => setEmploymentStatus(e.target.value)}
              className="p-3 rounded border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-interactive)]"
              placeholder="Misal: Freelance"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--color-text-primary)]">Pendidikan Terakhir / Saat Ini</label>
            <input 
              type="text" 
              value={education} 
              onChange={(e) => setEducation(e.target.value)}
              className="p-3 rounded border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-interactive)]"
              placeholder="Misal: Informatics Engineering Student"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--color-text-primary)]">Tahun Pengalaman (Angka)</label>
            <input 
              type="number" 
              value={yearsOfExperience} 
              onChange={(e) => setYearsOfExperience(Number(e.target.value))}
              className="p-3 rounded border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-interactive)]"
              placeholder="Misal: 3"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="text-sm font-medium text-[var(--color-text-primary)]">
            Biografi / Tentang Saya (Gunakan double enter untuk paragraf baru)
          </label>
          <textarea 
            value={bio} 
            onChange={(e) => setBio(e.target.value)}
            rows={10}
            className="p-3 rounded border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-interactive)]"
            placeholder="Tuliskan biografi Anda di sini..."
          />
        </div>
      </div>
    </div>
  );
}
