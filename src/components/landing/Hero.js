"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { IoRocketOutline } from "react-icons/io5";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center overflow-hidden pt-36 md:pt-44 pb-32"
      style={{
        background: "linear-gradient(180deg, #007DF0 0%, #00C6FF 40%, #E0F7FF 80%, #FFFFFF 100%)",
      }}
    >
      {/* Background ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-white/20 rounded-full blur-[100px] mix-blend-overlay" />
        <div className="absolute top-[30%] right-[10%] w-[600px] h-[600px] bg-[#00C6FF]/30 rounded-full blur-[120px] mix-blend-soft-light" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 w-full max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-[family-name:var(--font-display)] font-extrabold tracking-tighter leading-[1.05] mb-6"
          style={{ fontSize: "clamp(3.5rem, 8vw, 6.5rem)" }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-lg">
            Explore the World.<br />Earn $WINGS.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-[22px] text-white/90 font-medium max-w-2xl mb-12 leading-relaxed drop-shadow-sm"
        >
          Experience the future of travel. Let AI optimize your itinerary, earn $WINGS tokens for exploring, and unlock exclusive rewards.
        </motion.p>

        <motion.a
          href="/dashboard"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="group relative inline-flex items-center justify-center gap-4 px-2 py-2 pr-6 bg-white text-[#007DF0] rounded-[2rem] font-bold text-[16px] shadow-[0_20px_40px_rgba(0,125,240,0.3)] hover:shadow-[0_25px_50px_rgba(0,125,240,0.4)] hover:-translate-y-1 transition-all duration-500 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#E0F7FF]/0 via-[#E0F7FF]/60 to-[#E0F7FF]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10 w-12 h-12 rounded-full bg-[#007DF0] flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)] group-hover:scale-105 transition-transform duration-300">
            <IoRocketOutline className="text-xl text-white" />
          </div>
          <span className="relative z-10 tracking-wide">Launch Dashboard</span>
          <div className="relative z-10 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-[#007DF0]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </motion.a>
      </div>

      {/* Graphic Area */}
      <div className="relative mt-24 md:mt-32 w-full h-[500px] max-w-6xl mx-auto flex items-center justify-center pointer-events-none scale-75 md:scale-100">

        {/* Concentric Rings */}
        <div className="absolute inset-0 flex items-center justify-center opacity-80">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 150, repeat: Infinity, ease: "linear" }} className="w-[320px] h-[320px] rounded-full border border-white/20 absolute border-dashed" />
          <div className="w-[500px] h-[500px] rounded-full border border-white/10 absolute" />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 200, repeat: Infinity, ease: "linear" }} className="w-[700px] h-[700px] rounded-full border border-white/10 absolute border-dashed" />
          <div className="w-[900px] h-[900px] rounded-full border border-white/5 absolute" />
        </div>

        {/* Central Logo Orb */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, type: "spring", bounce: 0.4 }}
          className="relative z-30 w-[160px] h-[160px] rounded-full bg-white shadow-[0_30px_60px_rgba(0,0,0,0.15),0_0_100px_rgba(255,255,255,0.5),inset_0_4px_20px_rgba(0,0,0,0.05)] flex items-center justify-center border-[8px] border-white/90 backdrop-blur-xl group"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00C6FF]/10 to-[#007DF0]/10 blur-xl group-hover:opacity-100 transition-opacity"
          />
          <div className="relative w-[85px] h-[85px] rounded-[22px] bg-[var(--color-primary)] flex items-center justify-center shadow-[0_10px_30px_rgba(0,125,240,0.4)] overflow-hidden">
            <Image
              src="/logo.png"
              alt="Wings Logo"
              width={50}
              height={50}
              className="drop-shadow-lg relative z-10"
            />
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent z-10" />
          </div>
        </motion.div>

        {/* 1. Top Left - Data/Chart */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 2, -1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[0%] left-[18%] md:left-[24%] w-[110px] h-[110px] bg-white/95 backdrop-blur-2xl rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.5)] flex items-center justify-center p-4 z-20 border border-white/60"
        >
          <div className="flex gap-3 h-full w-full justify-center">
            <div className="flex flex-col gap-2 items-center justify-end">
              <div className="w-[16px] h-[16px] bg-gray-800 rounded-full shadow-sm"></div>
              <div className="w-[16px] h-[16px] bg-gray-800 rounded-full shadow-sm"></div>
              <div className="w-[16px] h-[28px] bg-gray-800 rounded-full shadow-sm"></div>
            </div>
            <div className="flex flex-col gap-2 items-center justify-end">
              <div className="w-[16px] h-[16px] bg-[#00C6FF] rounded-full shadow-[0_0_10px_rgba(0,198,255,0.5)]"></div>
              <div className="w-[16px] h-[28px] bg-[#00C6FF] rounded-full shadow-[0_0_10px_rgba(0,198,255,0.5)]"></div>
            </div>
            <div className="flex flex-col gap-2 items-center justify-end">
              <div className="w-[16px] h-[24px] bg-gray-200 rounded-full shadow-inner"></div>
            </div>
          </div>
        </motion.div>

        {/* 2. Top Right - Radar/Target */}
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -3, 2, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[8%] right-[15%] md:right-[22%] w-[100px] h-[100px] rounded-[28px] shadow-[0_20px_40px_rgba(255,107,158,0.3),inset_0_2px_4px_rgba(255,255,255,0.4)] flex items-center justify-center z-20 border border-white/40"
          style={{ background: "linear-gradient(135deg, #FFA9A9 0%, #FF4B82 100%)" }}
        >
          <div className="w-[55px] h-[55px] rounded-full border-[3px] border-white/70 flex items-center justify-center shadow-inner">
            <div className="w-[30px] h-[30px] rounded-full border-[3px] border-white/90 flex items-center justify-center">
              <div className="w-[10px] h-[10px] rounded-full bg-white shadow-sm"></div>
            </div>
          </div>
        </motion.div>

        {/* 3. Mid Left - Folder/Wallet */}
        <motion.div
          animate={{ y: [0, -18, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-[42%] left-[2%] md:left-[10%] w-[110px] h-[100px] rounded-[24px] shadow-[0_20px_40px_rgba(255,75,130,0.25)] overflow-hidden z-20 flex flex-col border border-white/50 backdrop-blur-xl bg-white/40"
        >
          <div className="h-[35%] bg-white/90 w-full flex items-center px-4 gap-2 backdrop-blur-md">
            <div className="w-8 h-2 bg-gray-200 rounded-full shadow-inner"></div>
            <div className="w-2 h-2 bg-gradient-to-r from-[#FF4B82] to-[#FF7BA5] rounded-full shadow-sm"></div>
          </div>
          <div className="h-[65%] bg-gradient-to-br from-[#FF4B82] to-[#D12B5F] w-full relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-12 h-12 bg-white/10 rounded-full blur-md"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-1 bg-white/30 rounded-full shadow-sm"></div>
          </div>
        </motion.div>

        {/* 4. Mid Right - Chat */}
        <motion.div
          animate={{ y: [0, 14, 0], rotate: [2, -1, 2] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-[38%] right-[2%] md:right-[10%] w-[130px] h-[110px] rounded-[28px] shadow-[0_20px_40px_rgba(0,125,240,0.15),inset_0_2px_4px_rgba(255,255,255,0.5)] flex items-center justify-center z-20 bg-white/90 backdrop-blur-2xl border border-white/60"
        >
          <div className="w-[65px] h-[50px] bg-gradient-to-br from-gray-700 to-gray-900 rounded-[20px] rounded-bl-sm flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(0,0,0,0.2)] relative border border-gray-600">
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 rounded-full bg-[#00C6FF] shadow-[0_0_8px_rgba(0,198,255,0.8)]"></motion.div>
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} className="w-2 h-2 rounded-full bg-[#00C6FF] shadow-[0_0_8px_rgba(0,198,255,0.8)]"></motion.div>
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} className="w-2 h-2 rounded-full bg-[#00C6FF] shadow-[0_0_8px_rgba(0,198,255,0.8)]"></motion.div>
          </div>
        </motion.div>



        {/* 6. Bottom Right - 3x */}
        <motion.div
          animate={{ y: [0, 15, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="absolute bottom-[0%] right-[18%] md:right-[28%] w-[110px] h-[110px] bg-gradient-to-br from-[#00C6FF] to-[#007DF0] rounded-[28px] shadow-[0_25px_50px_rgba(0,125,240,0.4),inset_0_2px_4px_rgba(255,255,255,0.3)] flex items-center justify-center z-20 border border-[#4AC8F5]/50 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/20 rounded-full blur-xl" />
          <span className="relative z-10 text-white text-[3rem] font-black tracking-tight drop-shadow-lg">3x</span>
        </motion.div>

      </div>
    </section>
  );
}
