"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { IoRocketOutline, IoPlayOutline } from "react-icons/io5";
import { HiOutlineSparkles } from "react-icons/hi2";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-[72px]"
      style={{
        background:
          "linear-gradient(135deg, #F7FBFF 0%, #E8F4FD 30%, #F0F7FF 60%, #FFF5F8 100%)",
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div
          className="absolute top-20 left-[10%] w-[500px] h-[500px] rounded-full opacity-30 animate-float"
          style={{
            background:
              "radial-gradient(circle, rgba(91,192,235,0.3), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-20 right-[10%] w-[400px] h-[400px] rounded-full opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,154,0.25), transparent 70%)",
            animation: "float 8s ease-in-out 2s infinite",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(91,192,235,0.2), transparent 60%)",
          }}
        />
        {/* Floating dots */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[var(--color-primary)] opacity-20"
            style={{
              top: `${15 + Math.random() * 70}%`,
              left: `${5 + Math.random() * 90}%`,
              animation: `particle-float ${4 + Math.random() * 4}s ease-in-out ${
                Math.random() * 3
              }s infinite`,
            }}
          />
        ))}
      </div>

      <div className="container-narrow relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center py-16 lg:py-0">
        {/* Left content */}
        <div className="max-w-xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-[var(--color-border)] shadow-sm mb-8"
          >
            <HiOutlineSparkles className="text-[var(--color-primary)] text-sm" />
            <span className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
              AI-Powered Travel Intelligence
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[family-name:var(--font-display)] font-extrabold leading-[1.08] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Travel Smarter.
            <br />
            <span className="gradient-text">Earn Smarter.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-10 max-w-md"
          >
            Explore destinations with AI-driven route planning, earn{" "}
            <span className="font-semibold text-[var(--color-primary)]">
              $WINGS
            </span>{" "}
            tokens for verified travel, and unlock real-world rewards.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#join"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-base font-semibold text-white bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] hover:shadow-[var(--shadow-glow)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <IoRocketOutline className="text-lg" />
              Start Exploring
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-base font-semibold text-[var(--color-text)] bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:shadow-lg transition-all duration-300"
            >
              <IoPlayOutline className="text-lg" />
              How It Works
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-10 mt-14"
          >
            {[
              { value: "200+", label: "Destinations" },
              { value: "50K+", label: "Explorers" },
              { value: "$2M+", label: "Rewards Earned" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-[var(--color-text)] font-[family-name:var(--font-display)]">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--color-text-secondary)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[520px]">
            {/* Glow behind image */}
            <div
              className="absolute inset-0 rounded-full blur-[80px] opacity-40"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
              }}
            />
            <Image
              src="/heroimage.png"
              alt="Wings Travel Platform — Explore the world with AI"
              width={520}
              height={520}
              priority
              className="relative z-10 drop-shadow-2xl animate-float"
            />

            {/* Floating card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -left-4 bottom-16 z-20 bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-[var(--color-border)]"
              style={{ animation: "float 5s ease-in-out 1s infinite" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-success)] to-green-400 flex items-center justify-center text-white text-lg">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-semibold text-[var(--color-text)]">
                    GPS Verified
                  </div>
                  <div className="text-xs text-[var(--color-text-secondary)]">
                    +25 $WINGS earned
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating card 2 */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -right-2 top-16 z-20 bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-[var(--color-border)]"
              style={{ animation: "float 6s ease-in-out 2s infinite" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-blue-400 flex items-center justify-center text-white text-lg">
                  🤖
                </div>
                <div>
                  <div className="text-xs font-semibold text-[var(--color-text)]">
                    AI Companion
                  </div>
                  <div className="text-xs text-[var(--color-text-secondary)]">
                    Route optimized!
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-bg)] to-transparent" />
    </section>
  );
}
