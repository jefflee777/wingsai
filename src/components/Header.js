"use client";

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaTelegram, FaBars, FaTimes, FaCoins } from 'react-icons/fa'
import { SiBinance } from 'react-icons/si'
import { motion, AnimatePresence } from 'framer-motion'
import { BsTwitterX } from "react-icons/bs";
import Image from 'next/image'

const socialLinks = [
  {
    href: "https://twitter.com/wingsai",
    icon: BsTwitterX,
    label: "X",
    color: "#FFFFFF",
    hover: "#FE6F61"
  },
  {
    href: "https://t.me/wingsai",
    icon: FaTelegram,
    label: "Telegram",
    color: "#0088cc",
    hover: "#00F6FF"
  },
  {
    href: "https://bscscan.com/token/wingsai",
    icon: SiBinance,
    label: "BSC Scan",
    color: "#F3BA2F",
    hover: "#FE6F61"
  }
]

const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '#features' },
  { name: 'Tokenomics', href: '#tokenomics' },
  { name: 'Roadmap', href: '#roadmap' },
]

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      
      // Hide/show navbar based on scroll direction
      if (currentScrollY > scrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollY])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = (e) => {
    e.stopPropagation()
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleLinkClick = (href) => {
    closeMobileMenu()
    // Smooth scroll to section
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-0 right-0 top-4 z-50 flex justify-center pointer-events-none"
          >
            <nav
              className={`max-w-7xl w-[87%] px-3 scale-110 py-2 sm:w-full mx-auto pointer-events-auto transition-all duration-300 ${
                scrollY > 50 
                  ? 'bg-[#0058ff]/95 border-[#FE6F61]/40' 
                  : 'bg-[#0058ff]/80 border-[#ffffff]/20'
              }`}
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: `1px solid ${scrollY > 50 ? '#FE6F61' : 'rgba(255, 255, 255, 0.2)'}`,
                borderRadius: '16px',
                padding: '12px 16px sm:12px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: scrollY > 50 
                  ? '0 8px 32px rgba(254, 111, 97, 0.15)' 
                  : '0 4px 16px rgba(0, 0, 0, 0.1)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Logo Section */}
              <Link href="/" className="group inline-flex items-center gap-3" onClick={closeMobileMenu}>
                <div className="flex items-center gap-2">
                    <Image src='/logo.svg' alt='Logo' width={50} height={50} className='scale-200 ml-4'/>
                </div>
              </Link>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center gap-8">
                {navigationLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="text-white/80 hover:text-white font-semibold transition-colors duration-300 relative group"
                    whileHover={{ y: -1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.name}
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FE6F61] transition-all duration-300 group-hover:w-full"></div>
                  </motion.a>
                ))}
              </div>

              {/* Desktop: CTA + Social Icons */}
              <div className="hidden sm:flex items-center gap-4">
                {/* Wings AI App CTA Button */}
                <motion.a
                  href="#cta"
                  className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FE6F61] to-[#00F6FF] rounded-lg text-white font-semibold text-sm shadow-lg"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaCoins className="w-4 h-4" />
                  <span>Try Wings AI</span>
                </motion.a>

                {/* Social Links */}
                <div className="flex items-center gap-2">
                  {socialLinks.map((item, i) => {
                    const Icon = item.icon
                    return (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 bg-white/10 border border-white/20"
                        whileHover={{
                          scale: 1.1,
                          y: -2,
                          backgroundColor: `${item.hover}20`,
                          borderColor: item.hover,
                          boxShadow: `0 4px 16px ${item.hover}40`
                        }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        aria-label={item.label}
                      >
                        <Icon size={16} className="text-white" />
                      </motion.a>
                    )
                  })}
                </div>
              </div>

              {/* Mobile: Hamburger Menu Button */}
              <motion.button
                className="sm:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 border border-white/20 text-white transition-colors duration-300"
                onClick={toggleMobileMenu}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(254, 111, 97, 0.2)' }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle mobile menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaTimes size={18} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaBars size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#0058ff]/95 backdrop-blur-md" />
            
            {/* Menu Content */}
            <motion.div
              className="relative z-10 flex flex-col h-full pt-24 px-6"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation Links */}
              <div className="space-y-6 mb-12">
                {navigationLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="block text-2xl font-bold text-white hover:text-[#FE6F61] transition-colors duration-300"
                    onClick={(e) => {
                      e.preventDefault()
                      handleLinkClick(link.href)
                    }}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              {/* Mobile CTA Button */}
              <motion.a
                href="#cta"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FE6F61] to-[#00F6FF] rounded-xl text-white font-bold text-lg mb-12 shadow-xl"
                onClick={(e) => {
                  e.preventDefault()
                  handleLinkClick('#cta')
                }}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaCoins className="w-5 h-5" />
                <span>Try Wings AI</span>
              </motion.a>

              {/* Mobile Social Links */}
              <div className="flex items-center justify-center gap-6">
                {socialLinks.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 text-white/80 hover:text-[#FE6F61] transition-colors duration-300"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.7, duration: 0.4 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 bg-white/10 border border-white/20"
                      >
                        <Icon size={24} />
                      </div>
                      <span className="text-xs font-semibold">{item.label}</span>
                    </motion.a>
                  )
                })}
              </div>

              {/* Wings AI Badge - Mobile */}
              <motion.div
                className="flex items-center justify-center gap-2 mt-12 text-white/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.4 }}
              >
                <FaCoins className="w-4 h-4 text-[#FE6F61]" />
                <span className="text-sm font-medium">Wings AI • Travel to Earn</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
