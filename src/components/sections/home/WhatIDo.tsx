'use client'

import {motion} from 'framer-motion'
import {
  Cpu,
  MonitorSmartphone,
  Sparkles,
  CheckCircle2,
  Cloud,
  Users,
  Building2,
  GraduationCap,
  Award,
  ChevronRight,
} from 'lucide-react'
import ShinyText from '@/components/ShinyText'
import {sectionVariants, itemVariants} from './shared'

export function WhatIDo({navigateTo}: {navigateTo: (section: string) => void}) {
  return (
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
  )
}
