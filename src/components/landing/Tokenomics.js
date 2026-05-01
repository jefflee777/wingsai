"use client";

import { motion } from "motion/react";
import { HiOutlineSparkles } from "react-icons/hi2";

const tokenData = {
  total: "1,000,000,000",
  symbol: "$WINGS",
  distribution: [
    {
      label: "Community Rewards",
      percentage: 40,
      color: "#5BC0EB",
      description: "Earned by verified travelers for check-ins, content, and discovery",
    },
    {
      label: "Development Fund",
      percentage: 20,
      color: "#8B5CF6",
      description: "Platform development, AI infrastructure, and maintenance",
    },
    {
      label: "Ecosystem Growth",
      percentage: 15,
      color: "#10B981",
      description: "Partnerships, integrations, and ecosystem expansion",
    },
    {
      label: "Team & Advisors",
      percentage: 12,
      color: "#F59E0B",
      description: "Core team allocation with 2-year vesting schedule",
    },
    {
      label: "Liquidity Pool",
      percentage: 8,
      color: "#FF6B9A",
      description: "DEX liquidity provision for seamless token trading",
    },
    {
      label: "Treasury Reserve",
      percentage: 5,
      color: "#06B6D4",
      description: "Emergency fund and strategic future initiatives",
    },
  ],
};

const utilities = [
  {
    title: "Reward Claiming",
    description: "Claim earned tokens from verified travel checkpoints directly to your wallet",
    icon: "🎁",
  },
  {
    title: "Premium Routes",
    description: "Unlock AI-curated premium routes with exclusive high-rarity checkpoints",
    icon: "🗺️",
  },
  {
    title: "Identity Badges",
    description: "Mint on-chain achievement badges as NFTs using $WINGS tokens",
    icon: "🏅",
  },
  {
    title: "Governance",
    description: "Vote on platform features, new destinations, and reward multiplier changes",
    icon: "🗳️",
  },
];

export default function Tokenomics() {
  return (
    <section
      id="tokenomics"
      className="section-padding relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--color-bg) 0%, #EDF6FF 50%, var(--color-bg) 100%)",
      }}
    >
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
              Token Economics
            </span>
          </div>
          <h2
            className="font-[family-name:var(--font-display)] font-extrabold text-[var(--color-text)] mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}
          >
            <span className="gradient-text">$WINGS</span> Token Economy
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            A utility token designed to reward real explorers and power the
            entire travel intelligence ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — Distribution chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 border border-[var(--color-border)] shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[var(--color-text)] font-[family-name:var(--font-display)]">
                Token Distribution
              </h3>
              <span className="text-sm font-semibold text-[var(--color-primary)]">
                {tokenData.total} {tokenData.symbol}
              </span>
            </div>

            {/* Visual bar chart */}
            <div className="flex h-6 rounded-full overflow-hidden mb-8 shadow-inner">
              {tokenData.distribution.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                  style={{ backgroundColor: item.color }}
                  className="h-full first:rounded-l-full last:rounded-r-full"
                  title={`${item.label}: ${item.percentage}%`}
                />
              ))}
            </div>

            {/* Legend */}
            <div className="space-y-4">
              {tokenData.distribution.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[var(--color-text)]">
                        {item.label}
                      </span>
                      <span className="text-sm font-bold" style={{ color: item.color }}>
                        {item.percentage}%
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Token utility */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-[var(--color-text)] font-[family-name:var(--font-display)] mb-6">
              Token Utility
            </h3>

            <div className="space-y-4">
              {utilities.map((util, i) => (
                <motion.div
                  key={util.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="group bg-white rounded-2xl p-5 border border-[var(--color-border)] hover:border-[var(--color-primary)]/20 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 flex items-center justify-center text-2xl flex-shrink-0">
                      {util.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[var(--color-text)] mb-1">
                        {util.title}
                      </h4>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                        {util.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Reward formula */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 bg-gradient-to-br from-[var(--color-bg-dark)] to-[var(--color-surface-dark)] rounded-2xl p-6 text-white"
            >
              <h4 className="text-sm font-semibold text-[var(--color-primary-light)] mb-3 uppercase tracking-wider">
                Reward Formula
              </h4>
              <div className="font-mono text-sm text-gray-300 leading-relaxed">
                <span className="text-[var(--color-primary)]">reward</span> ={" "}
                <span className="text-[var(--color-gold)]">baseReward</span> ×{" "}
                <span className="text-[var(--color-accent)]">rarityMultiplier</span>{" "}
                ×{" "}
                <span className="text-[var(--color-success)]">effortScore</span> ×{" "}
                <span className="text-[var(--color-purple)]">timingBonus</span>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Calculated server-side per checkpoint. Higher rarity and off-peak timing
                = bigger rewards.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
