"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { useAccount } from "wagmi";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import {
  LuMapPin,
  LuShield,
  LuCheck,
  LuClock,
  LuTarget,
  LuGift,
  LuSend,
  LuSparkles,
  LuLoader,
  LuNavigation,
  LuChevronRight,
  LuMessageSquare,
  LuX,
} from "react-icons/lu";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatDistance } from "@/lib/gps";

const MapView = dynamic(() => import("@/components/map/JourneyMap"), { ssr: false });

export default function ActiveJourneyPage() {
  const { id } = useParams();
  const { address } = useAccount();
  const [journey, setJourney] = useState(null);
  const [checkpoints, setCheckpoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(null);
  const [companionOpen, setCompanionOpen] = useState(false);
  const [companionMsg, setCompanionMsg] = useState("");
  const [companionReply, setCompanionReply] = useState("");
  const [companionLoading, setCompanionLoading] = useState(false);

  const loadJourney = useCallback(async () => {
    try {
      const res = await fetch(`/api/journey/${id}`);
      if (res.ok) {
        const j = await res.json();
        setJourney(j);
        setCheckpoints(j.checkpoints || []);
      }
    } catch (e) {
      console.warn("Load journey:", e);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadJourney();
  }, [loadJourney]);

  async function handleVerify(checkpoint) {
    if (!address) return;
    setVerifying(checkpoint.id);

    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (p) => resolve({ lat: p.coords.latitude, lng: p.coords.longitude, accuracy: p.coords.accuracy }),
          reject,
          { enableHighAccuracy: true, timeout: 10000 }
        );
      });

      const uRes = await fetch(`/api/user/${address.toLowerCase()}`);
      if (!uRes.ok) throw new Error("Could not find user.");
      const user = await uRes.json();

      const res = await fetch("/api/verify/gps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checkpointId: checkpoint.id,
          userId: user.id,
          gpsLat: pos.lat,
          gpsLng: pos.lng,
          gpsAccuracy: pos.accuracy,
        }),
      });

      const result = await res.json();

      if (result.status === "approved") {
        loadJourney();
      } else {
        alert(`Verification ${result.status}: You are ${formatDistance(result.distance)} from the checkpoint (max 150m)`);
      }
    } catch (e) {
      alert(e.message || "GPS verification failed. Please enable location services.");
    } finally {
      setVerifying(null);
    }
  }

  async function askCompanion() {
    if (!companionMsg.trim()) return;
    setCompanionLoading(true);
    setCompanionReply("");

    try {
      const res = await fetch("/api/ai/companion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: journey?.destination,
          checkpoints,
          message: companionMsg,
          currentLat: 0,
          currentLng: 0,
        }),
      });
      const data = await res.json();
      setCompanionReply(data.reply);
      setCompanionMsg("");
    } catch (e) {
      setCompanionReply("Sorry, I could not process that request.");
    } finally {
      setCompanionLoading(false);
    }
  }

  const verifiedCount = checkpoints.filter((c) => c.verified).length;
  const progress = checkpoints.length > 0 ? (verifiedCount / checkpoints.length) * 100 : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LuLoader className="w-6 h-6 text-[var(--color-primary)] animate-spin" />
      </div>
    );
  }

  if (!journey) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <LuMapPin className="w-10 h-10 text-[var(--color-text-muted)] mb-3" />
        <p className="text-sm text-[var(--color-text-secondary)]">Journey not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-text)]">
              {journey.title}
            </h1>
            <Badge variant={journey.status === "active" ? "primary" : journey.status === "completed" ? "success" : "default"} dot={journey.status === "active"}>
              {journey.status}
            </Badge>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">{journey.destination}</p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          icon={<LuMessageSquare className="w-4 h-4" />}
          onClick={() => setCompanionOpen(!companionOpen)}
        >
          AI Companion
        </Button>
      </motion.div>

      {/* Progress bar */}
      <Card padding="p-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium text-[var(--color-text)]">Journey Progress</span>
          <span className="text-[var(--color-text-secondary)]">{verifiedCount}/{checkpoints.length} checkpoints</span>
        </div>
        <div className="h-2.5 bg-[var(--color-bg-alt)] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8 }}
            className="h-full rounded-full bg-[var(--color-primary)]"
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card padding="p-0" className="overflow-hidden h-[400px] lg:h-[500px]">
            <MapView checkpoints={checkpoints} />
          </Card>
        </div>

        {/* Checkpoints list */}
        <div className="space-y-3">
          <CardTitle>Checkpoints</CardTitle>
          <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {checkpoints.map((cp, i) => (
              <motion.div
                key={cp.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`p-3 rounded-[var(--radius-lg)] border transition-all ${
                  cp.verified
                    ? "bg-[var(--color-success-light)] border-[var(--color-success)]/20"
                    : "bg-white border-[var(--color-border)] hover:border-[var(--color-border-strong)]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                    cp.verified
                      ? "bg-[var(--color-success)] text-white"
                      : "bg-[var(--color-bg-alt)] text-[var(--color-text-secondary)]"
                  }`}>
                    {cp.verified ? <LuCheck className="w-4 h-4" /> : i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-[var(--color-text)] truncate">{cp.name}</p>
                      <Badge variant={cp.verified ? "success" : "default"} className="text-[10px]">
                        {cp.category}
                      </Badge>
                    </div>
                    {cp.description && (
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5 line-clamp-1">{cp.description}</p>
                    )}
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-[var(--color-text-muted)]">
                      <span className="flex items-center gap-1">
                        <LuTarget className="w-3 h-3" /> {cp.rarity_score}/100
                      </span>
                      {cp.verified && cp.reward_value > 0 && (
                        <span className="flex items-center gap-1 text-[var(--color-success)]">
                          <LuGift className="w-3 h-3" /> +{Number(cp.reward_value).toFixed(1)} $WINGS
                        </span>
                      )}
                    </div>
                    {!cp.verified && (
                      <Button
                        size="xs"
                        variant="primary"
                        className="mt-2"
                        loading={verifying === cp.id}
                        onClick={() => handleVerify(cp)}
                        icon={<LuNavigation className="w-3 h-3" />}
                      >
                        Check In
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Companion Panel */}
      {companionOpen && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center">
                  <LuSparkles className="w-4 h-4 text-[var(--color-primary)]" />
                </div>
                <CardTitle>AI Companion</CardTitle>
              </div>
              <button onClick={() => setCompanionOpen(false)} className="p-1 rounded hover:bg-[var(--color-bg-alt)] cursor-pointer">
                <LuX className="w-4 h-4 text-[var(--color-text-muted)]" />
              </button>
            </CardHeader>
            {companionReply && (
              <div className="p-3 rounded-[var(--radius-lg)] bg-[var(--color-primary-light)] border border-[var(--color-primary)]/10 mb-3">
                <p className="text-sm text-[var(--color-text)]">{companionReply}</p>
              </div>
            )}
            <div className="flex gap-2">
              <input
                value={companionMsg}
                onChange={(e) => setCompanionMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && askCompanion()}
                placeholder="Ask about nearby spots, tips, directions..."
                className="flex-1 px-3 py-2 text-sm bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-[var(--radius-lg)] focus:outline-none focus:border-[var(--color-primary)]"
              />
              <Button size="md" onClick={askCompanion} loading={companionLoading} icon={<LuSend className="w-4 h-4" />}>
                Send
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
