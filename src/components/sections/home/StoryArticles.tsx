'use client'

import {Suspense} from 'react'
import {motion} from 'framer-motion'
import useSWR from 'swr'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import ShinyText from '@/components/ShinyText'
import {fetcher} from '@/lib/fetcher'
import {sectionVariants, itemVariants} from './shared'

function StoriesPreviewContent() {
  const {data: catRes} = useSWR('/api/categories', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000 * 5,
    suspense: true,
  })
  const {data: storyRes} = useSWR('/api/stories', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000 * 5,
    suspense: true,
  })

  const categories: {slug: string; name: string}[] = Array.isArray(catRes)
    ? catRes
    : catRes?.success
      ? catRes.data
      : catRes?.data || []
  const allStories: {
    id: string
    categorySlug: string
    createdAt: string
    title: string
    summary: string
    slug: string
    likeCount: number
    commentCount: number
  }[] = Array.isArray(storyRes)
    ? storyRes
    : storyRes?.success
      ? storyRes.data
      : storyRes?.data || []
  const latestStories = allStories.slice(0, 3)

  if (latestStories.length === 0) {
    return (
      <div className="w-full py-12 text-center rounded-[24px] border border-[var(--color-border)]/50 bg-[var(--color-bg-surface)] text-[var(--color-text-muted)]">
        Belum ada artikel atau cerita yang diterbitkan.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {latestStories.map((story, i: number) => {
        const categoryName =
          categories.find((c) => c.slug === story.categorySlug)?.name || 'Editorial'
        return (
          <motion.div
            key={story.id || i}
            variants={itemVariants}
            className="group relative flex flex-col justify-between rounded-[24px] border border-[var(--color-border)]/60 bg-[var(--color-bg-surface)]/80 p-7 transition-all duration-300 hover:border-[var(--color-text-muted)] hover:-translate-y-1 hover:shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center rounded-md bg-[var(--color-bg-elevated)] px-2.5 py-1 font-mono text-xs font-semibold text-[var(--color-text-primary)] border border-[var(--color-border)]/80">
                  {categoryName}
                </span>
                <span className="font-mono text-xs text-[var(--color-text-muted)]">
                  {new Date(story.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h4 className="text-lg font-bold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-text-secondary)] transition-colors line-clamp-2 leading-snug">
                {story.title}
              </h4>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-3 mb-6">
                {story.summary || 'Baca pembahasan lengkap mengenai topik ini di halaman artikel.'}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]/40 mt-auto text-xs text-[var(--color-text-muted)]">
              <div className="flex items-center gap-3.5">
                <span className="flex items-center gap-1">
                  <Icon icon="lucide:heart" className="w-3.5 h-3.5 text-[var(--color-text-primary)]" />
                  {story.likeCount || 0}
                </span>
                <span className="flex items-center gap-1">
                  <Icon icon="lucide:message-square" className="w-3.5 h-3.5 text-[var(--color-text-primary)]" />
                  {story.commentCount || 0}
                </span>
              </div>
              <Link
                href={`/story/${story.slug}`}
                className="inline-flex items-center font-semibold text-[var(--color-text-primary)] group-hover:underline"
              >
                Baca Artikel
                <Icon icon="lucide:chevron-right" className="w-4 h-4 ml-0.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

function StoriesPreviewSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-[240px] rounded-[24px] border border-[var(--color-border)]/40 bg-[var(--color-bg-surface)]/50 animate-pulse"
        />
      ))}
    </div>
  )
}

export function StoryArticles() {
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
              <Icon icon="lucide:book-open" className="w-3.5 h-3.5 text-[var(--color-text-primary)]" />
              <ShinyText
                text="Story & Articles"
                disabled={false}
                speed={3}
                className="font-mono font-bold tracking-wider text-xs uppercase text-[var(--color-text-primary)]"
              />
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] font-heading">
            Cerita &amp; Catatan Artikel
          </h3>
          <p className="text-[var(--color-text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed">
            Publikasi tulisan teknis, tutorial rekayasa perangkat lunak, serta refleksi
            perjalanan pemrograman.
          </p>
        </div>

        <Link
          href="/story"
          className="group hidden sm:inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-3.5 font-semibold text-sm text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-text-muted)] shadow-sm"
        >
          Baca Seluruh Artikel
          <Icon icon="lucide:arrow-right" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <Suspense fallback={<StoriesPreviewSkeleton />}>
        <StoriesPreviewContent />
      </Suspense>

      <div className="flex sm:hidden justify-center mt-2">
        <Link
          href="/story"
          className="w-full justify-center group inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-3.5 font-semibold text-sm text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bg-elevated)] shadow-sm"
        >
          Baca Seluruh Artikel
          <Icon icon="lucide:arrow-right" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.section>
  )
}
