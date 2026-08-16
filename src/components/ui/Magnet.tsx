'use client'

import React, { useRef, useState, useEffect } from 'react'
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (disabled || !ref.current) return

      const { clientX, clientY } = e
      const { top, left, width, height } = ref.current.getBoundingClientRect()

      const centerX = left + width / 2
      const centerY = top + height / 2

      const distanceX = Math.abs(clientX - centerX)
      const distanceY = Math.abs(clientY - centerY)

      if (distanceX < width / 2 + padding && distanceY < height / 2 + padding) {
        // Calculate offset based on distance from center
        const offsetX = ((clientX - centerX) / (width / 2)) * magnetStrength
        const offsetY = ((clientY - centerY) / (height / 2)) * magnetStrength
        setPosition({ x: offsetX, y: offsetY })
      } else {
        setPosition({ x: 0, y: 0 })
      }
    }

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseout', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [disabled, padding, magnetStrength])

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
