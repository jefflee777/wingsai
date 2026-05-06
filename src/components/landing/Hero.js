"use client";

import { motion } from "motion/react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center overflow-hidden pt-40 md:pt-48 pb-20"
      style={{
        background: "linear-gradient(180deg, #42C2FA 0%, #75D6FF 35%, #C2EFFF 70%, #FFFFFF 100%)",
      }}
    >
      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/30 rounded-full blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 w-full max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white font-[family-name:var(--font-display)] font-extrabold tracking-tight leading-[1.05] mb-8"
          style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", textShadow: "0px 2px 10px rgba(0,0,0,0.05)" }}
        >
          Intelligence at the<br />core of every journey
        </motion.h1>

        <motion.a
          href="#explore"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#0A0A0A] text-white px-8 py-3.5 rounded-2xl font-bold text-[15px] shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-300"
        >
          Start Exploring
        </motion.a>
      </div>

      {/* Graphic Area */}
      <div className="relative mt-20 md:mt-24 w-full h-[500px] max-w-5xl mx-auto flex items-center justify-center pointer-events-none scale-75 md:scale-100">
        
        {/* Concentric Rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[300px] h-[300px] rounded-full border border-white/40 bg-white/5 absolute" />
          <div className="w-[500px] h-[500px] rounded-full border border-white/30 absolute" />
          <div className="w-[700px] h-[700px] rounded-full border border-white/20 absolute" />
          <div className="w-[900px] h-[900px] rounded-full border border-white/10 absolute" />
        </div>

        {/* Central Logo Orb */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-30 w-[140px] h-[140px] rounded-full bg-gradient-to-br from-white to-[#F8FCFF] shadow-[0_0_80px_rgba(255,255,255,0.8),inset_0_4px_20px_rgba(0,0,0,0.05)] flex items-center justify-center border-[6px] border-white"
        >
          <div className="w-[70px] h-[70px] text-[#FF4B82]">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-lg">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>
        </motion.div>

        {/* 1. Top Left - Data/Chart */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[0%] left-[20%] md:left-[28%] w-[100px] h-[100px] bg-white rounded-[24px] shadow-2xl flex items-center justify-center p-3 z-20"
        >
          <div className="flex gap-2.5 h-full w-full justify-center">
            <div className="flex flex-col gap-1.5 items-center justify-end">
              <div className="w-[14px] h-[14px] bg-[#1A1A2E] rounded-full"></div>
              <div className="w-[14px] h-[14px] bg-[#1A1A2E] rounded-full"></div>
              <div className="w-[14px] h-[24px] bg-[#1A1A2E] rounded-full"></div>
            </div>
            <div className="flex flex-col gap-1.5 items-center justify-end">
              <div className="w-[14px] h-[14px] bg-[#4AC8F5] rounded-full"></div>
              <div className="w-[14px] h-[24px] bg-[#4AC8F5] rounded-full"></div>
            </div>
            <div className="flex flex-col gap-1.5 items-center justify-end">
              <div className="w-[14px] h-[20px] bg-gray-100 rounded-full"></div>
            </div>
          </div>
        </motion.div>

        {/* 2. Top Right - Radar/Target */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[10%] right-[15%] md:right-[25%] w-[90px] h-[90px] rounded-[24px] shadow-2xl flex items-center justify-center z-20"
          style={{ background: "linear-gradient(135deg, #FFA9A9 0%, #FF6B9E 100%)" }}
        >
           <div className="w-[50px] h-[50px] rounded-full border-2 border-white/60 flex items-center justify-center">
             <div className="w-[28px] h-[28px] rounded-full border-2 border-white/80 flex items-center justify-center">
               <div className="w-[8px] h-[8px] rounded-full bg-white"></div>
             </div>
           </div>
        </motion.div>

        {/* 3. Mid Left - Folder/Wallet */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-[40%] left-[5%] md:left-[15%] w-[100px] h-[90px] rounded-[20px] shadow-2xl overflow-hidden z-20 flex flex-col"
        >
          <div className="h-[35%] bg-[#FF7BA5] w-full flex items-center px-3 gap-1">
             <div className="w-8 h-1.5 bg-white/80 rounded-full"></div>
          </div>
          <div className="h-[65%] bg-gradient-to-b from-[#FF4B82] to-[#D12B5F] w-full"></div>
        </motion.div>

        {/* 4. Mid Right - Chat */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-[35%] right-[5%] md:right-[15%] w-[120px] h-[100px] rounded-[24px] shadow-2xl flex items-center justify-center z-20 bg-gradient-to-b from-[#E6F5FF] to-[#C9E9FF]"
        >
            <div className="w-[55px] h-[40px] bg-[#4A5568] rounded-[16px] rounded-bl-sm flex items-center justify-center gap-1.5 shadow-lg relative">
               <div className="w-2 h-2 rounded-full bg-gray-400"></div>
               <div className="w-2 h-2 rounded-full bg-gray-400"></div>
               <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            </div>
        </motion.div>

        {/* 5. Bottom Left - AI */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[5%] left-[20%] md:left-[32%] w-[90px] h-[90px] bg-[#0A0A0E] rounded-[24px] shadow-2xl flex items-center justify-center z-20 relative overflow-hidden"
        >
          <div className="absolute top-2 right-2 w-6 h-6 bg-[#1E293B] rounded-full flex items-center justify-center">
             <svg viewBox="0 0 24 24" fill="none" stroke="#4AC8F5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
               <line x1="7" y1="17" x2="17" y2="7"></line>
               <polyline points="7 7 17 7 17 17"></polyline>
             </svg>
          </div>
          <span className="text-[#4AC8F5] text-[1.75rem] font-medium tracking-tighter">AI</span>
        </motion.div>

        {/* 6. Bottom Right - 3x */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="absolute bottom-[0%] right-[20%] md:right-[32%] w-[100px] h-[100px] bg-gradient-to-br from-[#2BB1FF] to-[#0095FF] rounded-[24px] shadow-2xl flex items-center justify-center z-20"
        >
          <span className="text-white text-[2.5rem] font-bold tracking-tight">3x</span>
        </motion.div>

        {/* Small floating particles */}
        <div className="absolute w-2 h-2 bg-pink-400 rounded-full top-[25%] right-[32%] animate-pulse" />
        <div className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full bottom-[40%] left-[32%] animate-pulse delay-700" />
        <div className="absolute w-1.5 h-1.5 bg-white rounded-full top-[40%] left-[25%] animate-pulse delay-300" />
        <div className="absolute w-2 h-2 bg-[#1A1A2E] rounded-full bottom-[10%] left-[20%] animate-pulse delay-500" />
        <div className="absolute w-1 h-1 bg-yellow-400 rounded-full bottom-[20%] right-[20%] animate-pulse delay-1000" />
        <div className="absolute w-1.5 h-1.5 bg-white rounded-full top-[20%] right-[45%] animate-pulse delay-200" />
        <div className="absolute w-2 h-2 bg-pink-400 rounded-full bottom-[30%] right-[10%] animate-pulse delay-500" />

      </div>
    </section>
  );
}
