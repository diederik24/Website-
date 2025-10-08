'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'
import GoogleReviews from '@/components/GoogleReviews'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Phone, Mail, MapPin, Clock, Instagram, Facebook, Users, Shield, Award, Heart, Star, Sparkles, Zap, Crown, Gem, Flower2, Sun, Moon, Calendar, Camera } from 'lucide-react'

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return <span ref={ref}>{count}</span>
}

export default function Home() {
  return (
    <>
      {/* Enhanced Hero Section with Modern Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced Background Video with Overlay */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: 'brightness(0.7) contrast(1.2) saturate(1.1)',
              transform: 'scale(1.05)',
              transformOrigin: 'center',
              willChange: 'transform'
            }}
            onError={(e) => {
              console.log('Video failed to load, using fallback');
              e.currentTarget.style.display = 'none';
            }}
          >
            <source src="/background-video.mp4" type="video/mp4" />
          </video>
          
          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-pink-800/50 to-indigo-900/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>
        
        {/* Floating Background Elements */}
        <div className="absolute inset-0 z-10">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Logo Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 1, -1, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
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

      {/* Photo Gallery & Private Lesson Planner Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-6"
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <Camera className="w-10 h-10 text-blue-600" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Onze <span className="text-blue-600">Manege</span> in Beeld
              </h2>
              <Star className="w-10 h-10 text-blue-600" />
            </motion.div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bekijk onze prachtige faciliteiten en ontdek waarom zoveel paardenliefhebbers voor ons kiezen
            </p>
          </motion.div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {/* Photo 1 - Manege in Beeld */}
            <motion.div
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src="/google-photos/google-photo-3.jpg"
                  alt="Manege Duikse Hoef - Prachtige faciliteiten"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Onze Kantine</h3>
                  <p className="text-sm">Gezeligheid in onze kantine met uitzicht op onze binnen rijbak</p>
                </div>
              </div>
            </motion.div>

            {/* Photo 2 - Paarden in de Wei */}
            <motion.div
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src="/google-photos/Mooie foto.png"
                  alt="Paarden in de wei bij Manege Duikse Hoef"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Weidegang</h3>
                  <p className="text-sm">De paarden genieten van de weidegang in het weideseizoen</p>
                </div>
              </div>
            </motion.div>

            {/* Photo 3 - Binnenbak */}
            <motion.div
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src="/google-photos/Binnenbak.jpg"
                  alt="Binnenbak van Manege Duikse Hoef"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Onze Binnenbak</h3>
                  <p className="text-sm">20 x 40 meter - overdekte rijbak voor alle weersomstandigheden</p>
                </div>
              </div>
            </motion.div>

            {/* Photo 4 - Buitenbak */}
            <motion.div
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src="/google-photos/google-photo-4.jpg"
                  alt="Buitenbak van Manege Duikse Hoef"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Onze Buitenbak</h3>
                  <p className="text-sm">20 x 60 meter - altijd goed te rijden, het hele jaar door. Savonds verlicht.</p>
                </div>
              </div>
            </motion.div>

            {/* Photo 5 - Stallen */}
            <motion.div
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src="/google-photos/stallen.jpg"
                  alt="Moderne stallen van Manege Duikse Hoef"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Stallen</h3>
                  <p className="text-sm">Ruime boxen van 3x3 meter met goede ventilatie</p>
                </div>
              </div>
            </motion.div>

            {/* Photo 6 - Ovaalbaan */}
            <motion.div
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src="/google-photos/Ovaalbaan fotos.jpg"
                  alt="Ovaalbaan van Manege Duikse Hoef"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Onze Ovaalbaan</h3>
                  <p className="text-sm">Speciale baan voor IJslandse paarden - perfect voor tölt en telgang training</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Floating Elements Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-white relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-16 h-16 bg-pink-300 rounded-full opacity-30"
            animate={{
              y: [0, 15, 0],
              x: [0, -15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-400 rounded-full opacity-25"
            animate={{
              y: [0, -25, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Waarom Kiezen voor 
              <span className="text-pink-600"> Manege Duikse Hoef?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ontdek wat ons tot een bijzondere manege maakt met onze unieke aanpak en passie voor paarden
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Heart className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Passie & Liefde
              </h3>
              <p className="text-gray-600 text-center">
                Onze paarden worden behandeld met de grootste liefde en zorg. Elke dag opnieuw.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Award className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Professionele Begeleiding
              </h3>
              <p className="text-gray-600 text-center">
                Ervaren instructeurs die je helpen groeien in je ruitercarrière.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Users className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Gemeenschap
              </h3>
              <p className="text-gray-600 text-center">
                Word onderdeel van onze warme ruiterfamilie en maak vrienden voor het leven.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Paardrijlessen Sectie */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-emerald-300 rounded-full opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 10 - 5, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-6"
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <Heart className="w-10 h-10 text-pink-600" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                🐴 <span className="text-pink-600">Paardrijlessen</span>
              </h2>
              <Users className="w-10 h-10 text-pink-600" />
            </motion.div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Voor kinderen én volwassenen - persoonlijke begeleiding in een ontspannen sfeer
            </p>
          </motion.div>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Lessen voor alle leeftijden */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Voor kinderen én volwassenen</h3>
              <p className="text-gray-600 text-sm">Of je nu 8 of 80 bent, bij ons is iedereen welkom</p>
            </motion.div>

            {/* Persoonlijke begeleiding */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">💝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Persoonlijke begeleiding</h3>
              <p className="text-gray-600 text-sm">In een ontspannen sfeer, op jouw tempo</p>
            </motion.div>

            {/* Extra aandacht voor verzorging */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">🛁</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Extra aandacht voor verzorging</h3>
              <p className="text-gray-600 text-sm">Poetsen, opzadelen, hoefverzorging en meer</p>
            </motion.div>

            {/* Alles leren over paarden */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Alles leren over paarden</h3>
              <p className="text-gray-600 text-sm">Gedrag, voeding en welzijn van je paard</p>
            </motion.div>

            {/* Lieve, betrouwbare paarden */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">🐴</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lieve, betrouwbare paarden</h3>
              <p className="text-gray-600 text-sm">Zorgvuldig geselecteerd op karakter</p>
            </motion.div>

            {/* Kleine groepen */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kleinere groepen</h3>
              <p className="text-gray-600 text-sm">Zodat iedereen voldoende aandacht krijgt</p>
            </motion.div>
          </div>

          {/* Focus op plezier en vertrouwen */}
          <motion.div
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-8">
              <motion.div
                className="inline-flex items-center gap-3 mb-4"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="w-8 h-8 text-emerald-600" />
                <h3 className="text-3xl font-bold text-gray-900">Focus op plezier, vertrouwen en band</h3>
                <Heart className="w-8 h-8 text-emerald-600" />
              </motion.div>
              <p className="text-lg text-gray-600 mb-6">
                Bij ons draait het niet alleen om techniek, maar vooral om de verbinding tussen jou en je paard
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="text-4xl mb-3">😊</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Plezier</h4>
                <p className="text-sm text-gray-600">Leren moet leuk zijn - dat is onze filosofie</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl mb-3">🤝</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Vertrouwen</h4>
                <p className="text-sm text-gray-600">Opbouwen van vertrouwen tussen ruiter en paard</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl mb-3">💕</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Band</h4>
                <p className="text-sm text-gray-600">Een fijne band met je paard opbouwen</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-8">
              <Link href="/lessen">
                <motion.button
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🎯 Bekijk Alle Lessen
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Manege Duikse Hoef in Cijfers
            </h2>
            <p className="text-lg text-gray-600">
              Ontdek wat ons tot een bijzondere manege maakt
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Manegepaarden */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-pink-600 mb-2">
                <AnimatedCounter end={17} />
              </div>
              <div className="text-gray-600 font-medium">
                Manegepaarden
              </div>
            </motion.div>
            
            {/* Jaren Ervaring */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-pink-600 mb-2">
                <AnimatedCounter end={20} />+
              </div>
              <div className="text-gray-600 font-medium">
                Jaren Ervaring
              </div>
            </motion.div>
            
            {/* Tevreden Ruiters */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-pink-600 mb-2">
                <AnimatedCounter end={100} />+
              </div>
              <div className="text-gray-600 font-medium">
                Tevreden Ruiters
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Grid - Onze Diensten */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            
            {/* Lessen */}
            <motion.div 
              className="text-center group flex flex-col h-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative mb-6">
                <div className="w-full h-64 rounded-2xl overflow-hidden group-hover:shadow-xl transition-all duration-300">
                  <Image
                    src="/1020@2x.jpg"
                    alt="Manege Duikse Hoef - Paardrijlessen"
                    fill
                    className="object-cover"
                  />
                </div>
                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="w-5 h-5 text-white" />
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lessen</h3>
              <p className="text-gray-600 mb-6 flex-grow">Paardrijlessen voor kinderen en volwassenen in een ontspannen sfeer</p>
              <Link href="/lessen" className="mt-auto">
                <motion.button 
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  BEKIJK LESSEN
                </motion.button>
              </Link>
            </motion.div>

            {/* Buitenritten */}
            <motion.div 
              className="text-center group flex flex-col h-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative mb-6">
                <div className="w-full h-64 rounded-2xl overflow-hidden group-hover:shadow-xl transition-all duration-300">
                  <Image
                    src="/buitenrit-nature.jpg"
                    alt="Manege Duikse Hoef - Buitenritten"
                    fill
                    className="object-cover"
                  />
                </div>
                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Users className="w-5 h-5 text-white" />
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Buitenritten</h3>
              <p className="text-gray-600 mb-6 flex-grow">Geniet van prachtige buitenritten door het bos en de natuur</p>
              <Link href="/buitenritten" className="mt-auto">
                <motion.button 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  BEKIJK RITTEN
                </motion.button>
              </Link>
            </motion.div>

            {/* Pensionstalling */}
            <motion.div 
              className="text-center group flex flex-col h-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative mb-6">
                <div className="w-full h-64 rounded-2xl overflow-hidden group-hover:shadow-xl transition-all duration-300">
                  <Image
                    src="/pensionstalling-bg.jpg"
                    alt="Manege Duikse Hoef - Pensionstalling"
                    fill
                    className="object-cover"
                  />
                </div>
                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <Shield className="w-5 h-5 text-white" />
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pensionstalling</h3>
              <p className="text-gray-600 mb-6 flex-grow">Half pension voor je paard met moderne faciliteiten</p>
              <Link href="/pensionstalling" className="mt-auto">
                <motion.button 
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  BEKIJK PENSION
                </motion.button>
              </Link>
            </motion.div>

            {/* Ponykamp */}
            <motion.div 
              className="text-center group flex flex-col h-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative mb-6">
                <div className="w-full h-64 rounded-2xl overflow-hidden group-hover:shadow-xl transition-all duration-300">
                  <Image
                    src="/ponykamp.jpg"
                    alt="Manege Duikse Hoef - Ponykamp"
                    fill
                    className="object-cover"
                  />
                </div>
                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                >
                  <Award className="w-5 h-5 text-white" />
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ponykamp</h3>
              <p className="text-gray-600 mb-6 flex-grow">Leuke ponykampen voor kinderen met paardrijden en activiteiten</p>
              <Link href="/ponykamp" className="mt-auto">
                <motion.button 
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  BEKIJK KAMP
                </motion.button>
              </Link>
            </motion.div>

            {/* Onze Paarden */}
            <motion.div 
              className="text-center group flex flex-col h-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative mb-6">
                <div className="w-full h-64 rounded-2xl overflow-hidden group-hover:shadow-xl transition-all duration-300">
                  <Image
                    src="/google-photos/Mooie foto.png"
                    alt="Manege Duikse Hoef - Onze paarden"
                    fill
                    className="object-cover"
                  />
                </div>
                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                >
                  <Heart className="w-5 h-5 text-white" />
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Onze Paarden</h3>
              <p className="text-gray-600 mb-6 flex-grow">Maak kennis met onze lieve en betrouwbare manegepaarden</p>
              <Link href="/onze-paarden" className="mt-auto">
                <motion.button 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ONTDEK PAARDEN
                </motion.button>
              </Link>
            </motion.div>

          </div>
        </div>
      </section>


      {/* Uitgebreide Faciliteiten Sectie */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-emerald-300 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -25, 0],
                x: [0, Math.random() * 15 - 7.5, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-6"
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <Shield className="w-10 h-10 text-pink-600" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Onze <span className="text-pink-600">Top Faciliteiten</span>
              </h2>
              <Award className="w-10 h-10 text-pink-600" />
            </motion.div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Alles wat je paard nodig heeft op één prachtige locatie in Loon op Zand
            </p>
          </motion.div>

          {/* Facilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {/* Binnenbak */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">🏟️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Binnenbak</h3>
              <p className="text-gray-600 text-sm">20 x 40 meter met fijne bodem - perfect voor alle weersomstandigheden</p>
            </motion.div>

            {/* Buitenbak */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">🌞</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Buitenbak</h3>
              <p className="text-gray-600 text-sm">20 x 60 meter - altijd goed te rijden, het hele jaar door</p>
            </motion.div>

            {/* Longeercirkel */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">⭕</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Longeercirkel</h3>
              <p className="text-gray-600 text-sm">Ruime longeercirkel, gedraineerd en met houten omheining</p>
            </motion.div>

            {/* Stallen */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Stallen</h3>
              <p className="text-gray-600 text-sm">3 x 3 meter, licht en goed geventileerd voor optimaal comfort</p>
            </motion.div>

            {/* Zadelkamer */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">🔐</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Beveiligd door</span>
                  <div className="w-20 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-white text-center">BLICON SECURITY</span>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Zadelkamer</h3>
              <p className="text-gray-600 text-sm">Afgesloten en beveiligde zadelkamer met ruime, persoonlijke zadelkast ook meldkamer beveiliging</p>
            </motion.div>

            {/* Paddocks */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Paddocks</h3>
              <p className="text-gray-600 text-sm">Veilige paddocks, goed omheind, met hooi op de paddock</p>
            </motion.div>

            {/* Weidegang */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Weidegang</h3>
              <p className="text-gray-600 text-sm">Zomer weidegang, in de winter dagelijks paddock in groepsverband</p>
            </motion.div>

            {/* Afspuitplaatsen */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">🚿</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Afspuitplaatsen</h3>
              <p className="text-gray-600 text-sm">2 afspuitplaatsen én een solarium voor optimale verzorging</p>
            </motion.div>

            {/* Boslocatie */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">🌲</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Boslocatie</h3>
              <p className="text-gray-600 text-sm">Direct aan het bos - je stapt zó op voor een heerlijke buitenrit</p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Google Reviews Carousel Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-6"
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <Star className="w-10 h-10 text-blue-600" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Wat Onze <span className="text-blue-600">Ruiters</span> Zeggen
              </h2>
              <Star className="w-10 h-10 text-blue-600" />
            </motion.div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Echte verhalen van echte mensen - lees onze Google Reviews
            </p>
          </motion.div>

          {/* Scrolling Reviews Container */}
          <div className="relative">
            {/* Gradient Overlays - alleen aan de zijkanten */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
            
            {/* Google Reviews Endless Scroll */}
            <GoogleReviews 
              placeId={process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || ""}
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ""}
            />
          </div>

        </div>
      </section>

      <Footer />
    </>
  )
}