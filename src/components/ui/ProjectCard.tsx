'use client'

import {motion} from 'framer-motion'
import type {Project} from '@/types'
import {Badge} from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import {ArrowUpRight} from 'lucide-react'
import {Icon} from '@iconify/react'

interface ProjectCardProps {
  project: Project
  index: number
}

const cardVariants = {
  hidden: {opacity: 0, y: 30},
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  }),
}

// Fungsi bantu untuk memetakan nama teknologi ke icon Iconify
const getTechIcon = (tech: string) => {
  const t = tech.toLowerCase()
  if (t.includes('react')) return 'logos:react'
  if (t.includes('next')) return 'logos:nextjs-icon'
  if (t.includes('tailwind')) return 'logos:tailwindcss-icon'
  if (t.includes('laravel')) return 'logos:laravel'
  if (t.includes('node')) return 'logos:nodejs-icon'
  if (t.includes('firebase')) return 'logos:firebase'
  if (t.includes('typescript')) return 'logos:typescript-icon'
  if (t.includes('javascript')) return 'logos:javascript'
  if (t.includes('vue')) return 'logos:vue'
  if (t.includes('php')) return 'logos:php'
  if (t.includes('python')) return 'logos:python'
  if (t.includes('mysql')) return 'logos:mysql-icon'
  if (t.includes('postgresql') || t.includes('postgres')) return 'logos:postgresql'
  if (t.includes('mongodb') || t.includes('mongo')) return 'logos:mongodb-icon'
  if (t.includes('git')) return 'logos:git-icon'
  if (t.includes('figma')) return 'logos:figma'
  if (t.includes('html')) return 'logos:html-5'
  if (t.includes('css')) return 'logos:css-3'
  if (t.includes('docker')) return 'logos:docker-icon'
  if (t.includes('aws')) return 'logos:aws'
  if (t.includes('flutter')) return 'logos:flutter'
  if (t.includes('dart')) return 'logos:dart'
  if (t.includes('kotlin')) return 'logos:kotlin-icon'
  if (t.includes('swift')) return 'logos:swift'
  return 'carbon:code' // Fallback icon
}

export default function ProjectCard({project, index}: ProjectCardProps) {
  return (
    <motion.div
      layout
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="h-full"
    >
      <Link
        href={`/projects/${project.slug}`}
        prefetch={true}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded-[24px] group cursor-pointer flex h-full flex-col overflow-hidden border border-[var(--color-border)]/60 bg-[var(--color-bg-surface)]/80 backdrop-blur-xl shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lg hover:border-[var(--color-border)]"
      >
        {/* Thumbnail bergaya Bento (tidak menempel ke ujung) */}
        <div className="relative aspect-[16/10] w-full p-3 pb-0 overflow-hidden">
          <div className="relative h-full w-full overflow-hidden rounded-[16px] border border-[var(--color-border)]/50 bg-[var(--color-bg-elevated)] shadow-inner">
            <Image
              src={project.thumbnail}
              alt={`Thumbnail untuk ${project.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-110"
            />
            {project.featured && (
              <div className="absolute group-hover:backdrop-blur-md group-hover:bg-[var(--color-interactive)]/50 top-3 right-3 rounded-full bg-[var(--color-interactive)]/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-interactive-text)] shadow-sm">
                Featured
              </div>
            )}
          </div>
        </div>

        {/* Konten */}
        <div className="flex flex-1 flex-col p-6 pt-5 pointer-events-none">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)] transition-colors duration-300 group-hover:text-[var(--color-text-secondary)]">
              {project.title}
            </h3>
            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-elevated)] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 border border-[var(--color-border)]/50 shadow-sm">
              <ArrowUpRight className="h-4 w-4 text-[var(--color-text-primary)]" />
            </div>
          </div>

          <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)] line-clamp-3">
            {project.shortDescription || project.description}
          </p>

          {/* Badges / Tech Icons */}
          <div className="flex flex-wrap items-center gap-2 mt-auto pt-4 border-t border-[var(--color-border)]/30">
            {project.technologies.slice(0, 5).map((tech) => (
              <div
                key={tech}
                title={tech}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-bg-elevated)]/50 backdrop-blur-sm border border-[var(--color-border)]/20 shadow-sm transition-all duration-500 group-hover:border-[var(--color-border)]/50 group-hover:bg-[var(--color-bg-elevated)]"
              >
                <Icon
                  icon={getTechIcon(tech)}
                  className="h-4 w-4 grayscale opacity-70 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                />
              </div>
            ))}
            {project.technologies.length > 5 && (
              <div
                title="Teknologi lainnya"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-transparent border border-[var(--color-border)]/40 text-[10px] font-medium text-[var(--color-text-muted)]"
              >
                +{project.technologies.length - 5}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
