'use client'

import {useState} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import useSWR from 'swr'
import ProjectCard from '@/components/ui/ProjectCard'
import {cn} from '@/lib/utils'
import {fetcher} from '@/lib/fetcher'
import {sortProjectsByFeatured} from '@/lib/sortProjects'
import type {Project} from '@/types'
import * as LucideIcons from 'lucide-react'

type ProjectCategory = Project['category'] | 'all'

// Label mapping untuk kategori
const CATEGORY_LABELS: Record<string, string> = {
  all: 'Semua',
  web: 'Web',
  mobile: 'Mobile',
  api: 'API',
  other: 'Lainnya',
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all')
  const {data: projects = [], isLoading} = useSWR<Project[]>(
    '/api/projects', 
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 60000 * 5 }
  )

  // Sorting: featured projects tampil paling atas
  const sortedProjects = sortProjectsByFeatured(projects)

  // Dynamic categories: hanya tampilkan kategori yang punya proyek
  const availableCategories: {label: string; value: ProjectCategory}[] = (() => {
    const categorySet = new Set(projects.map((p) => p.category))
    const dynamicCats: {label: string; value: ProjectCategory}[] = [
      {label: 'Semua', value: 'all'},
    ]
    // Tambahkan hanya kategori yang memiliki minimal 1 proyek
    const orderedCategories: Project['category'][] = ['web', 'mobile', 'api', 'other']
    for (const cat of orderedCategories) {
      if (categorySet.has(cat)) {
        dynamicCats.push({
          label: CATEGORY_LABELS[cat] || cat,
          value: cat,
        })
      }
    }
    return dynamicCats
  })()

  const filteredProjects = sortedProjects.filter((proj) =>
    activeCategory === 'all' ? true : proj.category === activeCategory,
  )

  // Reset ke 'all' jika active category tidak lagi tersedia
  const isActiveCategoryAvailable = availableCategories.some((c) => c.value === activeCategory)
  if (!isActiveCategoryAvailable && activeCategory !== 'all') {
    setActiveCategory('all')
  }

  return (
    <section
      aria-labelledby="projects-heading"
      className="flex min-h-screen w-full flex-col items-center justify-center py-24 px-6 md:px-10"
    >
      <div className="w-full max-w-5xl">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center md:text-left">
          <h1
            id="projects-heading"
            className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl"
          >
            Proyek
          </h1>
          <div className="mt-2 h-1 w-20 bg-[var(--color-text-primary)] mx-auto md:mx-0"></div>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            Koleksi portofolio dan proyek terbaik yang pernah saya kerjakan.
          </p>
        </div>

        {/* ── Filter Tabs ──────────────────────────────────────── */}
        <div className="mb-12 flex flex-wrap justify-center md:justify-start gap-2">
          {availableCategories.map((cat) => {
            const isActive = activeCategory === cat.value
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  'relative px-5 py-2 text-sm font-medium transition-colors rounded-full',
                  isActive
                    ? 'text-[var(--color-interactive-text)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="project-filter-active"
                    className="absolute inset-0 bg-[var(--color-interactive)] rounded-full -z-10"
                    transition={{type: 'spring', stiffness: 300, damping: 24}}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* ── Grid Proyek ──────────────────────────────────────── */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <div className="col-span-full py-12 flex justify-center text-[var(--color-text-muted)]">
                <LucideIcons.Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))
            ) : (
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className="col-span-full py-12 text-center text-[var(--color-text-muted)]"
              >
                Belum ada proyek untuk kategori ini.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
