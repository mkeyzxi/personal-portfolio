'use client';

import { SWRConfig } from 'swr';
import { ReactNode } from 'react';

/**
 * LocalStorage Cache Provider untuk SWR (1 Kali Fetch Strategy & Offline Resilience)
 *
 * Mengamankan seluruh cache data API & Firebase dari memori ke dalam localStorage browser.
 * Saat pengguna beralih antar menu (yang menyebabkan unmounting & remounting komponen)
 * atau bahkan menutup tab dan membuka kembali keesokan harinya, SWR akan langsung
 * memanfaatkan data cache lokal secara instan tanpa membuat network request baru.
 */
function localStorageProvider() {
  if (typeof window === 'undefined') {
    return new Map();
  }

  const CACHE_KEY = 'portfolio_swr_cache_v1';
  
  // Ambil cache yang ada di localStorage saat pertama kali inisiasi provider
  const map = new Map<string, any>(
    (() => {
      try {
        const item = localStorage.getItem(CACHE_KEY);
        return item ? JSON.parse(item) : [];
      } catch {
        return [];
      }
    })()
  );

  // Simpan cache dari memori kembali ke localStorage saat ada perubahan atau meninggalkan laman
  if (typeof window !== 'undefined') {
    const saveCache = () => {
      try {
        // Hanya simpan item berukuran wajar untuk menghindari batas localStorage (5MB)
        const entries = Array.from(map.entries()).filter(([_, value]) => {
          try {
            const str = JSON.stringify(value);
            return str.length < 500000; // batasi < 500KB per item
          } catch {
            return false;
          }
        });
        localStorage.setItem(CACHE_KEY, JSON.stringify(entries));
      } catch (e) {
        // Abaikan jika quota terlampaui (storage full)
      }
    };

    window.addEventListener('beforeunload', saveCache);
    // Jalankan penyimpanan berkala saat main thread santai
    const interval = setInterval(saveCache, 30000);

    // Cleanup pada unmount
    return Object.assign(map, {
      destroy: () => {
        window.removeEventListener('beforeunload', saveCache);
        clearInterval(interval);
      }
    });
  }

  return map;
}

export function SWRProvider({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        // 1. Deduping interval 10 menit (600.000ms):
        // Jika request ke URL yang sama terjadi dalam 10 menit, langsung pakai cache (Jangan fetch ulang)
        dedupingInterval: 600000,
        
        // 2. Mencegah fetch berulang saat pengguna berpindah tab/jendela di browser
        revalidateOnFocus: false,
        
        // 3. Jangan revalidate ulang jika cache lokal sudah matang (1 Kali Fetch instan)
        revalidateIfStale: false,
        
        // 4. Mencegah lonjakan koneksi saat internet fluktuatif
        revalidateOnReconnect: false,

        // 5. Hubungkan provider persisten ke localStorage
        provider: localStorageProvider,
      }}
    >
      {children}
    </SWRConfig>
  );
}
