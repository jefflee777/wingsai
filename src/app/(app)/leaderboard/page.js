"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { LuTrophy, LuMedal, LuTarget, LuGift, LuRoute, LuUser, LuFilter } from "react-icons/lu";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function LeaderboardPage() {
  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState("tokens");
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadLeaderboard(); }, [tab]);

  async function loadLeaderboard() {
    setLoading(true);
    try {
      const res = await fetch(`/api/leaderboard?tab=${tab}`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data || []);
      }
    } catch (e) { console.warn(e); }
    finally { setLoading(false); }
  }

  const tabs = [
    { value: "tokens", label: "Top Earners", icon: LuGift },
    { value: "reputation", label: "Reputation", icon: LuTrophy },
  ];

  const rankColors = ["var(--color-warning)", "var(--color-text-secondary)", "#CD7F32"];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Leaderboard</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">Top explorers ranked by earnings and reputation.</p>
      </motion.div>

      <div className="flex gap-2">
        {tabs.map(t => {
          const I = t.icon;
          return (
            <button key={t.value} onClick={() => setTab(t.value)} className={`flex items-center gap-2 px-4 py-2 rounded-[var(--radius-lg)] text-sm font-medium cursor-pointer transition-colors ${tab===t.value?"bg-[var(--color-primary)] text-white":"bg-white text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-bg-alt)]"}`}>
              <I className="w-4 h-4" />{t.label}
            </button>
          );
        })}
      </div>

      <Card>
        <CardHeader><CardTitle>{tab === "tokens" ? "Top $WINGS Earners" : "Highest Reputation"}</CardTitle></CardHeader>
        {loading ? (
          <div className="space-y-3">{[1,2,3,4,5].map(i => <div key={i} className="h-14 loading-shimmer rounded-[var(--radius-lg)]" />)}</div>
        ) : users.length === 0 ? (
          <div className="text-center py-8">
            <LuTrophy className="w-8 h-8 text-[var(--color-text-muted)] mx-auto mb-3" />
            <p className="text-sm text-[var(--color-text-secondary)]">No explorers on the board yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {users.map((u, i) => (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`flex items-center justify-between p-3 rounded-[var(--radius-lg)] transition-colors ${i < 3 ? "bg-[var(--color-warning-light)] border border-[var(--color-warning)]/10" : "border border-[var(--color-border)]"}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${i < 3 ? "text-white" : "bg-[var(--color-bg-alt)] text-[var(--color-text-secondary)]"}`} style={i < 3 ? { backgroundColor: rankColors[i] } : {}}>
                    {i < 3 ? <LuMedal className="w-4 h-4" /> : i + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[var(--color-text)] truncate">{u.username || "Anonymous"}</p>
                    <p className="text-xs text-[var(--color-text-muted)] font-mono">{u.wallet_address?.slice(0,6)}...{u.wallet_address?.slice(-4)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[var(--color-text)]">
                    {tab === "tokens" ? `${Number(u.total_tokens || 0).toFixed(0)} $WINGS` : `${u.reputation_score || 0} pts`}
                  </p>
                  <Badge variant="primary" className="text-[10px]">Lv.{u.level}</Badge>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
