'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Address and Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-white">
              Manege Duikse Hoef
            </h3>
            <div className="space-y-4 text-white/90">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-1 text-white/70" />
                <div>
                  <p className="text-sm">
                    Duiksehoef 6<br />
                    5175 PG Loon op Zand
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-white/70" />
                  <div>
                    <p className="text-sm font-semibold">Bel ons</p>
                    <p className="text-sm">Voor telefonisch contact kunt u ons bereiken op telefoonnummer:</p>
                    <p className="text-sm font-bold">+31 620685310</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-white/70" />
                  <div>
                    <p className="text-sm font-semibold">Mail ons</p>
                    <p className="text-sm">Voor direct contact per e-mail:</p>
                    <p className="text-sm font-bold">info@manegeduiksehoef.nl</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Middle Column - Telefonische Bereikbaarheid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-white">
              Telefonische Bereikbaarheid
            </h3>
            <div className="space-y-4 text-white/90">
              <div className="flex items-start">
                <Clock className="w-5 h-5 mr-3 mt-1 text-white/70" />
                <div>
                  <p className="text-sm font-semibold mb-2">Wanneer kunt u ons bereiken?</p>
                  <p className="text-sm mb-1">Maandag tot zaterdag</p>
                  <p className="text-sm font-bold text-white">8:00 - 18:00</p>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <p className="text-sm text-white/90 mb-2">
                  Voor vragen over lessen, pensionstalling of andere diensten kunt u ons telefonisch bereiken tijdens bovenstaande tijden.
                </p>
                <p className="text-xs text-white/70">
                  Buiten deze tijden kunt u altijd een bericht achterlaten of een e-mail sturen.
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Certificaten Sectie - Vakjes naast elkaar */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Stage Vakje */}
          <motion.div
            className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300"
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-lg p-3 shadow-lg flex-shrink-0">
                <Image
                  src="/google-photos/erkend leer bedrijf.jpg"
                  alt="Erkend Leerbedrijf"
                  width={60}
                  height={60}
                  className="w-[60px] h-[60px] object-cover rounded"
                />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Stage Lopen</h4>
                <p className="text-sm text-white/90 mb-1">Wil je werken met paarden?</p>
                <p className="text-sm text-white/90">Kom dan bij ons stage lopen!</p>
              </div>
            </div>
          </motion.div>

          {/* Veiligheid Vakje */}
          <motion.div
            className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300"
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-lg p-3 shadow-lg flex-shrink-0">
                <Image
                  src="/google-photos/cropped-2009logosvp_zwart-1.gif"
                  alt="Veiligheidskeurmerk"
                  width={60}
                  height={60}
                  className="w-[60px] h-[60px] object-cover rounded"
                />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Veiligheid</h4>
                <p className="text-sm text-white/90 mb-1">Veiligheid staat voorop</p>
                <p className="text-sm text-orange-400 font-semibold">Erkend veiligheidsbedrijf</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-white/20 pt-8 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p 
              className="text-white/80 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Copyright © 2025 Manege Duikse Hoef
            </motion.p>
            <motion.div 
              className="flex space-x-6 mt-4 md:mt-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {[
                { icon: <Facebook className="w-5 h-5" />, href: "https://www.facebook.com/p/Stal-Manege-Duikse-Hoef-100092264474224/", label: "Facebook" },
                { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/manegeduiksehoef/", label: "Instagram" },
                { icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>, href: "https://www.tiktok.com/@manege.duiksehoef", label: "TikTok" }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="text-white/70 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}