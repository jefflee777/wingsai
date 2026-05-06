"use client";

import { motion } from "motion/react";
import { IoSyncOutline } from "react-icons/io5";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Section header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-[family-name:var(--font-display)] font-extrabold text-[#0A0A0E] tracking-tighter mb-4 md:mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            Travel flow and functionality
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium"
          >
            See how Wings brings structure, speed, and intelligence to every layer of your travel workflows from planning to rewards.
          </motion.p>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-[#FCFCFC] rounded-[2.5rem] h-[350px] md:h-[400px] p-8 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03),0_10px_40px_rgba(0,0,0,0.02)] relative overflow-hidden flex items-center justify-center group">
               {/* Background cross pattern */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_80%,transparent_100%)] opacity-50"></div>
               
               {/* Graphic Mock */}
               <div className="relative w-[240px] h-[260px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100/80 p-6 flex flex-col gap-4 z-10 group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-2">
                     
                     <span className="text-sm font-bold text-gray-800">Itinerary</span>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                     <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        <span>Locations</span>
                        <span>12/15</span>
                     </div>
                     <div className="w-full h-2 flex gap-0.5">
                        {Array.from({length: 20}).map((_, i) => (
                           <div key={i} className={`flex-1 h-full rounded-sm ${i < 16 ? 'bg-red-400' : 'bg-gray-100'}`}></div>
                        ))}
                     </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                     <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        <span>Optimization</span>
                        <span>98/100</span>
                     </div>
                     <div className="w-full h-2 flex gap-0.5">
                        {Array.from({length: 20}).map((_, i) => (
                           <div key={i} className={`flex-1 h-full rounded-sm ${i < 19 ? 'bg-[#4AC8F5]' : 'bg-gray-100'}`}></div>
                        ))}
                     </div>
                  </div>

                  <div className="flex flex-col gap-2">
                     <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        <span>Rewards</span>
                        <span>450/500</span>
                     </div>
                     <div className="w-full h-2 flex gap-0.5">
                        {Array.from({length: 20}).map((_, i) => (
                           <div key={i} className={`flex-1 h-full rounded-sm ${i < 18 ? 'bg-[#007DF0]' : 'bg-gray-100'}`}></div>
                        ))}
                     </div>
                  </div>

                  {/* Floating Buttons with cursors */}
                  <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -right-6 top-[35%] flex items-center gap-1 drop-shadow-xl z-20">
                    <svg className="w-5 h-5 text-[#111] drop-shadow-md -rotate-[15deg] absolute -left-4 top-2" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2l12 11.2-5.8.5 3.3 7.3-2.2.9-3.2-7.4-4.4 4.8z" stroke="white" strokeWidth="1"/></svg>
                    <div className="px-3 py-1.5 bg-[#4AC8F5] text-white text-[11px] font-bold rounded-full">Apply</div>
                  </motion.div>
                  
                  <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} className="absolute -left-6 bottom-[15%] flex items-center gap-1 drop-shadow-xl z-20">
                    <div className="px-3 py-1.5 bg-[#FF4B82] text-white text-[11px] font-bold rounded-full">Sync</div>
                    <svg className="w-5 h-5 text-[#111] drop-shadow-md -rotate-[60deg] absolute -right-3 top-2" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2l12 11.2-5.8.5 3.3 7.3-2.2.9-3.2-7.4-4.4 4.8z" stroke="white" strokeWidth="1"/></svg>
                  </motion.div>
               </div>
            </div>
            
            <div className="px-2">
              <h3 className="text-2xl md:text-[1.6rem] font-bold text-[#0A0A0E] mb-3 leading-tight tracking-tight font-[family-name:var(--font-display)]">
                Intelligent routing
              </h3>
              <p className="text-gray-500 text-[1.05rem] leading-relaxed font-medium">
                Wings connects insights to action, integrating with real-time conditions, automating route updates, and triggering reward drops.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-[#FCFCFC] rounded-[2.5rem] h-[350px] md:h-[400px] p-8 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03),0_10px_40px_rgba(0,0,0,0.02)] relative overflow-hidden flex items-center justify-center group">
               {/* Background cross pattern */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_80%,transparent_100%)] opacity-50"></div>
               
               {/* 4 surrounding faint cards */}
               <div className="absolute top-[12%] w-28 h-20 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center justify-center opacity-70"></div>
               <div className="absolute bottom-[12%] w-28 h-20 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center justify-center opacity-70"></div>
               <div className="absolute left-[8%] w-20 h-28 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center justify-center opacity-70">
                 <div className="w-6 h-6 bg-gray-100 rounded-md"></div>
               </div>
               <div className="absolute right-[8%] w-20 h-28 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center justify-center opacity-70">
                 <div className="w-6 h-6 bg-gray-100 rounded-md"></div>
               </div>

               {/* Center Node */}
               <div className="relative z-10 w-28 h-28 bg-[#0F0F1A] rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.25)] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ring-[10px] ring-white">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                    <IoSyncOutline className="text-white text-4xl stroke-[3]" />
                  </motion.div>
                  {/* Glowing aura */}
                  <div className="absolute inset-0 rounded-full bg-blue-500 opacity-20 blur-xl"></div>
               </div>
            </div>

            <div className="px-2">
              <h3 className="text-2xl md:text-[1.6rem] font-bold text-[#0A0A0E] mb-3 leading-tight tracking-tight font-[family-name:var(--font-display)]">
                Seamless GPS sync
              </h3>
              <p className="text-gray-500 text-[1.05rem] leading-relaxed font-medium">
                Wings seamlessly syncs your real-world location across devices in real time, giving you a unified, always-accurate verification layer.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-[#FCFCFC] rounded-[2.5rem] h-[350px] md:h-[400px] p-8 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03),0_10px_40px_rgba(0,0,0,0.02)] relative overflow-hidden flex items-center justify-center group">
               {/* Background cross pattern */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_80%,transparent_100%)] opacity-50"></div>

               {/* Layered Cards Graphic */}
               <div className="relative w-[200px] h-[220px]">
                  {/* Back Pink Card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF4B82] to-[#FF8FA3] rounded-3xl shadow-[0_20px_40px_rgba(255,75,130,0.3)] transform rotate-[-12deg] origin-bottom-left group-hover:rotate-[-16deg] transition-transform duration-500 p-6 flex flex-col justify-end">
                     <div className="w-10 h-1.5 bg-white/50 rounded-full mb-4"></div>
                     <div className="w-full h-1.5 bg-white/30 rounded-full mb-3"></div>
                     <div className="w-3/4 h-1.5 bg-white/30 rounded-full mb-3"></div>
                     <div className="w-5/6 h-1.5 bg-white/30 rounded-full"></div>
                  </div>
                  
                  {/* Front White Card */}
                  <div className="absolute inset-0 bg-white rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-gray-100 transform rotate-[6deg] origin-bottom-right group-hover:rotate-[10deg] transition-transform duration-500 p-6 flex flex-col gap-4">
                     <div className="w-full h-28 bg-gray-50 rounded-2xl border border-gray-100 mb-2 flex items-center justify-center shadow-inner">
                        <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                     </div>
                     <div className="w-16 h-2.5 bg-gray-200 rounded-full"></div>
                     <div className="w-full h-2 bg-gray-100 rounded-full"></div>
                     <div className="w-4/5 h-2 bg-gray-100 rounded-full"></div>
                  </div>
               </div>
            </div>

            <div className="px-2">
              <h3 className="text-2xl md:text-[1.6rem] font-bold text-[#0A0A0E] mb-3 leading-tight tracking-tight font-[family-name:var(--font-display)]">
                On-chain identity
              </h3>
              <p className="text-gray-500 text-[1.05rem] leading-relaxed font-medium">
                Every verified visit and reward stays permanently linked to your wallet, enabling context-rich exploration and indisputable proof.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
