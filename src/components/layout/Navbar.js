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
      <div className="fixed top-6 left-0 right-0 z-[200] flex justify-center px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto bg-white/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-full px-3 py-2.5 flex items-center justify-between w-full max-w-4xl border border-white/60 ring-1 ring-black/5"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 pl-2 group">
            <div className="relative w-10 h-10 rounded-full bg-[#007DF0] flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-300 border-[3px] border-white/50">
              <Image
                src="/logo.png"
                alt="Wings"
                width={20}
                height={20}
                className="relative z-10 drop-shadow-md brightness-0 invert"
              />
            </div>
            <span className="text-[18px] font-bold font-[family-name:var(--font-display)] tracking-tight text-[#0A0A0E] ml-1">
              Wings
            </span>
          </Link>

          {/* Desktop Nav (Nested Pill) */}
          <div className="hidden md:flex items-center gap-8 bg-white/50 px-8 py-3 rounded-full shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)] border border-white/80">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-bold tracking-wide text-gray-500 hover:text-[#0A0A0E] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center pr-1">
            <Link
              href="/login"
              className="group relative inline-flex items-center gap-2 justify-center px-7 py-3 rounded-full text-[13px] font-bold text-white bg-[#0A0A0E] shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              {/* Sweeping shine effect */}
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                <div className="relative h-full w-8 bg-white/20" />
              </div>
              <IoRocketOutline className="text-[15px] relative z-10" />
              <span className="relative z-10">Launch App</span>
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
            className="fixed inset-0 z-[199] pt-32 bg-white/80 backdrop-blur-3xl md:hidden flex flex-col items-center gap-6"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-bold text-gray-900 tracking-tight font-[family-name:var(--font-display)]"
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
                className="mt-8 inline-flex items-center gap-2 px-10 py-4 rounded-full text-lg font-bold text-white bg-[#0A0A0E] shadow-xl"
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
