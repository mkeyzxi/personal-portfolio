'use client'

import dynamic from 'next/dynamic'
import HeroSection from './HeroSection'

// Below-the-Fold Component dilabelkan Lazy Load & Skeleton Placeholder untuk menghindari pembebanan JS utama dan meredam CLS
const DynamicHomeSummary = dynamic(
  () => import('./HomeSummary'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-[800px] animate-pulse rounded-[32px] border border-[var(--color-border)]/40 bg-[var(--color-bg-surface)]/50 my-12" />
    )
  }
)

export default function HomeSection() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <HeroSection />
      <div id="home-overview">
        <DynamicHomeSummary />
      </div>
    </div>
  )
}
