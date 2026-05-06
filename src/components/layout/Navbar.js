"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Tokenomics", href: "#tokenomics" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-[200] flex justify-center px-4">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full px-2 py-2 flex items-center justify-between w-full max-w-3xl border border-white/60"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 pl-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6B9E] to-[#FF4B82] flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-300">
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-bold tracking-wide text-gray-900 hover:text-[#FF4B82] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center pr-1">
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-[13px] font-bold text-white bg-gradient-to-r from-[#FF7BA5] to-[#FF5C8D] hover:shadow-[0_4px_15px_rgba(255,92,141,0.4)] hover:scale-105 transition-all duration-300"
            >
              Launch App
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden pr-3 text-2xl text-gray-800"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
          </button>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[199] pt-28 bg-white/95 backdrop-blur-2xl md:hidden flex flex-col items-center gap-6"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setMobileOpen(false)}
                className="text-xl font-bold text-gray-900"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-6 inline-flex items-center px-8 py-3.5 rounded-full text-lg font-bold text-white bg-gradient-to-r from-[#FF7BA5] to-[#FF5C8D] shadow-lg"
              >
                Launch App
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
