"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
  HiOutlineSparkles,
  HiOutlineMapPin,
  HiOutlineCameraIcon,
  HiOutlineGift,
} from "react-icons/hi2";
import {
  IoCompassOutline,
  IoLocationOutline,
  IoCheckmarkCircleOutline,
  IoTrophyOutline,
} from "react-icons/io5";

const steps = [
  {
    number: "01",
    title: "Plan with AI",
    description:
      "Tell Wings your destination, budget, and travel style. Our AI engine crafts a personalized route with hidden gems, optimized checkpoints, and rarity-scored locations.",
    icon: IoCompassOutline,
    color: "#5BC0EB",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    number: "02",
    title: "Explore & Discover",
    description:
      "Follow your AI-optimized route with real-time companion suggestions. Discover rare checkpoints, local secrets, and off-the-beaten-path experiences that score higher rewards.",
    icon: IoLocationOutline,
    color: "#8B5CF6",
    gradient: "from-purple-500 to-violet-400",
  },
  {
    number: "03",
    title: "Verify Your Visit",
    description:
      "Check in at each checkpoint using GPS verification and optional photo proof. Our fraud detection AI ensures authentic travel — no spoofing, just real exploration.",
    icon: IoCheckmarkCircleOutline,
    color: "#10B981",
    gradient: "from-green-500 to-emerald-400",
  },
  {
    number: "04",
    title: "Earn & Redeem",
    description:
      "Collect $WINGS tokens based on rarity, effort, and timing. Claim rewards on-chain, build your travel identity, and unlock exclusive perks in the rewards marketplace.",
    icon: IoTrophyOutline,
    color: "#F59E0B",
    gradient: "from-amber-500 to-yellow-400",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="section-padding relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--color-bg) 0%, #EDF6FF 50%, var(--color-bg) 100%)",
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--color-secondary), transparent 60%)",
        }}
      />

      <div className="container-narrow relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 mb-6">
            <HiOutlineSparkles className="text-[var(--color-primary)] text-sm" />
            <span className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider">
              How It Works
            </span>
          </div>
          <h2
            className="font-[family-name:var(--font-display)] font-extrabold text-[var(--color-text)] mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}
          >
            From Planning to{" "}
            <span className="gradient-text">Earning Rewards</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Four simple steps to turn every journey into verifiable,
            reward-generating experiences.
          </p>
        </motion.div>

        {/* Center layout — Image + Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Steps */}
          <div className="space-y-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="group flex gap-5 relative"
                >
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div
                      className="absolute left-6 top-16 w-0.5 h-[calc(100%-32px)] opacity-20"
                      style={{
                        background: `linear-gradient(to bottom, ${step.color}, transparent)`,
                      }}
                    />
                  )}

                  {/* Number + Icon */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white text-xl shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}
                    >
                      <Icon />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span
                        className="text-xs font-bold uppercase tracking-widest"
                        style={{ color: step.color }}
                      >
                        Step {step.number}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[var(--color-text)] mb-1.5 font-[family-name:var(--font-display)]">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right — Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-[60px] opacity-30"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-primary), var(--color-purple))",
                }}
              />
              <Image
                src="/how-it-works.png"
                alt="How Wings works — Plan, Explore, Verify, Earn"
                width={480}
                height={640}
                className="relative z-10 drop-shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
