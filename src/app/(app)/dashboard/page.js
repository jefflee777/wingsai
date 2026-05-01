"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import {
  LuPlus,
  LuCompass,
  LuGift,
  LuMapPin,
  LuArrowRight,
  LuShield,
  LuTrendingUp,
  LuRoute,
  LuClock,
  LuAward,
  LuTarget,
} from "react-icons/lu";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import { getLevelTitle } from "@/lib/rewards";

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [journeys, setJourneys] = useState([]);
  const [recentRewards, setRecentRewards] = useState([]);
  const [stats, setStats] = useState({ totalJourneys: 0, totalCheckpoints: 0, totalRewards: 0 });

  useEffect(() => {
    if (!isConnected) {
      router.push("/login");
      return;
    }
    loadDashboardData();
  }, [isConnected, address]);

  async function loadDashboardData() {
    if (!address) return;
    const wallet = address.toLowerCase();

    try {
      // Fetch user
      const { data: userData } = await supabase
        .from("users")
        .select("*")
        .eq("wallet_address", wallet)
        .single();
      if (userData) setUser(userData);

      // Fetch journeys
      const { data: journeyData } = await supabase
        .from("journeys")
        .select("*")
        .eq("user_id", userData?.id)
        .order("created_at", { ascending: false })
        .limit(5);
      if (journeyData) setJourneys(journeyData);

      // Fetch recent rewards
      const { data: rewardData } = await supabase
        .from("rewards")
        .select("*")
        .eq("user_id", userData?.id)
        .order("earned_at", { ascending: false })
        .limit(5);
      if (rewardData) setRecentRewards(rewardData);

      // Compute stats
      const totalJ = journeyData?.length || 0;
      const totalR = rewardData?.reduce((sum, r) => sum + Number(r.final_amount || 0), 0) || 0;
      setStats({
        totalJourneys: totalJ,
        totalCheckpoints: journeyData?.reduce((s, j) => s + (j.verified_checkpoints || 0), 0) || 0,
        totalRewards: totalR,
      });
    } catch (e) {
      console.warn("Dashboard data load:", e);
    }
  }

  const statCards = [
    { label: "Total Journeys", value: stats.totalJourneys, icon: LuRoute, color: "var(--color-primary)" },
    { label: "Checkpoints Verified", value: stats.totalCheckpoints, icon: LuTarget, color: "var(--color-success)" },
    { label: "$WINGS Earned", value: stats.totalRewards.toFixed(1), icon: LuGift, color: "var(--color-warning)" },
    { label: "Level", value: user ? `${user.level} — ${getLevelTitle(user.level)}` : "1", icon: LuAward, color: "var(--color-purple)" },
  ];

  const quickActions = [
    { label: "Plan Journey", href: "/journey/new", icon: LuPlus, desc: "Create AI-optimized route" },
    { label: "Explore", href: "/explore", icon: LuCompass, desc: "Discover destinations" },
    { label: "Verify Visit", href: "/verify", icon: LuShield, desc: "GPS check-in" },
    { label: "Claim Rewards", href: "/rewards", icon: LuGift, desc: "View earnings" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-text)]">
          Welcome back{user?.username ? `, ${user.username}` : ""}
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Here is your travel intelligence overview.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
                      {stat.label}
                    </p>
                    <p className="text-xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-text)]">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className="w-9 h-9 rounded-[var(--radius-lg)] flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}12`, color: stat.color }}
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-all group"
                >
                  <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-primary-light)] flex items-center justify-center group-hover:bg-[var(--color-primary)] transition-colors">
                    <Icon className="w-[18px] h-[18px] text-[var(--color-primary)] group-hover:text-white transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-[var(--color-text)] truncate">{action.label}</div>
                    <div className="text-xs text-[var(--color-text-muted)] truncate">{action.desc}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Journeys */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle>Recent Journeys</CardTitle>
              <Link href="/explore" className="text-xs font-medium text-[var(--color-primary)] hover:underline flex items-center gap-1">
                View all <LuArrowRight className="w-3 h-3" />
              </Link>
            </CardHeader>
            {journeys.length === 0 ? (
              <div className="text-center py-8">
                <LuRoute className="w-8 h-8 text-[var(--color-text-muted)] mx-auto mb-3" />
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">No journeys yet</p>
                <Link href="/journey/new">
                  <Button size="sm" icon={<LuPlus className="w-3.5 h-3.5" />}>
                    Plan Your First Journey
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {journeys.map((j) => (
                  <Link
                    key={j.id}
                    href={`/journey/${j.id}`}
                    className="flex items-center justify-between p-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-alt)] transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-[var(--radius-lg)] bg-[var(--color-primary-light)] flex items-center justify-center flex-shrink-0">
                        <LuMapPin className="w-4 h-4 text-[var(--color-primary)]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[var(--color-text)] truncate">{j.title}</p>
                        <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                          <span>{j.total_checkpoints || 0} checkpoints</span>
                          <span>·</span>
                          <span>{j.destination || "—"}</span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={j.status === "active" ? "primary" : j.status === "completed" ? "success" : "default"}
                      dot={j.status === "active"}
                    >
                      {j.status}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </Card>
        </motion.div>

        {/* Recent Rewards */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>Recent Rewards</CardTitle>
              <Link href="/rewards" className="text-xs font-medium text-[var(--color-primary)] hover:underline flex items-center gap-1">
                View all <LuArrowRight className="w-3 h-3" />
              </Link>
            </CardHeader>
            {recentRewards.length === 0 ? (
              <div className="text-center py-8">
                <LuGift className="w-8 h-8 text-[var(--color-text-muted)] mx-auto mb-3" />
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">No rewards yet</p>
                <p className="text-xs text-[var(--color-text-muted)]">Complete check-ins to earn $WINGS</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentRewards.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between p-3 rounded-[var(--radius-lg)] border border-[var(--color-border)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-[var(--radius-lg)] bg-[var(--color-warning-light)] flex items-center justify-center">
                        <LuGift className="w-4 h-4 text-[var(--color-warning)]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--color-text)] capitalize">{r.source} reward</p>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          <LuClock className="w-3 h-3 inline mr-1" />
                          {new Date(r.earned_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[var(--color-text)]">+{Number(r.final_amount).toFixed(1)}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">$WINGS</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
