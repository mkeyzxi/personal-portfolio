'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

interface MagnetProps {
  children: React.ReactNode
  padding?: number
  disabled?: boolean
  magnetStrength?: number
  className?: string
  innerClassName?: string
}

export default function Magnet({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 50,
  className = '',
  innerClassName = '',
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  // Cache rect to avoid forced reflow on every mouse event
  const cachedRect = useRef<DOMRect | null>(null)
  const rafId = useRef<number>(0)

  const updateRect = useCallback(() => {
    if (ref.current) {
      cachedRect.current = ref.current.getBoundingClientRect()
    }
  }, [])

  useEffect(() => {
    if (disabled || !ref.current) return

    updateRect()

    // Update cached rect on resize and scroll
    const ro = new ResizeObserver(updateRect)
    ro.observe(ref.current)
    window.addEventListener('scroll', updateRect, { passive: true })

    const handleMouseMove = (e: MouseEvent) => {
      if (!cachedRect.current) return

      // Throttle via RAF — only one position update per frame
      if (rafId.current) return
      rafId.current = requestAnimationFrame(() => {
        rafId.current = 0
        const rect = cachedRect.current!
        const { clientX, clientY } = e

        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const distanceX = Math.abs(clientX - centerX)
        const distanceY = Math.abs(clientY - centerY)

        if (distanceX < rect.width / 2 + padding && distanceY < rect.height / 2 + padding) {
          const offsetX = ((clientX - centerX) / (rect.width / 2)) * magnetStrength
          const offsetY = ((clientY - centerY) / (rect.height / 2)) * magnetStrength
          setPosition({ x: offsetX, y: offsetY })
        } else {
          setPosition(prev => (prev.x === 0 && prev.y === 0) ? prev : { x: 0, y: 0 })
        }
      })
    }

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseout', handleMouseLeave)

    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', updateRect)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleMouseLeave)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [disabled, padding, magnetStrength, updateRect])

  return (
    <div ref={ref} className={className} style={{ position: 'relative', display: 'inline-block' }}>
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
        className={innerClassName}
      >
        {children}
      </motion.div>
    </div>
  )
}
