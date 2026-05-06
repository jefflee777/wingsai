"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { IoRocketOutline } from "react-icons/io5";

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
            <div className="relative w-9 h-9 rounded-xl bg-[var(--color-primary)] flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo.png"
                alt="Wings"
                width={24}
                height={24}
                className="relative z-10 drop-shadow-sm"
              />
            </div>
            <span className="text-[17px] font-bold font-[family-name:var(--font-display)] tracking-tight text-gray-900 ml-1">
              Wings
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-bold tracking-wide text-gray-900 hover:text-[#007DF0] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center pr-1">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 justify-center px-6 py-2.5 rounded-full text-[13px] font-bold text-white bg-gradient-to-r from-[#4AC8F5] via-[#2BB1FF] to-[#007DF0] hover:shadow-[0_4px_15px_rgba(43,177,255,0.4)] hover:scale-105 transition-all duration-300 border border-white/20"
            >
              <IoRocketOutline className="text-[15px]" />
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
                className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-lg font-bold text-white bg-gradient-to-r from-[#4AC8F5] via-[#2BB1FF] to-[#007DF0] shadow-[0_8px_20px_rgba(43,177,255,0.3)]"
              >
                <IoRocketOutline />
                Launch App
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
