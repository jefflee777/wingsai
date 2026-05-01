"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { IoRocketOutline, IoMailOutline } from "react-icons/io5";
import { useState } from "react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section
      id="join"
      className="section-padding relative overflow-hidden"
    >
      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0B0F1A 0%, #1a1f33 50%, #0d1420 100%)",
          }}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20"
              style={{
                background:
                  "radial-gradient(circle, var(--color-primary), transparent 60%)",
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-15"
              style={{
                background:
                  "radial-gradient(circle, var(--color-accent), transparent 60%)",
              }}
            />
            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-10 md:p-14 lg:p-16">
            {/* Left — Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
                <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Early Access Open
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="font-[family-name:var(--font-display)] font-extrabold text-white mb-4"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
              >
                Ready to Start Your
                <br />
                <span
                  className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text"
                  style={{ WebkitTextFillColor: "transparent" }}
                >
                  Travel Intelligence
                </span>{" "}
                Journey?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-white/50 text-base mb-8 max-w-md leading-relaxed"
              >
                Join the waitlist for early access. Be among the first explorers to
                earn $WINGS tokens and shape the future of travel.
              </motion.p>

              {/* Email form */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md"
              >
                <div className="relative flex-1">
                  <IoMailOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-lg" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[var(--color-primary)]/50 focus:ring-1 focus:ring-[var(--color-primary)]/25 transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] hover:shadow-[var(--shadow-glow)] hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap"
                >
                  <IoRocketOutline />
                  {submitted ? "You're In! ✨" : "Join Waitlist"}
                </button>
              </motion.form>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="mt-6 flex items-center gap-3"
              >
                <div className="flex -space-x-2">
                  {["🧑‍💻", "👩‍🎨", "🧑‍🚀", "👨‍✈️"].map((emoji, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-[#0B0F1A] bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 flex items-center justify-center text-sm"
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-white/40">
                  <span className="text-white/60 font-semibold">2,847</span>{" "}
                  explorers already joined
                </span>
              </motion.div>
            </div>

            {/* Right — Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full blur-[60px] opacity-30"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                  }}
                />
                <Image
                  src="/phase2.png"
                  alt="Join Wings — Start earning travel rewards"
                  width={380}
                  height={380}
                  className="relative z-10 drop-shadow-2xl animate-float"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
