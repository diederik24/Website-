'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  distance?: number
}

export const ScrollAnimation = ({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 0.6,
  direction = 'up',
  distance = 50
}: ScrollAnimationProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance, opacity: 0 }
      case 'down': return { y: -distance, opacity: 0 }
      case 'left': return { x: distance, opacity: 0 }
      case 'right': return { x: -distance, opacity: 0 }
      case 'fade': return { opacity: 0 }
      default: return { y: distance, opacity: 0 }
    }
  }

  const getAnimatePosition = () => {
    switch (direction) {
      case 'up': return { y: 0, opacity: 1 }
      case 'down': return { y: 0, opacity: 1 }
      case 'left': return { x: 0, opacity: 1 }
      case 'right': return { x: 0, opacity: 1 }
      case 'fade': return { opacity: 1 }
      default: return { y: 0, opacity: 1 }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialPosition()}
      animate={isInView ? getAnimatePosition() : getInitialPosition()}
      transition={{ 
        duration, 
        delay, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }}
    >
      {children}
    </motion.div>
  )
}

interface ParallaxScrollProps {
  children: React.ReactNode
  className?: string
  speed?: number
}

export const ParallaxScroll = ({ 
  children, 
  className = '', 
  speed = 0.5 
}: ParallaxScrollProps) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerAnimationProps {
  children: React.ReactNode[]
  className?: string
  staggerDelay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  distance?: number
}

export const StaggerAnimation = ({ 
  children, 
  className = '', 
  staggerDelay = 0.1,
  direction = 'up',
  distance = 30
}: StaggerAnimationProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance, opacity: 0 }
      case 'down': return { y: -distance, opacity: 0 }
      case 'left': return { x: distance, opacity: 0 }
      case 'right': return { x: -distance, opacity: 0 }
      case 'fade': return { opacity: 0 }
      default: return { y: distance, opacity: 0 }
    }
  }

  const getAnimatePosition = () => {
    switch (direction) {
      case 'up': return { y: 0, opacity: 1 }
      case 'down': return { y: 0, opacity: 1 }
      case 'left': return { x: 0, opacity: 1 }
      case 'right': return { x: 0, opacity: 1 }
      case 'fade': return { opacity: 1 }
      default: return { y: 0, opacity: 1 }
    }
  }

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={getInitialPosition()}
          animate={isInView ? getAnimatePosition() : getInitialPosition()}
          transition={{ 
            duration: 0.6, 
            delay: index * staggerDelay, 
            ease: "easeOut",
            type: "spring",
            stiffness: 100
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

interface RevealAnimationProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'left' | 'right' | 'up' | 'down'
}

export const RevealAnimation = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up'
}: RevealAnimationProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const getInitialPosition = () => {
    switch (direction) {
      case 'left': return { x: -100, opacity: 0 }
      case 'right': return { x: 100, opacity: 0 }
      case 'up': return { y: 100, opacity: 0 }
      case 'down': return { y: -100, opacity: 0 }
      default: return { y: 100, opacity: 0 }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialPosition()}
      animate={isInView ? { x: 0, y: 0, opacity: 1 } : getInitialPosition()}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  )
}

