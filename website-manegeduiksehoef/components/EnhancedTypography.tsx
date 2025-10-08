'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface EnhancedTypographyProps {
  children: ReactNode
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  className?: string
  gradient?: boolean
  animated?: boolean
}

export default function EnhancedTypography({ 
  children, 
  variant = 'p',
  className = '',
  gradient = false,
  animated = false
}: EnhancedTypographyProps) {
  const baseClasses = {
    h1: 'text-5xl md:text-7xl font-bold leading-tight',
    h2: 'text-4xl md:text-5xl font-bold leading-tight',
    h3: 'text-3xl md:text-4xl font-bold leading-tight',
    h4: 'text-2xl md:text-3xl font-semibold leading-tight',
    p: 'text-lg leading-relaxed',
    span: 'text-base'
  }

  const gradientClasses = gradient ? 'bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent' : ''
  
  const Component = motion[variant] as any

  if (animated) {
    return (
      <Component
        className={`${baseClasses[variant]} ${gradientClasses} ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </Component>
    )
  }

  return (
    <Component className={`${baseClasses[variant]} ${gradientClasses} ${className}`}>
      {children}
    </Component>
  )
}

