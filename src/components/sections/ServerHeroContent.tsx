import { OWNER_INFO } from '@/lib/constants'

export default function ServerHeroContent() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6">
      {/* Static Background Gradient Fallback */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-bg-surface)] to-[var(--color-bg-main)] opacity-30" />
      </div>

      <div className="relative z-10 w-full max-w-3xl text-center">
        <div
          className="mb-6 flex justify-center animate-fade-in-up"
          style={{ animationDuration: '0.8s' }}
        >
          <span className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 py-1.5 text-sm font-medium text-[var(--color-text-secondary)]">
            <span className="shiny-text-static">
              Tersedia untuk proyek baru
            </span>
          </span>
        </div>

        <h1
          id="home-heading-static"
          className="mb-4 text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-6xl md:text-7xl animate-fade-in-up"
          style={{ animationDuration: '0.8s', animationDelay: '0.1s', animationFillMode: 'both' }}
        >
          {OWNER_INFO.name}
        </h1>

        <h2
          className="mb-8 text-xl font-medium text-[var(--color-text-secondary)] sm:text-2xl animate-fade-in-up"
          style={{ animationDuration: '0.8s', animationDelay: '0.2s', animationFillMode: 'both' }}
        >
          {OWNER_INFO.tagline}
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-base text-[var(--color-text-secondary)] sm:text-lg leading-relaxed animate-fade-in-up"
           style={{ animationDuration: '0.8s', animationDelay: '0.3s', animationFillMode: 'both' }}
        >
          Saya mengembangkan aplikasi web yang modern, cepat, dan berorientasi pada pengalaman
          pengguna. Dengan memadukan desain yang bersih, arsitektur yang baik, dan kode yang
          berkualitas, saya membangun solusi digital yang efisien, mudah dipelihara, dan memberikan
          nilai bagi bisnis.
        </p>

        {/* Static CTA Buttons */}
        <div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up"
          style={{ animationDuration: '0.8s', animationDelay: '0.4s', animationFillMode: 'both' }}
        >
          <a
            href="#projects"
            className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-3xl rounded-tr-md rounded-bl-md bg-[var(--color-interactive)] px-8 py-4 font-semibold text-[var(--color-interactive-text)] transition-all hover:scale-105 hover:bg-[var(--color-interactive-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-2 dark:focus:ring-offset-[#0a0a0a]"
          >
            Lihat Proyek
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>

          <a
            href="#contact"
            className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border-2 border-[var(--color-border)] bg-transparent px-8 py-4 font-semibold text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bg-surface)] hover:border-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-2 dark:focus:ring-offset-[#0a0a0a]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            Hubungi Saya
          </a>
        </div>
      </div>
    </section>
  )
}
