'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface ClientMotionProps {
  children: ReactNode
  as?: keyof JSX.IntrinsicElements
  [key: string]: any
}

export default function ClientMotion({ children, as = 'div', ...props }: ClientMotionProps) {
  const MotionComponent = motion[as as keyof typeof motion] || motion.div
  return <MotionComponent {...props}>{children}</MotionComponent>
}
