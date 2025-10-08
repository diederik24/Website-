'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Star, Gift, Calendar, Users, Sparkles, Crown, Zap, Heart, ArrowDown } from 'lucide-react'

interface LessonCardProps {
  lessons: number
  price: number
  originalPrice?: number
  discount?: number
  isPopular?: boolean
  features?: string[]
}

export default function LessonCard({ 
  lessons = 10, 
  price = 180, 
  originalPrice,
  discount,
  isPopular = false,
  features = [
    "10 lessen van 60 minuten",
    "Inclusief materiaal en helm",
    "Professionele instructie",
    "Geschikt voor alle niveaus",
    "Flexibele planning"
  ]
}: LessonCardProps) {
  return (
    <motion.div
      className="relative group perspective-1000 w-full max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      {/* Glow Effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 via-rose-500 to-pink-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
      
      {/* Card Container - Wide Layout */}
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 transform-gpu">
        
        {/* Popular Badge */}
        {isPopular && (
          <motion.div
            className="absolute -top-2 -right-2 z-10"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              Populair!
            </div>
          </motion.div>
        )}

        {/* Wide Layout with Horse Photo and Content */}
        <div className="flex flex-col lg:flex-row min-h-[400px]">
          
          {/* Horse Photo Section */}
          <div className="relative lg:w-1/2 h-64 lg:h-auto overflow-hidden">
            {/* Background Image with Pink Filter */}
            <div className="absolute inset-0">
              <img 
                src="/leskaart-foto.jpg" 
                alt="Paarden van Manege Duikse Hoef" 
                className="w-full h-full object-cover lesson-card-image"
              />
              {/* Pink Filter Overlay */}
              <div className="absolute inset-0 pink-filter"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>
            
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 p-8 flex flex-col justify-between">
            
            {/* Header with Pink Price */}
            <div className="mb-6">
              <motion.h3
                className="text-3xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Leskaart
              </motion.h3>
              
              <motion.div
                className="flex items-center gap-4 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {originalPrice && (
                  <span className="text-xl text-gray-400 line-through">€{originalPrice}</span>
                )}
                <div className="flex items-baseline gap-2">
                  <motion.span 
                    className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    €{price}
                  </motion.span>
                  <span className="text-lg text-gray-500 font-medium">/10xlessen</span>
                </div>
                {discount && (
                  <motion.span 
                    className="bg-gradient-to-r from-pink-400 to-rose-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                    animate={{ 
                      boxShadow: [
                        "0 0 10px rgba(236, 72, 153, 0.3)",
                        "0 0 20px rgba(236, 72, 153, 0.5)",
                        "0 0 10px rgba(236, 72, 153, 0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    -{discount}%
                  </motion.span>
                )}
              </motion.div>
            </div>

            {/* Features List */}
            <div className="space-y-3 mb-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Scroll to Form Button */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                onClick={() => {
                  // Scroll naar de aanmeld sectie
                  const aanmeldSection = document.getElementById('aanmeldformulier')
                  if (aanmeldSection) {
                    const yOffset = -150
                    const y = aanmeldSection.getBoundingClientRect().top + window.pageYOffset + yOffset
                    window.scrollTo({ top: y, behavior: 'smooth' })
                  }
                }}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowDown className="w-5 h-5 group-hover:animate-bounce" />
                <span>Aanmelden voor Lessen</span>
                <ArrowDown className="w-5 h-5 group-hover:animate-bounce" />
              </motion.button>
            </motion.div>
            
          </div>
        </div>
      </div>
    </motion.div>
  )
}
