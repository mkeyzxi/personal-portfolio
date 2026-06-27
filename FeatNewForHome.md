Tambahkan fitur pada section Home agar menjadi halaman utama yang merangkum keseluruhan isi website secara modern, informatif, dan interaktif.

Ketentuan:

- Di bawah Hero section, tambahkan "Overview / Website Summary Section".
- Section ini berfungsi sebagai ringkasan cepat dari seluruh halaman website agar pengunjung langsung memahami isi portfolio tanpa harus membuka setiap menu satu per satu.

Buat preview untuk:

- About
- Experience
- Projects
- Tech Stack
- Testimonials
- Journey
- Contact

Untuk setiap preview:

- Gunakan card atau layout visual yang konsisten dengan desain saat ini.
- Tampilkan ringkasan singkat dan poin penting.
- Tambahkan CTA seperti:
  - "Lihat Detail"
  - "Explore"
  - "Selengkapnya"

- Jangan tampilkan seluruh konten, cukup highlight inti dari setiap halaman.
- Berikan icon dan visual yang relevan.
- Tambahkan animasi hover dan reveal saat scroll.

Tambahkan GitHub Activity Section:

Gunakan akun GitHub:

`mkeyzxi`

Tampilkan:

- GitHub contribution graph
- Total repository
- Total contribution
- Commit streak
- Aktivitas terbaru
- Repository aktif atau pinned repository
- Statistik coding tambahan jika tersedia

Tambahkan contribution graph utama:

`https://github.com/mkeyzxi`

Integrasikan contribution graph Pacman berikut:

Dark mode:
`https://raw.githubusercontent.com/mkeyzxi/mkeyzxi/output/pacman-contribution-graph-dark.svg`

Light mode:
`https://raw.githubusercontent.com/mkeyzxi/mkeyzxi/output/pacman-contribution-graph.svg`

Implementasi:

- Gunakan `<picture>` agar otomatis menyesuaikan dark/light mode.
- Terapkan lazy loading.
- Tambahkan skeleton loading saat data belum tersedia.
- Tambahkan fallback apabila GitHub API atau graph gagal dimuat.
- Gunakan SWR agar data GitHub tidak melakukan fetch berulang.
- Gunakan cache agar saat berpindah halaman data tetap tersimpan.
- Gunakan revalidation seperlunya untuk sinkronisasi data.
- Hindari request berlebihan ke GitHub API.

Visual GitHub Section:

- Contribution graph dibuat lebih menonjol.
- Pacman contribution graph menjadi elemen visual utama.
- Tambahkan card statistik di sekitarnya.
- Tambahkan animasi ringan tetapi tidak berlebihan.
- Pastikan tampilan desktop dan mobile tetap rapi.

Performa:

- Gunakan lazy loading untuk section yang berada di bawah fold.
- Hindari render ulang yang tidak perlu.
- Optimalkan asset dan image loading.
- Pastikan Home tetap cepat meskipun memiliki banyak komponen.

Hasil akhir:

Home harus terasa seperti landing page portfolio modern yang berfungsi sebagai pusat ringkasan seluruh website, dengan integrasi GitHub activity yang hidup, menampilkan contribution graph serta pacman contribution animation secara menarik dan responsif.
