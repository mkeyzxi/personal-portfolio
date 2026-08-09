'use client'

import useSWR from 'swr'
import {fetcher} from '@/lib/fetcher'
import {experiences} from '@/data/experiences'
import {techStack} from '@/data/techstack'
import type {Project} from '@/types'

// Import Split Components
import {ExecutiveSnapshot} from './home/ExecutiveSnapshot'
import {WhatIDo} from './home/WhatIDo'
import {FeaturedWorks} from './home/FeaturedWorks'
import {ExperienceOverview} from './home/ExperienceOverview'
import {TechPreview} from './home/TechPreview'
import {StoryArticles} from './home/StoryArticles'
import {TestimonialsPreview} from './home/TestimonialsPreview'
import {GithubActivity} from './home/GithubActivity'
import {ContactCTA} from './home/ContactCTA'

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

  const cvDownloadUrl =
    'https://drive.google.com/file/d/1o2uuU3WLrY5zUTHGSBH1OVphIfyUlDoE/view?usp=sharing'

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
