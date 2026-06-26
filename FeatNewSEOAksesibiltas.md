# Feature Blueprint: SEO Teknis & Aksesibilitas (WCAG 2.2)

> **Konteks Proyek:** Portfolio website dengan 8 section (Home, About, Experience, Projects, Tech Stack, Testimonials, Story, Contact), client-side rendering (konten di-swap in-place saat klik menu), sidebar kiri di desktop, bottom nav + hamburger drawer di mobile. Stack: React/Vite + Firebase (free tier only, no Storage).

---

## ⚠️ Koreksi Konsep Sebelum Mulai

### Tuna Netra vs. Tuna Rungu — Ini Bukan Hal Sepele

Keduanya adalah kelompok disabilitas yang **berbeda total** dengan kebutuhan yang berbeda.

|                              | Tuna Netra (gangguan penglihatan)                  | Tuna Rungu (gangguan pendengaran) |
| ---------------------------- | -------------------------------------------------- | --------------------------------- |
| **Alat bantu**               | Screen reader (NVDA, JAWS, VoiceOver, Narrator)    | Caption/subtitle, transkrip teks  |
| **Cara navigasi web**        | Keyboard + audio dari screen reader                | Visual biasa, tidak perlu audio   |
| **Yang dibutuhkan dari web** | Markup semantik, ARIA yang benar, focus management | Caption pada video/audio          |

**Arsitektur aksesibilitas kita di blueprint ini menargetkan keduanya**, karena WCAG 2.2 mencakup spektrum disabilitas yang luas: visual, auditori, motorik, dan kognitif.

### Tentang SEO: Buang Ilusi "Nomor 1 Otomatis"

SEO teknis = **tiket masuk** agar Googlebot bisa membaca dan memahami kontenmu. Peringkat 1 ditentukan oleh relevansi & otoritas konten, bukan semata tag HTML. Yang kita kerjakan di sini adalah fondasi teknis yang wajib ada — tanpanya, konten sebagus apapun tidak akan terindeks dengan optimal.

---

## Bagian 1: Hukum Pertama ARIA (Wajib Dipahami)

> **Jangan gunakan ARIA jika HTML semantik bawaan sudah cukup.**

```html
<!-- ❌ SALAH: Buang-buang ARIA untuk hal yang sudah dihandle HTML -->
<div role="button" tabindex="0" onclick="handleClick()">Kirim</div>

<!-- ✅ BENAR: Elemen native sudah punya role, focus, keyboard support otomatis -->
<button type="button" onclick="handleClick()">Kirim</button>
```

ARIA hanya untuk menjembatani celah di mana HTML standar tidak cukup: custom dropdown, modal, tabs, accordion, combobox.

---

## Bagian 2: Struktur Landmark & Semantik HTML

Portfolio ini menggunakan SPA dengan konten yang di-swap. Tantangan utama: **screen reader harus tahu navigasi mana, konten utama mana, dan footer mana** — terlepas dari section mana yang sedang aktif.

### 2.1 Kerangka Landmark Global (Tetap di Semua Section)

```html
<!-- Layout shell yang tidak berubah saat section di-swap -->
<body>
  <!-- Landmark: banner (header situs) -->
  <header role="banner">
    <a href="#main-content" class="skip-link">Lewati navigasi, langsung ke konten</a>
    <!-- Logo, nama -->
  </header>

  <!-- Landmark: navigation — sidebar desktop -->
  <nav role="navigation" aria-label="Navigasi utama desktop">
    <!-- Menu 8 section -->
  </nav>

  <!-- Landmark: navigation — bottom nav mobile -->
  <nav role="navigation" aria-label="Navigasi bawah mobile" aria-hidden="true">
    <!-- Disembunyikan dari screen reader saat sidebar aktif, dan sebaliknya -->
  </nav>

  <!-- Konten utama yang di-swap -->
  <main id="main-content" role="main" tabindex="-1">
    <!-- Section aktif di-render di sini -->
  </main>

  <!-- Landmark: contentinfo (footer situs) -->
  <footer role="contentinfo">
    <!-- Copyright, social links -->
  </footer>
</body>
```

### 2.2 Skip Link (Wajib Ada)

Skip link adalah tautan tersembunyi yang muncul saat pertama kali user menekan `Tab`. Ini standar aksesibilitas untuk memungkinkan keyboard user melompati navigasi berulang.

```css
/* Skip link: tersembunyi secara visual, muncul saat fokus */
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px 16px;
  z-index: 9999;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 0;
}
```

### 2.3 Tiap Section: Heading yang Benar

Setiap section yang di-render di dalam `<main>` harus memiliki `<h1>` sebagai judul utamanya, karena pada satu waktu hanya satu section yang aktif = satu halaman logis.

```html
<!-- Contoh: Section Home -->
<section aria-labelledby="home-heading">
  <h1 id="home-heading">Halo, Saya [Nama] — Full Stack Developer</h1>
  <!-- ... -->
</section>

<!-- Contoh: Section Projects -->
<section aria-labelledby="projects-heading">
  <h1 id="projects-heading">Proyek</h1>
  <article aria-labelledby="project-1-title">
    <h2 id="project-1-title">Nama Proyek 1</h2>
    <p>Deskripsi...</p>
  </article>
</section>
```

**Aturan ketat hierarki heading:**

- Satu `<h1>` per section/halaman logis
- Jangan loncat level: `h1 → h2 → h3` ✅ / `h1 → h3` ❌
- Jangan pilih heading berdasarkan ukuran font — itu urusan CSS

---

## Bagian 3: Implementasi ARIA untuk Komponen Interaktif

### 3.1 aria-label, aria-labelledby, aria-describedby

```html
<!-- aria-label: untuk elemen interaktif tanpa teks terlihat (ikon) -->
<button aria-label="Buka menu navigasi">
  <svg aria-hidden="true"><!-- Hamburger icon --></svg>
</button>

<!-- aria-labelledby: label sudah ada sebagai teks di halaman lain -->
<h2 id="experience-title">Pengalaman Kerja</h2>
<section aria-labelledby="experience-title">
  <!-- konten -->
</section>

<!-- aria-describedby: deskripsi tambahan selain label utama -->
<input id="email-input" type="email" aria-describedby="email-hint" />
<p id="email-hint">Format: nama@domain.com</p>
```

### 3.2 Navigasi Sidebar & Bottom Nav

Karena ada dua navigasi (sidebar desktop + bottom nav mobile), screen reader harus tahu mana yang relevan.

```jsx
// React: sembunyikan navigasi yang tidak aktif dari screen reader
const isMobile = useMediaQuery('(max-width: 768px)');

// Sidebar: hanya terlihat di desktop
<nav
  role="navigation"
  aria-label="Navigasi utama"
  aria-hidden={isMobile}  // tersembunyi dari screen reader di mobile
>
  {navItems.map(item => (
    <a
      key={item.id}
      href={`#${item.id}`}
      aria-current={activeSection === item.id ? 'page' : undefined}
      onClick={() => handleNavClick(item.id)}
    >
      {item.label}
    </a>
  ))}
</nav>

// Bottom Nav: hanya terlihat di mobile
<nav
  role="navigation"
  aria-label="Navigasi bawah"
  aria-hidden={!isMobile}  // tersembunyi dari screen reader di desktop
>
  {/* ... */}
</nav>
```

### 3.3 Hamburger Drawer (Mobile)

```jsx
function MobileDrawer({ isOpen, onClose }) {
  const drawerRef = useRef(null);
  const triggerRef = useRef(null); // simpan referensi tombol pemicu

  useEffect(() => {
    if (isOpen) {
      // Pindahkan fokus ke dalam drawer saat dibuka
      drawerRef.current?.focus();
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    // Kembalikan fokus ke tombol hamburger saat drawer ditutup
    triggerRef.current?.focus();
  };

  return (
    <>
      <button
        ref={triggerRef}
        aria-expanded={isOpen}
        aria-controls="mobile-drawer"
        aria-label={isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
        onClick={() => isOpen ? handleClose() : setIsOpen(true)}
      >
        <svg aria-hidden="true"><!-- icon --></svg>
      </button>

      <div
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        tabIndex={-1}
        hidden={!isOpen}
      >
        <button aria-label="Tutup menu" onClick={handleClose}>✕</button>
        <nav>
          {/* nav items */}
        </nav>
      </div>
    </>
  );
}
```

### 3.4 Focus Management Saat Ganti Section (Client-Side Navigation)

Ini adalah titik kritis di SPA. Ketika user klik menu dan konten di-swap, screen reader **tidak tahu ada perubahan** kecuali fokus dipindahkan.

```jsx
function PortfolioLayout() {
  const mainRef = useRef(null)
  const [activeSection, setActiveSection] = useState('home')

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId)

    // Setelah render, pindahkan fokus ke <main>
    // sehingga screen reader membaca konten baru dari awal
    setTimeout(() => {
      mainRef.current?.focus()
    }, 50) // sedikit delay untuk menunggu render
  }

  return (
    <main
      ref={mainRef}
      id="main-content"
      tabIndex={-1} // tabIndex=-1 agar bisa di-focus via JS tapi tidak masuk tab order
      aria-live="polite" // opsional: umumkan perubahan konten
    >
      {renderSection(activeSection)}
    </main>
  )
}
```

### 3.5 Gambar & Alt Text

```html
<!-- Gambar informatif: deskripsi jelas dan relevan -->
<img
  src="project-screenshot.jpg"
  alt="Tampilan dashboard aplikasi manajemen tugas dengan sidebar navigasi dan tabel data"
/>

<!-- Gambar dekoratif: alt kosong (bukan dihapus!) agar diabaikan screen reader -->
<img src="background-pattern.svg" alt="" role="presentation" />

<!-- Ikon SVG yang informatif -->
<svg role="img" aria-label="GitHub">
  <use href="#icon-github" />
</svg>

<!-- Ikon SVG dekoratif: sembunyikan dari screen reader -->
<svg aria-hidden="true" focusable="false">
  <use href="#icon-decorative" />
</svg>
```

---

## Bagian 4: Keyboard & Motor Accessibility

### 4.1 Focus Indicator (Jangan Pernah Hapus Outline)

```css
/* ❌ DILARANG KERAS — ini menyiksa pengguna keyboard */
* {
  outline: none;
}
button:focus {
  outline: none;
}

/* ✅ BENAR: Buat focus indicator yang lebih cantik, bukan menghapusnya */
:focus-visible {
  outline: 3px solid #your-brand-color;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Untuk elemen yang memiliki focus tapi tidak perlu tampilkan outline
   (misalnya klik mouse di dalam card yang memang tidak interaktif) */
:focus:not(:focus-visible) {
  outline: none;
}
```

### 4.2 Touch Target Size (WCAG 2.5.8)

Semua elemen interaktif harus memiliki area sentuh minimal **24×24px** (WCAG AA) atau **44×44px** (rekomendasi Apple/Google terbaik).

```css
/* Tombol ikon yang secara visual kecil: perbesar area klik tanpa ubah visual */
.icon-button {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Tautan dalam teks navigasi */
.nav-link {
  padding: 12px 16px;
  display: block;
}
```

### 4.3 Reduced Motion

```css
/* Hormati preferensi sistem pengguna yang punya kondisi vestibular
   atau epilepsi foto-sensitif */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Bagian 5: Warna & Kontras

### 5.1 Minimum Contrast Ratio (WCAG 1.4.3)

| Jenis Teks                         | Minimum AA | Target AAA |
| ---------------------------------- | ---------- | ---------- |
| Teks normal (< 18pt / < 14pt bold) | 4.5:1      | 7:1        |
| Teks besar (≥ 18pt / ≥ 14pt bold)  | 3:1        | 4.5:1      |
| Komponen UI (border input, ikon)   | 3:1        | —          |

**Tool untuk cek kontras:** [contrast-ratio.com](https://contrast-ratio.com) atau [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### 5.2 Warna Bukan Satu-satunya Indikator

```html
<!-- ❌ SALAH: Status hanya disampaikan lewat warna -->
<span style="color: red;">Error terjadi</span>

<!-- ✅ BENAR: Kombinasikan warna + ikon + teks -->
<span role="alert">
  <svg aria-hidden="true"><!-- icon error --></svg>
  <strong>Error:</strong> Email tidak valid
</span>
```

---

## Bagian 6: Foundation SEO Teknis

### 6.1 Meta Tags per Section

Karena ini SPA, meta tags harus diupdate secara dinamis setiap kali section berganti. Gunakan **React Helmet Async** atau Vite plugin.

```jsx
import {Helmet} from 'react-helmet-async'

const sectionMeta = {
  home: {
    title: '[Nama] — Full Stack Developer Portfolio',
    description:
      'Portfolio [Nama], Full Stack Developer spesialis React dan Node.js. Lihat proyek, pengalaman, dan cara menghubungi saya.',
  },
  projects: {
    title: 'Proyek — [Nama] Portfolio',
    description:
      'Koleksi proyek web development oleh [Nama]: dari aplikasi SaaS hingga web tools open-source.',
  },
  contact: {
    title: 'Hubungi Saya — [Nama] Portfolio',
    description:
      'Tertarik berkolaborasi? Kirim pesan ke [Nama] untuk proyek freelance, full-time, atau diskusi teknis.',
  },
  // ... dst
}

function SectionWrapper({sectionId, children}) {
  const meta = sectionMeta[sectionId]
  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <link rel="canonical" href={`https://domainanda.com/#${sectionId}`} />
      </Helmet>
      {children}
    </>
  )
}
```

### 6.2 Open Graph & Social Sharing

```html
<!-- Di index.html (sebagai default fallback) -->
<head>
  <!-- Open Graph (Facebook, LinkedIn, WhatsApp) -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://domainanda.com/" />
  <meta property="og:title" content="[Nama] — Full Stack Developer" />
  <meta
    property="og:description"
    content="Portfolio web developer dengan spesialisasi React, Node.js, dan Firebase."
  />
  <meta property="og:image" content="https://domainanda.com/og-image.jpg" />
  <!-- OG image: 1200×630px, ukuran file < 8MB -->

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:creator" content="@username_twitter" />
  <meta name="twitter:title" content="[Nama] — Full Stack Developer" />
  <meta
    name="twitter:description"
    content="Portfolio web developer dengan spesialisasi React, Node.js, dan Firebase."
  />
  <meta name="twitter:image" content="https://domainanda.com/og-image.jpg" />
</head>
```

### 6.3 Structured Data (JSON-LD)

Sisipkan di dalam `<head>` pada `index.html`. Ini menyuapi Google informasi entitas langsung tanpa perlu crawler menginterpretasi HTML.

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org/",
    "@type": "Person",
    "name": "[Nama Lengkap]",
    "url": "https://domainanda.com",
    "image": "https://domainanda.com/foto-profil.jpg",
    "jobTitle": "Full Stack Developer",
    "description": "Full Stack Developer spesialis React, Node.js, dan Firebase.",
    "sameAs": [
      "https://github.com/username",
      "https://linkedin.com/in/username",
      "https://twitter.com/username"
    ],
    "knowsAbout": ["React", "Node.js", "Firebase", "TypeScript", "Web Accessibility"]
  }
</script>

<script type="application/ld+json">
  {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    "name": "[Nama] Portfolio",
    "url": "https://domainanda.com"
  }
</script>
```

### 6.4 Sitemap & robots.txt

```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://domainanda.com/</loc>
    <lastmod>2025-06-01</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

```txt
# public/robots.txt
User-agent: *
Allow: /
Sitemap: https://domainanda.com/sitemap.xml
```

### 6.5 Performance & Core Web Vitals

Google menggunakan tiga metrik utama (CWV) sebagai sinyal ranking:

| Metrik                              | Target Baik | Apa Artinya                              |
| ----------------------------------- | ----------- | ---------------------------------------- |
| **LCP** (Largest Contentful Paint)  | < 2.5 detik | Elemen terbesar di layar sudah terload   |
| **CLS** (Cumulative Layout Shift)   | < 0.1       | Halaman tidak loncat-loncat saat loading |
| **INP** (Interaction to Next Paint) | < 200ms     | Respons setelah interaksi user           |

**Checklist optimasi untuk SPA React/Vite:**

```jsx
// 1. Lazy load setiap section — jangan load semua sekaligus
const HomeSection = lazy(() => import('./sections/Home'))
const ProjectsSection = lazy(() => import('./sections/Projects'))

// 2. Suspense dengan fallback yang elegan
;<Suspense fallback={<SectionSkeleton />}>{renderActiveSection()}</Suspense>

// 3. Preload section berikutnya saat hover menu
const handleNavHover = (sectionId) => {
  import(`./sections/${sectionId}`) // trigger preload
}
```

```html
<!-- index.html: preload font dan LCP image -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- Preload gambar hero (foto profil) agar LCP cepat -->
<link rel="preload" as="image" href="/foto-profil.webp" />
```

---

## Bagian 7: Form Contact — Implementasi Lengkap

Section Contact punya form. Ini area dengan banyak jebakan aksesibilitas.

```jsx
function ContactForm() {
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  return (
    <div>
      {/* Status pengiriman: live region agar screen reader umumkan */}
      {submitStatus && (
        <div role="alert" aria-live="assertive">
          {submitStatus === 'success'
            ? '✅ Pesan berhasil dikirim! Saya akan membalas dalam 1-2 hari kerja.'
            : '❌ Gagal mengirim pesan. Coba lagi atau hubungi via email langsung.'}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Setiap input harus punya label yang terhubung */}
        <div>
          <label htmlFor="contact-name">
            Nama <span aria-label="wajib diisi">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            aria-required="true"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email">
            Email <span aria-label="wajib diisi">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-required="true"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : 'email-hint'}
          />
          <p id="email-hint">Format: nama@domain.com</p>
          {errors.email && (
            <p id="email-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-message">
            Pesan <span aria-label="wajib diisi">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            aria-required="true"
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
        </button>
      </form>
    </div>
  )
}
```

---

## Bagian 8: Testing & Audit

### 8.1 Audit Otomatis (Lighthouse)

Jalankan di Chrome DevTools → Lighthouse → centang "Accessibility" dan "SEO". Target: skor **≥ 90** untuk keduanya.

```bash
# Atau via CLI
npx lighthouse https://domainanda.com --output html --view
```

### 8.2 Testing Manual — Keyboard Only

1. Buka website, **tutup semua akses mouse**
2. Gunakan hanya `Tab`, `Shift+Tab`, `Enter`, `Space`, `Arrow keys`, `Escape`
3. Verifikasi:
   - [ ] Skip link muncul saat pertama Tab
   - [ ] Semua item navigasi bisa diakses via keyboard
   - [ ] Hamburger drawer bisa dibuka dan ditutup via keyboard
   - [ ] Saat tutup drawer, fokus kembali ke tombol hamburger
   - [ ] Saat ganti section, konten baru bisa dibaca (fokus ke main)
   - [ ] Form Contact bisa diisi dan dikirim via keyboard
   - [ ] Focus indicator selalu terlihat jelas

### 8.3 Testing Manual — Screen Reader

| Platform  | Screen Reader        | Browser |
| --------- | -------------------- | ------- |
| Windows   | NVDA (gratis)        | Firefox |
| Windows   | JAWS                 | Chrome  |
| macOS/iOS | VoiceOver (`Cmd+F5`) | Safari  |
| Android   | TalkBack             | Chrome  |

Navigasi dengan `H` (loncat antar heading) dan `R` (loncat antar landmark/region) untuk verifikasi struktur.

### 8.4 Tools Tambahan

- **axe DevTools** (browser extension) — temukan issue WCAG secara otomatis
- **WAVE** (wave.webaim.org) — visualisasi masalah aksesibilitas
- **WebAIM Contrast Checker** — cek kontras warna
- **Google Search Console** — pantau index status dan Core Web Vitals setelah deploy

---

## Bagian 9: Checklist Implementasi Bertahap

### Fase 1 — Fondasi Semantik (Kerjakan Pertama)

- [ ] Tambahkan skip link di atas `<header>`
- [ ] Tandai `<header>`, `<nav>`, `<main>`, `<footer>` dengan role yang benar
- [ ] Berikan `aria-label` unik pada setiap `<nav>` (ada dua navigasi)
- [ ] Pastikan setiap section aktif punya satu `<h1>` dan sub-heading terstruktur
- [ ] Semua gambar punya atribut `alt` (informatif atau kosong untuk dekoratif)

### Fase 2 — Interaktivitas & Keyboard

- [ ] Implementasi focus management saat ganti section (pindah fokus ke `<main>`)
- [ ] Hamburger drawer: `aria-expanded`, `aria-controls`, `role="dialog"`, focus trap
- [ ] Nav items: `aria-current="page"` pada item aktif
- [ ] Semua ikon tombol punya `aria-label`
- [ ] Semua SVG informatif punya `role="img"` + `aria-label`; dekoratif punya `aria-hidden="true"`
- [ ] Tambahkan CSS `:focus-visible` yang jelas — **jangan hapus outline**
- [ ] Cek semua touch target minimal 44×44px

### Fase 3 — SEO Teknis

- [ ] Pasang React Helmet Async atau equivalent
- [ ] Buat `sectionMeta` object dan update `<title>` + `<meta description>` per section
- [ ] Tambahkan meta OG dan Twitter Card di `index.html`
- [ ] Sisipkan JSON-LD `Person` dan `WebSite` di `index.html`
- [ ] Buat `public/sitemap.xml`
- [ ] Buat `public/robots.txt`
- [ ] Implementasi lazy loading per section dengan `React.lazy` + `Suspense`
- [ ] Preload foto profil (LCP element) di `index.html`
- [ ] Konversi semua gambar ke WebP

### Fase 4 — Polish & Audit

- [ ] Jalankan Lighthouse audit (target skor aksesibilitas ≥ 90, SEO ≥ 90)
- [ ] Install axe DevTools dan perbaiki semua isu level AA
- [ ] Test navigasi keyboard end-to-end (tanpa mouse sama sekali)
- [ ] Test dengan NVDA atau VoiceOver
- [ ] Tambahkan `@media (prefers-reduced-motion: reduce)` untuk semua animasi
- [ ] Cek semua kontras warna (minimum 4.5:1 untuk teks normal)
- [ ] Submit ke Google Search Console setelah deploy

---

## Catatan Penting untuk SPA dengan Client-Side Routing

Portfolio ini berbeda dari website multi-halaman biasa. Semua section ada di satu URL dengan konten di-swap. Ini membuat SEO lebih tricky karena:

1. **Googlebot mengindeks satu URL** — pastikan setiap section punya anchor hash (`#home`, `#projects`, dll.) yang konsisten
2. **Meta tags harus diupdate secara dinamis** — gunakan React Helmet Async
3. **Focus management wajib manual** — browser tidak reset fokus saat konten di-swap, berbeda dengan navigasi halaman penuh

Jika di masa mendatang traffic SEO menjadi prioritas utama dan bukan hanya aksesibilitas, pertimbangkan migrasi ke **Next.js** atau **Remix** untuk SSR/SSG. Namun untuk portofolio developer dengan target audiens teknis (rekruter dan sesama developer), SPA dengan optimasi yang benar sudah lebih dari cukup.
