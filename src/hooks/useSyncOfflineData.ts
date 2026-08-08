import { useEffect } from 'react';
import { db, PendingRequest } from '@/lib/db';
import { auth } from '@/lib/firebase';
import { toast } from 'sonner';

export function useSyncOfflineData() {
  useEffect(() => {
    const handleOnline = async () => {
      try {
        const pendingRequests = await db.pendingRequests.toArray();
        if (pendingRequests.length === 0) return;

        toast.info(`Menyinkronkan ${pendingRequests.length} data yang tertunda...`);

        let syncCount = 0;
        let failCount = 0;

        for (const req of pendingRequests) {
          try {
            const headers: Record<string, string> = {
              'Content-Type': 'application/json',
            };

            // Jika user sedang login, selalu lampirkan token terbaru
            const currentUser = auth.currentUser;
            if (currentUser) {
              const token = await currentUser.getIdToken();
              headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(req.url, {
              method: req.method,
              headers,
              body: JSON.stringify(req.payload),
            });

            if (response.ok) {
              await db.pendingRequests.delete(req.id!);
              syncCount++;
            } else {
              // Jika response gagal misal karena validasi atau token tidak valid
              console.error(`Gagal sinkronisasi data ${req.type}`, await response.text());
              failCount++;
            }
          } catch (error) {
            console.error('Network error saat sinkronisasi', error);
            failCount++;
          }
        }

        if (syncCount > 0) {
          toast.success(`${syncCount} data berhasil disinkronkan ke server.`);
        }
        if (failCount > 0) {
          toast.error(`${failCount} data gagal disinkronkan. Pastikan koneksi dan sesi login valid.`);
        }

      } catch (error) {
        console.error('Error saat membaca data lokal untuk sinkronisasi:', error);
      }
    };

    // Tambahkan listener untuk event 'online'
    window.addEventListener('online', handleOnline);
    
    // Opsional: Coba sinkronisasi sekali saat mount jika online
    if (typeof navigator !== 'undefined' && navigator.onLine) {
      handleOnline();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, []);
}
