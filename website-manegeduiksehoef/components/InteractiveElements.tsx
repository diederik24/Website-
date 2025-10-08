'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface HoverCardProps {
  children: React.ReactNode
  className?: string
  hoverScale?: number
  hoverRotate?: number
  hoverShadow?: boolean
}

export const HoverCard = ({ 
  children, 
  className = '', 
  hoverScale = 1.05,
  hoverRotate = 0,
  hoverShadow = true
}: HoverCardProps) => {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        scale: hoverScale,
        rotate: hoverRotate,
        boxShadow: hoverShadow ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" : undefined
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }}
    >
      {children}
    </motion.div>
  )
}

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  onClick?: () => void
}

export const MagneticButton = ({ 
  children, 
  className = '', 
  strength = 0.3,
  onClick
}: MagneticButtonProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) * strength
    const y = (e.clientY - top - height / 2) * strength
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      className={className}
      style={{ x: position.x, y: position.y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  )
}

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  floatDistance?: number
  floatDuration?: number
  floatDelay?: number
}

export const FloatingElement = ({ 
  children, 
  className = '', 
  floatDistance = 20,
  floatDuration = 3,
  floatDelay = 0
}: FloatingElementProps) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -floatDistance, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: floatDelay
      }}
    >
      {children}
    </motion.div>
  )
}

interface GlowEffectProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  glowIntensity?: number
}

export const GlowEffect = ({ 
  children, 
  className = '', 
  glowColor = '#ec4899',
  glowIntensity = 0.5
}: GlowEffectProps) => {
  return (
    <motion.div
      className={className}
      whileHover={{
        boxShadow: `0 0 20px ${glowColor}${Math.round(glowIntensity * 255).toString(16).padStart(2, '0')}`,
        scale: 1.02
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
  perspective?: number
}

export const TiltCard = ({ 
  children, 
  className = '', 
  maxTilt = 15,
  perspective = 1000
}: TiltCardProps) => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    const rotateX = ((e.clientY - centerY) / height) * maxTilt
    const rotateY = ((centerX - e.clientX) / width) * maxTilt
    
    setRotateX(rotateX)
    setRotateY(rotateY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      className={className}
      style={{ 
        perspective,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}

interface PulseAnimationProps {
  children: React.ReactNode
  className?: string
  pulseScale?: number
  pulseDuration?: number
  pulseDelay?: number
}

export const PulseAnimation = ({ 
  children, 
  className = '', 
  pulseScale = 1.1,
  pulseDuration = 2,
  pulseDelay = 0
}: PulseAnimationProps) => {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, pulseScale, 1]
      }}
      transition={{
        duration: pulseDuration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: pulseDelay
      }}
    >
      {children}
    </motion.div>
  )
}

interface ShakeAnimationProps {
  children: React.ReactNode
  className?: string
  shakeIntensity?: number
  shakeDuration?: number
  trigger?: boolean
}

export const ShakeAnimation = ({ 
  children, 
  className = '', 
  shakeIntensity = 10,
  shakeDuration = 0.5,
  trigger = false
}: ShakeAnimationProps) => {
  return (
    <motion.div
      className={className}
      animate={trigger ? {
        x: [0, -shakeIntensity, shakeIntensity, -shakeIntensity, shakeIntensity, 0]
      } : {}}
      transition={{
        duration: shakeDuration,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

