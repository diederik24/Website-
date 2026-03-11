'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle, Phone, Mail, MapPin, Heart, Shield, Users, Home, TreePine, Waves, ArrowRight, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react'
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
    "Direct aan het bos – je stapt zó op voor een heerlijke buitenrit door de Drunense Duinen richting Kaatsheuvel"
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
              Pensionstalling Loon op Zand
              <span className="block text-2xl md:text-3xl text-pink-300 mt-2">
                Direct aan het bos - Kaatsheuvel
              </span>
            </h1>
            
            <div className="text-3xl md:text-4xl font-bold text-white mb-4">
              €420<span className="text-xl text-pink-300">/maand</span>
            </div>
            
            <p className="text-lg text-white/90 mb-8">
              Half Pension - Pensionstalling aan bos in Loon op Zand, ideaal voor buitenritten door de Drunense Duinen
            </p>

          </motion.div>
        </div>
      </section>

      {/* Belangrijke Mededeling */}
      <section className="py-12 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 relative overflow-hidden">
        {/* Decoratieve achtergrond elementen */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-pink-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-rose-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            className="bg-gradient-to-br from-white to-pink-50 rounded-2xl shadow-2xl p-8 border-2 border-pink-200 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Decoratieve accent lijn */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500"></div>
            
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Icon container */}
              <motion.div
                className="flex-shrink-0"
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                  <AlertCircle className="w-9 h-9 text-white" />
                </div>
              </motion.div>
              
              {/* Content */}
              <div className="flex-1">
                <motion.h3
                  className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                    Belangrijke Mededeling
                  </span>
                </motion.h3>
                <motion.p
                  className="text-gray-700 text-lg md:text-xl leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Op dit moment zit onze stalling vol. Hou het in de gaten voor in de toekomst als er weer plekken vrij zijn.
                </motion.p>
              </div>
            </div>
            
            {/* Decoratieve bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 h-full flex flex-col items-center text-center"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-3" />
                Wij verzorgen
              </h3>
              <ul className="space-y-3">
                {wijVerzorgen.map((item, index) => (
                  <li key={index} className="flex items-center justify-center text-gray-700">
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
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 h-full flex flex-col items-center text-center"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="w-6 h-6 text-blue-500 mr-3" />
                Jij verzorgt
              </h3>
              <ul className="space-y-3">
                {jijVerzorgt.map((item, index) => (
                  <li key={index} className="flex items-center justify-center text-gray-700">
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
              Onze <span className="text-pink-600">Rij</span>faciliteiten
            </h2>
            <p className="text-lg text-gray-600">
              Moderne en verlichte rijfaciliteiten voor optimale training. Pensionstalling in Loon op Zand met binnen- en buitenbak, direct aan het bos gelegen voor buitenritten naar Kaatsheuvel en de Drunense Duinen.
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
                      20 x 60 meter – altijd goed te rijden, het hele jaar door. 's Avonds verlicht voor late trainingen.
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
                      Ruime longeercirkel, gedraineerd en met houten omheining. 's Avonds verlicht voor veilige training.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Ovaalbaan */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative h-64 md:h-80">
                <Image
                  src="/ovaalbaan-icelandic.jpg"
                  alt="Ovaalbaan voor IJslandse paarden"
                  fill
                  className="object-cover"
                  priority={false}
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
                      Ovaalbaan voor IJslandse paarden
                    </h3>
                    <p className="text-base md:text-lg text-white/90">
                      Ovaalbaan van 250 meter, speciaal voor IJslandse paarden trainingen.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Binnenbak */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative h-64 md:h-80">
                <Image
                  src="/google-photos/Binnenbak.jpg"
                  alt="Onze binnenbak"
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
                      Onze Binnenbak
                    </h3>
                    <p className="text-base md:text-lg text-white/90">
                      20 x 40 meter – overdekte rijbak voor alle weersomstandigheden.
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
              <span className="text-pink-600">Onze</span> Faciliteiten
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


      {/* SEO Content Section - Hidden but readable by search engines */}
      <section className="sr-only">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h2>Pensionstalling Loon op Zand en Kaatsheuvel</h2>
          <p>
            Manege Duikse Hoef biedt pensionstalling voor paarden in Loon op Zand en Kaatsheuvel. Onze pensionstalling is direct aan het bos gelegen, 
            waardoor je direct kunt genieten van buitenritten door de Drunense Duinen. Of je nu op zoek bent naar pensionstalling in Loon op Zand, 
            pensionstalling in Kaatsheuvel, of pensionstalling aan het bos - bij Manege Duikse Hoef ben je aan het juiste adres.
          </p>
          <h3>Pensionstalling aan Bos</h3>
          <p>
            Onze pensionstalling is uniek gelegen direct aan het bos. Dit betekent dat je paard niet alleen geniet van een mooie stal en paddock, 
            maar ook direct toegang heeft tot prachtige buitenritten door de Drunense Duinen. De pensionstalling aan bos biedt de perfecte combinatie 
            van comfort voor je paard en gemak voor buitenritten richting Kaatsheuvel en de Drunense Duinen.
          </p>
          <h3>Half Pension vanaf €420 per maand</h3>
          <p>
            Onze pensionstalling in Loon op Zand biedt half pension vanaf €420 per maand. Dit betekent dat wij zorgen voor 3-4 keer per dag hooi, 
            dagelijks buiten zetten, binnen zetten op doordeweekse dagen, en verzorging van weidegang. Jij verzorgt dagelijks de stal uitmesten en 
            binnen halen in het weekend. Perfect voor paardenliefhebbers uit Loon op Zand, Kaatsheuvel en omgeving.
          </p>
          <h3>Faciliteiten Pensionstalling</h3>
          <p>
            Onze pensionstalling beschikt over een binnenbak van 20x40 meter, een buitenbak van 20x60 meter die altijd goed te rijden is, 
            een ruime longeercirkel, stallen van 3x3 meter, veilige paddocks, zomer weidegang, en directe toegang tot het bos voor buitenritten. 
            Ideaal voor paarden die genieten van buitenritten door de Drunense Duinen en bossen rondom Loon op Zand en Kaatsheuvel.
          </p>
          <h3>Locatie: Loon op Zand en Kaatsheuvel</h3>
          <p>
            Manege Duikse Hoef is gevestigd in Loon op Zand, op korte afstand van Kaatsheuvel en de Drunense Duinen. Onze pensionstalling is 
            perfect gelegen voor paardenliefhebbers uit Loon op Zand, Kaatsheuvel, en de omliggende gebieden. De pensionstalling aan bos biedt 
            directe toegang tot prachtige buitenritten door de Drunense Duinen en bossen.
          </p>
          <h3>Boek Je Pensionstalling</h3>
          <p>
            Ben je op zoek naar pensionstalling in Loon op Zand of Kaatsheuvel? Of zoek je specifiek pensionstalling aan het bos voor directe 
            toegang tot buitenritten? Neem contact op met Manege Duikse Hoef voor meer informatie over onze pensionstalling en beschikbaarheid. 
            Onze pensionstalling is populair bij paardenliefhebbers uit de hele regio vanwege de unieke ligging aan het bos en de directe toegang 
            tot buitenritten door de Drunense Duinen.
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}