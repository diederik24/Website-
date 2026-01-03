'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail } from 'lucide-react'
import Image from 'next/image'

export default function VacationNotice() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if current date is within the vacation period (9-24 January)
    const now = new Date()
    const currentYear = now.getFullYear()
    const startDate = new Date(currentYear, 0, 9) // 9 January
    const endDate = new Date(currentYear, 0, 24, 23, 59, 59) // 24 January end of day

    // If current date is before 9 January or after 24 January, don't show popup
    if (now < startDate || now > endDate) {
      return
    }

    // Check if user has already dismissed the notice
    const dismissed = localStorage.getItem('vacation-notice-dismissed')
    if (!dismissed) {
      // Show popup after a short delay for better UX
      setTimeout(() => {
        setIsVisible(true)
      }, 1000)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    // Remember that user dismissed the notice for this session
    localStorage.setItem('vacation-notice-dismissed', 'true')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            {/* Modal - Two Column Layout */}
            <motion.div
              className="bg-white rounded-lg shadow-2xl max-w-4xl w-full relative overflow-hidden flex flex-col md:flex-row"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                aria-label="Sluiten"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Left Section - Text Content */}
              <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Niet Bereikbaar
                  </h2>
                  <p className="text-xl text-gray-600 mb-6">
                    Wij zijn telefonisch niet bereikbaar tussen
                  </p>
                  <p className="text-3xl md:text-4xl font-bold text-pink-600 mb-8">
                    9 - 24 Januari
                  </p>
                </div>
                
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Voor dringende vragen kunt u altijd een e-mail sturen
                  </p>
                  <button
                    onClick={handleClose}
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Begrepen
                  </button>
                </div>
              </div>

              {/* Right Section - Image */}
              <div className="flex-1 relative bg-gray-100 min-h-[300px] md:min-h-[400px]">
                <Image
                  src="/google-photos/Mooie foto.png"
                  alt="Manege Duikse Hoef - Vakantie"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Optional overlay for better text readability if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

