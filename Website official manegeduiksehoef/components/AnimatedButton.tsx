'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  icon?: ReactNode
  pulse?: boolean
  glow?: boolean
}

export default function AnimatedButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  pulse = false,
  glow = false
}: AnimatedButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2"
  
  const variantClasses = {
    primary: "bg-pink-500 text-white hover:bg-pink-600 focus:ring-pink-500 shadow-lg hover:shadow-xl",
    secondary: "bg-white text-pink-500 border-2 border-pink-500 hover:bg-pink-500 hover:text-white focus:ring-pink-500 shadow-lg hover:shadow-xl",
    outline: "bg-transparent text-pink-500 border-2 border-pink-500 hover:bg-pink-500 hover:text-white focus:ring-pink-500",
    gradient: "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 focus:ring-pink-500 shadow-lg hover:shadow-xl"
  }
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }

  const buttonContent = (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      whileHover={{ 
        scale: 1.05,
        y: -2
      }}
      whileTap={{ 
        scale: 0.95,
        y: 0
      }}
      animate={pulse ? {
        boxShadow: [
          "0 0 0 0 rgba(236, 72, 153, 0.7)",
          "0 0 0 10px rgba(236, 72, 153, 0)",
          "0 0 0 0 rgba(236, 72, 153, 0)"
        ]
      } : {}}
      transition={pulse ? {
        duration: 2,
        repeat: Infinity
      } : {
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      {glow && (
        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 opacity-0"
          whileHover={{ opacity: 0.2 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      <span className="relative z-10 flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </span>
      
      <motion.div
        className="absolute inset-0 rounded-lg bg-white opacity-0"
        whileHover={{ opacity: 0.1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className="inline-block"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {buttonContent}
      </motion.a>
    )
  }

  return buttonContent
}

