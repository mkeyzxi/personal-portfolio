'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import * as LucideIcons from 'lucide-react';
import type { Project } from '@/types';
import Link from 'next/link';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/admin');
      } else {
        setUser(currentUser);
        fetchProjects();
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      setProjects(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm('Yakin ingin menghapus proyek ini?')) return;
    try {
      await deleteDoc(doc(db, 'projects', projectId));
      setProjects(prev => prev.filter(p => p.id !== projectId));
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('Gagal menghapus proyek');
    }
  };

  if (!user) return null;

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto min-h-screen bg-[var(--color-bg-main)]">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">Kelola Proyek</h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">CMS untuk menambah dan mengatur portofolio proyek.</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/admin')}
              className="px-4 py-2 border border-[var(--color-border)] rounded-xl hover:bg-[var(--color-bg-main)] text-[var(--color-text-secondary)] font-medium transition-colors"
            >
              Kembali
            </button>
            <Link
              href="/admin/projects/new"
              className="flex items-center gap-2 bg-[var(--color-interactive)] text-[var(--color-interactive-text)] px-4 py-2 rounded-xl font-medium hover:bg-[var(--color-interactive-hover)] transition-colors"
            >
              <LucideIcons.Plus className="h-5 w-5" />
              Tambah Baru
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="flex flex-1 items-center justify-center py-20">
              <LucideIcons.Loader2 className="h-8 w-8 animate-spin text-[var(--color-text-muted)]" />
            </div>
          ) : projects.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center py-20 text-[var(--color-text-muted)] gap-4">
              <LucideIcons.FolderOpen className="h-12 w-12 opacity-50" />
              <p>Belum ada proyek yang ditambahkan.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)]">
                  <tr>
                    <th className="p-4 font-semibold">Judul Proyek</th>
                    <th className="p-4 font-semibold">Kategori</th>
                    <th className="p-4 font-semibold hidden md:table-cell">Tanggal Buat</th>
                    <th className="p-4 font-semibold">Featured</th>
                    <th className="p-4 font-semibold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-t border-[var(--color-border)] align-top">
                      <td className="p-4 font-medium text-[var(--color-text-primary)]">
                        {project.title}
                        <div className="text-xs text-[var(--color-text-muted)] font-normal mt-1">{project.slug}</div>
                      </td>
                      <td className="p-4 capitalize text-[var(--color-text-secondary)]">{project.category}</td>
                      <td className="p-4 hidden md:table-cell whitespace-nowrap text-[var(--color-text-secondary)]">
                        {project.createdAt ? format(new Date(project.createdAt), 'dd MMM yyyy', { locale: id }) : '-'}
                      </td>
                      <td className="p-4">
                        {project.featured ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-interactive)]/10 px-2 py-1 text-xs font-semibold text-[var(--color-interactive)]">
                            <LucideIcons.Star className="h-3 w-3 fill-current" /> Ya
                          </span>
                        ) : (
                          <span className="text-[var(--color-text-muted)]">-</span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/projects/${project.slug}`}
                            target="_blank"
                            className="text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors"
                            title="Lihat Proyek"
                          >
                            <LucideIcons.ExternalLink className="h-5 w-5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                            title="Hapus Proyek"
                          >
                            <LucideIcons.Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
