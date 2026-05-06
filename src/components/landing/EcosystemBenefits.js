"use client";

import { motion } from "motion/react";
import {
  IoShieldCheckmarkOutline,
  IoSpeedometerOutline,
  IoLeafOutline,
  IoHeartOutline,
  IoTrendingUpOutline,
  IoEarthOutline,
} from "react-icons/io5";

const benefits = [
  {
    icon: IoShieldCheckmarkOutline,
    title: "Verified Travel",
    description: "Every check-in is GPS-verified and fraud-scored. Your travel history is authentic and tamper-proof on-chain.",
    color: "#4AC8F5",
    bgAccent: "from-[#4AC8F5]/20 to-transparent",
  },
  {
    icon: IoSpeedometerOutline,
    title: "AI-Optimized Routes",
    description: "Claude AI analyzes thousands of data points to create the most rewarding and efficient travel routes for you.",
    color: "#8B5CF6",
    bgAccent: "from-[#8B5CF6]/20 to-transparent",
  },
  {
    icon: IoTrendingUpOutline,
    title: "Value Generation",
    description: "Turn every journey into tokenized value. Higher rarity scores and consistent exploration unlock premium multipliers.",
    color: "#F59E0B",
    bgAccent: "from-[#F59E0B]/20 to-transparent",
  },
  {
    icon: IoHeartOutline,
    title: "Community First",
    description: "40% of all tokens go directly to community rewards. Contributors, explorers, and content creators earn together.",
    color: "#FF4B82",
    bgAccent: "from-[#FF4B82]/20 to-transparent",
  },
  {
    icon: IoLeafOutline,
    title: "Sustainable Travel",
    description: "Bonus rewards for eco-friendly routes, local businesses, and sustainable transportation choices.",
    color: "#10B981",
    bgAccent: "from-[#10B981]/20 to-transparent",
  },
  {
    icon: IoEarthOutline,
    title: "Global Coverage",
    description: "200+ destinations with AI-curated checkpoints. New locations are continuously added based on community exploration.",
    color: "#007DF0",
    bgAccent: "from-[#007DF0]/20 to-transparent",
  },
];

export default function EcosystemBenefits() {
  return (
    <section className="py-24 relative bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-[family-name:var(--font-display)] font-extrabold text-[#0A0A0E] tracking-tighter mb-4 md:mb-6 leading-[1.1]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            The ecosystem that <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C6FF] to-[#007DF0]">rewards explorers</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium"
          >
            Wings isn't just an app it's a complete travel intelligence ecosystem designed to make every journey count.
          </motion.p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100/80 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500"
              >
                {/* Top right gradient mesh accent */}
                <div className={`absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br ${benefit.bgAccent} rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`}></div>

                {/* Number Watermark */}
                <div className="absolute -bottom-8 -right-4 text-[8rem] font-black text-gray-50 pointer-events-none font-[family-name:var(--font-display)] tracking-tighter z-0 group-hover:-translate-x-4 transition-transform duration-700">
                   0{i + 1}
                </div>

                <div className="relative z-10">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-sm border bg-white group-hover:scale-110 transition-transform duration-500"
                    style={{ borderColor: `${benefit.color}30` }}
                  >
                    <Icon className="text-2xl" style={{ color: benefit.color }} />
                  </div>

                  <h3 className="text-2xl font-bold text-[#0A0A0E] mb-4 font-[family-name:var(--font-display)] tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-500 font-medium leading-relaxed text-[1.05rem]">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Ultra-premium bottom stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 md:mt-24 bg-white rounded-[2.5rem] p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-gray-100/80 relative overflow-hidden"
        >
          {/* subtle interior glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-pink-50/50 to-cyan-50/50 opacity-50 pointer-events-none"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 relative z-10 text-center">
            {[
              { value: "200+", label: "Destinations", color: "#007DF0" },
              { value: "99.2%", label: "Verification", color: "#10B981" },
              { value: "<0.1%", label: "Fraud Rate", color: "#FF4B82" },
              { value: "4.8★", label: "User Rating", color: "#F59E0B" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex flex-col items-center justify-center">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                  className="text-4xl md:text-5xl lg:text-[4rem] font-black font-[family-name:var(--font-display)] tracking-tighter mb-3"
                  style={{ 
                     color: stat.color,
                     filter: `drop-shadow(0 10px 20px ${stat.color}30)` 
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-[0.85rem] md:text-sm font-bold text-gray-400 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
