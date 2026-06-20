'use client';

import { motion } from 'framer-motion';
import type { Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
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
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} prefetch={true} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded-2xl block h-full">
      <motion.div
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        layoutId={`project-card-${project.id}`}
        className="group cursor-pointer flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] transition-all hover:-translate-y-2 hover:shadow-xl hover:border-[var(--color-text-muted)]"
      >
        {/* Thumbnail */}
        <div className="relative aspect-video w-full overflow-hidden bg-[var(--color-bg-elevated)]">
          <img
            src={project.thumbnail}
            alt={`Thumbnail untuk ${project.title}`}
            className="h-full w-full object-cover img-mono transition-transform duration-500 group-hover:scale-105"
          />
          {project.featured && (
            <div className="absolute top-4 right-4 rounded-full bg-[var(--color-interactive)] px-3 py-1 text-xs font-bold text-[var(--color-interactive-text)] shadow-sm">
              Featured
            </div>
          )}
        </div>

        {/* Konten */}
        <div className="flex flex-1 flex-col p-6 pointer-events-none">
          <h3 className="mb-2 text-xl font-bold text-[var(--color-text-primary)] transition-colors group-hover:underline">
            {project.title}
          </h3>
          <p className="mb-4 flex-1 text-sm text-[var(--color-text-secondary)] line-clamp-3">
            {project.shortDescription || project.description}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-[var(--color-border-muted)]">
            {project.technologies.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary" className="bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 3 && (
              <Badge variant="outline" className="text-[var(--color-text-muted)]">
                +{project.technologies.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
