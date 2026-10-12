/**
 * Helper invalidasi cache Next.js yang aman.
 *
 * `revalidatePath()` dari `next/cache` hanya bisa dipanggil di dalam request
 * context Next.js. Di unit test (Jest) atau eksekusi CLI, fungsi tersebut akan
 * melempar error "static generation store missing".
 *
 * Wrapper ini menangkap error tersebut sehingga:
 * - Di produksi: invalidasi tetap berjalan normal.
 * - Di test/konteks tanpa Next runtime: operasi dilewati tanpa menggagalkan proses.
 */

type RevalidateFn = (path: string, type?: 'layout' | 'page') => void;

function getRevalidate(): RevalidateFn | null {
  try {
    // Diperlukan agar bundler tidak meng-rewrite import saat unit test.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require('next/cache') as { revalidatePath?: RevalidateFn };
    return typeof mod.revalidatePath === 'function' ? mod.revalidatePath : null;
  } catch {
    return null;
  }
}

/**
 * Memvalidasi (membersihkan) cache untuk daftar path yang diberikan.
 * Gagal diam-diam bila tidak ada Next.js cache store yang tersedia.
 *
 * @param paths - Path yang perlu di-invalidasi, mis. '/', '/projects'.
 */
export function invalidateCache(paths: string[]): void {
  const revalidate = getRevalidate();
  if (!revalidate) return;

  for (const path of paths) {
    try {
      revalidate(path);
    } catch {
      // Tidak ada static generation store (mis. unit test) - abaikan.
    }
  }
}
