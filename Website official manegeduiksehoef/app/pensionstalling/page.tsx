'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle, Phone, Mail, MapPin, Heart, Shield, Users, Home, TreePine, Waves, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import AnimatedButton from '@/components/AnimatedButton'
import Footer from '@/components/Footer'

export default function PensionPage() {
  const faciliteiten = [
    "Binnenbak van 20 x 40 m met fijne bodem",
    "Buitenbak van 20 x 60 m – altijd goed te rijden, het hele jaar door",
    "Ruime longeercirkel, gedraineerd en met houten omheining",
    "Stallen van 3 x 3 m, licht en goed geventileerd",
    "Afgesloten en beveiligde zadelkamer met ruime, persoonlijke zadelkast",
    "Veilige paddocks, goed omheind, met hooi op de paddock",
    "Zomer weidegang, in de winter dagelijks paddock",
    "Voerbeleid: 3-4x per dag hooi (door ons verzorgd)",
    "2 afspuitplaatsen én een solarium",
    "Direct aan het bos – je stapt zó op voor een heerlijke buitenrit"
  ]

  const wijVerzorgen = [
    "3-4 keer per dag hooi",
    "Dagelijks buiten zetten (ma-zo)",
    "Binnen zetten (ma-vr)",
    "Verzorging van weidegang",
    "Professionele zorg en kennis aanwezig"
  ]

  const jijVerzorgt = [
    "Dagelijks zelf de stal uitmesten (ma-zo)",
    "Binnen halen in het weekend (za-zo)"
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/pensionstalling-bg.jpg"
            alt="Pensionstalling buitenbak verlicht"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay with beautiful filter */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-900/70 via-purple-800/60 to-indigo-900/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Pensionstalling
              <span className="block text-2xl md:text-3xl text-pink-300 mt-2">
                manegeduiksehoef
              </span>
            </h1>
            
            <div className="text-3xl md:text-4xl font-bold text-white mb-4">
              €420<span className="text-xl text-pink-300">/maand</span>
            </div>
            
            <p className="text-lg text-white/90 mb-8">
              Half Pension
            </p>

          </motion.div>
        </div>
      </section>

      {/* Half Pension Uitleg */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-8">
              Half pension – zo verdelen we de zorg
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-3" />
                Wij verzorgen
              </h3>
              <ul className="space-y-3">
                {wijVerzorgen.map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="w-6 h-6 text-blue-500 mr-3" />
                Jij verzorgt
              </h3>
              <ul className="space-y-3">
                {jijVerzorgt.map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Foto Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Onze Rijfaciliteiten
            </h2>
            <p className="text-lg text-gray-600">
              Moderne en verlichte rijfaciliteiten voor optimale training
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Buitenbak */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative h-64 md:h-80">
                <Image
                  src="/pensionstalling-bg.jpg"
                  alt="Buitenbak van 20x60m - altijd goed te rijden, het hele jaar door"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <motion.div
                    className="text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      Onze Buitenbak
                    </h3>
                    <p className="text-base md:text-lg text-white/90">
                      20 x 60 meter – altijd goed te rijden, het hele jaar door. Savonds verlicht voor late trainingen.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Longeercirkel */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="relative h-64 md:h-80">
                <Image
                  src="/longeercirkel.jpg"
                  alt="Verlichte Longeercirkel - gedraineerd en met houten omheining"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <motion.div
                    className="text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      Onze Longeercirkel
                    </h3>
                    <p className="text-base md:text-lg text-white/90">
                      Ruime longeercirkel, gedraineerd en met houten omheining. Savonds verlicht voor veilige training.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Faciliteiten */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Onze Faciliteiten
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faciliteiten.map((faciliteit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{faciliteit}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <Footer />
    </>
  )
}