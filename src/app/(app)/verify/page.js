"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { motion } from "motion/react";
import {
  LuShield,
  LuNavigation,
  LuLoader,
  LuMapPin,
  LuCheck,
  LuX,
  LuTriangleAlert,
  LuRadar,
} from "react-icons/lu";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatDistance } from "@/lib/gps";

export default function VerifyPage() {
  const { address } = useAccount();
  const [checkpoints, setCheckpoints] = useState([]);
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(null);
  const [gpsStatus, setGpsStatus] = useState(null);

  useEffect(() => {
    loadData();
  }, [address]);

  async function loadData() {
    if (!address) return;
    try {
      const res = await fetch(`/api/verify?wallet=${address.toLowerCase()}`);
      if (!res.ok) return;
      const data = await res.json();
      setCheckpoints(data.checkpoints || []);
      setVerifications(data.verifications || []);
    } catch (e) {
      console.warn("Verify load:", e);
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(checkpoint) {
    setVerifying(checkpoint.id);
    setGpsStatus("locating");

    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (p) => resolve({ lat: p.coords.latitude, lng: p.coords.longitude, accuracy: p.coords.accuracy }),
          reject,
          { enableHighAccuracy: true, timeout: 15000 }
        );
      });

      setGpsStatus("verifying");

      const uRes = await fetch(`/api/user/${address.toLowerCase()}`);
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
      setGpsStatus(result.status);

      setTimeout(() => {
        setGpsStatus(null);
        loadData();
      }, 3000);
    } catch (e) {
      setGpsStatus("error");
      setTimeout(() => setGpsStatus(null), 3000);
    } finally {
      setVerifying(null);
    }
  }

  const statusIcon = {
    approved: <LuCheck className="w-4 h-4" />,
    rejected: <LuX className="w-4 h-4" />,
    flagged: <LuTriangleAlert className="w-4 h-4" />,
    pending: <LuLoader className="w-4 h-4 animate-spin" />,
  };

  const statusVariant = {
    approved: "success",
    rejected: "error",
    flagged: "warning",
    pending: "default",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-text)]">
          Proof of Travel
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          GPS check-in at checkpoints to verify your visit and earn rewards.
        </p>
      </motion.div>

      {/* GPS Status indicator */}
      {gpsStatus && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Card padding="p-4" className={
            gpsStatus === "approved" ? "border-[var(--color-success)]" :
            gpsStatus === "rejected" ? "border-[var(--color-error)]" :
            "border-[var(--color-primary)]"
          }>
            <div className="flex items-center gap-3">
              {gpsStatus === "locating" && <LuRadar className="w-5 h-5 text-[var(--color-primary)] animate-pulse" />}
              {gpsStatus === "verifying" && <LuLoader className="w-5 h-5 text-[var(--color-primary)] animate-spin" />}
              {gpsStatus === "approved" && <LuCheck className="w-5 h-5 text-[var(--color-success)]" />}
              {gpsStatus === "rejected" && <LuX className="w-5 h-5 text-[var(--color-error)]" />}
              {gpsStatus === "error" && <LuTriangleAlert className="w-5 h-5 text-[var(--color-error)]" />}
              <span className="text-sm font-medium text-[var(--color-text)]">
                {gpsStatus === "locating" && "Getting your GPS location..."}
                {gpsStatus === "verifying" && "Verifying coordinates..."}
                {gpsStatus === "approved" && "Verified! Reward earned."}
                {gpsStatus === "rejected" && "Too far from checkpoint. Move closer and try again."}
                {gpsStatus === "error" && "Location unavailable. Enable GPS and try again."}
              </span>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Pending checkpoints */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Check-ins</CardTitle>
          <Badge variant="primary">{checkpoints.length} remaining</Badge>
        </CardHeader>
        {checkpoints.length === 0 ? (
          <div className="text-center py-8">
            <LuShield className="w-8 h-8 text-[var(--color-text-muted)] mx-auto mb-3" />
            <p className="text-sm text-[var(--color-text-secondary)]">No pending checkpoints</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">Plan a journey to get checkpoints to verify</p>
          </div>
        ) : (
          <div className="space-y-2">
            {checkpoints.map((cp) => (
              <div
                key={cp.id}
                className="flex items-center justify-between p-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] hover:bg-[var(--color-bg-alt)] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-[var(--radius-lg)] bg-[var(--color-primary-light)] flex items-center justify-center flex-shrink-0">
                    <LuMapPin className="w-4 h-4 text-[var(--color-primary)]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[var(--color-text)] truncate">{cp.name}</p>
                    <p className="text-xs text-[var(--color-text-muted)] truncate">
                      {cp.journey?.title} · {cp.category} · Rarity: {cp.rarity_score}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  loading={verifying === cp.id}
                  onClick={() => handleVerify(cp)}
                  icon={<LuNavigation className="w-3.5 h-3.5" />}
                >
                  Check In
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Verification history */}
      <Card>
        <CardHeader>
          <CardTitle>Verification History</CardTitle>
        </CardHeader>
        {verifications.length === 0 ? (
          <p className="text-sm text-[var(--color-text-muted)] text-center py-6">No verifications yet</p>
        ) : (
          <div className="space-y-2">
            {verifications.map((v) => (
              <div key={v.id} className="flex items-center justify-between p-3 rounded-[var(--radius-lg)] bg-[var(--color-bg-alt)]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    v.status === "approved" ? "bg-[var(--color-success-light)] text-[var(--color-success)]" :
                    v.status === "rejected" ? "bg-[var(--color-error-light)] text-[var(--color-error)]" :
                    "bg-[var(--color-warning-light)] text-[var(--color-warning)]"
                  }`}>
                    {statusIcon[v.status]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[var(--color-text)] truncate">{v.checkpoint?.name || "Checkpoint"}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {formatDistance(v.distance_from_checkpoint)} away · {new Date(v.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                <Badge variant={statusVariant[v.status]}>{v.status}</Badge>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
