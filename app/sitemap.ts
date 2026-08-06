import {MetadataRoute} from 'next'
import {getAdminDb} from '@/lib/firebase-admin-db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // const baseUrl = 'https://www.makbuln.web.id'
  const baseUrl = process.env.BASE_URL as string

  let projects: MetadataRoute.Sitemap = []

  try {
    const adminDb = getAdminDb()
    const snapshot = await adminDb.collection('projects').get()

    projects = snapshot.docs.map((doc) => {
      const project = doc.data()
      // Use createdAt or a fallback date if not available
      const lastMod = project.updatedAt
        ? new Date(project.updatedAt)
        : project.createdAt
          ? new Date(project.createdAt)
          : new Date()

      return {
        url: `${baseUrl}/projects/${project.slug || doc.id}`,
        lastModified: lastMod,
        changeFrequency: 'weekly',
        priority: 0.7,
      }
    })
  } catch (error) {
    console.error('Error fetching projects for sitemap:', error)
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/story`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...projects,
  ]
}
