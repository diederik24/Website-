'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'

interface TouchOptimizedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export const TouchOptimizedButton = ({ 
  children, 
  onClick, 
  className = '',
  disabled = false
}: TouchOptimizedButtonProps) => {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <motion.button
      className={`touch-manipulation select-none ${className}`}
      onClick={onClick}
      disabled={disabled}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      whileTap={{ scale: 0.95 }}
      animate={{ scale: isPressed ? 0.95 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  )
}

interface SwipeableCardProps {
  children: React.ReactNode
  className?: string
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  threshold?: number
}

export const SwipeableCard = ({ 
  children, 
  className = '',
  onSwipeLeft,
  onSwipeRight,
  threshold = 100
}: SwipeableCardProps) => {
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const handleDrag = (event: any, info: any) => {
    setDragX(info.offset.x)
  }

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false)
    
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0 && onSwipeRight) {
        onSwipeRight()
      } else if (info.offset.x < 0 && onSwipeLeft) {
        onSwipeLeft()
      }
    }
    
    setDragX(0)
  }

  return (
    <motion.div
      className={`touch-manipulation ${className}`}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDrag={handleDrag}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      animate={{ x: dragX }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const MobileMenu = ({ isOpen, onClose, children }: MobileMenuProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <motion.div
      className="fixed inset-0 z-50 md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
      />
      
      {/* Menu Panel */}
      <motion.div
        className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl border-l border-gray-200"
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

interface ParallaxMobileProps {
  children: React.ReactNode
  className?: string
  speed?: number
  mobileSpeed?: number
}

export const ParallaxMobile = ({ 
  children, 
  className = '',
  speed = 0.5,
  mobileSpeed = 0.3
}: ParallaxMobileProps) => {
  const { scrollYProgress } = useScroll()
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -100 * (isMobile ? mobileSpeed : speed)]
  )

  return (
    <motion.div
      className={className}
      style={{ y }}
    >
      {children}
    </motion.div>
  )
}

interface TouchFeedbackProps {
  children: React.ReactNode
  className?: string
  feedbackColor?: string
  feedbackDuration?: number
}

export const TouchFeedback = ({ 
  children, 
  className = '',
  feedbackColor = 'rgba(236, 72, 153, 0.1)',
  feedbackDuration = 200
}: TouchFeedbackProps) => {
  const [isTouched, setIsTouched] = useState(false)

  const handleTouchStart = () => {
    setIsTouched(true)
    setTimeout(() => setIsTouched(false), feedbackDuration)
  }

  return (
    <motion.div
      className={`touch-manipulation ${className}`}
      onTouchStart={handleTouchStart}
      onMouseDown={handleTouchStart}
      animate={{
        backgroundColor: isTouched ? feedbackColor : 'transparent'
      }}
      transition={{ duration: feedbackDuration / 1000 }}
    >
      {children}
    </motion.div>
  )
}

interface MobileOptimizedImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  sizes?: string
}

export const MobileOptimizedImage = ({ 
  src, 
  alt, 
  className = '',
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
}: MobileOptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !isError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
        initial={{ scale: 1.1 }}
        animate={{ scale: isLoaded ? 1 : 1.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
      />
      
      {isError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Afbeelding kon niet worden geladen</span>
        </div>
      )}
    </div>
  )
}

interface MobileGestureHandlerProps {
  children: React.ReactNode
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  threshold?: number
  className?: string
}

export const MobileGestureHandler = ({
  children,
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  className = ''
}: MobileGestureHandlerProps) => {
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [endPos, setEndPos] = useState({ x: 0, y: 0 })

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    setStartPos({ x: touch.clientX, y: touch.clientY })
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0]
    setEndPos({ x: touch.clientX, y: touch.clientY })
    
    const deltaX = endPos.x - startPos.x
    const deltaY = endPos.y - startPos.y
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight()
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft()
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > threshold) {
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown()
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp()
        }
      }
    }
  }

  return (
    <div
      className={`touch-manipulation ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  )
}

