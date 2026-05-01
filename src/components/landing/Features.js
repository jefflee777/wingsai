"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import {
  HiOutlineSparkles,
  HiOutlineMapPin,
  HiOutlineGift,
  HiOutlineShieldCheck,
  HiOutlineCpuChip,
  HiOutlineGlobeAlt,
  HiOutlineChatBubbleLeftRight,
  HiOutlinePhoto,
} from "react-icons/hi2";

const features = [
  {
    icon: HiOutlineCpuChip,
    title: "AI Route Engine",
    description:
      "Claude-powered route planning generates optimal journeys tailored to your budget, interests, and travel style in real-time.",
    gradient: "from-blue-500 to-cyan-400",
    color: "#5BC0EB",
  },
  {
    icon: HiOutlineMapPin,
    title: "GPS Verification",
    description:
      "Prove you were there. Browser geolocation validates checkpoint visits with radius thresholds and timestamp logging.",
    gradient: "from-green-500 to-emerald-400",
    color: "#10B981",
  },
  {
    icon: HiOutlineGift,
    title: "Dynamic Rewards",
    description:
      "Earn $WINGS tokens with a formula that weighs rarity, effort, timing, and discovery. No two rewards are the same.",
    gradient: "from-amber-500 to-yellow-400",
    color: "#F59E0B",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Fraud Detection",
    description:
      "AI behavioral analysis detects spoofed GPS, velocity anomalies, and repeated check-in patterns with a 0–1 fraud score.",
    gradient: "from-red-500 to-pink-400",
    color: "#EF4444",
  },
  {
    icon: HiOutlineGlobeAlt,
    title: "On-Chain Identity",
    description:
      "Your travel profile lives on-chain. Earn verifiable badges, build reputation, and mint NFT achievements from real journeys.",
    gradient: "from-purple-500 to-violet-400",
    color: "#8B5CF6",
  },
  {
    icon: HiOutlineChatBubbleLeftRight,
    title: "AI Companion",
    description:
      "A floating AI chat widget that gives real-time suggestions, local tips, and route adjustments during your active journey.",
    gradient: "from-[var(--color-primary)] to-blue-400",
    color: "#5BC0EB",
  },
  {
    icon: HiOutlinePhoto,
    title: "Content Studio",
    description:
      "Upload reviews, photos, and local tips. AI scores content quality and automatically rewards you for valuable contributions.",
    gradient: "from-pink-500 to-rose-400",
    color: "#FF6B9A",
  },
  {
    icon: HiOutlineSparkles,
    title: "Wallet Abstraction",
    description:
      "No crypto jargon. Web3Modal with WalletConnect creates wallets seamlessly in the background for first-time users.",
    gradient: "from-cyan-500 to-teal-400",
    color: "#06B6D4",
  },
];

function FeatureCard({ feature, index }) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative bg-white rounded-2xl p-7 border border-[var(--color-border)] hover:border-transparent hover:shadow-xl transition-all duration-500 overflow-hidden"
    >
      {/* Hover gradient overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 rounded-2xl"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${feature.color}, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 text-white text-xl shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}
      >
        <Icon />
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-[var(--color-text)] mb-2 font-[family-name:var(--font-display)]">
        {feature.title}
      </h3>
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
        {feature.description}
      </p>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r group-hover:w-full transition-all duration-500"
           style={{ backgroundImage: `linear-gradient(to right, ${feature.color}, transparent)` }} />
    </motion.div>
  );
}

export default function Features() {
  return (
    <section id="features" className="section-padding relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
           style={{ background: "radial-gradient(circle, var(--color-primary), transparent 70%)" }} />

      <div className="container-narrow">
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
              Core Features
            </span>
          </div>
          <h2
            className="font-[family-name:var(--font-display)] font-extrabold text-[var(--color-text)] mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}
          >
            Everything You Need to{" "}
            <span className="gradient-text">Explore & Earn</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            A complete ecosystem combining AI intelligence, GPS verification, and
            blockchain rewards into one seamless travel experience.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
