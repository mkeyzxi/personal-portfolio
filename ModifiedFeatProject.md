# Panduan Teknis: Fitur Baru Form Tambah Proyek — CMS Portofolio

**Dokumen:** `newFeatProject.md`
**Aplikasi:** Portofolio SPA/CSR — `makbuln.vercel.app`
**Database:** Firebase (Firestore) — sudah tersedia
**Skala data:** ±50 proyek
**Cakupan:** (1) Sinkronisasi konten dari GitHub README, (2) Pengurutan proyek featured di frontend

---

## Daftar Isi

1. [Ringkasan Fitur](#1-ringkasan-fitur)
2. [Fitur A — Sinkronisasi Konten Detail Proyek dari GitHub README](#2-fitur-a--sinkronisasi-konten-detail-proyek-dari-github-readme)
3. [Fitur B — Urutan Proyek Unggulan (Featured)](#3-fitur-b--urutan-proyek-unggulan-featured)
4. [Rekomendasi Tambahan](#4-rekomendasi-tambahan)
5. [Checklist Implementasi](#5-checklist-implementasi)

---

## 1. Ringkasan Fitur

| #   | Fitur                                 | Tujuan                                                                          | Lokasi Perubahan             |
| --- | ------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------- |
| A   | Tombol "Ambil README" pada form admin | Mengisi otomatis `contentDetail` dari README GitHub, tanpa membebani rate limit | Dashboard/Form Tambah Proyek |
| B   | Sorting `isFeatured` di frontend      | Proyek featured tampil paling atas di halaman utama                             | Komponen list `#projects`    |

Prinsip utama yang dipegang di seluruh dokumen ini: **semua proses fetch ke GitHub bersifat manual (on-click), bukan otomatis/massal**, agar tidak menghabiskan kuota rate limit GitHub (60 request/jam per IP) mengingat total proyek sudah mencapai ~50 item.

---

## 2. Fitur A — Sinkronisasi Konten Detail Proyek dari GitHub README

### 2.1 Alur Kerja Form

```
[Input: GitHub URL (Opsional)]   [Tombol: Ambil README]
[Textarea: Konten Detail Proyek *]  <-- diisi manual ATAU hasil fetch
```

Aturan alur:

1. Admin **boleh** mengisi kolom "GitHub URL (Opsional)".
2. Jika diisi, admin **menekan tombol "Ambil README"** untuk memicu proses fetch secara manual.
3. Hasil fetch (raw markdown) dimasukkan ke **state** textarea "Konten Detail Proyek", **bukan langsung disimpan ke database**. Admin tetap bisa meninjau/mengedit sebelum klik "Simpan".
4. Jika kolom GitHub URL **kosong**, textarea "Konten Detail Proyek" wajib diisi manual (validasi `required` aktif).
5. Proses fetch **tidak pernah berjalan di halaman publik/pengunjung** — hanya di dashboard admin, dan hanya saat tombol diklik.

### 2.2 Utility: Deteksi & Konversi URL GitHub → Raw README

```typescript
// utils/github.ts

interface ParsedGithubRepo {
  owner: string
  repo: string
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
      .replace(/\/$/, '')
    const pattern = /^https?:\/\/(www\.)?github\.com\/([^/]+)\/([^/]+)$/i
    const match = cleaned.match(pattern)
    if (!match) return null

    const [, , owner, repo] = match
    return {owner, repo}
  } catch {
    return null
  }
}

/**
 * Membentuk raw URL README dari owner/repo dan branch tertentu.
 * Endpoint resmi raw content GitHub: raw.githubusercontent.com
 */
export function buildRawReadmeUrl(owner: string, repo: string, branch: 'main' | 'master'): string {
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`
}

/**
 * Mengambil isi README dengan fallback otomatis main -> master.
 * Melempar error dengan pesan yang jelas untuk ditangani di layer UI.
 */
export async function fetchReadmeWithFallback(githubUrl: string): Promise<string> {
  const parsed = parseGithubUrl(githubUrl)
  if (!parsed) {
    throw new Error('URL GitHub tidak valid. Gunakan format: https://github.com/owner/repo')
  }

  const {owner, repo} = parsed

  // 1. Coba branch "main" terlebih dahulu
  const mainUrl = buildRawReadmeUrl(owner, repo, 'main')
  const mainRes = await fetch(mainUrl)

  if (mainRes.ok) {
    return await mainRes.text()
  }

  // 2. Fallback ke branch "master" jika main mengembalikan 404
  if (mainRes.status === 404) {
    const masterUrl = buildRawReadmeUrl(owner, repo, 'master')
    const masterRes = await fetch(masterUrl)

    if (masterRes.ok) {
      return await masterRes.text()
    }

    if (masterRes.status === 404) {
      throw new Error(
        "README.md tidak ditemukan di branch 'main' maupun 'master'. Pastikan repo bersifat publik dan memiliki file README.md.",
      )
    }

    throw new Error(`Gagal mengambil README (status: ${masterRes.status}).`)
  }

  throw new Error(`Gagal mengambil README (status: ${mainRes.status}).`)
}
```

> **Catatan penting:** Endpoint raw content GitHub yang benar adalah `raw.githubusercontent.com`, bukan `githubusercontent.com`. Format lengkap: `https://raw.githubusercontent.com/{owner}/{repo}/{branch}/README.md`.

### 2.3 Komponen Form (React) — Lengkap dengan Loading & Error Handling

```tsx
// components/admin/ProjectForm.tsx
import {useState} from 'react'
import {fetchReadmeWithFallback} from '@/utils/github'

interface ProjectFormState {
  title: string
  githubUrl: string
  contentDetail: string
  isFeatured: boolean
}

export default function ProjectForm() {
  const [form, setForm] = useState<ProjectFormState>({
    title: '',
    githubUrl: '',
    contentDetail: '',
    isFeatured: false,
  })

  const [isFetchingReadme, setIsFetchingReadme] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [fetchSuccess, setFetchSuccess] = useState(false)

  const handleFetchReadme = async () => {
    setFetchError(null)
    setFetchSuccess(false)

    if (!form.githubUrl.trim()) {
      setFetchError('Isi kolom GitHub URL terlebih dahulu sebelum mengambil README.')
      return
    }

    setIsFetchingReadme(true)
    try {
      const readmeText = await fetchReadmeWithFallback(form.githubUrl)
      setForm((prev) => ({...prev, contentDetail: readmeText}))
      setFetchSuccess(true)
    } catch (err) {
      setFetchError(err instanceof Error ? err.message : 'Terjadi kesalahan tidak diketahui.')
    } finally {
      setIsFetchingReadme(false)
    }
  }

  const isContentRequired = form.githubUrl.trim().length === 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isContentRequired && !form.contentDetail.trim()) {
      setFetchError('Konten Detail Proyek wajib diisi manual karena GitHub URL kosong.')
      return
    }
    // TODO: kirim `form` ke Firestore (collection: "projects")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title">Judul Proyek *</label>
        <input
          id="title"
          type="text"
          required
          value={form.title}
          onChange={(e) => setForm((p) => ({...p, title: e.target.value}))}
        />
      </div>

      <div>
        <label htmlFor="githubUrl">GitHub URL (Opsional)</label>
        <div className="flex gap-2">
          <input
            id="githubUrl"
            type="url"
            placeholder="https://github.com/owner/repo"
            value={form.githubUrl}
            onChange={(e) => setForm((p) => ({...p, githubUrl: e.target.value}))}
          />
          <button type="button" onClick={handleFetchReadme} disabled={isFetchingReadme}>
            {isFetchingReadme ? 'Mengambil...' : 'Ambil README'}
          </button>
        </div>

        {isFetchingReadme && (
          <p role="status" className="text-sm text-gray-500">
            Sedang mengambil README dari GitHub, mohon tunggu...
          </p>
        )}
        {fetchError && (
          <p role="alert" className="text-sm text-red-600">
            {fetchError}
          </p>
        )}
        {fetchSuccess && !fetchError && (
          <p className="text-sm text-green-600">
            README berhasil diambil. Silakan tinjau/edit di bawah sebelum menyimpan.
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contentDetail">Konten Detail Proyek {isContentRequired ? '*' : ''}</label>
        <textarea
          id="contentDetail"
          required={isContentRequired}
          rows={10}
          value={form.contentDetail}
          onChange={(e) => setForm((p) => ({...p, contentDetail: e.target.value}))}
          placeholder={
            isContentRequired
              ? 'Wajib diisi manual karena GitHub URL kosong...'
              : 'Hasil README akan muncul di sini, atau isi manual...'
          }
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) => setForm((p) => ({...p, isFeatured: e.target.checked}))}
          />
          Jadikan Featured
        </label>
      </div>

      <button type="submit">Simpan Proyek</button>
    </form>
  )
}
```

### 2.4 Validasi Input

| Kondisi                                                   | Perilaku                                                                                             |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| GitHub URL kosong                                         | `contentDetail` wajib diisi manual (`required` aktif di textarea)                                    |
| GitHub URL diisi tapi tombol "Ambil README" belum ditekan | `contentDetail` tetap **tidak** required secara paksa — admin bisa isi manual atau klik tombol fetch |
| Fetch gagal (404 di kedua branch, repo private, dsb.)     | Tampilkan pesan error yang jelas, jangan ubah isi textarea, biarkan admin isi manual                 |
| URL bukan format GitHub valid                             | Tolak sebelum fetch, tampilkan pesan validasi format                                                 |

### 2.5 Catatan Rate Limit GitHub

- Rate limit anonim (tanpa token): **60 request/jam per IP**.
- Karena hanya admin yang memicu fetch (bukan 50 proyek di-fetch otomatis untuk tiap pengunjung), pemakaian kuota sangat kecil — maksimal sejumlah proyek yang diedit/ditambah admin dalam satu jam.
- **Jangan** panggil `fetchReadmeWithFallback` di `useEffect` pada halaman publik atau saat me-render list 50 proyek sekaligus. Ini satu-satunya penyebab kuota bisa habis.
- Jika ke depan volume proyek bertambah jauh lebih besar dan butuh fetch otomatis berkala, pertimbangkan Personal Access Token (naik ke 5000 request/jam) via server-side route, bukan client-side langsung.

---

## 3. Fitur B — Urutan Proyek Unggulan (Featured)

### 3.1 Kondisi Saat Ini

- Field `isFeatured: boolean` **sudah tersimpan** dengan benar di Firestore.
- Frontend **belum melakukan sorting** — data dirender apa adanya sesuai urutan hasil query Firestore (biasanya urutan insert/`createdAt` default).

### 3.2 Solusi: Sorting di Sisi Frontend Sebelum `.map()`

```typescript
// utils/sortProjects.ts

interface Project {
  id: string
  title: string
  isFeatured: boolean
  createdAt: string | number | Date // sesuaikan dengan tipe timestamp Firestore Anda
  // ...field lain
}

/**
 * Urutan:
 * 1. isFeatured: true lebih dulu dari isFeatured: false
 * 2. Di antara proyek dengan status featured yang sama, urutkan
 *    berdasarkan createdAt terbaru (descending)
 */
export function sortProjectsByFeatured(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    if (a.isFeatured !== b.isFeatured) {
      return a.isFeatured ? -1 : 1
    }

    const dateA = new Date(a.createdAt).getTime()
    const dateB = new Date(b.createdAt).getTime()
    return dateB - dateA // terbaru duluan
  })
}
```

### 3.3 Penerapan di Komponen List

```tsx
// components/ProjectList.tsx
import {sortProjectsByFeatured} from '@/utils/sortProjects'

export default function ProjectList({projects}: {projects: Project[]}) {
  const sortedProjects = sortProjectsByFeatured(projects)

  return (
    <div className="grid gap-4">
      {sortedProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
```

> **Penting:** Jika data diambil via Firestore query dengan `orderBy("createdAt", "desc")`, sorting `sortProjectsByFeatured` di atas tetap dijalankan **setelah** data diterima di client — Firestore `orderBy` tidak bisa mengurutkan boolean lalu tanggal dalam satu query compound tanpa composite index tambahan. Pendekatan sort di client lebih sederhana untuk skala ~50 item dan menghindari kebutuhan composite index di Firestore.

### 3.4 Alternatif: Query Firestore dengan Composite Index (Opsional)

Jika ingin sorting dilakukan di level query (misalnya untuk pagination di masa depan):

```typescript
import {collection, query, orderBy} from 'firebase/firestore'

const projectsQuery = query(
  collection(db, 'projects'),
  orderBy('isFeatured', 'desc'),
  orderBy('createdAt', 'desc'),
)
```

Firestore akan meminta pembuatan **composite index** (`isFeatured` + `createdAt`) — link pembuatan index otomatis muncul di error console saat query pertama kali dijalankan. Untuk skala 50 proyek, sorting di client (bagian 3.2–3.3) sudah cukup dan lebih sederhana untuk dipelihara.

---

## 4. Rekomendasi Tambahan

### 4.1 Markdown Renderer untuk Konten README

Karena `contentDetail` bisa berisi markdown mentah dari GitHub, gunakan renderer agar tampil rapi di halaman detail proyek pengunjung:

```bash
npm install react-markdown remark-gfm
```

```tsx
// components/ProjectDetailContent.tsx
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function ProjectDetailContent({content}: {content: string}) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}
```

- `react-markdown` — renderer inti, aman secara default (tidak menjalankan HTML mentah/script).
- `remark-gfm` — dukungan GitHub Flavored Markdown (tabel, checklist, strikethrough) yang umum dipakai di README GitHub.
- Hindari `dangerouslySetInnerHTML` untuk merender markdown mentah — `react-markdown` sudah menangani sanitasi output secara aman.

### 4.2 Pertimbangan Keamanan CMS

- Fetch README dilakukan dari **client admin**, bukan server — pastikan halaman/route form ini dilindungi autentikasi admin (Firebase Auth) agar tidak disalahgunakan sebagai proxy fetch publik.
- Batasi ukuran teks yang diterima dari fetch (misal maksimal beberapa ratus KB) untuk mencegah README yang sangat besar membebani textarea/database.

### 4.3 Pengalaman Admin

- Tampilkan indikator kecil di sebelah tombol "Ambil README" jika konten di textarea sudah pernah diisi manual, sebagai peringatan bahwa fetch akan menimpa isi tersebut (bisa berupa `confirm()` sederhana sebelum overwrite).

---

## 5. Checklist Implementasi

- [ ] Buat `utils/github.ts` (parse URL + fetch dengan fallback `main` → `master`)
- [ ] Tambahkan tombol "Ambil README" di form admin, hubungkan ke state `contentDetail`
- [ ] Terapkan validasi `required` kondisional pada textarea "Konten Detail Proyek"
- [ ] Tambahkan state loading & error handling di form (sesuai contoh Bagian 2.3)
- [ ] Buat `utils/sortProjects.ts` dan terapkan di komponen list `#projects`
- [ ] (Opsional) Buat composite index Firestore jika memilih pendekatan query-level sorting
- [ ] Install & integrasikan `react-markdown` + `remark-gfm` di halaman detail proyek
- [ ] Uji dengan repo yang branch defaultnya `master` (bukan `main`) untuk memastikan fallback bekerja
- [ ] Uji dengan repo tanpa README.md untuk memastikan pesan error jelas dan tidak menimpa data lama
