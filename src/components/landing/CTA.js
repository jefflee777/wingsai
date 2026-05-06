"use client";

import { motion } from "motion/react";
import Link from "next/link";

import { RiBnbLine, RiTwitterXFill } from "react-icons/ri";

export default function CTA() {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-between overflow-hidden pt-32 pb-8"
    style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #E0F7FF 20%, #00C6FF 60%, #007DF0 100%)",
      }}>
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
            className="font-[family-name:var(--font-display)] font-extrabold tracking-tighter leading-[1.05] mb-6 "
            style={{ textShadow: "0 10px 40px rgba(0,0,0,0.08)", fontSize: "clamp(3rem, 8vw, 6rem)" }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-lg">
               Turn your travels into<br className="hidden md:block"/> real rewards
            </span>
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
                <RiTwitterXFill className="text-lg" />
                Follow on X
             </Link>
             <Link href="https://bscscan.com" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm font-semibold bg-black/5 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/20 hover:bg-black/10">
                <RiBnbLine className="text-lg" />
                Bsc scan
             </Link>
          </div>
          <div className="text-white/60 text-[11px] font-semibold tracking-widest">
            © {new Date().getFullYear()} Wings
          </div>
       </div>
    </section>
  );
}
