import {getAdminDb} from '@/lib/firebase-admin-db'
import {notFound} from 'next/navigation'
import Link from 'next/link'
import * as LucideIcons from 'lucide-react'
import BlockNoteRenderer from '@/components/public/BlockNoteRenderer'
import LikeButton from '@/components/public/LikeButton'
import ShareButton from '@/components/public/ShareButton'
import CommentSection from '@/components/public/CommentSection'
import {Metadata} from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>
}): Promise<Metadata> {
  const resolvedParams = await params
  const story = await getStory(resolvedParams.slug)

  if (!story) return {title: 'Cerita Tidak Ditemukan'}

  return {
    title: `${story.title} | Makbul N`,
    description: story.summary || `Cerita mengenai ${story.title}`,
    openGraph: {
      images: ['/og-image.jpeg'],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/og-image.jpeg'],
    },
  }
}

// Mengambil data di server-side untuk SEO optimal
async function getStory(slug: string) {
  try {
    const db = getAdminDb()
    const snapshot = await db
      .collection('stories')
      .where('slug', '==', slug)
      .where('status', '==', 'published')
      .limit(1)
      .get()

    if (snapshot.empty) return null

    const doc = snapshot.docs[0]
    return {id: doc.id, ...doc.data()} as any
  } catch (e) {
    console.error(e)
    return null
  }
}

async function getCategory(slug: string) {
  try {
    const db = getAdminDb()
    const snapshot = await db.collection('categories').where('slug', '==', slug).limit(1).get()
    if (snapshot.empty) return null
    return snapshot.docs[0].data()
  } catch {
    return null
  }
}

export default async function StoryDetailPage({params}: {params: Promise<{slug: string}>}) {
  const resolvedParams = await params
  const story = await getStory(resolvedParams.slug)

  if (!story) {
    notFound()
  }

  const category = await getCategory(story.categorySlug)

  return (
    <article className="max-w-3xl mx-auto py-12 px-6 lg:px-8 min-h-screen">
      <Link
        href="/story"
        className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-interactive)] transition-colors mb-8"
      >
        <LucideIcons.ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Cerita
      </Link>

      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono px-2 py-1 bg-[var(--color-interactive)]/10 text-[var(--color-interactive)] rounded">
            {category?.name || 'Uncategorized'}
          </span>
          <span className="text-sm text-[var(--color-text-muted)]">
            {new Date(story.createdAt).toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6 leading-tight">
          {story.title}
        </h1>

        <div className="flex items-center justify-between py-4 border-y border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-bg-elevated)] flex items-center justify-center overflow-hidden">
              {story.authorAvatar ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={story.authorAvatar}
                  alt={story.authorName || 'Author'}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <LucideIcons.User className="w-5 h-5 text-[var(--color-text-muted)]" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-text-primary)]">
                {story.authorName || 'Muhammad Makbul N'}
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">Author</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LikeButton initialLikes={story.likeCount || 0} storyId={story.id} />
            <ShareButton
              storyData={{
                title: story.title,
                description: story.summary || 'Baca cerita lengkapnya di portofolio saya.',
                thumbnail: story.coverImage || undefined,
                slug: story.slug,
                likes: story.likeCount || 0,
                authorName: story.authorName || 'Muhammad Makbul N',
                authorPhoto: story.authorAvatar || '',
                authorRole: 'Creator & Full Stack Developer',
                publishDate: new Date(story.createdAt).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }),
                categoryName: category?.name || undefined,
              }}
            />
          </div>
        </div>
      </header>

      {/* Konten Artikel */}
      <div className="prose prose-neutral dark:prose-invert max-w-none text-[var(--color-text-secondary)] prose-img:rounded-2xl prose-img:border prose-img:border-[var(--color-border)] mb-12">
        <BlockNoteRenderer content={story.content} />
      </div>

      <hr className="my-10 border-[var(--color-border)]" />

      {/* Bagian Komentar */}
      <CommentSection storyId={story.id} />
    </article>
  )
}
