'use client'

import {Suspense, useRef} from 'react'
import {motion, useScroll, useTransform, useSpring} from 'framer-motion'
import useSWR from 'swr'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  ChevronRight,
  FolderOpen,
  Briefcase,
  Terminal,
  Cpu,
  Layers,
  MonitorSmartphone,
  Cloud,
  Users,
  Code2,
  Award,
  BookOpen,
  MessageSquare,
  Mail,
  ExternalLink,
  Calendar,
  CheckCircle2,
  Star,
  Sparkles,
  Database,
  FileText,
  Heart,
  Download,
  Building2,
  GraduationCap,
  Activity,
  Workflow,
  Compass,
} from 'lucide-react'
import {Icon} from '@iconify/react'
import ProjectCard from '@/components/ui/ProjectCard'
import ShinyText from '@/components/ShinyText'
import {fetcher} from '@/lib/fetcher'
import {sortProjectsByFeatured} from '@/lib/sortProjects'
import {experiences} from '@/data/experiences'
import {techStack} from '@/data/techstack'
import {OWNER_INFO, SOCIAL_LINKS} from '@/lib/constants'
import type {Project, Testimonial} from '@/types'

// ============================================================
// KONFIGURASI ANIMASI FRAMER MOTION (NO REFLOW RULES)
// ============================================================
const sectionVariants = {
  hidden: {opacity: 0, y: 30},
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 240,
      damping: 24,
      staggerChildren: 0.1,
    },
  },
}

// ============================================================
// PARALLAX WRAPPER COMPONENT (GPU ACCELERATED & ZERO REFLOW)
// ============================================================
function ParallaxLayer({
  children,
  offset = 20,
  className = '',
}: {
  children: React.ReactNode
  offset?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const yRange = useTransform(scrollYProgress, [0, 1], [offset, -offset])
  const y = useSpring(yRange, {stiffness: 350, damping: 35})

  return (
    <div ref={ref} className={className}>
      <motion.div style={{y}} className="will-change-transform transform-gpu w-full h-full">
        {children}
      </motion.div>
    </div>
  )
}

const itemVariants = {
  hidden: {opacity: 0, y: 20},
  show: {
    opacity: 1,
    y: 0,
    transition: {type: 'spring' as const, stiffness: 280, damping: 24},
  },
}

// ============================================================
// KOMPONEN PREVIEW PROYEK (WITH SWR SUSPENSE)
// ============================================================
function FeaturedProjectsContent() {
  const {data: projects = []} = useSWR<Project[]>('/api/projects', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000 * 5,
    suspense: true,
  })

  const sortedProjects = sortProjectsByFeatured(projects).slice(0, 3)

  if (sortedProjects.length === 0) {
    return (
      <div className="w-full py-12 text-center rounded-[24px] border border-[var(--color-border)]/50 bg-[var(--color-bg-surface)] text-[var(--color-text-muted)]">
        Belum ada proyek unggulan untuk dimuat saat ini.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {sortedProjects.map((project, index) => (
        <ParallaxLayer key={project.id} offset={index % 2 === 0 ? 15 : 30}>
          <ProjectCard project={project} index={index} />
        </ParallaxLayer>
      ))}
    </div>
  )
}

function FeaturedProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-[380px] rounded-[24px] border border-[var(--color-border)]/40 bg-[var(--color-bg-surface)]/50 animate-pulse"
        />
      ))}
    </div>
  )
}

// ============================================================
// KOMPONEN PREVIEW STORY / BLOG CMS (WITH SWR SUSPENSE)
// ============================================================
function StoriesPreviewContent() {
  const {data: catRes} = useSWR('/api/categories', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000 * 5,
    suspense: true,
  })
  const {data: storyRes} = useSWR('/api/stories', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000 * 5,
    suspense: true,
  })

  const categories: any[] = Array.isArray(catRes)
    ? catRes
    : catRes?.success
      ? catRes.data
      : catRes?.data || []
  const allStories: any[] = Array.isArray(storyRes)
    ? storyRes
    : storyRes?.success
      ? storyRes.data
      : storyRes?.data || []
  const latestStories = allStories.slice(0, 3)

  if (latestStories.length === 0) {
    return (
      <div className="w-full py-12 text-center rounded-[24px] border border-[var(--color-border)]/50 bg-[var(--color-bg-surface)] text-[var(--color-text-muted)]">
        Belum ada artikel atau cerita yang diterbitkan.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {latestStories.map((story: any, i: number) => {
        const categoryName =
          categories.find((c: any) => c.slug === story.categorySlug)?.name || 'Editorial'
        return (
          <motion.div
            key={story.id || i}
            variants={itemVariants}
            className="group relative flex flex-col justify-between rounded-[24px] border border-[var(--color-border)]/60 bg-[var(--color-bg-surface)]/80 p-7 transition-all duration-300 hover:border-[var(--color-text-muted)] hover:-translate-y-1 hover:shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center rounded-md bg-[var(--color-bg-elevated)] px-2.5 py-1 font-mono text-xs font-semibold text-[var(--color-text-primary)] border border-[var(--color-border)]/80">
                  {categoryName}
                </span>
                <span className="font-mono text-xs text-[var(--color-text-muted)]">
                  {new Date(story.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h4 className="text-lg font-bold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-text-secondary)] transition-colors line-clamp-2 leading-snug">
                {story.title}
              </h4>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-3 mb-6">
                {story.summary || 'Baca pembahasan lengkap mengenai topik ini di halaman artikel.'}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]/40 mt-auto text-xs text-[var(--color-text-muted)]">
              <div className="flex items-center gap-3.5">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-[var(--color-text-primary)]" />
                  {story.likeCount || 0}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-[var(--color-text-primary)]" />
                  {story.commentCount || 0}
                </span>
              </div>
              <Link
                href={`/story/${story.slug}`}
                className="inline-flex items-center font-semibold text-[var(--color-text-primary)] group-hover:underline"
              >
                Baca Artikel
                <ChevronRight className="w-4 h-4 ml-0.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

function StoriesPreviewSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-[240px] rounded-[24px] border border-[var(--color-border)]/40 bg-[var(--color-bg-surface)]/50 animate-pulse"
        />
      ))}
    </div>
  )
}

// ============================================================
// KOMPONEN PREVIEW TESTIMONI (WITH SWR SUSPENSE)
// ============================================================
function TestimonialsPreviewContent() {
  const {data: testimonials = []} = useSWR<Testimonial[]>('/api/testimonials', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000 * 5,
    suspense: true,
  })

  const topTestimonials = testimonials.slice(0, 2)

  if (topTestimonials.length === 0) {
    return (
      <div className="w-full py-12 text-center rounded-[24px] border border-[var(--color-border)]/50 bg-[var(--color-bg-surface)] text-[var(--color-text-muted)]">
        Belum ada testimoni saat ini. Jadilah kolaborator pertama yang memberikan kesan!
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {topTestimonials.map((item, i) => (
        <motion.div
          key={item.id || i}
          variants={itemVariants}
          className="flex flex-col justify-between rounded-[24px] border border-[var(--color-border)]/60 bg-[var(--color-bg-surface)]/80 p-7 md:p-9 transition-all duration-300 hover:border-[var(--color-text-muted)] hover:-translate-y-1 shadow-sm"
        >
          <div>
            <div className="flex items-center gap-1 mb-4">
              {Array.from({length: 5}).map((_, idx) => (
                <Star
                  key={idx}
                  className="w-4 h-4 fill-[var(--color-text-primary)] text-[var(--color-text-primary)]"
                />
              ))}
            </div>
            <p className="text-sm md:text-base italic leading-relaxed text-[var(--color-text-secondary)] mb-6">
              &ldquo;{item.message}&rdquo;
            </p>
          </div>

          <div className="flex items-center gap-4 pt-5 border-t border-[var(--color-border)]/40">
            {item.avatar ? (
              <Image
                src={item.avatar}
                alt={item.name || 'Kolaborator'}
                width={44}
                height={44}
                className="w-11 h-11 rounded-full object-cover border border-[var(--color-border)] img-mono"
              />
            ) : (
              <div className="w-11 h-11 rounded-full bg-[var(--color-bg-elevated)] flex items-center justify-center border border-[var(--color-border)] text-[var(--color-text-primary)] font-bold uppercase text-base">
                {item.name ? item.name.charAt(0) : 'K'}
              </div>
            )}
            <div>
              <h5 className="text-sm font-bold text-[var(--color-text-primary)]">
                {item.name || 'Kolaborator'}
              </h5>
              <p className="text-xs text-[var(--color-text-muted)] font-mono">
                Kolaborator Portofolio
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function TestimonialsPreviewSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="h-[210px] rounded-[24px] border border-[var(--color-border)]/40 bg-[var(--color-bg-surface)]/50 animate-pulse"
        />
      ))}
    </div>
  )
}

// ============================================================
// KOMPONEN UTAMA RANGKUMAN HOME (EXECUTIVE DASHBOARD)
// ============================================================
export default function HomeSummary() {
  const navigateTo = (section: string) => {
    window.location.hash = section
  }

  // Mengambil total aktual dari database projects melalui cache SWR 1-Kali-Fetch
  const {data: allProjects = []} = useSWR<Project[]>('/api/projects', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 600000,
  })
  const dynamicProjectsCount = allProjects.length > 0 ? `${allProjects.length}+` : '5+'

  const previewTechs = Object.values(techStack).flat().slice(0, 12)
  const featuredExperiences = experiences.slice(0, 4)

  const cvDownloadUrl =
    'https://drive.google.com/file/d/1o2uuU3WLrY5zUTHGSBH1OVphIfyUlDoE/view?usp=sharing'

  return (
    <div className="w-full flex flex-col items-center py-24 px-6 md:px-10">
      <div className="w-full max-w-5xl space-y-32 md:space-y-40">
        {/* ============================================================
            SECTION 1: PORTFOLIO SNAPSHOT (EXECUTIVE SUMMARY + CV DOWNLOAD)
            ============================================================ */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{once: true, margin: '-100px'}}
          className="w-full flex flex-col gap-6"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-2.5 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border)] px-4 py-1.5 shadow-sm">
              <Layers className="w-3.5 h-3.5 text-[var(--color-text-primary)]" />
              <ShinyText
                text="Executive Snapshot"
                disabled={false}
                speed={3}
                className="font-mono font-bold tracking-wider text-xs uppercase text-[var(--color-text-primary)]"
              />
            </span>
          </div>

          <div className="rounded-[32px] border border-[var(--color-border)]/90 bg-[var(--color-bg-surface)]/80 backdrop-blur-xl p-8 md:p-12 shadow-md transition-all duration-300">
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] leading-[1.25] mb-6 font-heading">
                Saya membangun solusi digital modern yang tangguh memadukan React, Next.js, Laravel,
                Cloud Architecture, dan AI Integration.
              </h2>
              <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8">
                Berbasis di {OWNER_INFO.location}, saya memfokuskan rekayasa pada kualitas
                arsitektur sistem, performa tinggi tanpa kompromi, dan ketajaman desain antarmuka
                bernilai tinggi.
              </p>
            </div>

            {/* Asymmetric Bento Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 pt-8 border-t border-[var(--color-border)]/60">
              <ParallaxLayer offset={12}>
                <div className="rounded-2xl border border-[var(--color-border)]/60 bg-[var(--color-bg-elevated)] p-6 h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">
                      Proyek Terpublikasi
                    </span>
                    <div className="p-2 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)]/70 shadow-sm">
                      <FolderOpen className="w-5 h-5 text-[var(--color-text-primary)]" />
                    </div>
                  </div>
                  <div>
                    <span className="font-mono text-3xl font-extrabold text-[var(--color-text-primary)]">
                      {dynamicProjectsCount}
                    </span>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium">
                      Aplikasi Web &amp; Mobile Modern
                    </p>
                  </div>
                </div>
              </ParallaxLayer>

              <ParallaxLayer offset={24}>
                <div className="rounded-2xl border border-[var(--color-border)]/60 bg-[var(--color-bg-elevated)] p-6 h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">
                      Rekam Jejak
                    </span>
                    <div className="p-2 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)]/70 shadow-sm">
                      <Terminal className="w-5 h-5 text-[var(--color-text-primary)]" />
                    </div>
                  </div>
                  <div>
                    <span className="font-mono text-3xl font-extrabold text-[var(--color-text-primary)]">
                      3+ Tahun
                    </span>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium">
                      Pengalaman Rekayasa Perangkat Lunak
                    </p>
                  </div>
                </div>
              </ParallaxLayer>

              <ParallaxLayer offset={16}>
                <div className="rounded-2xl border border-[var(--color-border)]/60 bg-[var(--color-bg-elevated)] p-6 h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">
                      Keterbukaan Kolaborasi
                    </span>
                    <div className="p-2 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)]/70 shadow-sm">
                      <Briefcase className="w-5 h-5 text-[var(--color-text-primary)]" />
                    </div>
                  </div>
                  <div>
                    <span className="font-mono text-xl font-bold text-[var(--color-text-primary)] tracking-tight">
                      Tersedia untuk Proyek
                    </span>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium">
                      Freelance • Remote • Full Time
                    </p>
                  </div>
                </div>
              </ParallaxLayer>
            </div>

            {/* Action Bar with CV Download Button */}
            <div className="mt-10 pt-6 border-t border-[var(--color-border)]/50 flex flex-wrap items-center justify-between gap-4">
              <a
                href={cvDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[var(--color-interactive)] px-7 py-3.5 font-semibold text-sm text-[var(--color-interactive-text)] shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-[var(--color-interactive-hover)]"
              >
                <FileText className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                <span>Unduh CV / Resume</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
              </a>

              <button
                onClick={() => navigateTo('about')}
                className="group inline-flex items-center gap-2 font-semibold text-sm text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)] transition-colors py-2 px-2"
              >
                <span>Eksplorasi Profil &amp; Filosofi</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </motion.section>

        {/* ============================================================
            SECTION 2: WHAT I DO (ASYMMETRIC EDITORIAL BENTO GRID)
            ============================================================ */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{once: true, margin: '-100px'}}
          className="w-full flex flex-col gap-8"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2.5 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border)] px-4 py-1.5 shadow-sm">
                <Cpu className="w-3.5 h-3.5 text-[var(--color-text-primary)]" />
                <ShinyText
                  text="Core Capabilities"
                  disabled={false}
                  speed={3}
                  className="font-mono font-bold tracking-wider text-xs uppercase text-[var(--color-text-primary)]"
                />
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] font-heading">
              Apa yang Saya Lakukan
            </h3>
            <p className="text-[var(--color-text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed">
              Menerjemahkan kerumitan bisnis dan tantangan skalabilitas menjadi arsitektur perangkat
              lunak yang tangkas, cepat, dan terjamin keandalannya.
            </p>
          </div>

          {/* ASYMMETRIC BENTO GRID (NON-AI SLOP DESIGN) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {/* Card 1: Full Stack Web Dev (2 Kolom Lebar) */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-2 rounded-[32px] border border-[var(--color-border)]/80 bg-[var(--color-bg-surface)]/90 p-8 md:p-10 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-text-muted)] hover:shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--color-text-muted)]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[var(--color-text-muted)]/10 transition-colors duration-700" />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="inline-flex p-4 rounded-2xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] shadow-sm">
                    <MonitorSmartphone className="w-7 h-7" />
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] border border-[var(--color-border)] px-3 py-1 rounded-full">
                    Architecture &amp; Core
                  </span>
                </div>
                <h4 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] mb-4 font-heading tracking-tight">
                  Full Stack Web Development &amp; Modern Frameworks
                </h4>
                <p className="text-base text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mb-8">
                  Membangun ekosistem aplikasi web berkinerja ekstrim dan SEO-optimizing. Setiap
                  solusi direkaya mulai dari perancangan frontend yang interaktif hingga backend API
                  yang skalabel dengan arsitektur bersih yang tangguh.
                </p>
              </div>

              <div className="relative z-10 pt-6 border-t border-[var(--color-border)]/60 flex flex-wrap gap-2.5">
                {[
                  'React.js',
                  'Next.js 16',
                  'Laravel',
                  'TypeScript Strict',
                  'Tailwind CSS',
                  'Clean Architecture',
                  'REST API & SWR',
                ].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-xl bg-[var(--color-bg-elevated)] font-mono text-xs font-semibold text-[var(--color-text-primary)] border border-[var(--color-border)]/70 shadow-2xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Card 2: AI & ML Integration (1 Kolom Vertikal) */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-1 rounded-[32px] border border-[var(--color-border)]/80 bg-[var(--color-bg-surface)]/90 p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-text-muted)] hover:shadow-xl relative overflow-hidden group"
            >
              {/* <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[var(--color-text-primary)] animate-pulse" /> */}

              <div>
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] shadow-sm">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)] mb-3 font-heading leading-tight">
                  AI &amp; Machine Learning Integration
                </h4>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  Implementasi kecerdasan buatan terdepan dan analitik prediktif ke dalam alur kerja
                  sistem informasi web untuk otomatisasi dan kecerdasan proses bisnis.
                </p>

                <div className="space-y-2 mb-6 text-xs text-[var(--color-text-secondary)] font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-text-primary)] shrink-0" />
                    <span>Arsitektur RAG &amp; Vector Search</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-text-primary)] shrink-0" />
                    <span>Gemini AI &amp; LangChain Pipeline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-text-primary)] shrink-0" />
                    <span>Model ML Python API (Cek Jerawat)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--color-border)]/50 flex flex-wrap gap-2">
                {['RAG Architecture', 'HyDE', 'Gemini AI', 'Python ML'].map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-[var(--color-bg-elevated)] font-mono text-xs text-[var(--color-text-secondary)] border border-[var(--color-border)]/50"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Card 3: Cloud & Serverless (1 Kolom) */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-1 rounded-[32px] border border-[var(--color-border)]/80 bg-[var(--color-bg-surface)]/90 p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-text-muted)] hover:shadow-xl group"
            >
              <div>
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] shadow-sm">
                  <Cloud className="w-7 h-7" />
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)] mb-3 font-heading leading-tight">
                  Cloud Architecture &amp; Database Design
                </h4>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  Merancang struktur basis data relasioner maupun NoSQL yang aman dengan otentikasi
                  ketat dandeployment otomatis berkelanjutan berkecepatan tinggi.
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--color-border)]/50 flex flex-wrap gap-2">
                {['Firebase Firestore', 'Supabase Realtime', 'MySQL', 'Vercel CI/CD'].map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-[var(--color-bg-elevated)] font-mono text-xs text-[var(--color-text-secondary)] border border-[var(--color-border)]/50"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Card 4: Leadership & Community (2 Kolom Lebar) */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-2 rounded-[32px] border border-[var(--color-border)]/80 bg-[var(--color-bg-surface)]/90 p-8 md:p-10 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-text-muted)] hover:shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="inline-flex p-4 rounded-2xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] shadow-sm">
                    <Users className="w-7 h-7" />
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] border border-[var(--color-border)] px-3 py-1 rounded-full">
                    Mentorship &amp; Impact
                  </span>
                </div>
                <h4 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] mb-4 font-heading tracking-tight">
                  Technical Leadership &amp; Community Mentorship
                </h4>
                <p className="text-base text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mb-8">
                  Berperan aktif dalam kepemimpinan komunitas teknologi dan pendidikan formal
                  perguruan tinggi. Percaya bahwa arsitek sistem yang hebat tidak hanya menulis kode
                  yang bersih, tetapi juga membina talenta generasi berikutnya.
                </p>

                {/* Achievement Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  <div className="p-3.5 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)]/60 flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-[var(--color-text-primary)] shrink-0" />
                    <span className="text-xs font-bold text-[var(--color-text-primary)]">
                      GDG Core Team
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)]/60 flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-[var(--color-text-primary)] shrink-0" />
                    <span className="text-xs font-bold text-[var(--color-text-primary)]">
                      Teaching Assistant
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)]/60 flex items-center gap-3">
                    <Award className="w-5 h-5 text-[var(--color-text-primary)] shrink-0" />
                    <span className="text-xs font-bold text-[var(--color-text-primary)]">
                      DBS Coding Camp
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--color-border)]/60 flex flex-wrap items-center justify-between gap-4">
                <span className="font-mono text-xs text-[var(--color-text-muted)]">
                  Fokus Pengalaman: Web Development &amp; Agile Team Workflow
                </span>
                <button
                  onClick={() => navigateTo('experience')}
                  className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] hover:underline"
                >
                  Lihat Rekam Jejak
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ============================================================
            SECTION 3: FEATURED WORKS (PROJECTS PREVIEW)
            ============================================================ */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{once: true, margin: '-100px'}}
          className="w-full flex flex-col gap-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2.5 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border)] px-4 py-1.5 shadow-sm">
                  <FolderOpen className="w-3.5 h-3.5 text-[var(--color-text-primary)]" />
                  <ShinyText
                    text="Featured Works"
                    disabled={false}
                    speed={3}
                    className="font-mono font-bold tracking-wider text-xs uppercase text-[var(--color-text-primary)]"
                  />
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] font-heading">
                Proyek Unggulan
              </h3>
              <p className="text-[var(--color-text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed">
                Seleksi karya rekayasa perangkat lunak terpilih yang menonjolkan arsitektur bersih,
                keandalan fungsionalitas, dan estetika antarmuka modern.
              </p>
            </div>

            <button
              onClick={() => navigateTo('projects')}
              className="group hidden sm:inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-3.5 font-semibold text-sm text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-text-muted)] shadow-sm"
            >
              Lihat Semua Proyek
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <Suspense fallback={<FeaturedProjectsSkeleton />}>
            <FeaturedProjectsContent />
          </Suspense>

          <div className="flex sm:hidden justify-center mt-2">
            <button
              onClick={() => navigateTo('projects')}
              className="w-full justify-center group inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-3.5 font-semibold text-sm text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bg-elevated)] shadow-sm"
            >
              Lihat Semua Proyek
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.section>

        {/* ============================================================
            SECTION 4: EXPERIENCE TIMELINE (SPLIT-ROW EDITORIAL MATRIX)
            ============================================================ */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{once: true, margin: '-100px'}}
          className="w-full flex flex-col gap-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2.5 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border)] px-4 py-1.5 shadow-sm">
                  <Award className="w-3.5 h-3.5 text-[var(--color-text-primary)]" />
                  <ShinyText
                    text="Experience Overview"
                    disabled={false}
                    speed={3}
                    className="font-mono font-bold tracking-wider text-xs uppercase text-[var(--color-text-primary)]"
                  />
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] font-heading">
                Pengalaman &amp; Rekam Jejak
              </h3>
              <p className="text-[var(--color-text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed">
                Kredibilitas profesional, keaktifan kepemimpian di ekosistem komunitas developer,
                serta kontribusi di dunia nyata.
              </p>
            </div>

            <button
              onClick={() => navigateTo('experience')}
              className="group hidden sm:inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-3.5 font-semibold text-sm text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-text-muted)] shadow-sm"
            >
              Lihat Riwayat Karir Lengkap
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Redesigned Editorial Split-Row Matrix */}
          <div className="flex flex-col gap-4 w-full">
            {featuredExperiences.map((exp, idx) => (
              <motion.div
                key={exp.id || idx}
                variants={itemVariants}
                onClick={() => navigateTo('experience')}
                className="group cursor-pointer rounded-[28px] border border-[var(--color-border)]/70 bg-[var(--color-bg-surface)]/80 p-7 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all duration-300 hover:border-[var(--color-text-muted)] hover:-translate-y-1 hover:bg-[var(--color-bg-elevated)]/50 shadow-sm"
              >
                {/* Kolom Kiri: Tahun & Tipe */}
                <div className="flex lg:flex-col items-center lg:items-start gap-3 lg:w-52 shrink-0">
                  <span className="inline-flex items-center rounded-xl bg-[var(--color-bg-elevated)] px-3 py-1.5 font-mono text-xs font-bold text-[var(--color-text-primary)] border border-[var(--color-border)] shadow-2xs">
                    {exp.period}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">
                    {exp.type === 'work'
                      ? 'Professional'
                      : exp.type === 'organization'
                        ? 'Organization'
                        : 'Education'}
                  </span>
                </div>

                {/* Kolom Tengah: Posisi & Narasi */}
                <div className="flex-1 max-w-2xl">
                  <h4 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-text-secondary)] transition-colors font-heading">
                    {exp.position}
                  </h4>
                  <p className="text-sm font-bold font-mono text-[var(--color-text-secondary)] mb-3">
                    @{exp.company}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)]/90 leading-relaxed line-clamp-2">
                    {exp.description}
                  </p>
                </div>

                {/* Kolom Kanan: Tech Pills & Indicator */}
                <div className="flex flex-wrap lg:flex-col lg:items-end gap-2 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-[var(--color-border)]/30">
                  <div className="flex flex-wrap lg:justify-end gap-1.5 max-w-xs">
                    {exp.technologies?.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full font-mono text-xs font-semibold text-[var(--color-text-primary)] bg-[var(--color-bg-main)] border border-[var(--color-border)]/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center font-mono text-xs text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors mt-1">
                    Detail Pengalaman
                    <ChevronRight className="w-4 h-4 ml-0.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex sm:hidden justify-center mt-2">
            <button
              onClick={() => navigateTo('experience')}
              className="w-full justify-center group inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-3.5 font-semibold text-sm text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bg-elevated)] shadow-sm"
            >
              Lihat Riwayat Karir Lengkap
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.section>

        {/* ============================================================
            SECTION 5: TECHNOLOGY STACK PREVIEW
            ============================================================ */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{once: true, margin: '-100px'}}
          className="w-full flex flex-col gap-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2.5 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border)] px-4 py-1.5 shadow-sm">
                  <Code2 className="w-3.5 h-3.5 text-[var(--color-text-primary)]" />
                  <ShinyText
                    text="Tech Preview"
                    disabled={false}
                    speed={3}
                    className="font-mono font-bold tracking-wider text-xs uppercase text-[var(--color-text-primary)]"
                  />
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] font-heading">
                Teknologi Pilihan
              </h3>
              <p className="text-[var(--color-text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed">
                Katalog peralatan modern berakurasi tinggi yang saya gunakan untuk menjamin performa
                dan pemanduan produk.
              </p>
            </div>

            <button
              onClick={() => navigateTo('tech-stack')}
              className="group hidden sm:inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-3.5 font-semibold text-sm text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-text-muted)] shadow-sm"
            >
              Lihat Seluruh Tech Stack
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Tech Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
            {previewTechs.map((tech) => (
              <div
                key={tech.name}
                onClick={() => navigateTo('tech-stack')}
                className="group cursor-pointer flex items-center gap-4 rounded-[24px] border border-[var(--color-border)]/70 bg-[var(--color-bg-surface)]/80 px-5 py-4 transition-all duration-300 hover:scale-[1.03] hover:border-[var(--color-text-muted)] hover:bg-[var(--color-bg-elevated)] shadow-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] shadow-inner group-hover:bg-[var(--color-bg-main)] transition-colors">
                  <Icon
                    icon={tech.icon}
                    className="w-6 h-6 grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="font-mono text-sm font-extrabold text-[var(--color-text-primary)] truncate">
                    {tech.name}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wide text-[var(--color-text-muted)] font-semibold">
                    {tech.level || 'Professional'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex sm:hidden justify-center mt-2">
            <button
              onClick={() => navigateTo('tech-stack')}
              className="w-full justify-center group inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-3.5 font-semibold text-sm text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bg-elevated)] shadow-sm"
            >
              Lihat Seluruh Tech Stack
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.section>

        {/* ============================================================
            SECTION 6: STORY & ARTICLES (CMS BLOG VIA SWR)
            ============================================================ */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{once: true, margin: '-100px'}}
          className="w-full flex flex-col gap-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2.5 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border)] px-4 py-1.5 shadow-sm">
                  <BookOpen className="w-3.5 h-3.5 text-[var(--color-text-primary)]" />
                  <ShinyText
                    text="Story & Articles"
                    disabled={false}
                    speed={3}
                    className="font-mono font-bold tracking-wider text-xs uppercase text-[var(--color-text-primary)]"
                  />
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] font-heading">
                Cerita &amp; Catatan Artikel
              </h3>
              <p className="text-[var(--color-text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed">
                Publikasi tulisan teknis, tutorial rekayasa perangkat lunak, serta refleksi
                perjalanan pemrograman.
              </p>
            </div>

            <Link
              href="/story"
              className="group hidden sm:inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-3.5 font-semibold text-sm text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-text-muted)] shadow-sm"
            >
              Baca Seluruh Artikel
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <Suspense fallback={<StoriesPreviewSkeleton />}>
            <StoriesPreviewContent />
          </Suspense>

          <div className="flex sm:hidden justify-center mt-2">
            <Link
              href="/story"
              className="w-full justify-center group inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-3.5 font-semibold text-sm text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bg-elevated)] shadow-sm"
            >
              Baca Seluruh Artikel
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.section>

        {/* ============================================================
            SECTION 7: TESTIMONIALS PREVIEW
            ============================================================ */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{once: true, margin: '-100px'}}
          className="w-full flex flex-col gap-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2.5 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border)] px-4 py-1.5 shadow-sm">
                  <MessageSquare className="w-3.5 h-3.5 text-[var(--color-text-primary)]" />
                  <ShinyText
                    text="Social Proof & Feedback"
                    disabled={false}
                    speed={3}
                    className="font-mono font-bold tracking-wider text-xs uppercase text-[var(--color-text-primary)]"
                  />
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] font-heading">
                Testimoni Kolaborator
              </h3>
              <p className="text-[var(--color-text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed">
                Kredibilitas sosial dan kesan pesan asli yang ditinggalkan oleh rekan kerja, mentor,
                serta kolega profesional.
              </p>
            </div>

            <button
              onClick={() => navigateTo('testimonials')}
              className="group hidden sm:inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-3.5 font-semibold text-sm text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-text-muted)] shadow-sm"
            >
              Lihat &amp; Tulis Testimoni
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <Suspense fallback={<TestimonialsPreviewSkeleton />}>
            <TestimonialsPreviewContent />
          </Suspense>

          <div className="flex sm:hidden justify-center mt-2">
            <button
              onClick={() => navigateTo('testimonials')}
              className="w-full justify-center group inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-3.5 font-semibold text-sm text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bg-elevated)] shadow-sm"
            >
              Lihat &amp; Tulis Testimoni
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.section>

        {/* ============================================================
            SECTION 8: GITHUB ACTIVITY (WITH PACMAN GRAPH)
            ============================================================ */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{once: true, margin: '-100px'}}
          className="w-full flex flex-col gap-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2.5 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border)] px-4 py-1.5 shadow-sm">
                  <Icon icon="mdi:github" className="w-4 h-4 text-[var(--color-text-primary)]" />
                  <ShinyText
                    text="Open Source & Git Stats"
                    disabled={false}
                    speed={3}
                    className="font-mono font-bold tracking-wider text-xs uppercase text-[var(--color-text-primary)]"
                  />
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] font-heading">
                Aktivitas GitHub (mkeyzxi)
              </h3>
              <p className="text-[var(--color-text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed">
                Representasi visual konsistensi pengkodean dan komitmen pengembangan ekosistem
                terbuka secara real-time.
              </p>
            </div>

            <a
              href="https://github.com/mkeyzxi"
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden sm:inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-3.5 font-semibold text-sm text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-text-muted)] shadow-sm"
            >
              Kunjungi Repositori GitHub
              <ExternalLink className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="rounded-[32px] border border-[var(--color-border)]/90 bg-[var(--color-bg-surface)]/80 backdrop-blur-xl p-6 md:p-10 shadow-sm flex flex-col gap-8">
            {/* Pacman Contribution Graph */}
            <div className="w-full overflow-x-auto py-3 flex justify-center bg-[var(--color-bg-main)]/50 rounded-[24px] border border-[var(--color-border)]/50 p-4 shadow-inner">
              <picture className="max-w-full flex justify-center">
                <source
                  media="(prefers-color-scheme: dark)"
                  srcSet="https://raw.githubusercontent.com/mkeyzxi/mkeyzxi/output/pacman-contribution-graph-dark.svg"
                />
                <source
                  media="(prefers-color-scheme: light)"
                  srcSet="https://raw.githubusercontent.com/mkeyzxi/mkeyzxi/output/pacman-contribution-graph.svg"
                />
                <img
                  src="https://raw.githubusercontent.com/mkeyzxi/mkeyzxi/output/pacman-contribution-graph-dark.svg"
                  alt="GitHub Contribution Pacman Graph mkeyzxi"
                  loading="lazy"
                  className="max-w-full h-auto rounded-xl object-contain img-mono hover:grayscale-0 transition-all duration-700"
                />
              </picture>
            </div>

            {/* GitHub Realtime Meta Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-[22px] border border-[var(--color-border)]/60 bg-[var(--color-bg-elevated)] p-6 flex flex-col gap-1.5">
                <span className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">
                  Akun GitHub
                </span>
                <span className="font-mono text-lg font-extrabold text-[var(--color-text-primary)] flex items-center gap-2">
                  @mkeyzxi
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-text-primary)] shrink-0" />
                </span>
              </div>

              <div className="rounded-[22px] border border-[var(--color-border)]/60 bg-[var(--color-bg-elevated)] p-6 flex flex-col gap-1.5">
                <span className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">
                  Fokus Rekayasa
                </span>
                <span className="font-mono text-base font-bold text-[var(--color-text-primary)]">
                  TypeScript, Next.js &amp; Laravel
                </span>
              </div>

              <div className="rounded-[22px] border border-[var(--color-border)]/60 bg-[var(--color-bg-elevated)] p-6 flex flex-col gap-1.5">
                <span className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">
                  Status Aktivitas
                </span>
                <span className="font-mono text-base font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                  {/* <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-text-primary)] animate-pulse shadow-[0_0_8px_var(--color-text-primary)]" /> */}
                  Aktif Mengembangkan
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ============================================================
            SECTION 9: CONTACT CTA BANNER
            ============================================================ */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{once: true, margin: '-100px'}}
          className="w-full"
        >
          <div className="relative overflow-hidden rounded-[36px] border-2 border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-8 md:p-16 shadow-lg text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10 transition-all duration-500 hover:border-[var(--color-text-muted)]">
            <div
              className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full pointer-events-none opacity-15"
              style={{
                background: 'radial-gradient(circle, var(--color-text-muted) 0%, transparent 70%)',
              }}
            />

            <div className="relative z-10 max-w-xl space-y-5">
              <span className="inline-flex items-center gap-2.5 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border)] px-4 py-1.5 shadow-sm">
                <Mail className="w-3.5 h-3.5 text-[var(--color-text-primary)]" />
                <ShinyText
                  text="Get In Touch"
                  disabled={false}
                  speed={3}
                  className="font-mono font-bold tracking-wider text-xs uppercase text-[var(--color-text-primary)]"
                />
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] font-heading leading-tight">
                Mari Bangun Solusi Digital Yang Luar Biasa Bersama
              </h2>
              <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed">
                Saya senantiasa siap berdiskusi untuk kolaborasi proyek baru, peluang freelance,
                konsultasi arsitektur, maupun posisi pengembangan penuhwaktu.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row w-full md:w-auto gap-4 shrink-0">
              <button
                onClick={() => navigateTo('contact')}
                className="group flex items-center justify-center gap-3 rounded-full bg-[var(--color-interactive)] px-9 py-4 font-bold text-[var(--color-interactive-text)] shadow-md transition-all duration-300 hover:scale-[1.03] hover:bg-[var(--color-interactive-hover)]"
              >
                Hubungi Saya Sekarang
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href={SOCIAL_LINKS.find((s) => s.platform === 'WhatsApp')?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-8 py-4 font-bold text-[var(--color-text-primary)] shadow-sm transition-all hover:bg-[var(--color-bg-main)] hover:border-[var(--color-text-muted)]"
              >
                WhatsApp
                <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
