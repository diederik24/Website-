'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface EnhancedCardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'gradient' | 'glass' | 'elevated'
  hover?: boolean
}

export default function EnhancedCard({ 
  children, 
  className = '',
  variant = 'default',
  hover = true
}: EnhancedCardProps) {
  const variants = {
    default: 'bg-white shadow-lg border border-gray-100',
    gradient: 'bg-gradient-to-br from-pink-50 to-purple-50 shadow-xl border border-pink-100',
    glass: 'bg-white/80 backdrop-blur-md shadow-xl border border-white/20',
    elevated: 'bg-white shadow-2xl border border-gray-100'
  }

  return (
    <motion.div
      className={`${variants[variant]} rounded-2xl overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? {
        y: -8,
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      } : {}}
    >
      <div className="relative">
        {children}
        
        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0"
          whileHover={{ opacity: 1 }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            transform: 'translateX(-100%)'
          }}
          animate={{
            transform: ['translateX(-100%)', 'translateX(100%)']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 3
          }}
        />
      </div>
    </motion.div>
  )
}

