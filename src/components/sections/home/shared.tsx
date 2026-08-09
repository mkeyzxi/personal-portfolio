'use client'

import {useRef} from 'react'
import {motion, useScroll, useTransform, useSpring} from 'framer-motion'

// ============================================================
// KONFIGURASI ANIMASI FRAMER MOTION (NO REFLOW RULES)
// ============================================================
export const sectionVariants = {
  hidden: {opacity: 0, y: 30},
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 240,
      damping: 24,
      staggerChildren: 0.1,
    },
  },
}

export const itemVariants = {
  hidden: {opacity: 0, y: 20},
  show: {
    opacity: 1,
    y: 0,
    transition: {type: 'spring' as const, stiffness: 280, damping: 24},
  },
}

// ============================================================
// PARALLAX WRAPPER COMPONENT (GPU ACCELERATED & ZERO REFLOW)
// ============================================================
export function ParallaxLayer({
  children,
  offset = 20,
  className = '',
}: {
  children: React.ReactNode
  offset?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const yRange = useTransform(scrollYProgress, [0, 1], [offset, -offset])
  const y = useSpring(yRange, {stiffness: 350, damping: 35})

  return (
    <div ref={ref} className={className}>
      <motion.div style={{y}} className="will-change-transform transform-gpu w-full h-full">
        {children}
      </motion.div>
    </div>
  )
}
