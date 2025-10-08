'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone, Mail, MapPin, Clock, Instagram, Facebook, Star, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MobileMenu, TouchOptimizedButton } from './MobileOptimizations'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/lessen', label: 'Lessen' },
    { href: '/buitenritten', label: 'Buitenritten' },
    { href: '/pensionstalling', label: 'Pensionstalling' },
    { href: '/ponykamp', label: 'Ponykamp' },
    { href: '/onze-paarden', label: 'Onze Paarden' }
  ]

  return (
    <>
      {/* Contact Bar - Fixed at top */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50 bg-pink-600 text-white py-1 md:py-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center text-xs md:text-sm">
            <div className="flex items-center space-x-2 md:space-x-6">
              <motion.div 
                className="flex items-center space-x-1 md:space-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Phone className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">+31 620685310</span>
                <span className="sm:hidden">+31 620685310</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-1 md:space-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Mail className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden lg:inline">info@manegeduiksehoef.nl</span>
                <span className="lg:hidden">info@manegeduiksehoef.nl</span>
              </motion.div>
              
            </div>
            
            {/* Google Reviews Stars */}
            <motion.div 
              className="hidden md:flex items-center space-x-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="flex items-center space-x-1">
                {[...Array(4)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-4 h-4 text-yellow-400 fill-yellow-400" 
                  />
                ))}
                <div className="relative">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <div className="absolute inset-0 overflow-hidden w-1/2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
              </div>
              <span className="text-sm font-medium ml-2">4.5/5 Google Reviews</span>
            </motion.div>
            
            {/* Mobile Google Reviews - Compact */}
            <motion.div 
              className="md:hidden flex items-center space-x-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="flex items-center space-x-0.5">
                {[...Array(4)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-3 h-3 text-yellow-400 fill-yellow-400" 
                  />
                ))}
                <div className="relative">
                  <Star className="w-3 h-3 text-yellow-400" />
                  <div className="absolute inset-0 overflow-hidden w-1/2">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
              </div>
              <span className="text-xs font-medium ml-1">4.5/5</span>
            </motion.div>
            
            {/* Social Media Icons */}
            <div className="flex items-center space-x-1 ml-2 md:ml-4">
              <motion.a
                href="https://www.instagram.com/manegeduiksehoef/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-200 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </motion.a>
              <motion.a
                href="https://www.facebook.com/p/Stal-Manege-Duikse-Hoef-100092264474224/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-200 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook className="w-4 h-4 md:w-5 md:h-5" />
              </motion.a>
              <motion.a
                href="https://www.tiktok.com/@manege.duiksehoef"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-200 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Main Navigation */}
      <motion.nav 
        className={`fixed top-8 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-xl shadow-2xl border-b border-pink-200/50' 
            : 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Link href="/" className="flex items-center">
              <Image
                src="/navbar-logo.png"
                alt="Manege Duikse Hoef"
                width={200}
                height={80}
                className="h-16 w-auto object-contain"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              >
                <Link 
                  href={item.href} 
                  className="relative text-gray-700 hover:text-pink-600 transition-colors font-medium"
                >
                  {item.label}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-pink-600"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </Link>
              </motion.div>
            ))}
            
            {/* Webshop Button */}
            <motion.a
              href="https://shop.manegeduiksehoef.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="w-4 h-4" />
              Webshop
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <TouchOptimizedButton
            onClick={toggleMenu}
            className="md:hidden p-3 rounded-xl text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </TouchOptimizedButton>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
        <div className="flex flex-col h-full bg-gradient-to-br from-pink-50 via-white to-rose-50 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ec4899' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          {/* Header met logo */}
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🐴</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">Manege Duikse Hoef</h2>
                <p className="text-pink-100 text-sm">Menu</p>
              </div>
            </div>
            <TouchOptimizedButton
              onClick={() => setIsMenuOpen(false)}
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300"
            >
              <X className="w-6 h-6 text-white" />
            </TouchOptimizedButton>
          </div>
          
          {/* Navigation Items */}
          <div className="flex-1 px-6 py-6 space-y-3 relative z-10">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
              >
                <TouchOptimizedButton
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-left"
                >
                  <Link
                    href={item.href}
                    className="block px-6 py-4 text-gray-700 hover:text-pink-600 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 rounded-2xl transition-all duration-300 font-semibold text-lg border border-transparent hover:border-pink-200 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center">
                        <span className="text-pink-600 text-lg">
                          {item.label === 'Lessen' ? '📚' : 
                           item.label === 'Buitenritten' ? '🌲' :
                           item.label === 'Pensionstalling' ? '🏠' :
                           item.label === 'Ponykamp' ? '🎪' :
                           item.label === 'Onze Paarden' ? '🐎' : '📄'}
                        </span>
                      </div>
                      <span>{item.label}</span>
                    </div>
                  </Link>
                </TouchOptimizedButton>
              </motion.div>
            ))}
            
            {/* Mobile Webshop Button */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navItems.length * 0.1, duration: 0.4, ease: "easeOut" }}
              className="pt-6"
            >
              <TouchOptimizedButton
                onClick={() => setIsMenuOpen(false)}
                className="w-full"
              >
                <a
                  href="https://shop.manegeduiksehoef.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-5 rounded-2xl font-bold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <ShoppingBag className="w-6 h-6" />
                  <span>🛍️ Webshop</span>
                </a>
              </TouchOptimizedButton>
            </motion.div>
          </div>
          
          {/* Footer met contact info */}
          <div className="p-6 bg-gradient-to-r from-gray-50 to-pink-50 border-t border-pink-200 relative z-10">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 mb-3">📞 Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">+31 620685310</p>
                    <p className="text-sm text-gray-600">Bel ons direct</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">info@manegeduiksehoef.nl</p>
                    <p className="text-sm text-gray-600">Stuur een e-mail</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </MobileMenu>
      </motion.nav>
    </>
  )
}

export default Navbar