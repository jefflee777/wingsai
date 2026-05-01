"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  IoLogoTwitter,
  IoLogoDiscord,
  IoLogoGithub,
  IoMail,
  IoGlobeOutline,
} from "react-icons/io5";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Tokenomics", href: "#tokenomics" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Whitepaper", href: "#" },
    { label: "Brand Kit", href: "#" },
  ],
  Community: [
    { label: "Discord", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Ambassadors", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: IoLogoTwitter, href: "#", label: "Twitter" },
  { icon: IoLogoDiscord, href: "#", label: "Discord" },
  { icon: IoLogoGithub, href: "#", label: "GitHub" },
  { icon: IoMail, href: "#", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[var(--color-bg-dark)] text-white overflow-hidden">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/30 to-transparent" />

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{
            background:
              "radial-gradient(circle, var(--color-primary), transparent 60%)",
          }}
        />
      </div>

      <div className="container-narrow relative z-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-14">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center overflow-hidden shadow-md">
                <Image
                  src="/logo.png"
                  alt="Wings"
                  width={28}
                  height={28}
                  className="drop-shadow-md"
                />
              </div>
              <span className="text-xl font-bold font-[family-name:var(--font-display)] tracking-tight">
                Wings
              </span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-xs">
              AI-driven travel intelligence platform. Explore destinations, earn
              rewards, and build your on-chain travel identity.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/5 transition-all duration-300"
                  >
                    <Icon className="text-base" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white/70 mb-4 uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/35 hover:text-[var(--color-primary)] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Wings. All rights reserved. Built with
            ❤️ for explorers.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-white/25">
            <IoGlobeOutline className="text-sm" />
            <span>Web3 Native · AI Powered · Verifiable</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
