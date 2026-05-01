"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { motion } from "motion/react";
import { LuGift, LuCoins, LuCheck, LuClock, LuTarget, LuSquarePen, LuZap, LuTrendingUp, LuFilter } from "react-icons/lu";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { supabase } from "@/lib/supabase";

export default function RewardsPage() {
  const { address } = useAccount();
  const [rewards, setRewards] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadRewards(); }, [address, filter]);

  async function loadRewards() {
    if (!address) return;
    try {
      const { data: u } = await supabase.from("users").select("id").eq("wallet_address", address.toLowerCase()).single();
      if (!u) return;
      let q = supabase.from("rewards").select("*").eq("user_id", u.id).order("earned_at", { ascending: false });
      if (filter === "claimed") q = q.eq("claimed", true);
      if (filter === "unclaimed") q = q.eq("claimed", false);
      const { data } = await q;
      setRewards(data || []);
    } catch (e) { console.warn(e); }
    finally { setLoading(false); }
  }

  const total = rewards.reduce((s, r) => s + Number(r.final_amount || 0), 0);
  const claimed = rewards.filter(r => r.claimed).reduce((s, r) => s + Number(r.final_amount || 0), 0);
  const icons = { checkpoint: LuTarget, content: LuSquarePen, bonus: LuZap, streak: LuTrendingUp };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-text)]">Rewards Hub</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">Track earnings and claim $WINGS tokens.</p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { l: "Total Earned", v: total.toFixed(1), ic: LuCoins, c: "var(--color-warning)" },
          { l: "Unclaimed", v: (total - claimed).toFixed(1), ic: LuGift, c: "var(--color-primary)" },
          { l: "Claimed", v: claimed.toFixed(1), ic: LuCheck, c: "var(--color-success)" },
        ].map((s, i) => {
          const I = s.ic;
          return (
            <motion.div key={s.l} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1">{s.l}</p>
                    <p className="text-2xl font-bold font-[family-name:var(--font-heading)]">{s.v}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">$WINGS</p>
                  </div>
                  <div className="w-10 h-10 rounded-[var(--radius-lg)] flex items-center justify-center" style={{ backgroundColor: `${s.c}12`, color: s.c }}><I className="w-5 h-5" /></div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        <LuFilter className="w-4 h-4 text-[var(--color-text-muted)] flex-shrink-0 mt-1" />
        {["all","unclaimed","claimed"].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-[var(--radius-full)] text-xs font-medium cursor-pointer ${filter===f?"bg-[var(--color-primary)] text-white":"bg-[var(--color-bg-alt)] text-[var(--color-text-secondary)]"}`}>{f.charAt(0).toUpperCase()+f.slice(1)}</button>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>Reward History</CardTitle><Badge>{rewards.length}</Badge></CardHeader>
        {rewards.length === 0 ? (
          <div className="text-center py-8"><LuGift className="w-8 h-8 text-[var(--color-text-muted)] mx-auto mb-3" /><p className="text-sm text-[var(--color-text-secondary)]">No rewards yet</p></div>
        ) : (
          <div className="space-y-2">
            {rewards.map(r => {
              const SI = icons[r.source] || LuGift;
              return (
                <div key={r.id} className="flex items-center justify-between p-3 rounded-[var(--radius-lg)] border border-[var(--color-border)]">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-[var(--radius-lg)] bg-[var(--color-warning-light)] flex items-center justify-center"><SI className="w-4 h-4 text-[var(--color-warning)]" /></div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[var(--color-text)] capitalize">{r.source} Reward</p>
                      <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-1"><LuClock className="w-3 h-3" />{new Date(r.earned_at).toLocaleDateString()} · {r.multiplier}x</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <span className="text-sm font-bold">+{Number(r.final_amount).toFixed(1)}</span>
                    <Badge variant={r.claimed?"success":"primary"}>{r.claimed?"Claimed":"Pending"}</Badge>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
