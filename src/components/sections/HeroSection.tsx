'use client'

import {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import {Icon} from '@iconify/react'
import {OWNER_INFO} from '@/lib/constants'
import ShinyText from '@/components/ShinyText'
import Magnet from '@/components/ui/Magnet'
// ============================================================
// ANIMASI FRAMER MOTION
// ============================================================

// Stagger untuk kontainer teks
// const containerVariants = {
//   hidden: {opacity: 0},
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.15,
//       delayChildren: 0.2,
//     },
//   },
// }

import GradientWaves from '@/components/ui/GradientWaves'

// Efek fade up untuk elemen individu
const itemVariants = {
  hidden: {opacity: 0, y: 20},
  show: {
    opacity: 1,
    y: 0,
    transition: {type: 'spring' as const, stiffness: 300, damping: 24},
  },
}

// Custom hook untuk mendeteksi dark mode secara reaktif tanpa SSR mismatch
function useThemeStatus() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Set status awal
    requestAnimationFrame(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })

    // Observer untuk memantau perubahan class pada elemen html
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'))
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  return isDark
}

export default function HeroSection() {
  const isDarkMode = useThemeStatus()

  // Fungsi navigasi menembakkan event hash change agar ditangkap oleh AppShell
  const navigateTo = (section: string) => {
    window.location.hash = section
  }

  return (
    <section
      aria-labelledby="home-heading"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* ── Background Animation (Gradient Waves) ────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <GradientWaves
          horizonColor={isDarkMode ? '#0a0a0a' : '#ffffff'}
          waveColor={isDarkMode ? '#262626' : '#cccccc'}
          crestColor={isDarkMode ? '#737373' : '#737373'}
          speed={0.4}
          amplitude={2.5}
          waveScale={0.8}
          opacity={isDarkMode ? 0.7 : 0.8}
          mouseInteraction={true} // Jika ingin bereaksi terhadap mouse (meski dibalik z-10)
        />
      </div>

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-3xl text-center">
        <div
          className="mb-6 flex justify-center animate-fade-in-up"
          style={{animationDuration: '0.8s'}}
        >
          <span className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 py-1.5 text-sm font-medium text-[var(--color-text-secondary)]">
            {/* <span className="mr-2 flex h-2 w-2 rounded-full bg-[var(--color-text-primary)] animate-pulse"></span> */}
            <ShinyText
              text="Tersedia untuk proyek baru"
              speed={2}
              delay={0}
              color={isDarkMode ? '#b5b5b5' : '#737373'}
              shineColor={isDarkMode ? '#ffffff' : '#171717'}
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
              disabled={false}
            />
          </span>
        </div>

        <h1
          id="home-heading"
          className="mb-4 text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-6xl md:text-7xl animate-fade-in-up"
          style={{animationDuration: '0.8s', animationDelay: '0.1s', animationFillMode: 'both'}}
        >
          {OWNER_INFO.name}
        </h1>

        <h2
          className="mb-8 text-xl font-medium text-[var(--color-text-secondary)] sm:text-2xl animate-fade-in-up"
          style={{animationDuration: '0.8s', animationDelay: '0.2s', animationFillMode: 'both'}}
        >
          {OWNER_INFO.tagline}
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-base text-[var(--color-text-secondary)] sm:text-lg leading-relaxed">
          Saya mengembangkan aplikasi web yang modern, cepat, dan berorientasi pada pengalaman
          pengguna. Dengan memadukan desain yang bersih, arsitektur yang baik, dan kode yang
          berkualitas, saya membangun solusi digital yang efisien, mudah dipelihara, dan memberikan
          nilai bagi bisnis.
        </p>

        {/* ── Call to Action Buttons ───────────────────────────── */}
        <div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up"
          style={{animationDuration: '0.8s', animationDelay: '0.4s', animationFillMode: 'both'}}
        >
          <button
            onClick={() => navigateTo('projects')}
            className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[var(--color-interactive)] px-8 py-4 font-semibold text-[var(--color-interactive-text)] transition-all hover:scale-105 hover:bg-[var(--color-interactive-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-2 dark:focus:ring-offset-[#0a0a0a]"
          >
            Lihat Proyek
            <Icon
              icon="lucide:arrow-right"
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
            />
          </button>

          <Magnet padding={50} disabled={false} magnetStrength={20} className="w-full sm:w-auto">
            <button
              onClick={() => navigateTo('contact')}
              className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border-2 border-[var(--color-border)] bg-transparent px-8 py-4 font-semibold text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bg-surface)] hover:border-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-2 dark:focus:ring-offset-[#0a0a0a]"
            >
              <Icon
                icon="lucide:mail"
                className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
              Hubungi Saya
            </button>
          </Magnet>
        </div>
      </div>

      {/* ── Scroll to Explore Indicator ───────────────────────── */}
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 0.8, duration: 0.8}}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors z-20"
        onClick={() => {
          const el = document.getElementById('home-overview')
          el?.scrollIntoView({behavior: 'smooth'})
        }}
      >
        {/* <span className="text-[11px] font-mono uppercase tracking-widest font-semibold">
          Jelajahi Ringkasan
        </span> */}
        <motion.div
          animate={{y: [0, 6, 0]}}
          transition={{duration: 1.5, repeat: Infinity, ease: 'easeInOut'}}
          className="will-change-transform transform-gpu"
        >
          <Icon icon="lucide:chevron-down" className="h-5 w-5 text-[var(--color-text-primary)]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
