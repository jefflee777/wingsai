"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Link from "next/link";
import { motion } from "motion/react";
import {
  LuCompass,
  LuPlus,
  LuMapPin,
  LuArrowRight,
  LuFilter,
  LuClock,
  LuTarget,
} from "react-icons/lu";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";

export default function ExplorePage() {
  const { address } = useAccount();
  const [journeys, setJourneys] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJourneys();
  }, [address]);

  async function loadJourneys() {
    if (!address) { setLoading(false); return; }
    try {
      const { data: user } = await supabase
        .from("users")
        .select("id")
        .eq("wallet_address", address.toLowerCase())
        .single();

      if (!user) { setLoading(false); return; }

      let query = supabase
        .from("journeys")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (filter !== "all") {
        query = query.eq("status", filter);
      }

      const { data } = await query;
      setJourneys(data || []);
    } catch (e) {
      console.warn("Load journeys:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadJourneys();
  }, [filter]);

  const filters = [
    { value: "all", label: "All" },
    { value: "planned", label: "Planned" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
  ];

  const statusColors = {
    planned: "default",
    active: "primary",
    completed: "success",
    abandoned: "error",
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-text)]">
            Explore
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Discover destinations and manage your journeys.
          </p>
        </div>
        <Link href="/journey/new">
          <Button icon={<LuPlus className="w-4 h-4" />}>New Journey</Button>
        </Link>
      </motion.div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <LuFilter className="w-4 h-4 text-[var(--color-text-muted)] flex-shrink-0" />
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1.5 rounded-[var(--radius-full)] text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              filter === f.value
                ? "bg-[var(--color-primary)] text-white"
                : "bg-[var(--color-bg-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Journey grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 rounded-[var(--radius-xl)] loading-shimmer" />
          ))}
        </div>
      ) : journeys.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-16">
          <div className="w-14 h-14 rounded-[var(--radius-xl)] bg-[var(--color-primary-light)] flex items-center justify-center mb-4">
            <LuCompass className="w-7 h-7 text-[var(--color-primary)]" />
          </div>
          <p className="text-base font-semibold text-[var(--color-text)] mb-1">No journeys yet</p>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4 text-center max-w-xs">
            Plan your first AI-optimized journey and start earning $WINGS tokens
          </p>
          <Link href="/journey/new">
            <Button icon={<LuPlus className="w-4 h-4" />}>Plan Your First Journey</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {journeys.map((j, i) => (
            <motion.div
              key={j.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link href={`/journey/${j.id}`}>
                <Card hover>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-primary-light)] flex items-center justify-center">
                      <LuMapPin className="w-5 h-5 text-[var(--color-primary)]" />
                    </div>
                    <Badge variant={statusColors[j.status] || "default"} dot={j.status === "active"}>
                      {j.status}
                    </Badge>
                  </div>
                  <h3 className="text-base font-semibold text-[var(--color-text)] mb-1 font-[family-name:var(--font-heading)] truncate">
                    {j.title}
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)] mb-3">{j.destination || "—"}</p>
                  <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                    <span className="flex items-center gap-1">
                      <LuTarget className="w-3 h-3" />
                      {j.verified_checkpoints || 0}/{j.total_checkpoints || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <LuClock className="w-3 h-3" />
                      {new Date(j.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  {/* Progress */}
                  <div className="mt-3 h-1.5 bg-[var(--color-bg-alt)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[var(--color-primary)]"
                      style={{
                        width: `${j.total_checkpoints > 0 ? (j.verified_checkpoints / j.total_checkpoints) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
