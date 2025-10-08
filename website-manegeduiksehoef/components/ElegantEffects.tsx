'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface SoftCardProps {
  children: React.ReactNode
  className?: string
  hoverScale?: number
}

export const SoftCard = ({ 
  children, 
  className = '', 
  hoverScale = 1.02
}: SoftCardProps) => {
  return (
    <motion.div
      className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 ${className}`}
      whileHover={{ 
        scale: hoverScale,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }}
    >
      {children}
    </motion.div>
  )
}

interface GentleButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
}

export const GentleButton = ({ 
  children, 
  onClick, 
  className = '',
  variant = 'primary'
}: GentleButtonProps) => {
  const baseClasses = "px-8 py-4 rounded-xl font-semibold transition-all duration-300"
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-lg hover:shadow-xl hover:from-pink-500 hover:to-pink-600",
    secondary: "bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-lg hover:shadow-xl hover:from-purple-500 hover:to-purple-600",
    outline: "border-2 border-pink-300 text-pink-600 hover:bg-pink-50 hover:border-pink-400"
  }

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  )
}

interface FloatingHeartProps {
  className?: string
  size?: number
  color?: string
}

export const FloatingHeart = ({ 
  className = '', 
  size = 20,
  color = '#f472b6'
}: FloatingHeartProps) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ color }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.3, 1, 0.3],
        scale: [0.8, 1.2, 0.8]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </motion.div>
  )
}

interface SoftGlowProps {
  children: React.ReactNode
  className?: string
  color?: string
  intensity?: number
}

export const SoftGlow = ({ 
  children, 
  className = '',
  color = '#f472b6',
  intensity = 0.3
}: SoftGlowProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        textShadow: [
          `0 0 10px ${color}${Math.round(intensity * 255).toString(16).padStart(2, '0')}`,
          `0 0 20px ${color}${Math.round(intensity * 255).toString(16).padStart(2, '0')}`,
          `0 0 10px ${color}${Math.round(intensity * 255).toString(16).padStart(2, '0')}`
        ]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

interface GentleParticlesProps {
  count?: number
  className?: string
  colors?: string[]
}

export const GentleParticles = ({ 
  count = 20, 
  className = '',
  colors = ['#f472b6', '#a78bfa', '#fbbf24']
}: GentleParticlesProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full opacity-30"
          style={{
            backgroundColor: colors[i % colors.length],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

interface WarmSectionProps {
  children: React.ReactNode
  className?: string
  variant?: 'light' | 'warm' | 'soft'
}

export const WarmSection = ({ 
  children, 
  className = '',
  variant = 'light'
}: WarmSectionProps) => {
  const variantClasses = {
    light: "bg-gradient-to-br from-pink-50 via-white to-purple-50",
    warm: "bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50",
    soft: "bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50"
  }

  return (
    <section className={`relative py-20 ${variantClasses[variant]} ${className}`}>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}

interface ElegantIconProps {
  children: React.ReactNode
  className?: string
  color?: string
}

export const ElegantIcon = ({ 
  children, 
  className = '',
  color = '#f472b6'
}: ElegantIconProps) => {
  return (
    <motion.div
      className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${className}`}
      style={{
        background: `linear-gradient(135deg, ${color}20, ${color}40)`,
        border: `1px solid ${color}30`
      }}
      whileHover={{ 
        scale: 1.05,
        rotate: 5,
        boxShadow: `0 10px 30px ${color}30`
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div style={{ color }} className="text-2xl">
        {children}
      </div>
    </motion.div>
  )
}

interface GentleFadeProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export const GentleFade = ({ 
  children, 
  className = '',
  delay = 0,
  direction = 'up'
}: GentleFadeProps) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 30, opacity: 0 }
      case 'down': return { y: -30, opacity: 0 }
      case 'left': return { x: 30, opacity: 0 }
      case 'right': return { x: -30, opacity: 0 }
      default: return { y: 30, opacity: 0 }
    }
  }

  return (
    <motion.div
      className={className}
      initial={getInitialPosition()}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: "easeOut" 
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  )
}

