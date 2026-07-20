'use client'

import { motion } from 'framer-motion'
import { Users, Star, Trophy, Award } from 'lucide-react'
import Image from 'next/image'
export default function LessenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/1020@2x.jpg"
            alt="Manege Duikse Hoef"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/80 via-blue-600/80 to-purple-600/80"></div>
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
              <Trophy className="w-12 h-12 text-yellow-400" />
              <h1 className="text-5xl md:text-6xl font-bold">
                Privé Lessen & <span className="text-yellow-400">Duo lessen</span>
              </h1>
              <Star className="w-12 h-12 text-yellow-400" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Lessen Informatie */}
          <motion.div
            className="relative overflow-hidden bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Schuin groen label */}
            <div
              className="pointer-events-none absolute -right-1 top-0 z-10 h-28 w-28 overflow-hidden"
              aria-hidden="true"
            >
              <div className="absolute left-[-28%] top-[32%] w-[150%] rotate-45 bg-gradient-to-b from-green-500 to-green-700 py-2 text-center">
                <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-white">
                  Op aanvraag
                </span>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3 pr-24">
              <Users className="w-8 h-8 text-pink-600" />
              Onze Lessen
            </h2>

            <div className="max-w-3xl space-y-5">
              <p className="text-lg text-gray-700 leading-relaxed">
                Op dit moment bieden wij geen groepslessen meer aan voor kinderen.
                Voor volwassenen zijn groepslessen wel beschikbaar.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Daarnaast kun je bij ons <span className="font-semibold text-gray-900">op aanvraag</span> terecht
                voor persoonlijke aandacht in de vorm van privélessen en duo-lessen.
                Ook bieden wij buitenritten aan.
              </p>
              <p className="text-base text-gray-600 leading-relaxed border-l-4 border-pink-300 pl-4">
                Heb je interesse? Neem contact met ons op om een les in te plannen. Bekijk hieronder
                de mogelijkheden en prijzen.
              </p>
            </div>
          </motion.div>

          {/* Leskaarten Sectie */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                <Trophy className="w-10 h-10 text-yellow-600" />
                Lessen & Prijzen
                <Trophy className="w-10 h-10 text-yellow-600" />
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Kies uit onze privé lessen voor persoonlijke aandacht, of duo privé lessen samen met iemand anders.
              </p>
              <div className="mt-6 p-4 bg-pink-50 rounded-xl border border-pink-200">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-pink-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Gediplomeerde Instructeurs</h3>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Alle lessen bij Manege en Pensionstal de Duikse hoef worden door gediplomeerde instructeurs gegeven.
                </p>
              </div>
            </div>

            <div className="w-full max-w-7xl mx-auto">
              {/* Privé les opties */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Privé les */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Privé les</h3>
                    <div className="text-4xl font-bold text-pink-600 mb-4">€30,00</div>
                    <p className="text-gray-600">30 minuten</p>
                  </div>
                </motion.div>

                {/* Duo privéles */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Duo Privé les</h3>
                    <div className="text-4xl font-bold text-pink-600 mb-2">€27,50 p.p.</div>
                    <p className="text-gray-600">45 minuten · 2 personen</p>
                  </div>
                </motion.div>
              </div>
            </div>

          </motion.div>

        </div>
      </section>

    </div>
  )
}