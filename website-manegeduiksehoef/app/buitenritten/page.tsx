'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Clock, Users, Shield, Star, Calendar, MapPin, Mail, CheckCircle, AlertTriangle, Coffee, Utensils, ChevronLeft, ChevronRight, X, Timer } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function BuitenrittenPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [showSafetyModal, setShowSafetyModal] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState({ day: 0, month: 0, year: 0, type: 'buitenrit' })
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    persons: '',
    arrangement: false,
    experienceDetails: '',
    notes: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const months = [
    'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
    'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'
  ]

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const isSunday = (day: number, month: number, year: number) => {
    return new Date(year, month, day).getDay() === 0
  }

  const isArrangement = (day: number, month: number) => {
    const arrangementDays = [
      { month: 11, day: 29 }, // December 29
      { month: 0, day: 19 },  // Januari 19
    ]
    return arrangementDays.some(arr => arr.month === month && arr.day === day)
  }

  const isFutureDate = (day: number, month: number, year: number) => {
    const today = new Date()
    const selectedDate = new Date(year, month, day)
    return selectedDate > today
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleDateClick = (day: number, isArrangement: boolean) => {
    // Alleen toekomstige datums toestaan
    if (!isFutureDate(day, currentMonth, currentYear)) {
      return
    }
    
    setSelectedDate({
      day,
      month: currentMonth,
      year: currentYear,
      type: isArrangement ? 'arrangement' : 'buitenrit'
    })
    setShowBookingModal(true)
    setIsSubmitted(false)
  }

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      const offset = 120 // Account for navbar height
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/buitenrit-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...bookingData, selectedDate }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Er is een fout opgetreden')
      }
      
      setIsSubmitted(true)
      
      // Reset formulier na 5 seconden
      setTimeout(() => {
        setIsSubmitted(false)
        setBookingData({
          name: '',
          email: '',
          phone: '',
          experience: '',
          persons: '',
          arrangement: false,
          experienceDetails: '',
          notes: ''
        })
        setShowBookingModal(false)
      }, 5000)
      
    } catch (error) {
      console.error('Form submission error:', error)
      alert(error instanceof Error ? error.message : 'Er is een onverwachte fout opgetreden')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    })
  }

  // Afteltimer voor volgende buitenrit
  useEffect(() => {
    const getNextSunday = () => {
      const now = new Date()
      const currentDay = now.getDay()
      const daysUntilSunday = currentDay === 0 ? 7 : 7 - currentDay // Als het vandaag zondag is, volgende week
      
      const nextSunday = new Date(now)
      nextSunday.setDate(now.getDate() + daysUntilSunday)
      nextSunday.setHours(10, 0, 0, 0) // 10:00 uur
      
      return nextSunday
    }

    const updateTimer = () => {
      const nextSunday = getNextSunday()
      const now = new Date()
      const difference = nextSunday.getTime() - now.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/buitenritten-banner.jpg"
            alt="Buitenritten in de natuur"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay with beautiful roze filter like home page */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-900/50 via-purple-800/40 to-indigo-900/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 z-5">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() * 30 - 15, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-6"
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <MapPin className="w-12 h-12 text-yellow-400" />
              <h1 className="text-5xl md:text-6xl font-bold">
                Zondagse <span className="text-yellow-400">Buitenritten</span>
              </h1>
              <Star className="w-12 h-12 text-yellow-400" />
            </motion.div>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Ontdek de prachtige bossen rondom Loon op Zand tijdens onze begeleide buitenritten
            </p>
          </motion.div>
        </div>
      </section>


      {/* Quick Navigation */}
      <section className="py-8 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={() => scrollToSection('info-cards')}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Users className="w-4 h-4" />
              Informatie
            </motion.button>
            
            <motion.button
              onClick={() => scrollToSection('tarieven')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Star className="w-4 h-4" />
              Tarieven
            </motion.button>
            
            <motion.button
              onClick={() => scrollToSection('veiligheid')}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Shield className="w-4 h-4" />
              Veiligheid
            </motion.button>
            
            <motion.button
              onClick={() => scrollToSection('kalender')}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-4 h-4" />
              Buitenrit Boeken
            </motion.button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Info Cards */}
          <div id="info-cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Basic Info */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Zondagse Ritten</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Manege Duikse Hoef organiseert bijna het hele jaar buitenritten, er zijn vaste ritten van 1,5 uur bij voldoende aanmelding.
              </p>
            </motion.div>

            {/* Begeleiding */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Professionele Begeleiding</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Buitenritten zijn altijd onder begeleiding van een gediplomeerde instructeur. Veiligheid staat voorop!
              </p>
            </motion.div>

            {/* Arrangement */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 md:col-span-2 lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Utensils className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Met Arrangement</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Een buitenrit met arrangement is mogelijk bij Manege Duiksehoef. Koffie, buitenrit en een lekkere lunch!
              </p>
            </motion.div>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Begeleiding Details */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-600" />
                Begeleiding & Veiligheid
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Buitenritten zijn altijd onder begeleiding van een gediplomeerde instructeur</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Het dragen van een veiligheidscap en rijlaarzen of joppers met chaps is verplicht</p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Rijkleding is niet op de manege te verkrijgen</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">U dient rijervaring te hebben om mee te rijden met een buitenrit</p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">U dient minimaal 15 minuten voor aanvang aanwezig te zijn</p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Minimale leeftijd is 13 jaar om deel te nemen</p>
                </div>
              </div>
            </motion.div>

            {/* Arrangement Details */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Utensils className="w-8 h-8 text-purple-600" />
                Arrangement Programma
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold">9.15 uur</span>
                  <span className="text-gray-700">Aankomst op de manege</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <Coffee className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold">9.15 - 9.45</span>
                  <span className="text-gray-700">Koffie met iets lekkers</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold">9.45 uur</span>
                  <span className="text-gray-700">Kennismaking met de paarden</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <Star className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold">9.45 - 10.00</span>
                  <span className="text-gray-700">Poetsen en opzadelen</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">10.00 - 11.30</span>
                  <span className="text-gray-700">Heerlijk buitenrijden in de mooie bossen</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <Utensils className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold">±12.00 uur</span>
                  <span className="text-gray-700">Lunch: soep, gebakken ei, kroket met brood</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tarieven */}
          <motion.div
            id="tarieven"
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-3">
              <Star className="w-8 h-8 text-yellow-500" />
              Tarieven Buitenritten
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Gewone Buitenrit */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Buitenrit 1,5 uur</h3>
                <p className="text-gray-600 text-center mb-6">Zondag van 10.00 - 11.30 uur</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-700">Jeugd</span>
                    <span className="text-xl font-bold text-green-600">€ 47,50</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-700">Volwassene</span>
                    <span className="text-xl font-bold text-green-600">€ 47,50</span>
                  </div>
                </div>
              </div>

              {/* Buitenrit Arrangement */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Buitenrit Arrangement</h3>
                <p className="text-gray-600 text-center mb-6">Koffie, buitenrit + lekkere lunch (excl. dranken)</p>
                <div className="flex justify-center items-center p-3 bg-white rounded-lg">
                  <span className="text-2xl font-bold text-purple-600">€ 62,50</span>
                </div>
                <p className="text-sm text-gray-500 text-center mt-4">
                  * Een buitenrit gaat alleen door bij voldoende aanmeldingen
                </p>
              </div>
            </div>
          </motion.div>

          {/* Rijkleding */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Shield className="w-8 h-8 text-blue-600" />
                  Rijkleding & Veiligheid
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Verplichte Kleding:</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <p className="text-gray-700">Veiligheidscap die voldoet aan de Europese richtlijn</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <p className="text-gray-700">Rijlaarzen, of chaps of joppers</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <p className="text-gray-700">Rijbroek (voorkomt schuurplekken)</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Niet Toegestaan:</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                        <p className="text-gray-700">Sneakers of ander schoeisel</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                        <p className="text-gray-700">Te los zittende kleding</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-4 text-sm">
                      <strong>Let op:</strong> De manege heeft geen rijkleding voor u. Zorg dat u de juiste kleding meebrengt.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Small Photo */}
              <div className="flex justify-center lg:justify-end">
                <Image
                  src="/buitenrit-nature.jpg"
                  alt="Buitenritten in de natuur"
                  width={250}
                  height={200}
                  className="h-auto object-contain rounded-xl shadow-lg"
                />
              </div>
            </div>
          </motion.div>

          {/* Veiligheid */}
          <motion.div
            id="veiligheid"
            className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl shadow-xl p-8 border border-blue-200 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              Veiligheid Certificering
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 mb-4">
                  Veiligheid staat bij Manege Duikse Hoef altijd voorop. De manege is aangesloten bij 
                  <strong className="text-orange-600"> Stichting Veilige Paardensport</strong> en draagt daarom een veiligheidscertificaat.
                </p>
                <p className="text-gray-700 mb-6">
                  Dit betekent dat de accommodatie voldoet aan de officiële basiseisen voor een veilige beoefening van de paardensport.
                </p>
                <motion.button
                  onClick={() => setShowSafetyModal(true)}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-semibold flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="w-5 h-5" />
                  Bekijk Veiligheidstips
                </motion.button>
              </div>
              <div className="flex flex-col items-center justify-center">
                <motion.div
                  className="mb-4"
                  whileHover={{ scale: 1.1, rotate: 3, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/google-photos/cropped-2009logosvp_zwart-1.gif"
                    alt="Veiligheidscertificaat"
                    width={320}
                    height={320}
                    className="rounded-lg"
                  />
                </motion.div>
                <p className="text-lg text-orange-600 font-semibold">Veiligheidscertificaat</p>
              </div>
            </div>
          </motion.div>

          {/* Buitenrit Kalender */}
          <motion.div
            id="kalender"
            className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 max-w-md mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                <Calendar className="w-6 h-6 text-green-600" />
                Meld je aan voor de buitenrit
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Klik op één van de <span className="text-green-600 font-semibold">groene</span> dagen om je aan te melden
              </p>
              
              {/* Kleine Afteltimer */}
              <div className="relative rounded-lg p-3 mb-4 overflow-hidden">
                {/* Achtergrondfoto */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/google-photos/Manegeduiksehoef buitenrit.jpg"
                    alt="Manege Duikse Hoef Buitenrit"
                    fill
                    className="object-cover"
                  />
                  {/* Roze overlay voor leesbaarheid */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/60 to-rose-500/60"></div>
                </div>
                
                {/* Timer content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Timer className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-semibold">Volgende Buitenrit</span>
                  </div>
                  <div className="flex justify-center gap-2 text-white">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">
                        {timeLeft.days.toString().padStart(2, '0')}
                      </div>
                      <div className="text-xs">d</div>
                    </div>
                    <div className="text-white text-lg">:</div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">
                        {timeLeft.hours.toString().padStart(2, '0')}
                      </div>
                      <div className="text-xs">u</div>
                    </div>
                    <div className="text-white text-lg">:</div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">
                        {timeLeft.minutes.toString().padStart(2, '0')}
                      </div>
                      <div className="text-xs">m</div>
                    </div>
                    <div className="text-white text-lg">:</div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">
                        {timeLeft.seconds.toString().padStart(2, '0')}
                      </div>
                      <div className="text-xs">s</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Maand Navigator */}
            <div className="flex items-center justify-between mb-4">
              <motion.button
                onClick={prevMonth}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </motion.button>
              
              <h3 className="text-lg font-bold text-gray-900">
                {months[currentMonth]} {currentYear}
              </h3>
              
              <motion.button
                onClick={nextMonth}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>

            {/* Weekdagen Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-gray-600 py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Kalender Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Lege dagen voor begin van maand */}
              {[...Array(getFirstDayOfMonth(currentMonth, currentYear) === 0 ? 6 : getFirstDayOfMonth(currentMonth, currentYear) - 1)].map((_, i) => (
                <div key={`empty-${i}`} className="h-8"></div>
              ))}
              
              {/* Kalender dagen */}
              {[...Array(getDaysInMonth(currentMonth, currentYear))].map((_, i) => {
                const day = i + 1
                const isSundayDay = isSunday(day, currentMonth, currentYear)
                const isArrangementDay = isArrangement(day, currentMonth)
                const isFuture = isFutureDate(day, currentMonth, currentYear)
                
                if (isSundayDay) {
                  if (isFuture) {
                    // Toekomstige zondag - klikbaar
                    return (
                      <motion.div
                        key={day}
                        onClick={() => handleDateClick(day, isArrangementDay)}
                        className={`h-8 bg-white border-2 rounded flex items-center justify-center cursor-pointer hover:bg-green-50 transition-all duration-300 relative text-xs ${
                          isArrangementDay 
                            ? 'border-purple-300 hover:bg-purple-50' 
                            : 'border-green-300 hover:bg-green-50'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={`font-bold ${isArrangementDay ? 'text-purple-600' : 'text-green-600'}`}>
                          {day}
                        </div>
                        {isArrangementDay && (
                          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-purple-500 rounded-full"></div>
                        )}
                      </motion.div>
                    )
                  } else {
                    // Verleden zondag - niet klikbaar, grijs
                    return (
                      <div key={day} className="h-8 bg-gray-200 border-2 border-gray-300 rounded flex items-center justify-center relative text-xs">
                        <div className="font-bold text-gray-500">{day}</div>
                        {isArrangementDay && (
                          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-gray-400 rounded-full"></div>
                        )}
                      </div>
                    )
                  }
                } else {
                  return (
                    <div key={day} className="h-8 bg-gray-100 rounded flex items-center justify-center">
                      <div className="text-xs font-medium text-gray-400">{day}</div>
                    </div>
                  )
                }
              })}
            </div>


            {/* Info tekst */}
            <div className="text-center mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">
                <strong>Let op:</strong> Buitenritten gaan alleen door bij voldoende aanmeldingen. Je kunt je alleen aanmelden voor toekomstige datums.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Safety Tips Modal */}
      <AnimatePresence>
        {showSafetyModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSafetyModal(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Shield className="w-8 h-8" />
                    Tips van Stichting Veilige Paardensport
                  </h2>
                  <button
                    onClick={() => setShowSafetyModal(false)}
                    className="text-white hover:text-orange-200 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Drie Natuurlijke Eigenschappen */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Drie Natuurlijke Eigenschappen van het Paard</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                      <h4 className="font-semibold text-red-800 mb-2">Vluchtdier</h4>
                      <p className="text-red-700">Als een paard schrikt, is vluchten zijn eerste reactie. Hij houdt geen rekening met zijn omgeving.</p>
                    </div>
                    
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Kuddedier</h4>
                      <p className="text-blue-700">Paarden blijven het liefst bij elkaar. Als een groepsgenoot vlucht, rent een paard mee.</p>
                    </div>
                    
                    <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Gewoontedier</h4>
                      <p className="text-green-700">Paarden hebben een goed geheugen. Als ze ergens van schrikken, vergeten ze dat niet snel.</p>
                    </div>
                  </div>
                </div>

                {/* Belangrijke Veiligheidstips */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Belangrijke Veiligheidstips</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Draag altijd een cap die voldoet aan de veiligheidsnorm</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Draag geschikte aansluitende kleding, geen loshangende sjaals</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Draag rijlaarzen of schoenen met gladde zool en hak</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Maak altijd je beugels op maat</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Volg de aanwijzingen van de instructeur op</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Benader een paard altijd schuin van voren</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Loop nooit vlak achter een paard langs</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Loop altijd links naast je paard</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Draag op stal altijd dichte schoenen</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Neem de tijd wanneer je met een paard bezig bent</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Het Zicht van een Paard */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Het Zicht van een Paard</h3>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                    <p className="text-yellow-800 mb-2">
                      Paarden hebben een ander gezichtsvermogen dan wij. Hun ogen zitten aan de zijkant van het hoofd, 
                      waardoor ze bijna 360 graden om zich heen kunnen kijken, maar ze hebben een blinde vlek pal voor en achter zich.
                    </p>
                    <p className="text-yellow-800 font-semibold">
                      Belangrijk: Benader een paard altijd schuin van voren, zodat hij je goed ziet. 
                      Iets wat het paard met zijn linkeroog gezien heeft, ziet er voor zijn rechteroog heel anders uit.
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 p-6 rounded-b-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src="/google-photos/cropped-2009logosvp_zwart-1.gif"
                    alt="Veiligheidscertificaat"
                    width={60}
                    height={60}
                    className="rounded-lg"
                  />
                  <div>
                    <p className="text-sm text-gray-600">Meer informatie op:</p>
                    <a 
                      href="https://www.veiligpaardrijden.nl" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:text-orange-700 font-semibold"
                    >
                      www.veiligpaardrijden.nl
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => setShowSafetyModal(false)}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
                >
                  Sluiten
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-6 pt-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBookingModal(false)}
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
                    Je aanmelding voor de {selectedDate.type} op {selectedDate.day} {months[selectedDate.month]} {selectedDate.year} is succesvol verzonden.
                    We nemen zo snel mogelijk contact met je op!
                  </p>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold"
                  >
                    Sluiten
                  </button>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold">
                          {selectedDate.type === 'arrangement' ? 'Arrangement' : 'Buitenrit'} Aanmelding
                        </h2>
                        <div className="flex items-center gap-4 text-green-100 mt-2">
                          <Calendar className="w-5 h-5" />
                          <span className="font-semibold">{selectedDate.day} {months[selectedDate.month]} {selectedDate.year}</span>
                          <span>•</span>
                          <span className="font-semibold">
                            {selectedDate.type === 'arrangement' ? '09:15 - 12:00' : '10:00 - 11:30'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowBookingModal(false)}
                        className="text-green-100 hover:text-white transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  {/* Form Content */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Form */}
                      <div className="lg:col-span-2">
                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                Volledige Naam *
                              </label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={bookingData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                placeholder="Je volledige naam"
                              />
                            </div>

                            <div>
                              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                E-mailadres *
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={bookingData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                placeholder="je@email.nl"
                              />
                            </div>

                            <div>
                              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                Telefoonnummer *
                              </label>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={bookingData.phone}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                placeholder="06-12345678"
                              />
                            </div>

                            <div>
                              <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 mb-2">
                                Ervaring *
                              </label>
                              <select
                                id="experience"
                                name="experience"
                                value={bookingData.experience}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                              >
                                <option value="">Selecteer je ervaring</option>
                                <option value="minimal">Minimale ervaring (basis rijvaardigheid)</option>
                                <option value="some">Enige ervaring (1-2 jaar)</option>
                                <option value="experienced">Ervaren (2+ jaar)</option>
                              </select>
                            </div>

                            <div>
                              <label htmlFor="persons" className="block text-sm font-semibold text-gray-700 mb-2">
                                Aantal personen *
                              </label>
                              <select
                                id="persons"
                                name="persons"
                                value={bookingData.persons}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                              >
                                <option value="">Selecteer aantal personen</option>
                                <option value="1">1 persoon</option>
                                <option value="2">2 personen</option>
                                <option value="3">3 personen</option>
                                <option value="4">4 personen</option>
                                <option value="5">5 personen</option>
                                <option value="6">6 personen</option>
                                <option value="7">7 personen</option>
                                <option value="8">8 personen</option>
                              </select>
                            </div>
                          </div>

                          {/* Arrangement Checkbox */}
                          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <input
                                type="checkbox"
                                id="arrangement"
                                name="arrangement"
                                checked={bookingData.arrangement}
                                onChange={(e) => setBookingData({...bookingData, arrangement: e.target.checked})}
                                className="mt-1 w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                              />
                              <div>
                                <label htmlFor="arrangement" className="text-sm font-semibold text-purple-900 cursor-pointer">
                                  Upgrade naar Arrangement (+€15,00)
                                </label>
                                <p className="text-sm text-purple-700 mt-1">
                                  Inclusief koffie, buitenrit en lekkere lunch (excl. dranken)
                                </p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label htmlFor="experienceDetails" className="block text-sm font-semibold text-gray-700 mb-2">
                              Vertel ons over je ervaring
                            </label>
                            <textarea
                              id="experienceDetails"
                              name="experienceDetails"
                              value={bookingData.experienceDetails || ''}
                              onChange={handleInputChange}
                              rows={3}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                              placeholder="Vertel ons over je rijervaring, welke paarden je hebt gereden, hoe lang je al rijdt, etc. Dit helpt ons om de beste paard voor je te kiezen."
                            />
                          </div>

                          <div>
                            <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
                              Opmerkingen
                            </label>
                            <textarea
                              id="notes"
                              name="notes"
                              value={bookingData.notes}
                              onChange={handleInputChange}
                              rows={3}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                              placeholder="Heb je speciale wensen, allergieën of andere opmerkingen?"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <CheckCircle className="w-6 h-6" />
                            Meld Je Aan
                          </button>
                        </form>
                      </div>

                      {/* Info Box */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-pink-600" />
                          Rit Informatie
                        </h3>
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                            <Clock className="w-5 h-5 text-blue-600" />
                            <div>
                              <div className="font-semibold text-gray-900">
                                {selectedDate.type === 'arrangement' ? '09:15 - 12:00' : '10:00 - 11:30'}
                              </div>
                              <div className="text-sm text-gray-600">Tijd</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                            <span className="text-xl font-bold text-green-600">
                              {selectedDate.type === 'arrangement' ? '€62,50' : '€47,50'}
                            </span>
                            <div>
                              <div className="font-semibold text-gray-900">per persoon</div>
                              <div className="text-sm text-gray-600">Prijs</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                            <Users className="w-5 h-5 text-purple-600" />
                            <div>
                              <div className="font-semibold text-gray-900">Maximaal 8</div>
                              <div className="text-sm text-gray-600">personen per rit</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <Clock className="w-5 h-5 text-yellow-600" />
                            <div>
                              <div className="font-semibold text-yellow-800">15 minuten</div>
                              <div className="text-sm text-yellow-700">van tevoren aanwezig</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
