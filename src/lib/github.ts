/**
 * Utility untuk parse URL GitHub dan fetch README.md
 * Hanya digunakan di admin CMS (client-side), bukan halaman publik.
 */

interface ParsedGithubRepo {
  owner: string;
  repo: string;
}

/**
 * Mendeteksi apakah string adalah URL repository GitHub publik yang valid,
 * lalu mengekstrak owner & nama repo.
 * Mendukung format:
 *  - https://github.com/owner/repo
 *  - https://github.com/owner/repo.git
 *  - https://github.com/owner/repo/
 */
export function parseGithubUrl(url: string): ParsedGithubRepo | null {
  try {
    const cleaned = url
      .trim()
      .replace(/\.git$/, '')
      .replace(/\/$/, '');
    const pattern = /^https?:\/\/(www\.)?github\.com\/([^/]+)\/([^/]+)$/i;
    const match = cleaned.match(pattern);
    if (!match) return null;

    const [, , owner, repo] = match;
    return { owner, repo };
  } catch {
    return null;
  }
}

/**
 * Membentuk raw URL README dari owner/repo dan branch tertentu.
 * Endpoint resmi raw content GitHub: raw.githubusercontent.com
 */
export function buildRawReadmeUrl(owner: string, repo: string, branch: 'main' | 'master'): string {
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`;
}

/**
 * Mengambil isi README dengan fallback otomatis main -> master.
 * Melempar error dengan pesan yang jelas untuk ditangani di layer UI.
 */
export async function fetchReadmeWithFallback(githubUrl: string): Promise<string> {
  const parsed = parseGithubUrl(githubUrl);
  if (!parsed) {
    throw new Error('URL GitHub tidak valid. Gunakan format: https://github.com/owner/repo');
  }

  const { owner, repo } = parsed;

  // 1. Coba branch "main" terlebih dahulu
  const mainUrl = buildRawReadmeUrl(owner, repo, 'main');
  const mainRes = await fetch(mainUrl);

  if (mainRes.ok) {
    return await mainRes.text();
  }

  // 2. Fallback ke branch "master" jika main mengembalikan 404
  if (mainRes.status === 404) {
    const masterUrl = buildRawReadmeUrl(owner, repo, 'master');
    const masterRes = await fetch(masterUrl);

    if (masterRes.ok) {
      return await masterRes.text();
    }

    if (masterRes.status === 404) {
      throw new Error(
        "README.md tidak ditemukan di branch 'main' maupun 'master'. Pastikan repo bersifat publik dan memiliki file README.md.",
      );
    }

    throw new Error(`Gagal mengambil README (status: ${masterRes.status}).`);
  }

  throw new Error(`Gagal mengambil README (status: ${mainRes.status}).`);
}
