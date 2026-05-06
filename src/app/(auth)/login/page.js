"use client";

import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
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
    color: "#007DF0",
    bg: "bg-blue-50"
  },
  {
    icon: LuShield,
    title: "GPS Verification",
    desc: "Prove your travel with authenticated check-ins",
    color: "#10B981",
    bg: "bg-emerald-50"
  },
  {
    icon: LuZap,
    title: "Earn $WINGS",
    desc: "Dynamic rewards for verified exploration",
    color: "#F59E0B",
    bg: "bg-amber-50"
  },
  {
    icon: LuGlobe,
    title: "On-Chain Identity",
    desc: "Build a verifiable travel reputation",
    color: "#FF4B82",
    bg: "bg-pink-50"
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
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center relative overflow-hidden py-10 px-4 sm:px-8">
      {/* Main Glass Card */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[1200px] bg-white/70 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white/80 overflow-hidden flex flex-col lg:flex-row relative z-10"
      >
        {/* Left Panel - Auth */}
        <div className="flex-1 p-10 md:p-14 lg:p-16 flex flex-col justify-center relative bg-white/40">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mb-12 w-max group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-[#007DF0] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 border-[3px] border-white/60">
              <Image src="/logo.png" alt="Wings" width={24} height={24} className="brightness-0 invert drop-shadow-md" />
            </div>
            <span className="text-3xl font-black font-[family-name:var(--font-display)] tracking-tight text-[#0A0A0E]">
              Wings
            </span>
          </Link>

          <h1 className="text-4xl lg:text-[2.75rem] font-black font-[family-name:var(--font-display)] tracking-tight text-[#0A0A0E] mb-4 leading-tight">
            Connect to your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C6FF] to-[#007DF0]">Travel Hub</span>
          </h1>
          <p className="text-gray-500 font-medium mb-10 text-lg max-w-md leading-relaxed">
            Link your wallet to access AI-optimized routes, verify your real-world check-ins, and start earning rewards.
          </p>

          {/* Connect Button */}
          <div className="mb-10 w-full max-w-md">
            <div className="p-1 rounded-[1.25rem] bg-gradient-to-r from-[#00C6FF]/20 to-[#007DF0]/20 backdrop-blur-md">
              <ConnectButton fullWidth />
            </div>
          </div>

          {/* Features Bento List */}
          <div className="space-y-4 max-w-md">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/60 transition-colors duration-300 border border-transparent hover:border-white/80"
                >
                  <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center flex-shrink-0 shadow-sm border border-black/5`}>
                    <Icon className="text-xl" style={{ color: f.color }} />
                  </div>
                  <div>
                    <div className="text-[1.05rem] font-bold text-[#0A0A0E] font-[family-name:var(--font-display)]">{f.title}</div>
                    <div className="text-sm font-medium text-gray-500">{f.desc}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="text-xs font-semibold text-gray-400 mt-10 max-w-md leading-relaxed">
            By connecting, you agree to our Terms of Service. No crypto knowledge required we handle the complexity securely on-chain.
          </p>
        </div>

        {/* Right Panel - Visual Showcase */}
        <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden bg-[#FAFAFA]">
          {/* Internal Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#38D5FF] via-[#00A3FF] to-[#007DF0] opacity-[0.85]"></div>
          
          {/* Abstract Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-[600px] h-[600px] border-[2px] border-white rounded-full absolute mix-blend-overlay"></div>
            <div className="w-[450px] h-[450px] border-[2px] border-white rounded-full absolute mix-blend-overlay"></div>
            <div className="w-[300px] h-[300px] border-[2px] border-white rounded-full absolute mix-blend-overlay"></div>
          </div>

          {/* Animated Float Graphics */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
            {/* Center Main Visual */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative w-72 h-72 rounded-full border-[8px] border-white/10 flex items-center justify-center backdrop-blur-sm"
            >
              <div className="absolute inset-0 rounded-full bg-white/5 animate-pulse"></div>
              
              <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-white to-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center border border-white">
                <div className="text-[3rem] font-black text-[#007DF0] font-[family-name:var(--font-display)] tracking-tighter leading-none mb-1">
                  200+
                </div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                  Destinations
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
