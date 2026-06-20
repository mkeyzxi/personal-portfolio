import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";

/**
 * Font: Geist Sans — Main text, headings, body paragraphs.
 * SDD §4.2: tracking-tight digunakan pada heading.
 */
const geist = Geist({subsets:['latin'],variable:'--font-sans'});

/**
 * Font: Geist Mono — Badge angka, tag tech stack, elemen mirip kode.
 * SDD §4.2: Wajib untuk data/metrics display.
 */
const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

/**
 * SEO Metadata — PRD §16.1
 * Placeholder values — ganti sebelum production deployment.
 */
export const metadata: Metadata = {
  title: 'Portfolio | Full Stack Developer',
  description:
    'Personal Portfolio — Full Stack Developer spesialisasi Next.js, React, TypeScript, dan Firebase. Lihat proyek, pengalaman, dan hubungi saya.',
  keywords: [
    'portfolio',
    'developer',
    'full stack',
    'next.js',
    'react',
    'typescript',
    'firebase',
    'web development',
  ],
  authors: [{ name: 'Portfolio Owner' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    title: 'Portfolio | Full Stack Developer',
    description:
      'Personal Portfolio — Full Stack Developer spesialisasi Next.js, React, TypeScript, dan Firebase.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
    siteName: 'Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Full Stack Developer',
    description:
      'Personal Portfolio — Full Stack Developer spesialisasi Next.js, React, TypeScript, dan Firebase.',
    images: ['/images/og-image.jpg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={cn(geistMono.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <head>
        {/*
         * Dark Mode Anti-FOUC Script — PRD §9.9, SDD §4.1
         * 
         * Script ini berjalan SEBELUM React hydration untuk mencegah
         * flash of light theme pada pengguna dark mode.
         * 
         * Prioritas:
         * 1. localStorage preference (user telah toggle manual)
         * 2. System preference (prefers-color-scheme: dark)
         * 3. Default: light mode
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('portfolio-theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* JSON-LD Structured Data — PRD §16.3 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Portfolio Owner',
              jobTitle: 'Full Stack Developer',
              url: 'https://yourwebsite.vercel.app',
              sameAs: [
                'https://github.com/username',
                'https://linkedin.com/in/username',
              ],
              knowsAbout: ['Next.js', 'React', 'TypeScript', 'Firebase'],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--color-bg-main)] text-[var(--color-text-primary)] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
