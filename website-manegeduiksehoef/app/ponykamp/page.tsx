'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, Users, Heart, Star, CheckCircle, ArrowRight, Sparkles, Camera, Utensils, Home, Shield, Zap, Palette, Flame, Gift, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AnimatedButton from '@/components/AnimatedButton'
import Footer from '@/components/Footer'
import { FloatingElement } from '@/components/InteractiveElements'

// Aftelklok Component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Volgende ponykamp: 13-15 oktober 2025
    const targetDate = new Date('2025-10-13T09:00:00').getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="rounded-xl p-6 shadow-lg border border-pink-300 bg-white">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-pink-600 mb-1">Ponykamp Najaar 2025</h3>
        <p className="text-sm text-pink-500">13-15 Oktober 2025</p>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Dagen', value: timeLeft.days },
          { label: 'Uren', value: timeLeft.hours },
          { label: 'Min', value: timeLeft.minutes },
          { label: 'Sec', value: timeLeft.seconds }
        ].map((item, index) => (
          <motion.div
            key={item.label}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="rounded-lg p-3 shadow-sm border border-pink-200 bg-white">
              <div className="text-2xl font-bold text-pink-600 mb-1">
                {item.value.toString().padStart(2, '0')}
              </div>
              <div className="text-xs font-medium text-pink-500">
                {item.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function PonykampPage() {
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [formData, setFormData] = useState({
    childName: '',
    childAge: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    emergencyContact: '',
    allergies: '',
    medications: '',
    experience: '',
    notes: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/ponykamp-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Er is een fout opgetreden')
      }
      
      setIsSubmitted(true)
      
      // Reset formulier na 5 seconden
      setTimeout(() => {
        setIsSubmitted(false)
        setShowSignupModal(false)
        setFormData({
          childName: '',
          childAge: '',
          parentName: '',
          parentEmail: '',
          parentPhone: '',
          emergencyContact: '',
          allergies: '',
          medications: '',
          experience: '',
          notes: ''
        })
      }, 5000)
      
    } catch (error) {
      console.error('Form submission error:', error)
      alert(error instanceof Error ? error.message : 'Er is een onverwachte fout opgetreden')
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/google-photos/ponykamp-banner.jpg"
            alt="Ponykamp bij Manege Duikse Hoef"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-pink-500/20"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-block"
            >
              <Image
                src="/logo.png"
                alt="Manege Duikse Hoef"
                width={400}
                height={160}
                className="mx-auto filter drop-shadow-2xl brightness-0 invert"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
              />
            </motion.div>
            
          </motion.div>
        </div>

        
      </section>

      {/* Aftelklok Section */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#f4e9d9' }}>
        {/* Herfst Background Elements - Echte Partikels */}
        <div className="absolute inset-0">
          {/* Eikels */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`acorn-countdown-${i}`}
              className="absolute opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() * 30 - 15, 0],
                rotate: [0, 360, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 12 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut",
                type: "tween",
              }}
            >
              <Image
                src="/Eikel partikel.png"
                alt="Eikel partikel"
                width={64}
                height={64}
                className="drop-shadow-sm"
              />
            </motion.div>
          ))}
          
          {/* Bladeren */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`leaf-countdown-${i}`}
              className="absolute opacity-50"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, 50, 0],
                x: [0, Math.random() * 40 - 20, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
                type: "tween",
              }}
            >
              <Image
                src="/Blad partikel.png"
                alt="Blad partikel"
                width={80}
                height={80}
                className="drop-shadow-sm"
              />
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <CountdownTimer />
          </motion.div>
        </div>
      </section>

      {/* Logo Sectie */}
      <section className="py-4 relative overflow-hidden" style={{ backgroundColor: '#f4e9d9' }}>
        {/* Herfst Background Elements - Echte Partikels */}
        <div className="absolute inset-0">
          {/* Eikels */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`acorn-logo-${i}`}
              className="absolute opacity-50"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -25, 0],
                x: [0, Math.random() * 20 - 10, 0],
                rotate: [0, 360, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
                type: "tween",
              }}
            >
              <Image
                src="/Eikel partikel.png"
                alt="Eikel partikel"
                width={48}
                height={48}
                className="drop-shadow-sm"
              />
            </motion.div>
          ))}
          
          {/* Bladeren */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`leaf-logo-${i}`}
              className="absolute opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, 30, 0],
                x: [0, Math.random() * 25 - 12, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 6 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
                type: "tween",
              }}
            >
              <Image
                src="/Blad partikel.png"
                alt="Blad partikel"
                width={28}
                height={28}
                className="drop-shadow-sm"
              />
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <Image
                src="/Ponykamp najaar 2025.png"
                alt="Ponykamp Najaar 2025 Logo"
                width={500}
                height={250}
                className="drop-shadow-lg"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Activiteiten en Prijs Sectie */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#f4e9d9' }}>
        {/* Herfst Background Elements - Echte Partikels */}
        <div className="absolute inset-0">
          {/* Eikels */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`acorn-${i}`}
              className="absolute opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                x: [0, Math.random() * 40 - 20, 0],
                rotate: [0, 360, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 15 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 6,
                ease: "easeInOut",
                type: "tween",
              }}
            >
              <Image
                src="/Eikel partikel.png"
                alt="Eikel partikel"
                width={40}
                height={40}
                className="drop-shadow-lg"
              />
            </motion.div>
          ))}
          
          {/* Bladeren */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`leaf-${i}`}
              className="absolute opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, 60, 0],
                x: [0, Math.random() * 50 - 25, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.25, 1],
              }}
              transition={{
                duration: 12 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
                type: "tween",
              }}
            >
              <Image
                src="/Blad partikel.png"
                alt="Blad partikel"
                width={48}
                height={48}
                className="drop-shadow-lg"
              />
            </motion.div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-amber-600">Wat Gaan We Doen?</span>
            </h2>
            <div className="backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-200 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div className="space-y-6">
                  <motion.div
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-16 h-16 flex items-center justify-center p-2">
                      <Image
                        src="/Paardrijden.png"
                        alt="Paardrijden"
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-pink-600 text-lg">Elke dag rijden op onze lieve pony's en paarden</span>
                  </motion.div>
                  
                  <motion.div
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-16 h-16 flex items-center justify-center p-2">
                      <Image
                        src="/Spelletjes.png"
                        alt="Spelletjes"
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-pink-600 text-lg">Leuke spelletjes, knutselactiviteiten en uitdagingen</span>
                  </motion.div>
                </div>
                
                <div className="space-y-6">
                  <motion.div
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-16 h-16 flex items-center justify-center p-2">
                      <Image
                        src="/MArsmallow.png"
                        alt="Marshmallow"
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-pink-600 text-lg">Kampvuuravonden met marshmallows en verhalen</span>
                  </motion.div>
                  
                  <motion.div
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-16 h-16 flex items-center justify-center p-2">
                      <Image
                        src="/Verrasing.png"
                        alt="Verrassing"
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-pink-600 text-lg">Verrassingen, nieuwe vriendjes en heel veel plezier!</span>
                  </motion.div>
                </div>
              </div>
              
              <motion.div
                className="mt-12 p-8 bg-white rounded-xl border border-pink-300 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-pink-600 mb-6">Prijzen & Aanmelding</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-pink-600">€175,-</span>
                    <p className="text-pink-500 text-lg mt-2">voor 3 dagen ponykamp</p>
                  </div>
                  
                  {/* Aanmeldknop */}
                  <motion.button
                    onClick={() => setShowSignupModal(true)}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Calendar className="w-6 h-6" />
                    Meld Je Aan Voor Ponykamp
                  </motion.button>
                  
                  <p className="text-pink-500 text-sm mt-4 max-w-md mx-auto">
                    Klik op de knop om het aanmeldformulier in te vullen. 
                    We nemen zo snel mogelijk contact met je op!
                  </p>
                </div>
              </motion.div>
              
              {/* Ponykamp Foto */}
              <motion.div
                className="mt-8 flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="relative w-64 h-48 rounded-xl overflow-hidden shadow-lg border border-pink-200">
                  <Image
                    src="/ponykamp.jpg"
                    alt="Ponykamp activiteiten"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ponykamp Aanmeldformulier Modal */}
      <AnimatePresence>
        {showSignupModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-6 pt-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSignupModal(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {isSubmitted ? (
                <div className="p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Aanmelding Gelukt!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Je aanmelding voor het ponykamp is succesvol verzonden.
                    We nemen zo snel mogelijk contact met je op!
                  </p>
                  <button
                    onClick={() => setShowSignupModal(false)}
                    className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 font-semibold"
                  >
                    Sluiten
                  </button>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold">Ponykamp Aanmelding</h2>
                        <div className="flex items-center gap-4 text-pink-100 mt-2">
                          <Calendar className="w-5 h-5" />
                          <span className="font-semibold">13-15 Oktober 2025</span>
                          <span>•</span>
                          <span className="font-semibold">€175,- voor 3 dagen</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowSignupModal(false)}
                        className="text-pink-100 hover:text-white transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  {/* Form Content */}
                  <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Kind Gegevens */}
                      <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                        <h3 className="text-lg font-bold text-pink-900 mb-4 flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          Gegevens Kind
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="childName" className="block text-sm font-semibold text-gray-700 mb-2">
                              Naam Kind *
                            </label>
                            <input
                              type="text"
                              id="childName"
                              name="childName"
                              value={formData.childName}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                              placeholder="Voornaam en achternaam"
                            />
                          </div>

                          <div>
                            <label htmlFor="childAge" className="block text-sm font-semibold text-gray-700 mb-2">
                              Leeftijd *
                            </label>
                            <select
                              id="childAge"
                              name="childAge"
                              value={formData.childAge}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                            >
                              <option value="">Selecteer leeftijd</option>
                              {Array.from({ length: 11 }, (_, i) => i + 7).map(age => (
                                <option key={age} value={age}>{age} jaar</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Ouder Gegevens */}
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                          <Heart className="w-5 h-5" />
                          Gegevens Ouder/Verzorger
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="parentName" className="block text-sm font-semibold text-gray-700 mb-2">
                              Naam Ouder/Verzorger *
                            </label>
                            <input
                              type="text"
                              id="parentName"
                              name="parentName"
                              value={formData.parentName}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                              placeholder="Voornaam en achternaam"
                            />
                          </div>

                          <div>
                            <label htmlFor="parentEmail" className="block text-sm font-semibold text-gray-700 mb-2">
                              E-mailadres *
                            </label>
                            <input
                              type="email"
                              id="parentEmail"
                              name="parentEmail"
                              value={formData.parentEmail}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                              placeholder="je@email.nl"
                            />
                          </div>

                          <div>
                            <label htmlFor="parentPhone" className="block text-sm font-semibold text-gray-700 mb-2">
                              Telefoonnummer *
                            </label>
                            <input
                              type="tel"
                              id="parentPhone"
                              name="parentPhone"
                              value={formData.parentPhone}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                              placeholder="06-12345678"
                            />
                          </div>

                          <div>
                            <label htmlFor="emergencyContact" className="block text-sm font-semibold text-gray-700 mb-2">
                              Noodcontact (optioneel)
                            </label>
                            <input
                              type="tel"
                              id="emergencyContact"
                              name="emergencyContact"
                              value={formData.emergencyContact}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                              placeholder="06-12345678"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Medische Informatie */}
                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                        <h3 className="text-lg font-bold text-yellow-900 mb-4 flex items-center gap-2">
                          <Shield className="w-5 h-5" />
                          Medische Informatie
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="allergies" className="block text-sm font-semibold text-gray-700 mb-2">
                              Allergieën (optioneel)
                            </label>
                            <input
                              type="text"
                              id="allergies"
                              name="allergies"
                              value={formData.allergies}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                              placeholder="Bijvoorbeeld: hooikoorts, voedselallergieën, etc."
                            />
                          </div>

                          <div>
                            <label htmlFor="medications" className="block text-sm font-semibold text-gray-700 mb-2">
                              Medicatie (optioneel)
                            </label>
                            <input
                              type="text"
                              id="medications"
                              name="medications"
                              value={formData.medications}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                              placeholder="Welke medicatie gebruikt je kind?"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Ervaring */}
                      <div>
                        <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 mb-2">
                          Rijervaring (optioneel)
                        </label>
                        <select
                          id="experience"
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                        >
                          <option value="">Selecteer ervaring</option>
                          <option value="geen">Geen ervaring</option>
                          <option value="beperkt">Beperkte ervaring</option>
                          <option value="redelijk">Redelijke ervaring</option>
                          <option value="veel">Veel ervaring</option>
                        </select>
                      </div>

                      {/* Opmerkingen */}
                      <div>
                        <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
                          Opmerkingen (optioneel)
                        </label>
                        <textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                          placeholder="Heb je nog andere opmerkingen of bijzonderheden die we moeten weten?"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-6 h-6" />
                        Meld Je Aan Voor Ponykamp
                      </button>
                    </form>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  )
}