"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  LuMapPin,
  LuCalendar,
  LuDollarSign,
  LuSparkles,
  LuLoader,
  LuRoute,
  LuTarget,
  LuCompass,
  LuGift,
} from "react-icons/lu";
import Card, { CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input, { Textarea, Select } from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";

const travelStyles = [
  { value: "adventure", label: "Adventure" },
  { value: "culture", label: "Culture & Heritage" },
  { value: "food", label: "Food & Cuisine" },
  { value: "nature", label: "Nature & Wildlife" },
  { value: "hidden", label: "Hidden Gems" },
  { value: "nightlife", label: "Nightlife" },
];

export default function NewJourneyPage() {
  const { address } = useAccount();
  const router = useRouter();
  const [form, setForm] = useState({
    destination: "",
    days: "3",
    budget: "",
    style: "adventure",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [aiPlan, setAiPlan] = useState(null);
  const [error, setError] = useState("");

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  async function generateRoute() {
    if (!form.destination.trim()) {
      setError("Please enter a destination");
      return;
    }
    setError("");
    setLoading(true);
    setAiPlan(null);

    try {
      const res = await fetch("/api/ai/route-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: form.destination,
          days: parseInt(form.days),
          budget: form.budget ? parseFloat(form.budget) : null,
          style: form.style,
          notes: form.notes,
        }),
      });

      if (!res.ok) throw new Error("Failed to generate route");
      const data = await res.json();
      setAiPlan(data);
    } catch (e) {
      setError(e.message || "AI route generation failed");
    } finally {
      setLoading(false);
    }
  }

  async function saveJourney() {
    if (!aiPlan || !address) return;
    setLoading(true);

    try {
      // Get user
      const uRes = await fetch(`/api/user/${address.toLowerCase()}`);
      if (!uRes.ok) throw new Error("User not found");
      const user = await uRes.json();

      // Create journey
      const jRes = await fetch("/api/journey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          title: aiPlan.title || `${form.destination} Adventure`,
          description: aiPlan.description || "",
          destination: form.destination,
          route: aiPlan.route || {},
          aiPlan: aiPlan,
          budget: form.budget ? parseFloat(form.budget) : null,
          checkpoints: aiPlan.checkpoints,
        }),
      });

      if (!jRes.ok) throw new Error("Failed to create journey");
      const journey = await jRes.json();

      router.push(`/journey/${journey.id}`);
    } catch (e) {
      setError(e.message || "Failed to save journey");
      setLoading(false);
    }
  }

  const categoryColors = {
    landmark: "primary",
    food: "warning",
    hidden: "purple",
    nature: "success",
    culture: "accent",
    nightlife: "accent",
    shopping: "default",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-text)]">
          Plan New Journey
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Tell us where you want to go. AI will create an optimized route with checkpoints.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Form */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <div className="space-y-4">
              <Input
                label="Destination"
                placeholder="e.g. Tokyo, Japan"
                value={form.destination}
                onChange={(e) => update("destination", e.target.value)}
                icon={<LuMapPin className="w-4 h-4" />}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Duration (days)"
                  type="number"
                  min="1"
                  max="30"
                  value={form.days}
                  onChange={(e) => update("days", e.target.value)}
                  icon={<LuCalendar className="w-4 h-4" />}
                />
                <Input
                  label="Budget (USD)"
                  type="number"
                  placeholder="Optional"
                  value={form.budget}
                  onChange={(e) => update("budget", e.target.value)}
                  icon={<LuDollarSign className="w-4 h-4" />}
                />
              </div>
              <Select
                label="Travel Style"
                value={form.style}
                onChange={(e) => update("style", e.target.value)}
                options={travelStyles}
              />
              <Textarea
                label="Additional Notes"
                placeholder="Any preferences, must-see spots, dietary restrictions..."
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
              />

              {error && (
                <p className="text-sm text-[var(--color-error)] bg-[var(--color-error-light)] px-3 py-2 rounded-[var(--radius-md)]">
                  {error}
                </p>
              )}

              <Button
                fullWidth
                loading={loading && !aiPlan}
                onClick={generateRoute}
                disabled={loading}
                icon={<LuSparkles className="w-4 h-4" />}
              >
                Generate AI Route
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* AI Plan Result */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {loading && !aiPlan && (
            <Card className="flex flex-col items-center justify-center min-h-[400px]">
              <LuLoader className="w-8 h-8 text-[var(--color-primary)] animate-spin mb-4" />
              <p className="text-sm font-medium text-[var(--color-text)]">AI is planning your route...</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">Analyzing destinations and optimizing checkpoints</p>
            </Card>
          )}

          {!loading && !aiPlan && (
            <Card className="flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-14 h-14 rounded-[var(--radius-xl)] bg-[var(--color-primary-light)] flex items-center justify-center mb-4">
                <LuCompass className="w-7 h-7 text-[var(--color-primary)]" />
              </div>
              <p className="text-sm font-medium text-[var(--color-text)] mb-1">Ready to plan</p>
              <p className="text-xs text-[var(--color-text-muted)] text-center max-w-xs">
                Fill in your journey details and let AI create a personalized route with optimized checkpoints
              </p>
            </Card>
          )}

          {aiPlan && (
            <Card>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <CardTitle>{aiPlan.title}</CardTitle>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">{aiPlan.description}</p>
                </div>
                <Badge variant="primary" icon={<LuSparkles className="w-3 h-3" />}>
                  AI Generated
                </Badge>
              </div>

              {/* Summary stats */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="p-3 rounded-[var(--radius-lg)] bg-[var(--color-bg-alt)] text-center">
                  <p className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--color-text)]">
                    {aiPlan.checkpoints?.length || 0}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">Checkpoints</p>
                </div>
                <div className="p-3 rounded-[var(--radius-lg)] bg-[var(--color-bg-alt)] text-center">
                  <p className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--color-primary)]">
                    {aiPlan.estimatedRewards || "—"}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">Est. $WINGS</p>
                </div>
                <div className="p-3 rounded-[var(--radius-lg)] bg-[var(--color-bg-alt)] text-center">
                  <p className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--color-text)]">
                    {form.days}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">Days</p>
                </div>
              </div>

              {/* Checkpoints list */}
              <div className="space-y-2 mb-5">
                {aiPlan.checkpoints?.map((cp, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-[var(--radius-lg)] border border-[var(--color-border)]"
                  >
                    <div className="w-7 h-7 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center flex-shrink-0 text-xs font-bold text-[var(--color-primary)]">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-[var(--color-text)] truncate">{cp.name}</p>
                        <Badge variant={categoryColors[cp.category] || "default"} className="text-[10px]">
                          {cp.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5 line-clamp-1">{cp.description}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-[var(--color-text-muted)]">
                        <span className="flex items-center gap-1">
                          <LuTarget className="w-3 h-3" />
                          Rarity: {cp.rarityScore}/100
                        </span>
                        <span className="flex items-center gap-1">
                          <LuGift className="w-3 h-3" />
                          ~{cp.estimatedReward} $WINGS
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button fullWidth onClick={saveJourney} loading={loading} icon={<LuRoute className="w-4 h-4" />}>
                Save & Start Journey
              </Button>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
