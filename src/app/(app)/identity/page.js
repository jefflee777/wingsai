"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { motion } from "motion/react";
import { LuUser, LuAward, LuMapPin, LuShield, LuTrendingUp, LuWallet, LuCopy, LuCheck, LuRoute, LuTarget, LuGift } from "react-icons/lu";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { getLevelTitle } from "@/lib/rewards";

export default function IdentityPage() {
  const { address } = useAccount();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ journeys: 0, checkpoints: 0, verifications: 0 });
  const [copied, setCopied] = useState(false);

  useEffect(() => { loadProfile(); }, [address]);

  async function loadProfile() {
    if (!address) return;
    try {
      const res = await fetch(`/api/user/${address.toLowerCase()}`);
      if (!res.ok) return;
      const u = await res.json();
      if (u) {
        setUser(u);
        setStats({
          journeys: u._count?.journeys || 0,
          checkpoints: u.journeys?.reduce((s, x) => s + (x.verified_checkpoints || 0), 0) || 0,
          verifications: u._count?.verifications || 0,
        });
      }
    } catch (e) { console.warn(e); }
  }

  const copyAddr = () => { navigator.clipboard.writeText(address); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const level = user?.level || 1;
  const title = getLevelTitle(level);
  const truncAddr = address ? `${address.slice(0,6)}...${address.slice(-4)}` : "";

  const badges = [
    { name: "First Journey", desc: "Complete your first journey", earned: stats.journeys > 0, icon: LuRoute },
    { name: "Verified Explorer", desc: "10 GPS verifications", earned: stats.verifications >= 10, icon: LuShield },
    { name: "Checkpoint Hunter", desc: "Verify 25 checkpoints", earned: stats.checkpoints >= 25, icon: LuTarget },
    { name: "Token Collector", desc: "Earn 500+ $WINGS", earned: Number(user?.total_tokens || 0) >= 500, icon: LuGift },
    { name: "Level 3 Pathfinder", desc: "Reach level 3", earned: level >= 3, icon: LuTrendingUp },
    { name: "Globetrotter", desc: "Complete 5 journeys", earned: stats.journeys >= 5, icon: LuMapPin },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Travel Identity</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">Your on-chain travel profile and achievements.</p>
      </motion.div>

      {/* Profile card */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-16 h-16 rounded-[var(--radius-xl)] bg-[var(--color-primary-light)] flex items-center justify-center text-2xl flex-shrink-0">
              <LuUser className="w-8 h-8 text-[var(--color-primary)]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold font-[family-name:var(--font-heading)]">{user?.username || "Explorer"}</h2>
                <Badge variant="primary">Level {level}</Badge>
                <Badge variant="purple">{title}</Badge>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <LuWallet className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                <span className="text-sm font-mono text-[var(--color-text-secondary)]">{truncAddr}</span>
                <button onClick={copyAddr} className="p-1 rounded hover:bg-[var(--color-bg-alt)] cursor-pointer">
                  {copied ? <LuCheck className="w-3.5 h-3.5 text-[var(--color-success)]" /> : <LuCopy className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />}
                </button>
              </div>
              <div className="flex gap-6">
                {[
                  { l: "Journeys", v: stats.journeys, c: "var(--color-primary)" },
                  { l: "Checkpoints", v: stats.checkpoints, c: "var(--color-success)" },
                  { l: "$WINGS", v: Number(user?.total_tokens || 0).toFixed(0), c: "var(--color-warning)" },
                  { l: "Reputation", v: user?.reputation_score || 0, c: "var(--color-purple)" },
                ].map(s => (
                  <div key={s.l}>
                    <p className="text-lg font-bold font-[family-name:var(--font-heading)]" style={{ color: s.c }}>{s.v}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Badges */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader><CardTitle>Achievement Badges</CardTitle><Badge>{badges.filter(b=>b.earned).length}/{badges.length}</Badge></CardHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {badges.map((b, i) => {
              const I = b.icon;
              return (
                <div key={b.name} className={`p-4 rounded-[var(--radius-lg)] border transition-all ${b.earned ? "bg-[var(--color-primary-light)] border-[var(--color-primary)]/20" : "bg-[var(--color-bg-alt)] border-[var(--color-border)] opacity-50"}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-[var(--radius-lg)] flex items-center justify-center ${b.earned ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-border)] text-[var(--color-text-muted)]"}`}>
                      <I className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-text)]">{b.name}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">{b.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
