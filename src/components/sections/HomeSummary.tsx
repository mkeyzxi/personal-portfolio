'use client'

import useSWR from 'swr'
import {fetcher} from '@/lib/fetcher'
import {experiences} from '@/data/experiences'
import {techStack} from '@/data/techstack'
import type {Project, AboutData} from '@/types'

// Import Split Components
import {ExecutiveSnapshot} from './home/ExecutiveSnapshot'
import dynamic from 'next/dynamic'

// Lazy load below-the-fold components to reduce initial JS payload
const WhatIDo = dynamic(() => import('./home/WhatIDo').then((mod) => mod.WhatIDo))
const FeaturedWorks = dynamic(() => import('./home/FeaturedWorks').then((mod) => mod.FeaturedWorks))
const ExperienceOverview = dynamic(() => import('./home/ExperienceOverview').then((mod) => mod.ExperienceOverview))
const TechPreview = dynamic(() => import('./home/TechPreview').then((mod) => mod.TechPreview))
const StoryArticles = dynamic(() => import('./home/StoryArticles').then((mod) => mod.StoryArticles))
const TestimonialsPreview = dynamic(() => import('./home/TestimonialsPreview').then((mod) => mod.TestimonialsPreview))
const GithubActivity = dynamic(() => import('./home/GithubActivity').then((mod) => mod.GithubActivity))
const ContactCTA = dynamic(() => import('./home/ContactCTA').then((mod) => mod.ContactCTA))

// ============================================================
// KOMPONEN UTAMA RANGKUMAN HOME (EXECUTIVE DASHBOARD)
// ============================================================
export default function HomeSummary() {
  const navigateTo = (section: string) => {
    window.location.hash = section
  }

  // Mengambil total aktual dari database projects melalui cache SWR 1-Kali-Fetch
  const {data: allProjects = []} = useSWR<Project[]>('/api/projects', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 600000,
  })
  const dynamicProjectsCount = allProjects.length > 0 ? `${allProjects.length}+` : '5+'

  const previewTechs = Object.values(techStack).flat().slice(0, 12)
  const featuredExperiences = experiences.slice(0, 4)

  const {data: aboutData} = useSWR<{data: AboutData}>('/api/about', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 600000,
  })
  
  const cvDownloadUrl = aboutData?.data?.cvDownloadUrl || 'https://drive.google.com/file/d/1YK0d-yJlkAXoAb4gtGBMvkfLAyUdktFj/view?usp=sharing'

  return (
    <div className="w-full flex flex-col items-center py-24 px-6 md:px-10">
      <div className="w-full max-w-5xl space-y-32 md:space-y-40">
        <ExecutiveSnapshot
          dynamicProjectsCount={dynamicProjectsCount}
          cvDownloadUrl={cvDownloadUrl}
          navigateTo={navigateTo}
        />
        
        <WhatIDo navigateTo={navigateTo} />
        
        <FeaturedWorks navigateTo={navigateTo} />
        
        <ExperienceOverview 
          featuredExperiences={featuredExperiences} 
          navigateTo={navigateTo} 
        />
        
        <TechPreview 
          previewTechs={previewTechs} 
          navigateTo={navigateTo} 
        />
        
        <StoryArticles />
        
        <TestimonialsPreview navigateTo={navigateTo} />
        
        <GithubActivity />
        
        <ContactCTA navigateTo={navigateTo} />
      </div>
    </div>
  )
}
