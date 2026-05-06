"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { IoLogoTwitter } from "react-icons/io5";

export default function CTA() {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-between bg-gradient-to-b from-[#4AC8F5] to-[#00C6FF] overflow-hidden pt-32 pb-8">
       {/* Huge Background Text Watermark (Faded Glass Effect) */}
       <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none select-none z-0 overflow-hidden">
          <h1 
             className="text-[35vw] md:text-[32vw] leading-none font-bold font-[family-name:var(--font-display)] tracking-tighter"
             style={{ 
               background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 80%)",
               WebkitBackgroundClip: "text",
               WebkitTextFillColor: "transparent",
               transform: "translateY(25%)"
             }}
          >
             Wings
          </h1>
       </div>

       {/* Main CTA Content */}
       <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 -mt-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[2.75rem] sm:text-5xl md:text-[5.5rem] lg:text-[6.5rem] font-medium text-white tracking-tighter mb-10 max-w-4xl font-[family-name:var(--font-display)] leading-[0.95]"
            style={{ textShadow: "0 10px 40px rgba(0,0,0,0.08)" }}
          >
             Turn your travels into<br className="hidden md:block"/> real rewards
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
             <button className="px-10 py-5 bg-white text-[#0A0A0E] rounded-[1.25rem] font-bold text-xl tracking-tight shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:scale-105 hover:shadow-[0_20px_50px_rgba(255,255,255,0.4)] transition-all duration-300">
                Launch dashboard
             </button>
          </motion.div>
       </div>

       {/* Footer links */}
       <div className="relative z-10 flex flex-col items-center justify-center gap-6 mt-auto">
          <div className="flex items-center gap-8">
             <Link href="https://twitter.com" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm font-semibold bg-black/5 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/20 hover:bg-black/10">
                <IoLogoTwitter className="text-lg" />
                Follow on X
             </Link>
             <Link href="https://bscscan.com" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm font-semibold bg-black/5 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/20 hover:bg-black/10">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                Bsc scan
             </Link>
          </div>
          <div className="text-white/60 text-[11px] font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} Wings Project
          </div>
       </div>
    </section>
  );
}
