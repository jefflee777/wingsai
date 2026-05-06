"use client";

import { motion } from "motion/react";

export default function Features() {
  return (
    <section id="features" className="py-24 relative bg-white">
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
              <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-lg font-medium mb-6">
                Generate optimal routes with natural language, not static maps. The platform transforms your inputs into optimized, high-performance travel plans.
              </p>
              <div className="flex items-center gap-4">
                <span className="px-4 py-2 bg-blue-50 text-[#007DF0] rounded-full sm:text-sm text-xs font-bold border border-blue-100">Smart Routing</span>
                <span className="px-4 py-2 bg-pink-50 text-[#FF4B82] rounded-full sm:text-sm text-xs font-bold border border-pink-100">Dynamic Adjustments</span>
              </div>
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

                {/* Highly detailed floating cards */}
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-8 -left-4 md:-left-12 px-4 py-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col gap-1 z-20">
                  <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">AI Score</div>
                  <div className="text-xl font-black text-[#00C6FF]">98.5%</div>
                </motion.div>
                
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute bottom-10 -left-6 md:-left-16 px-4 py-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-3 z-20">
                  <div className="w-8 h-8 rounded-full bg-[#1A1A2E] flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400">OPTIMIZED</div>
                    <div className="text-sm font-bold text-gray-800">Route found</div>
                  </div>
                </motion.div>
                
                {/* Floating decor elements */}
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }} className="absolute -top-4 -right-6 md:-right-10 px-4 py-3 bg-white rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00C6FF]"></div>
                  <div className="w-8 h-2 rounded-full bg-gray-200"></div>
                </motion.div>
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5.5, repeat: Infinity, delay: 1.5 }} className="absolute bottom-4 -right-10 md:-right-16 px-4 py-3 bg-white rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center gap-3">
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
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100 shadow-sm">
                 <svg className="w-6 h-6 text-[#FF4B82]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h3 className="text-3xl md:text-[2.25rem] font-bold text-[#0A0A0E] mb-5 leading-[1.1] font-[family-name:var(--font-display)] tracking-tight">
                Interactive<br />Route Maps
              </h3>
              <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-medium">
                Fully customizable,<br />shareable, and<br />export-ready.
              </p>
            </div>
            
            {/* Graphic for Card 2 (Line Chart) */}
            <div className="flex-1 min-h-[220px] relative mt-auto flex items-end justify-center group-hover:scale-105 transition-transform duration-700 w-full">
              {/* Background grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
              
              {/* Floating map pins */}
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-[20%] left-[25%] flex flex-col items-center z-20">
                 <div className="px-2.5 py-1 bg-[#FF4B82] text-white text-[10px] font-bold rounded-md shadow-lg mb-1">Paris</div>
                 <div className="w-2.5 h-2.5 bg-[#FF4B82] rounded-full border-2 border-white shadow-sm"></div>
              </motion.div>
              
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 1 }} className="absolute top-[45%] left-[50%] flex flex-col items-center z-20">
                 <div className="px-2.5 py-1 bg-[#4AC8F5] text-white text-[10px] font-bold rounded-md shadow-lg mb-1">Tokyo</div>
                 <div className="w-2.5 h-2.5 bg-[#4AC8F5] rounded-full border-2 border-white shadow-sm"></div>
              </motion.div>

              {/* Line chart */}
              <svg className="w-[120%] h-[160px] overflow-visible relative z-10 left-[-10%]" viewBox="0 0 200 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FF4B82" />
                    <stop offset="100%" stopColor="#4AC8F5" />
                  </linearGradient>
                </defs>
                <path d="M 0 90 L 40 70 L 90 85 L 150 40 L 200 20" fill="none" stroke="url(#lineGrad)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="40" cy="70" r="5" fill="white" stroke="#FF4B82" strokeWidth="3" />
                <circle cx="90" cy="85" r="5" fill="white" stroke="#FF4B82" strokeWidth="3" />
                
                {/* Active point with pulse */}
                <circle cx="150" cy="40" r="7" fill="#1E1E2E" stroke="white" strokeWidth="3" className="drop-shadow-lg" />
                <circle cx="150" cy="40" r="16" fill="none" stroke="#1E1E2E" strokeWidth="2" opacity="0.3" />
                <circle cx="150" cy="40" r="24" fill="none" stroke="#1E1E2E" strokeWidth="1" opacity="0.1" />
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
              <p className="text-blue-100 text-lg md:text-xl leading-relaxed font-medium max-w-[80%]">
                One command center for tracking, verifying, and claiming tokens.
              </p>
            </div>
            
            {/* Graphic for Card 3 (UI Window with floating glass elements) */}
            <div className="flex-1 min-h-[220px] relative mt-auto flex items-end justify-center w-full group-hover:scale-105 transition-transform duration-700">
              {/* Complex Window mock */}
              <div className="w-[110%] h-[200px] bg-white/10 backdrop-blur-2xl rounded-t-2xl border border-white/20 relative translate-y-8 flex flex-col shadow-2xl overflow-hidden">
                <div className="h-12 border-b border-white/10 flex items-center px-5 gap-2 bg-white/5">
                  <div className="w-3 h-3 rounded-full bg-white/30"></div>
                  <div className="w-3 h-3 rounded-full bg-white/30"></div>
                  <div className="w-3 h-3 rounded-full bg-white/30"></div>
                  {/* Search bar mock */}
                  <div className="ml-4 flex-1 h-7 bg-white/10 rounded-full border border-white/5 flex items-center px-3">
                     <div className="w-2 h-2 rounded-full bg-white/40"></div>
                  </div>
                </div>
                <div className="p-5 flex-1 flex gap-5">
                  {/* Sidebar mock */}
                  <div className="w-1/4 h-full flex flex-col gap-3">
                    <div className="w-full h-4 bg-white/20 rounded border border-white/10"></div>
                    <div className="w-3/4 h-4 bg-white/10 rounded border border-white/5"></div>
                    <div className="w-5/6 h-4 bg-white/10 rounded border border-white/5"></div>
                  </div>
                  {/* Main content mock */}
                  <div className="w-3/4 h-full flex flex-col gap-4">
                    <div className="w-full h-16 bg-gradient-to-r from-white/10 to-white/5 rounded-xl border border-white/10"></div>
                    <div className="flex gap-3">
                      <div className="flex-1 h-16 bg-white/10 rounded-xl border border-white/5 relative overflow-hidden">
                         <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/20 to-transparent"></div>
                      </div>
                      <div className="flex-1 h-16 bg-white/10 rounded-xl border border-white/5 relative overflow-hidden">
                         <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/20 to-transparent"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating tags */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
                className="absolute top-[5%] right-[2%] px-4 py-2.5 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl text-white text-xs font-bold shadow-[0_15px_30px_rgba(0,0,0,0.15)] flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-[#00C6FF]"></div>
                Live Sync
              </motion.div>
              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
                className="absolute bottom-[20%] left-[2%] px-4 py-2.5 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl text-white text-xs font-bold shadow-[0_15px_30px_rgba(0,0,0,0.15)] flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-[#FF4B82]"></div>
                Global
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
