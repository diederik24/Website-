'use client'

import { motion } from 'framer-motion'
import { Users, Calendar, Star, Heart, Shield, Clock, Trophy, Award, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import LessonCard from '@/components/LessonCard'

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
                Lessen & <span className="text-yellow-400">Instructeurs</span>
              </h1>
              <Star className="w-12 h-12 text-yellow-400" />
            </motion.div>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Professionele paardrijlessen voor alle leeftijden en niveaus
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Lessen Informatie */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              Onze Lessen
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Leeftijd & Ervaring</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Kinderen mogen vanaf de leeftijd van 7 jaar leren paardrijden bij Manege de Duikse Hoef</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">De manege lessen zijn verdeeld in leeftijd en ervaring</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Startende kinderen en volwassenen beginnen met enkele privé lessen totdat ze zelfstandig genoeg ruitergevoel hebben</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Trophy className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Daarna worden ze in de groepslessen ingedeeld</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Verzorging & Meer</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Heart className="w-6 h-6 text-pink-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Het is niet alleen leren rijden, maar ook de verzorging, het poetsen, op/en af zadelen hoort erbij</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="w-6 h-6 text-pink-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Jaarlijks organiseren wij gezellige en leerzame pony doe dagen</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Op deze dagen wordt aan de verzorging van de pony's en paarden spelenderwijs extra aandacht gegeven en gaan we spelletjes doen</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Wedstrijden & Speciale Lessen */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-600" />
              Wedstrijden & Speciale Lessen
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                  Onderlinge Wedstrijden
                </h3>
                <p className="text-gray-700">
                  Op de manege wordt elk jaar een onderlinge wedstrijd georganiseerd voor alle ruiters.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-blue-600" />
                  Dressuurlessen
                </h3>
                <p className="text-gray-700">
                  Voor de pensionklanten met eigen paarden worden privé- en groepslessen dressuur gegeven door onze enthousiaste instructeurs.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 md:col-span-2">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Star className="w-6 h-6 text-green-600" />
                  Springlessen
                </h3>
                <p className="text-gray-700">
                  Op aanvraag worden er ook regelmatig springlessen georganiseerd voor gevorderde ruiters.
                </p>
              </div>
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
                Kies uit onze verschillende lesmogelijkheden. Privé lessen voor persoonlijke aandacht of losse lessen voor flexibiliteit.
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
              {/* Ritten kaart */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full mb-12"
              >
                <LessonCard
                  lessons={10}
                  price={185}
                  features={[
                    "10 ritten kaart",
                    "60 minuten per les"
                  ]}
                />
              </motion.div>

              {/* Privé les en Losse les opties */}
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

                {/* Losse les */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Losse les</h3>
                    <div className="text-4xl font-bold text-pink-600 mb-4">€25,00</div>
                    <p className="text-gray-600">60 minuten</p>
                  </div>
                </motion.div>
              </div>
            </div>

          </motion.div>

          {/* Week Agenda Groepslessen */}
          <motion.div
            className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl shadow-2xl p-8 border border-white/20 mb-16 backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Lestijden Groepslessen
                <span className="text-pink-600"> Overzicht</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ontdek alle beschikbare lessen per dag van de week bij Manege Duikse Hoef
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Maandag */}
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-5 border-2 border-pink-200 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                <h3 className="text-lg font-bold text-pink-800 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  Maandag
                </h3>
                <div className="space-y-2">
                  <div className="bg-white/70 rounded-lg p-3 border border-pink-200 group-hover:bg-white/90 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-pink-600" />
                      <span className="font-bold text-pink-800 text-sm">13:00-15:00</span>
                    </div>
                    <p className="text-pink-700 text-sm font-medium">Privéles mogelijk</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-pink-200 group-hover:bg-white/90 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-pink-600" />
                      <span className="font-bold text-pink-800 text-sm">16:00-17:30</span>
                    </div>
                    <p className="text-pink-700 text-sm font-medium">Ponyclub</p>
                  </div>
                </div>
              </div>

              {/* Dinsdag */}
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-5 border-2 border-pink-200 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                <h3 className="text-lg font-bold text-pink-800 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  Dinsdag
                </h3>
                <div className="bg-white/70 rounded-lg p-3 border border-pink-200">
                  <p className="text-pink-500 italic text-sm text-center">Geen lessen</p>
                </div>
              </div>

              {/* Woensdag */}
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-5 border-2 border-pink-200 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                <h3 className="text-lg font-bold text-pink-800 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  Woensdag
                </h3>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  <div className="bg-white/70 rounded-lg p-3 border border-pink-200 group-hover:bg-white/90 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-pink-600" />
                      <span className="font-bold text-pink-800 text-sm">13:30-14:00</span>
                    </div>
                    <p className="text-pink-700 text-sm font-medium">Privéles</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-pink-200 group-hover:bg-white/90 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-pink-600" />
                      <span className="font-bold text-pink-800 text-sm">14:00-15:00</span>
                    </div>
                    <p className="text-pink-700 text-sm font-medium">Beginnersles jeugd</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-pink-200 group-hover:bg-white/90 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-pink-600" />
                      <span className="font-bold text-pink-800 text-sm">15:00-16:00</span>
                    </div>
                    <p className="text-pink-700 text-sm font-medium">Gemiddelde jeugd</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-pink-200 group-hover:bg-white/90 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-pink-600" />
                      <span className="font-bold text-pink-800 text-sm">16:00-16:30</span>
                    </div>
                    <p className="text-pink-700 text-sm font-medium">Privéles</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-pink-200 group-hover:bg-white/90 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-pink-600" />
                      <span className="font-bold text-pink-800 text-sm">16:30-17:30</span>
                    </div>
                    <p className="text-pink-700 text-sm font-medium">Gemiddeld-gevorderde jeugd</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-pink-200 group-hover:bg-white/90 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-pink-600" />
                      <span className="font-bold text-pink-800 text-sm">19:00-20:00</span>
                    </div>
                    <p className="text-pink-700 text-sm font-medium">Gemiddeld-gevorderde volwassenen</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-pink-200 group-hover:bg-white/90 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-pink-600" />
                      <span className="font-bold text-pink-800 text-sm">20:00-21:00</span>
                    </div>
                    <p className="text-pink-700 text-sm font-medium">Gemiddeld-gevorderde volwassenen (pensionles)</p>
                  </div>
                </div>
              </div>

              {/* Donderdag */}
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-5 border-2 border-pink-200 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                <h3 className="text-lg font-bold text-pink-800 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  Donderdag
                </h3>
                <div className="space-y-2">
                  <div className="bg-white/70 rounded-lg p-3 border border-pink-200 group-hover:bg-white/90 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-pink-600" />
                      <span className="font-bold text-pink-800 text-sm">13:00-15:00</span>
                    </div>
                    <p className="text-pink-700 text-sm font-medium">Privéles mogelijk</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-pink-200 group-hover:bg-white/90 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-pink-600" />
                      <span className="font-bold text-pink-800 text-sm">16:00-17:00</span>
                    </div>
                    <p className="text-pink-700 text-sm font-medium">(word nieuwe jeugdles)</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-pink-200 group-hover:bg-white/90 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-pink-600" />
                      <span className="font-bold text-pink-800 text-sm">19:00-20:00</span>
                    </div>
                    <p className="text-pink-700 text-sm font-medium">Gevorderde jeugd</p>
                  </div>
                </div>
              </div>

              {/* Vrijdag */}
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-5 border-2 border-pink-200 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                <h3 className="text-lg font-bold text-pink-800 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  Vrijdag
                </h3>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  <div className="bg-white/70 rounded-lg p-3 border border-pink-200 group-hover:bg-white/90 transition-colors">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-pink-600" />
                      <span className="font-bold text-pink-800 text-sm">9:30-10:30</span>
                    </div>
                    <p className="text-pink-700 text-sm font-medium text-center">Buitenrit volwassenen</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-pink-200 group-hover:bg-white/90 transition-colors">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-pink-600" />
                      <span className="font-bold text-pink-800 text-sm">16:00-17:00</span>
                    </div>
                    <p className="text-pink-700 text-sm font-medium text-center">Beginnersgroep</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-pink-200 group-hover:bg-white/90 transition-colors">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-pink-600" />
                      <span className="font-bold text-pink-800 text-sm">17:00-18:00</span>
                    </div>
                    <p className="text-pink-700 text-sm font-medium text-center">Gemiddeld-gevorderde jeugd</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-pink-200 group-hover:bg-white/90 transition-colors">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-pink-600" />
                      <span className="font-bold text-pink-800 text-sm">18:00-19:00</span>
                    </div>
                    <p className="text-pink-700 text-sm font-medium text-center">Gemiddeld-gevorderde jeugd</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-pink-200 group-hover:bg-white/90 transition-colors">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-pink-600" />
                      <span className="font-bold text-pink-800 text-sm">19:00-20:00</span>
                    </div>
                    <p className="text-pink-700 text-sm font-medium text-center">Springles gevorderd jeugd en volwassenen</p>
                  </div>
                </div>
              </div>

              {/* Zaterdag */}
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-5 border-2 border-pink-200 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                <h3 className="text-lg font-bold text-pink-800 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  Zaterdag
                </h3>
                <div className="space-y-2">
                  <div className="bg-white/70 rounded-lg p-3 border border-pink-200 group-hover:bg-white/90 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-pink-600" />
                      <span className="font-bold text-pink-800 text-sm">8:30-9:00</span>
                    </div>
                    <p className="text-pink-700 text-sm font-medium">Privéles</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-pink-200 group-hover:bg-white/90 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-pink-600" />
                      <span className="font-bold text-pink-800 text-sm">9:00-10:00</span>
                    </div>
                    <p className="text-pink-700 text-sm font-medium">Gemiddeld-gevorderde volwassenen (pensionles)</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-pink-200 group-hover:bg-white/90 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-pink-600" />
                      <span className="font-bold text-pink-800 text-sm">10:00-11:00</span>
                    </div>
                    <p className="text-pink-700 text-sm font-medium">Gemiddelde jeugd</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 border border-pink-200 group-hover:bg-white/90 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-pink-600" />
                      <span className="font-bold text-pink-800 text-sm">11:00-12:00</span>
                    </div>
                    <p className="text-pink-700 text-sm font-medium">Gemiddelde jeugd</p>
                  </div>
                </div>
              </div>

              {/* Zondag */}
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-5 border-2 border-pink-200 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                <h3 className="text-lg font-bold text-pink-800 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  Zondag
                </h3>
                <div className="space-y-2">
                  <div className="bg-white/70 rounded-lg p-3 border border-pink-200 group-hover:bg-white/90 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-pink-600" />
                      <span className="font-bold text-pink-800 text-sm">10:00-12:00</span>
                    </div>
                    <p className="text-pink-700 text-sm font-medium mb-3">Buitenrit</p>
                    <Link href="/buitenritten" className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white text-xs px-3 py-2 rounded-lg transition-colors duration-200">
                      <Users className="w-3 h-3" />
                      Aanmelden
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>


        </div>
      </section>

    </div>
  )
}