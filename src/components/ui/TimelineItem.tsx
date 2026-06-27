'use client';

import { motion } from 'framer-motion';
import { Briefcase, Users, GraduationCap, Calendar, Award, ExternalLink } from 'lucide-react';
import type { Experience } from '@/types';
import { cn } from '@/lib/utils';

interface TimelineItemProps {
  experience: Experience;
  index: number;
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      type: 'spring' as const,
      stiffness: 200,
      damping: 20,
    },
  }),
};

function CardContent({ experience, isCertificate, alignRight = false }: { experience: Experience; isCertificate: boolean; alignRight?: boolean }) {
  return (
    <div className={cn(
      "flex flex-col gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 transition-all hover:border-[var(--color-text-muted)] hover:shadow-md",
      isCertificate ? "md:p-4" : ""
    )}>
      <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{experience.position}</h3>
      <span className="text-lg font-medium text-[var(--color-text-secondary)]">{experience.company}</span>
      <div className={cn("flex items-center gap-2 text-sm text-[var(--color-text-muted)] mt-1", alignRight ? "md:justify-end" : "")}>
        <Calendar className="h-4 w-4" />
        <span>{experience.period}</span>
      </div>
      
      {!isCertificate && experience.description && (
        <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {experience.description}
        </p>
      )}

      {!isCertificate && experience.technologies && experience.technologies.length > 0 && (
        <div className={cn("mt-4 flex flex-wrap gap-2", alignRight ? "md:justify-end" : "")}>
          {experience.technologies.map(tech => (
            <span key={tech} className="rounded-full bg-[var(--color-bg-elevated)] px-3 py-1 text-xs font-medium text-[var(--color-text-secondary)] border border-[var(--color-border-muted)]">
              {tech}
            </span>
          ))}
        </div>
      )}

      {isCertificate && experience.credentialUrl && (
        <div className={cn("mt-3 flex", alignRight ? "md:justify-end" : "justify-start")}>
          <a 
            href={experience.credentialUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-interactive)] hover:underline"
          >
            <ExternalLink className="h-4 w-4" />
            Lihat Kredensial
          </a>
        </div>
      )}
    </div>
  );
}

export default function TimelineItem({ experience, index }: TimelineItemProps) {
  // Tentukan ikon berdasarkan tipe
  const getIcon = () => {
    switch (experience.type) {
      case 'work':
        return <Briefcase className="h-5 w-5" />;
      case 'organization':
        return <Users className="h-5 w-5" />;
      case 'education':
        return <GraduationCap className="h-5 w-5" />;
      case 'certificate':
        return <Award className="h-5 w-5" />;
      default:
        return <Briefcase className="h-5 w-5" />;
    }
  };

  // Alternasi posisi di desktop (kiri/kanan)
  const isEven = index % 2 === 0;
  const isCertificate = experience.type === 'certificate';


  return (
    <motion.div
      custom={index}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="relative flex items-center justify-between w-full mb-12"
    >
      {/* ── Desktop: Garis Tengah & Ikon ──────────────────────── */}
      <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full border-4 border-[var(--color-bg-main)] bg-[var(--color-interactive)] text-[var(--color-interactive-text)] z-10 shadow-sm">
        {getIcon()}
      </div>

      {/* ── Konten Kiri (Desktop) ─────────────────────────────── */}
      <div className={cn(
        "w-full md:w-5/12 pl-20 md:pl-0",
        isEven ? "md:text-right md:pr-16" : "md:col-start-2 md:pl-16 hidden md:block opacity-0"
      )}>
        {isEven && <CardContent experience={experience} isCertificate={isCertificate} alignRight={true} />}
      </div>

      {/* ── Konten Kanan (Desktop) & Default Mobile ───────────── */}
      <div className={cn(
        "w-full md:w-5/12 pl-20 md:pl-0",
        !isEven ? "md:pl-16" : "hidden md:block opacity-0"
      )}>
        {!isEven && <CardContent experience={experience} isCertificate={isCertificate} />}
      </div>

    </motion.div>
  );
}
