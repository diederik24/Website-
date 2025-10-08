'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface DecorativeSectionProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'gradient' | 'pattern'
}

export default function DecorativeSection({ 
  children, 
  className = '',
  variant = 'default'
}: DecorativeSectionProps) {
  const variants = {
    default: 'bg-white',
    gradient: 'bg-gradient-to-br from-pink-50 via-white to-purple-50',
    pattern: 'bg-white relative overflow-hidden'
  }

  return (
    <section className={`${variants[variant]} ${className}`}>
      {variant === 'pattern' && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ec4899' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50" />
      <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-purple-500 to-transparent opacity-50" />
    </section>
  )
}

