"use client";

import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  LuShield,
  LuZap,
  LuGlobe,
  LuSparkles,
} from "react-icons/lu";
import ConnectButton from "@/components/web3/ConnectButton";

const features = [
  {
    icon: LuSparkles,
    title: "AI Route Planning",
    desc: "Claude-powered journey optimization tailored to you",
  },
  {
    icon: LuShield,
    title: "GPS Verification",
    desc: "Prove your travel with authenticated check-ins",
  },
  {
    icon: LuZap,
    title: "Earn $WINGS",
    desc: "Dynamic rewards for verified exploration",
  },
  {
    icon: LuGlobe,
    title: "On-Chain Identity",
    desc: "Build a verifiable travel reputation",
  },
];

export default function LoginPage() {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push("/dashboard");
    }
  }, [isConnected, router]);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex">
      {/* Left panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-11 h-11 rounded-[var(--radius-xl)] bg-[var(--color-primary)] flex items-center justify-center">
              <Image src="/logo.png" alt="Wings" width={26} height={26} />
            </div>
            <span className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-text)]">
              Wings
            </span>
          </div>

          <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-text)] mb-2">
            Welcome to Wings
          </h1>
          <p className="text-[var(--color-text-secondary)] mb-8">
            Connect your wallet on BNB Chain to start exploring destinations, earning
            tokens, and building your travel identity.
          </p>

          {/* Connect button */}
          <div className="mb-8">
            <ConnectButton fullWidth />
          </div>

          {/* Features */}
          <div className="space-y-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-[var(--radius-lg)] bg-[var(--color-primary-light)] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--color-text)]">{f.title}</div>
                    <div className="text-xs text-[var(--color-text-muted)]">{f.desc}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="text-xs text-[var(--color-text-muted)] mt-8">
            By connecting, you agree to our Terms of Service and Privacy Policy.
            No crypto knowledge required — we handle the complexity.
          </p>
        </motion.div>
      </div>

      {/* Right panel — decorative */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-[var(--color-primary-light)] border-l border-[var(--color-border)] relative overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[var(--color-secondary)] opacity-30" />
        <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-[var(--color-primary)] opacity-10" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative z-10 text-center max-w-sm"
        >
          <div className="w-20 h-20 rounded-[var(--radius-2xl)] bg-[var(--color-primary)] flex items-center justify-center mx-auto mb-6">
            <Image src="/logo.png" alt="Wings" width={48} height={48} />
          </div>
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-text)] mb-3">
            Travel Smarter. Earn Smarter.
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            200+ destinations. AI-powered routes. Verifiable rewards.
            Join 50,000+ explorers already earning $WINGS tokens.
          </p>

          <div className="flex justify-center gap-6 mt-8">
            {[
              { val: "200+", lab: "Destinations" },
              { val: "50K+", lab: "Explorers" },
              { val: "$2M+", lab: "Rewards" },
            ].map((s) => (
              <div key={s.lab}>
                <div className="text-xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-primary)]">
                  {s.val}
                </div>
                <div className="text-xs text-[var(--color-text-muted)]">{s.lab}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
