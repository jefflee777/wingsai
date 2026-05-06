"use client";

import { motion } from "motion/react";

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-32 relative bg-[#FAFAFA]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Section header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-[family-name:var(--font-display)] font-extrabold text-[#0A0A0E] tracking-tighter"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            Your travel powerhouse
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Top Wide Card (Col span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-14 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100/80 flex flex-col md:flex-row items-center gap-8 md:gap-16 relative overflow-hidden group"
          >
            <div className="flex-1 z-10">
              <h3 className="text-3xl md:text-[2.5rem] font-bold text-[#0A0A0E] mb-5 leading-tight font-[family-name:var(--font-display)] tracking-tight">
                AI-Powered Itineraries
              </h3>
              <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-lg font-medium">
                Generate optimal routes with natural language, not static maps. The platform transforms your inputs into optimized, high-performance travel plans.
              </p>
            </div>
            
            {/* Graphic for Card 1 (Donut Chart) */}
            <div className="flex-1 relative w-full h-[250px] md:h-[350px] flex items-center justify-center">
              <div className="relative w-[220px] h-[220px] md:w-[280px] md:h-[280px] group-hover:scale-105 transition-transform duration-700">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-2xl">
                  {/* Background full Dark segment */}
                  <circle cx="50" cy="50" r="30" fill="none" stroke="#1E1E2E" strokeWidth="22" />
                  {/* Light blue overlay */}
                  <circle cx="50" cy="50" r="30" fill="none" stroke="#4AC8F5" strokeWidth="22" strokeDasharray="188.5" strokeDashoffset="75.4" />
                  {/* Blue overlay */}
                  <circle cx="50" cy="50" r="30" fill="none" stroke="#007DF0" strokeWidth="22" strokeDasharray="188.5" strokeDashoffset="131.95" />
                  {/* Pink overlay */}
                  <circle cx="50" cy="50" r="30" fill="none" stroke="#FF4B82" strokeWidth="22" strokeDasharray="188.5" strokeDashoffset="169.65" />
                  
                  {/* Inner white circle for donut hole */}
                  <circle cx="50" cy="50" r="18" fill="white" />

                  {/* Lines separating segments */}
                  <path d="M 50 50 L 50 20" stroke="white" strokeWidth="2" />
                  <path d="M 50 50 L 78 40" stroke="white" strokeWidth="2" />
                  <path d="M 50 50 L 68 74" stroke="white" strokeWidth="2" />
                  <path d="M 50 50 L 26 68" stroke="white" strokeWidth="2" />
                </svg>
                
                {/* Floating decor elements */}
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-4 -right-6 md:-right-10 px-4 py-3 bg-white rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00C6FF]"></div>
                  <div className="w-8 h-2 rounded-full bg-gray-200"></div>
                </motion.div>
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-4 -right-10 md:-right-16 px-4 py-3 bg-white rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center gap-3">
                  <div className="w-8 h-2 rounded-full bg-[#1A1A2E]"></div>
                  <div className="w-4 h-2 rounded-full bg-pink-400"></div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Left Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100/80 relative overflow-hidden flex flex-col group"
          >
            <div className="mb-8 z-10 relative">
              <h3 className="text-3xl md:text-[2.25rem] font-bold text-[#0A0A0E] mb-5 leading-[1.1] font-[family-name:var(--font-display)] tracking-tight">
                Interactive<br />Route Maps
              </h3>
              <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-medium">
                Fully customizable,<br />shareable, and<br />export-ready.
              </p>
            </div>
            
            {/* Graphic for Card 2 (Line Chart) */}
            <div className="flex-1 min-h-[220px] relative mt-auto flex items-end justify-center group-hover:scale-105 transition-transform duration-700">
              {/* Background grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
              
              {/* Line chart */}
              <svg className="w-[120%] h-[160px] overflow-visible relative z-10 left-[-10%]" viewBox="0 0 200 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FF4B82" />
                    <stop offset="100%" stopColor="#4AC8F5" />
                  </linearGradient>
                </defs>
                <path d="M 0 90 L 40 70 L 90 85 L 150 40 L 200 20" fill="none" stroke="url(#lineGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="40" cy="70" r="4" fill="white" stroke="#FF4B82" strokeWidth="3" />
                <circle cx="90" cy="85" r="4" fill="white" stroke="#FF4B82" strokeWidth="3" />
                
                {/* Active point with pulse */}
                <circle cx="150" cy="40" r="6" fill="#1E1E2E" stroke="white" strokeWidth="3" className="drop-shadow-md" />
                <circle cx="150" cy="40" r="14" fill="none" stroke="#1E1E2E" strokeWidth="2" opacity="0.3" />
                <circle cx="150" cy="40" r="22" fill="none" stroke="#1E1E2E" strokeWidth="1" opacity="0.1" />
              </svg>
            </div>
          </motion.div>

          {/* Bottom Right Card (Blue) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-[#4AC8F5] to-[#007DF0] rounded-[2.5rem] p-8 md:p-14 shadow-[0_20px_50px_rgba(0,125,240,0.2)] relative overflow-hidden flex flex-col group"
          >
            <div className="mb-8 z-10 relative">
              <h3 className="text-3xl md:text-[2.25rem] font-bold text-white mb-5 leading-[1.1] font-[family-name:var(--font-display)] tracking-tight">
                Unified travel<br />center
              </h3>
            </div>
            
            {/* Graphic for Card 3 (UI Window with floating glass elements) */}
            <div className="flex-1 min-h-[220px] relative mt-auto flex items-end justify-center w-full group-hover:scale-105 transition-transform duration-700">
              {/* Window mock */}
              <div className="w-[110%] h-[180px] bg-white/10 backdrop-blur-2xl rounded-t-2xl border border-white/20 relative translate-y-8 flex flex-col shadow-2xl">
                <div className="h-10 border-b border-white/10 flex items-center px-5 gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/30"></div>
                  <div className="w-3 h-3 rounded-full bg-white/30"></div>
                  <div className="w-3 h-3 rounded-full bg-white/30"></div>
                </div>
                <div className="p-6 flex-1 flex flex-col gap-4">
                  <div className="w-full h-6 bg-white/10 rounded-md border border-white/5"></div>
                  <div className="w-3/4 h-6 bg-white/10 rounded-md border border-white/5"></div>
                </div>
              </div>
              
              {/* Floating tags */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
                className="absolute top-[10%] right-[5%] px-5 py-3 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl text-white text-sm font-semibold shadow-[0_15px_30px_rgba(0,0,0,0.1)]"
              >
                Cmd + T
              </motion.div>
              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
                className="absolute bottom-[30%] left-[5%] px-5 py-3 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl text-white text-sm font-semibold shadow-[0_15px_30px_rgba(0,0,0,0.1)]"
              >
                Cmd + W
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
