'use client'

import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import ClientMotion from './ClientMotion'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <ClientMotion
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <button
        onClick={scrollToTop}
        className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        aria-label="Terug naar boven"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </ClientMotion>
  )
}

