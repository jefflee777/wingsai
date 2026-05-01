"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { HiOutlineSparkles } from "react-icons/hi2";
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
    color: "#5BC0EB",
  },
  {
    icon: IoSpeedometerOutline,
    title: "AI-Optimized Routes",
    description: "Claude AI analyzes thousands of data points to create the most rewarding and efficient travel routes for you.",
    color: "#8B5CF6",
  },
  {
    icon: IoTrendingUpOutline,
    title: "Value Generation",
    description: "Turn every journey into tokenized value. Higher rarity scores and consistent exploration unlock premium multipliers.",
    color: "#F59E0B",
  },
  {
    icon: IoHeartOutline,
    title: "Community First",
    description: "40% of all tokens go directly to community rewards. Contributors, explorers, and content creators earn together.",
    color: "#FF6B9A",
  },
  {
    icon: IoLeafOutline,
    title: "Sustainable Travel",
    description: "Bonus rewards for eco-friendly routes, local businesses, and sustainable transportation choices.",
    color: "#10B981",
  },
  {
    icon: IoEarthOutline,
    title: "Global Coverage",
    description: "200+ destinations with AI-curated checkpoints. New locations are continuously added based on community exploration.",
    color: "#06B6D4",
  },
];

export default function EcosystemBenefits() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-narrow relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 mb-6">
            <HiOutlineSparkles className="text-[var(--color-primary)] text-sm" />
            <span className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider">
              Why Wings
            </span>
          </div>
          <h2
            className="font-[family-name:var(--font-display)] font-extrabold text-[var(--color-text)] mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}
          >
            The Ecosystem That{" "}
            <span className="gradient-text">Rewards Explorers</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Wings isn't just an app — it's a complete travel intelligence
            ecosystem designed to make every journey count.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative bg-white rounded-2xl p-7 border border-[var(--color-border)] hover:border-transparent hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                {/* Hover gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${benefit.color}, transparent 70%)`,
                  }}
                />

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-xl transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${benefit.color}10`,
                    color: benefit.color,
                  }}
                >
                  <Icon />
                </div>

                <h3 className="text-lg font-bold text-[var(--color-text)] mb-2 font-[family-name:var(--font-display)]">
                  {benefit.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 bg-white rounded-2xl border border-[var(--color-border)] p-8 shadow-lg"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "200+", label: "Destinations", color: "#5BC0EB" },
              { value: "99.2%", label: "Verification Rate", color: "#10B981" },
              { value: "< 0.1%", label: "Fraud Rate", color: "#EF4444" },
              { value: "4.8★", label: "Explorer Rating", color: "#F59E0B" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-3xl font-extrabold font-[family-name:var(--font-display)] mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--color-text-secondary)]">
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
