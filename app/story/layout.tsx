import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Story & Artikel | Makbul N',
  description:
    'Catatan perjalanan, pemikiran, dan tutorial seputar pengembangan web, teknologi, dan pengalaman pribadi.',
  alternates: {
    canonical: '/story',
  },
  openGraph: {
    title: 'Story & Artikel | Makbul N',
    description:
      'Tulisan dan artikel seputar teknologi, web development, dan pengalaman pribadi.',
    url: 'https://www.makbuln.web.id/story',
    images: ['/profile.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Story & Artikel | Makbul N',
    description:
      'Tulisan dan artikel seputar teknologi, web development, dan pengalaman pribadi.',
    images: ['/profile.png'],
  },
}

export default function StoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
