'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import * as LucideIcons from 'lucide-react';

export default function AdminTestimonialsDashboard() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchTestimonials(currentUser);
      } else {
        router.push('/admin/login');
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const fetchTestimonials = async (currentUser: any) => {
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch('/api/admin/testimonials', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success) setTestimonials(json.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const token = await user.getIdToken();
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchTestimonials(user);
      } else {
        const json = await res.json();
        alert('Gagal memperbarui status: ' + json.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus testimoni ini secara permanen?')) return;
    try {
      const token = await user.getIdToken();
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchTestimonials(user);
      } else {
        const json = await res.json();
        alert('Gagal menghapus testimoni: ' + json.message);
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
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">Testimonial CMS</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Tinjau, setujui, atau tolak testimoni dari pengunjung website.</p>
        </div>
      </div>

      <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)]">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Message</th>
                <th className="p-4">Status</th>
                <th className="p-4">Tanggal</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map(testimonial => (
                <tr key={testimonial.id} className="border-t border-[var(--color-border)] align-top">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {testimonial.avatar ? (
                        <img src={testimonial.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <LucideIcons.User className="w-4 h-4 text-gray-500" />
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-sm">{testimonial.name}</div>
                        <div className="text-xs text-[var(--color-text-muted)]">{testimonial.email}</div>
                        <div className="text-xs text-blue-500">{testimonial.provider}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 max-w-sm">
                    <p className="text-sm line-clamp-3 text-[var(--color-text-secondary)]">
                      {testimonial.message}
                    </p>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      testimonial.status === 'approved' ? 'bg-green-100 text-green-800' : 
                      testimonial.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {testimonial.status || 'pending'}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-[var(--color-text-secondary)]">
                    {new Date(testimonial.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {testimonial.status !== 'approved' && (
                      <button 
                        onClick={() => handleUpdateStatus(testimonial.id, 'approved')} 
                        className="text-green-600 hover:text-green-800 text-sm font-medium transition-colors"
                        title="Approve"
                      >
                        <LucideIcons.CheckCircle className="w-5 h-5 inline-block" />
                      </button>
                    )}
                    {testimonial.status !== 'rejected' && (
                      <button 
                        onClick={() => handleUpdateStatus(testimonial.id, 'rejected')} 
                        className="text-yellow-600 hover:text-yellow-800 text-sm font-medium transition-colors"
                        title="Reject"
                      >
                        <LucideIcons.XCircle className="w-5 h-5 inline-block" />
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(testimonial.id)} 
                      className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                      title="Delete"
                    >
                      <LucideIcons.Trash2 className="w-5 h-5 inline-block" />
                    </button>
                  </td>
                </tr>
              ))}
              {testimonials.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[var(--color-text-muted)]">
                    Belum ada testimoni.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
