import type { Project } from '@/types';

/**
 * Sorting proyek:
 * 1. isFeatured: true lebih dulu dari isFeatured: false
 * 2. Di antara proyek dengan status featured yang sama, urutkan
 *    berdasarkan createdAt terbaru (descending)
 */
export function sortProjectsByFeatured(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    // Featured projects first
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }

    // Then by createdAt descending (newest first)
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });
}
