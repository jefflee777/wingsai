"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { HiOutlineSparkles } from "react-icons/hi2";
import {
  IoCheckmarkCircle,
  IoEllipseOutline,
  IoTimeOutline,
} from "react-icons/io5";

const phases = [
  {
    phase: "Phase 1",
    title: "Foundation",
    period: "Q3 2025",
    status: "completed",
    image: "/phase1.png",
    items: [
      { text: "Next.js 15 + Tailwind v4 setup", done: true },
      { text: "Prisma ORM + PostgreSQL schema", done: true },
      { text: "Web3 wallet integration", done: true },
      { text: "Design system & component library", done: true },
      { text: "Landing page & onboarding flow", done: true },
    ],
    gradient: "from-blue-500 to-cyan-400",
    color: "#5BC0EB",
  },
  {
    phase: "Phase 2",
    title: "Core Flow",
    period: "Q4 2025",
    status: "active",
    image: "/phase2.png",
    items: [
      { text: "AI route planning engine (Claude)", done: true },
      { text: "Interactive Mapbox journey maps", done: true },
      { text: "GPS verification system", done: false },
      { text: "Dynamic reward calculation", done: false },
      { text: "Dashboard & journey management", done: false },
    ],
    gradient: "from-purple-500 to-violet-400",
    color: "#8B5CF6",
  },
  {
    phase: "Phase 3",
    title: "Scale & Web3",
    period: "Q1 2026",
    status: "upcoming",
    image: "/phase3.png",
    items: [
      { text: "On-chain travel identity & badges", done: false },
      { text: "$WINGS token launch & claiming", done: false },
      { text: "Content studio with AI scoring", done: false },
      { text: "Leaderboard & gamification", done: false },
      { text: "PWA mini-app mode", done: false },
    ],
    gradient: "from-amber-500 to-orange-400",
    color: "#F59E0B",
  },
];

function StatusBadge({ status }) {
  const config = {
    completed: {
      label: "Completed",
      className:
        "bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/20",
    },
    active: {
      label: "In Progress",
      className:
        "bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20",
    },
    upcoming: {
      label: "Upcoming",
      className:
        "bg-[var(--color-text-secondary)]/10 text-[var(--color-text-secondary)] border-[var(--color-text-secondary)]/20",
    },
  };
  const c = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${c.className}`}
    >
      {status === "active" && (
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
      )}
      {c.label}
    </span>
  );
}

export default function Roadmap() {
  return (
    <section id="roadmap" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent), transparent 60%)",
        }}
      />

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
              Development Roadmap
            </span>
          </div>
          <h2
            className="font-[family-name:var(--font-display)] font-extrabold text-[var(--color-text)] mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}
          >
            Building the Future of{" "}
            <span className="gradient-text">Travel Intelligence</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Our phased approach ensures each milestone delivers real value to
            explorers worldwide.
          </p>
        </motion.div>

        {/* Phase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`group relative bg-white rounded-2xl border overflow-hidden transition-all duration-500 hover:shadow-xl ${
                phase.status === "active"
                  ? "border-[var(--color-primary)]/30 shadow-lg"
                  : "border-[var(--color-border)] hover:border-[var(--color-primary)]/20"
              }`}
            >
              {/* Active indicator */}
              {phase.status === "active" && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]" />
              )}

              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#EDF6FF] to-[#F7FBFF] flex items-center justify-center">
                <Image
                  src={phase.image}
                  alt={phase.title}
                  width={200}
                  height={200}
                  className="object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: phase.color }}
                    >
                      {phase.phase}
                    </span>
                    <h3 className="text-xl font-bold text-[var(--color-text)] font-[family-name:var(--font-display)]">
                      {phase.title}
                    </h3>
                  </div>
                  <StatusBadge status={phase.status} />
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] mb-5">
                  <IoTimeOutline />
                  {phase.period}
                </div>

                {/* Checklist */}
                <div className="space-y-3">
                  {phase.items.map((item) => (
                    <div key={item.text} className="flex items-start gap-2.5">
                      {item.done ? (
                        <IoCheckmarkCircle className="text-[var(--color-success)] text-base mt-0.5 flex-shrink-0" />
                      ) : (
                        <IoEllipseOutline className="text-[var(--color-text-muted)] text-base mt-0.5 flex-shrink-0" />
                      )}
                      <span
                        className={`text-sm ${
                          item.done
                            ? "text-[var(--color-text)]"
                            : "text-[var(--color-text-secondary)]"
                        }`}
                      >
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mb-1.5">
                    <span>Progress</span>
                    <span className="font-semibold">
                      {Math.round(
                        (phase.items.filter((i) => i.done).length /
                          phase.items.length) *
                          100
                      )}
                      %
                    </span>
                  </div>
                  <div className="h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{
                        width: `${
                          (phase.items.filter((i) => i.done).length /
                            phase.items.length) *
                          100
                        }%`,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                      className={`h-full rounded-full bg-gradient-to-r ${phase.gradient}`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
