'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

export const LoadingSpinner = ({ 
  size = 'md', 
  color = '#ec4899',
  className = ''
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <div
        className="w-full h-full border-2 border-transparent border-t-current rounded-full"
        style={{ color }}
      />
    </motion.div>
  )
}

interface PulseLoaderProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

export const PulseLoader = ({ 
  size = 'md', 
  color = '#ec4899',
  className = ''
}: PulseLoaderProps) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-4 h-4',
    lg: 'w-6 h-6'
  }

  return (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={`${sizeClasses[size]} rounded-full`}
          style={{ backgroundColor: color }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

interface DotsLoaderProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

export const DotsLoader = ({ 
  size = 'md', 
  color = '#ec4899',
  className = ''
}: DotsLoaderProps) => {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  }

  return (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={`${sizeClasses[size]} rounded-full`}
          style={{ backgroundColor: color }}
          animate={{
            y: [0, -10, 0]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

interface WaveLoaderProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

export const WaveLoader = ({ 
  size = 'md', 
  color = '#ec4899',
  className = ''
}: WaveLoaderProps) => {
  const sizeClasses = {
    sm: 'w-1 h-4',
    md: 'w-2 h-8',
    lg: 'w-3 h-12'
  }

  return (
    <div className={`flex space-x-1 items-end ${className}`}>
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className={`${sizeClasses[size]} rounded-full`}
          style={{ backgroundColor: color }}
          animate={{
            scaleY: [1, 0.3, 1]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

interface SkeletonLoaderProps {
  width?: string
  height?: string
  className?: string
  rounded?: boolean
}

export const SkeletonLoader = ({ 
  width = '100%', 
  height = '20px',
  className = '',
  rounded = false
}: SkeletonLoaderProps) => {
  return (
    <motion.div
      className={`bg-gray-200 ${rounded ? 'rounded-full' : 'rounded'} ${className}`}
      style={{ width, height }}
      animate={{
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

interface PageLoaderProps {
  className?: string
}

export const PageLoader = ({ className = '' }: PageLoaderProps) => {
  return (
    <div className={`fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50 ${className}`}>
      <div className="text-center">
        <motion.div
          className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.p
          className="text-gray-600 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Laden...
        </motion.p>
      </div>
    </div>
  )
}

interface ProgressLoaderProps {
  progress: number
  className?: string
  color?: string
  showPercentage?: boolean
}

export const ProgressLoader = ({ 
  progress, 
  className = '',
  color = '#ec4899',
  showPercentage = true
}: ProgressLoaderProps) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      {showPercentage && (
        <motion.p
          className="text-sm text-gray-600 mt-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {Math.round(progress)}%
        </motion.p>
      )}
    </div>
  )
}

interface ShimmerLoaderProps {
  width?: string
  height?: string
  className?: string
}

export const ShimmerLoader = ({ 
  width = '100%', 
  height = '20px',
  className = ''
}: ShimmerLoaderProps) => {
  return (
    <div className={`relative overflow-hidden bg-gray-200 rounded ${className}`} style={{ width, height }}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

