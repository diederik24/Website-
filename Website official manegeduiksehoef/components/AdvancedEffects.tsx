'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

interface ParticleSystemProps {
  count?: number
  className?: string
  colors?: string[]
  speed?: number
}

export const ParticleSystem = ({ 
  count = 50, 
  className = '',
  colors = ['#ec4899', '#8b5cf6', '#f59e0b'],
  speed = 1
}: ParticleSystemProps) => {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    vx: number
    vy: number
    size: number
    color: string
    opacity: number
  }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: Math.random() * 4 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.8 + 0.2
    }))
    setParticles(newParticles)
  }, [count, colors, speed])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity
          }}
          animate={{
            x: [0, particle.vx * 100, 0],
            y: [0, particle.vy * 100, 0],
            scale: [1, 1.2, 1],
            opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity]
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  )
}

interface MorphingShapeProps {
  className?: string
  colors?: string[]
  size?: number
}

export const MorphingShape = ({ 
  className = '',
  colors = ['#ec4899', '#8b5cf6'],
  size = 200
}: MorphingShapeProps) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`,
        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'
      }}
      animate={{
        borderRadius: [
          '30% 70% 70% 30% / 30% 30% 70% 70%',
          '70% 30% 30% 70% / 70% 70% 30% 30%',
          '30% 70% 70% 30% / 30% 30% 70% 70%'
        ],
        rotate: [0, 180, 360],
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

interface GlitchTextProps {
  children: React.ReactNode
  className?: string
  glitchIntensity?: number
}

export const GlitchText = ({ 
  children, 
  className = '',
  glitchIntensity = 0.1
}: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < glitchIntensity) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 200)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [glitchIntensity])

  return (
    <motion.div
      className={`relative ${className}`}
      animate={isGlitching ? {
        x: [0, -2, 2, -2, 0],
        y: [0, 1, -1, 1, 0],
        skewX: [0, 2, -2, 0]
      } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
      {isGlitching && (
        <>
          <motion.div
            className="absolute inset-0 text-red-500 opacity-50"
            animate={{ x: [0, 2, 0] }}
            transition={{ duration: 0.1 }}
          >
            {children}
          </motion.div>
          <motion.div
            className="absolute inset-0 text-blue-500 opacity-50"
            animate={{ x: [0, -2, 0] }}
            transition={{ duration: 0.1 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </motion.div>
  )
}

interface LiquidButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  color?: string
}

export const LiquidButton = ({ 
  children, 
  onClick, 
  className = '',
  color = '#ec4899'
}: LiquidButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <motion.button
      className={`relative overflow-hidden rounded-2xl font-bold text-white ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        background: `linear-gradient(135deg, ${color}, ${color}dd)`
      }}
    >
      {/* Liquid effect */}
      <motion.div
        className="absolute inset-0 opacity-0"
        animate={{
          opacity: isHovered ? 0.3 : 0,
          scale: isHovered ? 1.2 : 0.8
        }}
        style={{
          background: `radial-gradient(circle at ${springX}px ${springY}px, rgba(255,255,255,0.3) 0%, transparent 50%)`
        }}
      />
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.button>
  )
}

interface HolographicCardProps {
  children: React.ReactNode
  className?: string
  intensity?: number
}

export const HolographicCard = ({ 
  children, 
  className = '',
  intensity = 0.5
}: HolographicCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      setMousePosition({ x, y })
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-3xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0.5, y: 0.5 })}
      whileHover={{ scale: 1.02 }}
      style={{
        background: `
          linear-gradient(135deg, 
            hsl(${mousePosition.x * 360}, 70%, 60%) 0%,
            hsl(${mousePosition.y * 360}, 70%, 60%) 50%,
            hsl(${(mousePosition.x + mousePosition.y) * 180}, 70%, 60%) 100%
          )
        `,
        boxShadow: `
          0 0 20px hsl(${mousePosition.x * 360}, 70%, 50%),
          0 0 40px hsl(${mousePosition.y * 360}, 70%, 50%),
          0 0 60px hsl(${(mousePosition.x + mousePosition.y) * 180}, 70%, 50%)
        `
      }}
    >
      {/* Holographic overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            linear-gradient(45deg, 
              transparent 30%, 
              rgba(255,255,255,0.3) 50%, 
              transparent 70%
            )
          `,
          transform: `rotate(${mousePosition.x * 360}deg)`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 p-8">
        {children}
      </div>
    </motion.div>
  )
}

interface NeonGlowProps {
  children: React.ReactNode
  className?: string
  color?: string
  intensity?: number
}

export const NeonGlow = ({ 
  children, 
  className = '',
  color = '#ec4899',
  intensity = 1
}: NeonGlowProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        textShadow: [
          `0 0 5px ${color}`,
          `0 0 10px ${color}`,
          `0 0 15px ${color}`,
          `0 0 20px ${color}`,
          `0 0 15px ${color}`,
          `0 0 10px ${color}`,
          `0 0 5px ${color}`
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

interface MatrixRainProps {
  className?: string
  characters?: string
  speed?: number
  density?: number
}

export const MatrixRain = ({ 
  className = '',
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()',
  speed = 1,
  density = 0.02
}: MatrixRainProps) => {
  const [columns, setColumns] = useState<Array<{
    x: number
    y: number
    chars: string[]
  }>>([])

  useEffect(() => {
    const newColumns = []
    for (let i = 0; i < window.innerWidth * density; i++) {
      newColumns.push({
        x: (i / density) * 20,
        y: Math.random() * -100,
        chars: Array.from({ length: 20 }, () => 
          characters[Math.floor(Math.random() * characters.length)]
        )
      })
    }
    setColumns(newColumns)
  }, [characters, density])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {columns.map((column, index) => (
        <motion.div
          key={index}
          className="absolute text-green-400 font-mono text-sm opacity-70"
          style={{ left: column.x }}
          animate={{
            y: [column.y, window.innerHeight + 100]
          }}
          transition={{
            duration: 10 / speed,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
        >
          {column.chars.map((char, charIndex) => (
            <div
              key={charIndex}
              style={{
                opacity: charIndex === 0 ? 1 : 0.3,
                color: charIndex === 0 ? '#00ff00' : '#008800'
              }}
            >
              {char}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  )
}

