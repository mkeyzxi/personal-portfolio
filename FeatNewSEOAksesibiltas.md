content = """# Blueprint: Aksesibilitas (WCAG) & SEO Teknis (FeatNewSeo)

## 1. Koreksi Fundamental (Wajib Dibaca Sebelum Mulai Code)

Anda mengalami kebingungan fatal terhadap target audiens Anda sendiri. Anda menyebut "tuna rungu" (gangguan pendengaran) tetapi konteks yang Anda jelaskan adalah "tidak melihat tapi dengan mendengar menggunakan narrator".
**Tuna rungu tidak butuh screen reader.** Mereka butuh _caption_ atau transkrip untuk media audio/video.
Pengguna yang tidak bisa melihat dan butuh _screen reader_ (seperti NVDA, JAWS, VoiceOver, atau Narrator) adalah **tuna netra** (gangguan penglihatan/kebutaan). Jika Anda sebagai _front-end developer_ tidak bisa membedakan kedua kelompok disabilitas ini, arsitektur aksesibilitas Anda akan berantakan sejak awal.

Selain itu, hapus ilusi bahwa menambahkan beberapa tag ARIA dan meta tag akan "membuat website nomor 1". SEO bukan sihir. SEO teknis hanya tiket masuk agar web Anda bisa dibaca oleh _crawler_ Google (Googlebot). Peringkat 1 ditentukan oleh seberapa berharga, relevan, dan berotoritas konten Anda dibandingkan kompetitor.

## 2. Hukum Pertama ARIA

**Jangan gunakan ARIA jika Anda bisa menggunakan elemen HTML semantik bawaan.**
Menggunakan `<button>` jauh lebih baik dan inklusif secara otomatis daripada menggunakan `<div role="button" tabindex="0">`. Gunakan ARIA hanya untuk menjembatani celah di mana HTML standar tidak cukup mendeskripsikan _state_ atau elemen kompleks (seperti _dropdown custom_, _modal_, atau _tabs_).

## 3. Implementasi Aksesibilitas (WCAG 2.2) untuk Tuna Netra (Screen Readers)

### A. Hierarki Landmark & Semantik

Pastikan kerangka web modern Anda (misalnya jika menggunakan React/Vite) tidak hanya membuang semua konten ke dalam `<div id="root">` tanpa landmark.

B. Penggunaan aria-label, aria-labelledby, dan aria-describedby
aria-label: Berikan nama pada elemen interaktif yang tidak memiliki teks (misalnya tombol ikon).

HTML
<button aria-label="Tutup jendela pengaturan">X</button>
aria-labelledby: Gunakan jika label untuk sebuah elemen sudah ada dalam bentuk teks di bagian lain halaman.

HTML

<h2 id="billing-title">Informasi Tagihan</h2>
<section aria-labelledby="billing-title">...</section>
C. Gambar & Atribut Alt
Gambar informatif: Berikan deskripsi yang jelas. alt="Grafik kenaikan harga Ethereum bulan ini".

Gambar dekoratif: Kosongkan alt-nya agar diabaikan screen reader. alt="". Jangan hapus atributnya, cukup biarkan kosong.

D. Manajemen Fokus (Focus Management)
Bila Anda membuka modal atau navigasi interaktif, pastikan fokus keyboard dipindahkan ke dalam modal tersebut, dan kembalikan fokus ke tombol pemicu saat modal ditutup.

4. Fondasi Technical SEO yang Sebenarnya
   Karena Googlebot merayapi DOM hampir dengan cara yang sama seperti screen reader membaca struktur halaman, aksesibilitas yang baik sama dengan SEO teknis yang baik.

A. Struktur Heading (H1 - H6) yang Valid
Hanya ada satu <h1> per halaman yang berisi fokus utama kata kunci.

Jangan pernah melompati level heading (misal dari H2 langsung ke H4) hanya karena alasan styling visual di CSS (Tailwind/lainnya). Gunakan struktur hierarki yang logis.

B. Meta Tags dan Core Web Vitals
Title Title yang unik tiap halaman (< 60 karakter).

Meta Description yang memicu CTR (< 160 karakter).

Kecepatan Muat: Google membenci halaman lambat. Pastikan LCP (Largest Contentful Paint) di bawah 2.5 detik. Minimalkan bundle size JavaScript Anda.

C. Skema Data Terstruktur (JSON-LD)
Gunakan JSON-LD untuk menyuapi Google informasi entitas secara langsung agar mendapat Rich Snippets.

HTML

<script type="application/ld+json">
{
  "@context": "[https://schema.org/](https://schema.org/)",
  "@type": "WebSite",
  "name": "Nama Web Anda",
  "url": "[https://domainanda.com/](https://domainanda.com/)"
}
</script>

D. Rendering
Jika Anda membangun web dengan framework Single Page Application (SPA), pastikan Anda melakukan Server-Side Rendering (SSR) atau Static Site Generation (SSG). Googlebot bisa mengeksekusi JavaScript, tetapi SSR/SSG menjamin visibilitas SEO yang jauh lebih cepat dan andal.

5. Rencana Tindakan Anda Berikutnya:
   Audit Teks: Uji web Anda dengan menutup mata, gunakan NVDA (Windows) atau VoiceOver (Mac), dan navigasi hanya dengan tombol Tab. Jika Anda frustrasi, pengguna Anda lebih frustrasi lagi.

Perbaiki Markup: Ganti <div> yang bertindak sebagai tombol/link dengan <button> dan <a>.
