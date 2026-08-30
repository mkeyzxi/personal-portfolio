'use client'

import {Suspense} from 'react'
import {motion} from 'framer-motion'
import useSWR from 'swr'
import { Icon } from '@iconify/react'
import ShinyText from '@/components/ShinyText'
import ProjectCard from '@/components/ui/ProjectCard'
import {fetcher} from '@/lib/fetcher'
import {sortProjectsByFeatured} from '@/lib/sortProjects'
import type {Project} from '@/types'
import {sectionVariants, ParallaxLayer} from './shared'

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

export function FeaturedWorks({navigateTo}: {navigateTo: (section: string) => void}) {
  return (
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
              <Icon icon="lucide:folder-open" className="w-3.5 h-3.5 text-[var(--color-text-primary)]" />
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
          className="group hidden sm:inline-flex items-center gap-2 rounded-3xl rounded-tr-md rounded-bl-md border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-3.5 font-semibold text-sm text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-text-muted)] shadow-sm"
        >
          Lihat Semua Proyek
          <Icon icon="lucide:arrow-right" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <Suspense fallback={<FeaturedProjectsSkeleton />}>
        <FeaturedProjectsContent />
      </Suspense>

      <div className="flex sm:hidden justify-center mt-2">
        <button
          onClick={() => navigateTo('projects')}
          className="w-full justify-center group inline-flex items-center gap-2 rounded-3xl rounded-tr-md rounded-bl-md border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-3.5 font-semibold text-sm text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bg-elevated)] shadow-sm"
        >
          Lihat Semua Proyek
          <Icon icon="lucide:arrow-right" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.section>
  )
}
