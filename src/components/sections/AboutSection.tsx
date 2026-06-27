'use client'

import {motion} from 'framer-motion'
import {MapPin, Briefcase, GraduationCap, Code2, Terminal} from 'lucide-react'
import useSWR from 'swr'
import {OWNER_INFO} from '@/lib/constants'
import {fetcher} from '@/lib/fetcher'
import type {AboutData} from '@/types'
import Image from 'next/image'

// ============================================================
// ANIMASI FRAMER MOTION
// ============================================================
const containerVariants = {
  hidden: {opacity: 0},
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const leftSlideVariants = {
  hidden: {opacity: 0, x: -50},
  show: {
    opacity: 1,
    x: 0,
    transition: {type: 'spring' as const, stiffness: 200, damping: 20},
  },
}

const rightSlideVariants = {
  hidden: {opacity: 0, x: 50},
  show: {
    opacity: 1,
    x: 0,
    transition: {type: 'spring' as const, stiffness: 200, damping: 20},
  },
}

const cardVariants = {
  hidden: {opacity: 0, scale: 0.9},
  show: {
    opacity: 1,
    scale: 1,
    transition: {type: 'spring' as const, stiffness: 200, damping: 20},
  },
}

export default function AboutSection() {
  const {data: aboutData} = useSWR<AboutData>(
    '/api/about',
    fetcher,
    {revalidateOnFocus: false, dedupingInterval: 60000 * 60}, // cache for 1 hour since about rarely changes
  )

  // Gunakan data CMS jika ada, fallback ke data bawaan atau kosong
  const location = aboutData?.location || OWNER_INFO.location
  const employmentStatus = aboutData?.employmentStatus || 'Freelance'
  const education = aboutData?.education || 'Informatics Engineering Student'
  const yearsOfExperience = aboutData?.yearsOfExperience || 3
  const totalProjects = aboutData?.totalProjects || 5
  const bio = aboutData?.bio || ''

  // Parse bio jika memiliki multiple paragraph (dipisahkan double enter)
  const bioParagraphs = bio
    ? bio.split('\n\n')
    : [
        `Halo! Saya adalah seorang pengembang perangkat lunak yang memiliki hasrat mendalam terhadap desain antarmuka dan arsitektur sistem. Fokus utama saya adalah membangun aplikasi web yang **cepat, aman, dan mudah diakses** oleh semua orang.`,
        `Berbekal pengalaman dengan ekosistem modern seperti React, Next.js, dan infrastruktur serverless (Firebase/Vercel), saya menikmati proses menerjemahkan masalah bisnis yang kompleks menjadi solusi teknis yang elegan.`,
        `Ketika saya tidak sedang berhadapan dengan layar editor kode, saya biasanya menghabiskan waktu mempelajari teknologi baru, berkontribusi pada proyek *open source*, atau sekadar meracik kopi yang sempurna.`,
      ]

  return (
    <section
      aria-labelledby="about-heading"
      className="flex min-h-screen w-full flex-col items-center justify-center py-24 px-6 md:px-10"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{once: true, margin: '-100px'}}
        className="w-full max-w-5xl"
      >
        {/* Section Header */}
        <motion.div
          variants={rightSlideVariants}
          className="mb-12 md:mb-16 text-center md:text-left"
        >
          <h1
            id="about-heading"
            className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl"
          >
            Tentang Saya
          </h1>
          <div className="mt-2 h-1 w-20 bg-[var(--color-text-primary)] mx-auto md:mx-0"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 items-start ">
          {/* ── Kiri: Foto Profil & Fakta Singkat ──────────────── */}
          <motion.div
            variants={leftSlideVariants}
            className="w-full lg:w-1/3 flex flex-col items-center lg:items-start"
          >
            {/* Foto Profil dengan Border Animasi */}
            <div className="relative mb-8 h-64 w-64 md:h-72 md:w-72 bg-tell">
              <div className="absolute inset-0 rounded-full border-2 border-[var(--color-border)] opacity-20"></div>
              {/* Spinning Dashed Border */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[var(--color-text-muted)] animate-[spin_10s_linear_infinite]"></div>

              <div className="absolute inset-4 overflow-hidden rounded-full border-4 border-[var(--color-bg-surface)] bg-[var(--color-bg-elevated)]">
                <Image
                  src={OWNER_INFO.avatarPath}
                  alt={`Foto profil ${OWNER_INFO.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  loading="lazy"
                  className="object-cover img-mono"
                />
              </div>
            </div>

            {/* Fakta Singkat */}
            <div className="w-full space-y-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 shadow-sm">
              <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                <MapPin className="h-5 w-5 text-[var(--color-text-primary)]" />
                <span className="text-sm font-medium">{location}</span>
              </div>
              <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                <Briefcase className="h-5 w-5 text-[var(--color-text-primary)]" />
                <span className="text-sm font-medium">{employmentStatus}</span>
              </div>
              <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                <GraduationCap className="h-5 w-5 text-[var(--color-text-primary)]" />
                <span className="text-sm font-medium">{education}</span>
              </div>
            </div>
          </motion.div>

          {/* ── Kanan: Bio & Highlights ────────────────────────── */}
          <motion.div variants={rightSlideVariants} className="w-full lg:w-2/3 flex flex-col gap-8">
            <div className="prose prose-neutral dark:prose-invert max-w-none text-[var(--color-text-secondary)]">
              {bioParagraphs.map((paragraph, index) => {
                // Sederhana parser bold text (mengubah **teks** jadi <strong>teks</strong>)
                // Karena prompt ingin tetap mempertahankan styling visual yang sama.
                const parseMarkup = (text: string) => {
                  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g)
                  return parts.map((part, i) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return (
                        <strong key={i} className="text-[var(--color-text-primary)]">
                          {part.slice(2, -2)}
                        </strong>
                      )
                    }
                    if (part.startsWith('*') && part.endsWith('*')) {
                      return <em key={i}>{part.slice(1, -1)}</em>
                    }
                    return part
                  })
                }

                return (
                  <p key={index} className={`text-lg leading-relaxed ${index > 0 ? 'mt-4' : ''}`}>
                    {parseMarkup(paragraph)}
                  </p>
                )
              })}
            </div>

            {/* Highlight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <motion.div
                variants={cardVariants}
                className="flex flex-col gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 transition-colors hover:border-[var(--color-text-muted)]"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-[var(--color-bg-elevated)] p-2">
                    <Code2 className="h-6 w-6 text-[var(--color-text-primary)]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
                    {totalProjects}+
                  </h3>
                </div>
                <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                  Proyek Terselesaikan
                </p>
              </motion.div>

              <motion.div
                variants={cardVariants}
                className="flex flex-col gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 transition-colors hover:border-[var(--color-text-muted)]"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-[var(--color-bg-elevated)] p-2">
                    <Terminal className="h-6 w-6 text-[var(--color-text-primary)]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
                    {yearsOfExperience}+
                  </h3>
                </div>
                <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                  Tahun Pengalaman
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
