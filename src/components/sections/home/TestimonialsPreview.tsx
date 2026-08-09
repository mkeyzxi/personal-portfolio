'use client'

import {Suspense} from 'react'
import {motion} from 'framer-motion'
import useSWR from 'swr'
import Image from 'next/image'
import {MessageSquare, ArrowRight, Star} from 'lucide-react'
import ShinyText from '@/components/ShinyText'
import {fetcher} from '@/lib/fetcher'
import type {Testimonial} from '@/types'
import {sectionVariants, itemVariants} from './shared'

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

export function TestimonialsPreview({navigateTo}: {navigateTo: (section: string) => void}) {
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
  )
}
