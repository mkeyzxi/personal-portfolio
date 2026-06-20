'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '@/components/ui/ProjectCard';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';
import * as LucideIcons from 'lucide-react';

type ProjectCategory = Project['category'] | 'all';

const CATEGORIES: { label: string; value: ProjectCategory }[] = [
  { label: 'Semua', value: 'all' },
  { label: 'Web', value: 'web' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'API', value: 'api' },
  { label: 'Lainnya', value: 'other' },
];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const json = await res.json();
        if (json.success) {
          setProjects(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch projects', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((proj) =>
    activeCategory === 'all' ? true : proj.category === activeCategory
  );

  return (
    <section className="flex min-h-screen w-full flex-col items-center py-24 px-6 sm:px-10">
      <div className="w-full max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Proyek
          </h2>
          <div className="mt-2 h-1 w-20 bg-[var(--color-text-primary)] mx-auto md:mx-0"></div>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            Koleksi portofolio dan proyek terbaik yang pernah saya kerjakan.
          </p>
        </div>

        {/* ── Filter Tabs ──────────────────────────────────────── */}
        <div className="mb-12 flex flex-wrap justify-center md:justify-start gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  "relative px-5 py-2 text-sm font-medium transition-colors rounded-full",
                  isActive ? "text-[var(--color-interactive-text)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="project-filter-active"
                    className="absolute inset-0 bg-[var(--color-interactive)] rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full py-12 text-center text-[var(--color-text-muted)]"
              >
                Belum ada proyek untuk kategori ini.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
