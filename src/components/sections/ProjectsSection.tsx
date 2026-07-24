'use client'

import {useState, Suspense} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import useSWR from 'swr'
import {ChevronLeft, ChevronRight} from 'lucide-react'
import ProjectCard from '@/components/ui/ProjectCard'
import {cn} from '@/lib/utils'
import {fetcher} from '@/lib/fetcher'
import {sortProjectsByFeatured} from '@/lib/sortProjects'
import type {Project} from '@/types'
import ProjectsSkeleton from '@/components/skeletons/ProjectsSkeleton'

type ProjectCategory = Project['category'] | 'all'

// Label mapping untuk kategori
const CATEGORY_LABELS: Record<string, string> = {
  all: 'Semua',
  web: 'Web',
  mobile: 'Mobile',
  api: 'API',
  other: 'Lainnya',
}

function ProjectsContent({
  activeCategory,
  onCategoriesLoaded,
}: {
  activeCategory: ProjectCategory
  onCategoriesLoaded: (categories: {label: string; value: ProjectCategory}[]) => void
}) {
  const {data: projects = []} = useSWR<Project[]>('/api/projects', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000 * 5,
    suspense: true,
  })

  // Sorting: featured projects tampil paling atas
  const sortedProjects = sortProjectsByFeatured(projects)

  // Dynamic categories: hanya tampilkan kategori yang punya proyek
  const availableCategories: {label: string; value: ProjectCategory}[] = (() => {
    const categorySet = new Set(projects.map((p) => p.category))
    const dynamicCats: {label: string; value: ProjectCategory}[] = [{label: 'Semua', value: 'all'}]
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

  // Notifikasi parent tentang kategori yang tersedia (hanya ketika data berubah)
  // Menghindari setState di dalam render kita panggil callback di useEffect jika perlu
  // Namun cara yang lebih aman adalah membiarkan filter menjadi bagian internal Content,
  // tapi requirementnya filter ditaruh di luar Content.
  // Jika filter di luar Content, Parent harus tahu availableCategories.
  // Opsi paling sederhana: Memindahkan Filter Tabs ke DALAM ProjectsContent.

  const filteredProjects = sortedProjects.filter((proj) =>
    activeCategory === 'all' ? true : proj.category === activeCategory,
  )

  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-12"
    >
      <AnimatePresence mode="popLayout">
        {filteredProjects.length > 0 ? (
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
  )
}

// Karena filter membutuhkan data category dari response fetch, kita gabungkan fetch dan filter ke dalam satu Content Component.
function ProjectsDataContent() {
  const {data: projects = []} = useSWR<Project[]>('/api/projects', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000 * 5,
    suspense: true,
  })

  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const sortedProjects = sortProjectsByFeatured(projects)

  const availableCategories: {label: string; value: ProjectCategory}[] = (() => {
    const categorySet = new Set(projects.map((p) => p.category))
    const dynamicCats: {label: string; value: ProjectCategory}[] = [{label: 'Semua', value: 'all'}]
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

  const isActiveCategoryAvailable = availableCategories.some((c) => c.value === activeCategory)
  if (!isActiveCategoryAvailable && activeCategory !== 'all') {
    setActiveCategory('all')
    setCurrentPage(1)
  }

  const filteredProjects = sortedProjects.filter((proj) =>
    activeCategory === 'all' ? true : proj.category === activeCategory,
  )

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)

  const displayedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handleCategoryChange = (category: ProjectCategory) => {
    setActiveCategory(category)
    setCurrentPage(1)
  }

  return (
    <div className="w-full">
      {/* ── Filter Tabs ──────────────────────────────────────── */}
      <div className="mb-12 flex flex-wrap justify-center md:justify-start gap-2">
        {availableCategories.map((cat) => {
          const isActive = activeCategory === cat.value
          return (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        <AnimatePresence mode="popLayout">
          {displayedProjects.length > 0 ? (
            displayedProjects.map((project, index) => (
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
      </div>

      {/* ── Pagination ──────────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Halaman Sebelumnya"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-1 mx-2">
            {Array.from({length: totalPages}).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={cn(
                  'w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-colors',
                  currentPage === i + 1
                    ? 'bg-[var(--color-interactive)] text-[var(--color-interactive-text)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Halaman Selanjutnya"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}

export default function ProjectsSection() {
  return (
    <section
      aria-labelledby="projects-heading"
      className="flex min-h-screen w-full flex-col items-center py-24 px-6 md:px-10" // diubah agar sejajar di atas
    >
      <div className="w-full max-w-5xl flex flex-col justify-center h-full flex-1">
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

        <Suspense
          fallback={
            <div className="w-full mt-12">
              <ProjectsSkeleton />
            </div>
          }
        >
          <ProjectsDataContent />
        </Suspense>
      </div>
    </section>
  )
}
