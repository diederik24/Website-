'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    naam: '',
    email: '',
    telefoon: '',
    onderwerp: '',
    bericht: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    try {
      const response = await fetch('/api/contact', {
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
        setFormData({
          naam: '',
          email: '',
          telefoon: '',
          onderwerp: '',
          bericht: ''
        })
      }, 5000)
      
    } catch (error) {
      console.error('Form submission error:', error)
      setError(error instanceof Error ? error.message : 'Er is een onverwachte fout opgetreden')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Neem <span className="text-pink-600">Contact</span> Op
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Heeft u vragen over onze lessen, pensionstalling of andere diensten? 
            Wij helpen u graag verder!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Informatie */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Contact Informatie</h2>
              
              {/* Telefoon */}
              <motion.div
                className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="bg-pink-100 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Telefoon</h3>
                  <p className="text-gray-600 mb-1">+31 620685310</p>
                  <p className="text-sm text-gray-500">Maandag tot zaterdag: 8:00 - 18:00</p>
                </div>
              </motion.div>

              {/* E-mail */}
              <motion.div
                className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="bg-blue-100 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">E-mail</h3>
                  <p className="text-gray-600 mb-1">info@manegeduiksehoef.nl</p>
                </div>
              </motion.div>

              {/* Adres */}
              <motion.div
                className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="bg-green-100 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Adres</h3>
                  <p className="text-gray-600">
                    Duiksehoef 6<br />
                    5175 PG Loon op Zand
                  </p>
                </div>
              </motion.div>

              {/* Openingstijden */}
              <motion.div
                className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="bg-purple-100 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Telefonische Bereikbaarheid</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <span className="font-medium text-gray-700">Maandag tot zaterdag</span>
                      <span className="font-bold text-green-700">8:00 - 18:00</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-200">
                      <span className="font-medium text-gray-700">Zondag</span>
                      <span className="font-bold text-gray-500">Gesloten</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-pink-50 rounded-lg border border-pink-200">
                    <p className="text-sm text-pink-700 font-medium">
                      💡 Buiten deze tijden kunt u altijd een bericht achterlaten of een e-mail sturen
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Formulier */}
          <motion.div
            className="bg-white rounded-3xl shadow-2xl p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Stuur ons een bericht</h2>
            
            {isSubmitted ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Bedankt voor uw bericht!</h3>
                <p className="text-gray-600">Wij nemen zo snel mogelijk contact met u op.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <motion.div
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="font-medium">⚠️ {error}</p>
                  </motion.div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="naam" className="block text-sm font-semibold text-gray-700 mb-2">
                      Naam *
                    </label>
                    <input
                      type="text"
                      id="naam"
                      name="naam"
                      value={formData.naam}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      placeholder="Uw volledige naam"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      placeholder="uw.email@voorbeeld.nl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="telefoon" className="block text-sm font-semibold text-gray-700 mb-2">
                      Telefoon
                    </label>
                    <input
                      type="tel"
                      id="telefoon"
                      name="telefoon"
                      value={formData.telefoon}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      placeholder="+31 6 12345678"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="onderwerp" className="block text-sm font-semibold text-gray-700 mb-2">
                      Onderwerp *
                    </label>
                    <select
                      id="onderwerp"
                      name="onderwerp"
                      value={formData.onderwerp}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Selecteer een onderwerp</option>
                      <option value="lessen">Lessen</option>
                      <option value="pensionstalling">Pensionstalling</option>
                      <option value="buitenritten">Buitenritten</option>
                      <option value="ponykamp">Ponykamp</option>
                      <option value="algemeen">Algemene vraag</option>
                      <option value="anders">Anders</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="bericht" className="block text-sm font-semibold text-gray-700 mb-2">
                    Bericht *
                  </label>
                  <textarea
                    id="bericht"
                    name="bericht"
                    value={formData.bericht}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Vertel ons waar we u mee kunnen helpen..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Verzenden...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Verstuur bericht
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
