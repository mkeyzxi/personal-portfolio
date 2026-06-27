import { notFound } from 'next/navigation';
import { getAdminDb } from '@/lib/firebase-admin';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Icon } from '@iconify/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export const revalidate = 3600; // ISR 1 jam

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 1. Generate Metadata untuk SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const adminDb = getAdminDb();
  const snapshot = await adminDb.collection('projects').where('slug', '==', slug).limit(1).get();
  
  if (snapshot.empty) return { title: 'Proyek Tidak Ditemukan' };
  
  const project = snapshot.docs[0].data();
  return {
    title: `${project.title} | Portofolio`,
    description: project.shortDescription || project.description,
    openGraph: {
      images: [project.thumbnail || '/og-image.jpeg'],
    },
    twitter: {
      card: 'summary_large_image',
      images: [project.thumbnail || '/og-image.jpeg'],
    }
  };
}

// Komponen helper untuk merender JSON dari BlockNote menjadi HTML
function renderBlockNoteJSON(blocks: any[]) {
  if (!blocks || !Array.isArray(blocks)) return null;

  return blocks.map((block, index) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={index} className="mb-4 text-[var(--color-text-secondary)] leading-relaxed">
            {block.content?.map((textNode: any, i: number) => {
              let className = "";
              if (textNode.styles?.bold) className += "font-bold ";
              if (textNode.styles?.italic) className += "italic ";
              if (textNode.styles?.underline) className += "underline ";
              if (textNode.styles?.strike) className += "line-through ";
              if (textNode.styles?.code) className += "font-mono bg-[var(--color-bg-elevated)] px-1 py-0.5 rounded text-[var(--color-text-primary)] ";
              
              if (textNode.type === 'link') {
                return <a key={i} href={textNode.href} target="_blank" rel="noopener noreferrer" className={`${className} text-[var(--color-interactive)] hover:underline`}>{textNode.text}</a>;
              }
              return <span key={i} className={className}>{textNode.text}</span>;
            })}
          </p>
        );
      case 'heading':
        const HeadingTag = `h${block.props.level}` as any;
        const text = block.content?.map((c: any) => c.text).join('') || '';
        const baseClasses = "font-bold text-[var(--color-text-primary)] mt-8 mb-4";
        const sizeClass = block.props.level === 1 ? "text-3xl" : block.props.level === 2 ? "text-2xl" : "text-xl";
        return <HeadingTag key={index} className={`${baseClasses} ${sizeClass}`}>{text}</HeadingTag>;
      case 'bulletListItem':
      case 'numberedListItem':
        const textLi = block.content?.map((c: any) => c.text).join('') || '';
        return (
          <li key={index} className="ml-6 list-disc mb-2 text-[var(--color-text-secondary)]">
            {textLi}
          </li>
        );
      case 'image':
        return (
          <div key={index} className="my-8 rounded-2xl overflow-hidden border border-[var(--color-border)]">
            <img src={block.props.url} alt={block.props.caption || "Image"} className="w-full object-cover" />
            {block.props.caption && <p className="text-center text-sm text-[var(--color-text-muted)] mt-2 pb-2">{block.props.caption}</p>}
          </div>
        );
      default:
        return null;
    }
  });
}

// 2. Main Page Render
export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const adminDb = getAdminDb();
  const snapshot = await adminDb.collection('projects').where('slug', '==', slug).limit(1).get();
  
  if (snapshot.empty) {
    notFound();
  }

  const project = snapshot.docs[0].data();

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      {/* Header Banner */}
      <div className="w-full h-[40vh] md:h-[55vh] relative overflow-hidden bg-[var(--color-bg-elevated)] border-b border-[var(--color-border)]">
        {project.thumbnail && (
          <img 
            src={project.thumbnail} 
            alt={`Cover ${project.title}`} 
            className="absolute inset-0 w-full h-full object-cover opacity-80 md:opacity-90 transition-opacity duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-main)] via-[var(--color-bg-main)/60] to-transparent/10" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="flex-1">
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)] opacity-80 hover:opacity-100 transition-opacity mb-6 bg-[var(--color-bg-surface)]/50 backdrop-blur-md px-4 py-2 rounded-full border border-[var(--color-border)] shadow-sm">
                <ArrowLeft className="h-4 w-4" /> Kembali ke Beranda
              </Link>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-geist-sans text-[var(--color-text-primary)] mb-4 leading-tight">
                {project.title}
              </h1>
              <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl">
                {project.shortDescription || project.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Konten Utama */}
      <article className="max-w-5xl mx-auto py-12 px-6 md:px-10 flex flex-col md:flex-row justify-between gap-12 md:gap-16">
        {/* Kolom Kiri: Detail & Render BlockNote */}
        <div className="flex-1 md:max-w-2xl">
          {/* Metadata Proyek (Mobile Only) */}
          <div className="flex flex-col gap-6 mb-10 md:hidden bg-[var(--color-bg-surface)] p-6 rounded-3xl border border-[var(--color-border)] shadow-sm">
            <ProjectMetaInfo project={project} />
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none text-[var(--color-text-secondary)] prose-img:rounded-2xl prose-img:border prose-img:border-[var(--color-border)]">
            {renderBlockNoteJSON(project.content)}
          </div>
        </div>

        {/* Kolom Kanan: Sidebar Metadata (Desktop) */}
        <aside className="w-full md:w-72 lg:w-80 flex-shrink-0 hidden md:flex flex-col gap-8">
          <div className="sticky top-10 flex flex-col gap-6 bg-[var(--color-bg-surface)] p-8 rounded-3xl border border-[var(--color-border)] shadow-sm transition-all hover:shadow-md">
            <ProjectMetaInfo project={project} />
          </div>
        </aside>
      </article>
    </div>
  );
}

// Helper component untuk Sidebar & Mobile info
function ProjectMetaInfo({ project }: { project: any }) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Kategori</h3>
        <p className="font-medium text-[var(--color-text-primary)] capitalize">{project.category}</p>
      </div>

      {project.createdAt && (
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Dipublikasikan</h3>
          <p className="font-medium text-[var(--color-text-primary)]">
            {format(new Date(project.createdAt), 'dd MMMM yyyy', { locale: id })}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-2 mt-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Teknologi</h3>
        <div className="flex flex-wrap gap-2">
          {project.technologies?.map((tech: string) => (
            <span key={tech} className="font-mono text-xs font-medium px-3 py-1.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-secondary)] rounded-lg hover:text-[var(--color-text-primary)] transition-colors">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {(project.liveUrl || project.githubUrl) && (
        <div className="pt-6 border-t border-[var(--color-border)] flex flex-col gap-3 mt-2">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[var(--color-interactive)] text-[var(--color-interactive-text)] font-semibold hover:bg-[var(--color-interactive-hover)] transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-sm">
              <ExternalLink className="h-4 w-4" /> Kunjungi Situs
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-primary)] font-semibold hover:bg-[var(--color-bg-elevated)] transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-sm">
              <Icon icon="mdi:github" className="h-5 w-5" /> Repositori Kode
            </a>
          )}
        </div>
      )}
    </>
  );
}
