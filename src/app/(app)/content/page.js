"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { motion } from "motion/react";
import { LuSquarePen, LuPlus, LuImage, LuMessageSquare, LuLightbulb, LuBookOpen, LuStar, LuClock, LuX } from "react-icons/lu";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input, { Textarea, Select } from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { supabase } from "@/lib/supabase";

export default function ContentPage() {
  const { address } = useAccount();
  const [content, setContent] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ type: "review", title: "", body: "" });

  useEffect(() => { loadContent(); }, [address]);

  async function loadContent() {
    if (!address) return;
    try {
      const { data: u } = await supabase.from("users").select("id").eq("wallet_address", address.toLowerCase()).single();
      if (!u) return;
      const { data } = await supabase.from("content").select("*").eq("user_id", u.id).order("created_at", { ascending: false });
      setContent(data || []);
    } catch (e) { console.warn(e); }
    finally { setLoading(false); }
  }

  async function handleSubmit() {
    if (!form.title.trim() || !form.body.trim()) return;
    setSubmitting(true);
    try {
      const { data: u } = await supabase.from("users").select("id").eq("wallet_address", address.toLowerCase()).single();
      await supabase.from("content").insert({ user_id: u.id, type: form.type, title: form.title, body: form.body, status: "pending" });
      setShowModal(false);
      setForm({ type: "review", title: "", body: "" });
      loadContent();
    } catch (e) { console.warn(e); }
    finally { setSubmitting(false); }
  }

  const typeIcons = { review: LuMessageSquare, photo: LuImage, tip: LuLightbulb, story: LuBookOpen };
  const statusVariant = { pending: "default", scored: "primary", rewarded: "success", rejected: "error" };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Content Studio</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Upload reviews, tips, and stories. AI scores quality for rewards.</p>
        </div>
        <Button icon={<LuPlus className="w-4 h-4" />} onClick={() => setShowModal(true)}>Create Content</Button>
      </motion.div>

      <Card>
        <CardHeader><CardTitle>Your Content</CardTitle><Badge>{content.length}</Badge></CardHeader>
        {content.length === 0 ? (
          <div className="text-center py-8">
            <LuSquarePen className="w-8 h-8 text-[var(--color-text-muted)] mx-auto mb-3" />
            <p className="text-sm text-[var(--color-text-secondary)]">No content yet</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">Share your travel experiences to earn rewards</p>
          </div>
        ) : (
          <div className="space-y-2">
            {content.map(c => {
              const TI = typeIcons[c.type] || LuSquarePen;
              return (
                <div key={c.id} className="flex items-center justify-between p-3 rounded-[var(--radius-lg)] border border-[var(--color-border)]">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-[var(--radius-lg)] bg-[var(--color-accent-light)] flex items-center justify-center"><TI className="w-4 h-4 text-[var(--color-accent)]" /></div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[var(--color-text)] truncate">{c.title || "Untitled"}</p>
                      <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                        <span className="capitalize">{c.type}</span>
                        {c.quality_score != null && <><span>·</span><span className="flex items-center gap-1"><LuStar className="w-3 h-3" />{(c.quality_score * 100).toFixed(0)}%</span></>}
                        <span>·</span><span><LuClock className="w-3 h-3 inline" /> {new Date(c.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {c.reward_granted > 0 && <span className="text-xs font-bold text-[var(--color-success)]">+{Number(c.reward_granted).toFixed(1)}</span>}
                    <Badge variant={statusVariant[c.status]}>{c.status}</Badge>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Create Content" description="Share your travel experience to earn $WINGS rewards.">
        <div className="space-y-4">
          <Select label="Type" value={form.type} onChange={e => setForm(f => ({...f, type: e.target.value}))} options={[{value:"review",label:"Review"},{value:"tip",label:"Travel Tip"},{value:"story",label:"Story"},{value:"photo",label:"Photo Story"}]} />
          <Input label="Title" placeholder="Give your content a title" value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} />
          <Textarea label="Content" placeholder="Write your review, tip, or story..." value={form.body} onChange={e => setForm(f => ({...f, body: e.target.value}))} />
          <Button fullWidth onClick={handleSubmit} loading={submitting} icon={<LuSquarePen className="w-4 h-4" />}>Submit for Review</Button>
        </div>
      </Modal>
    </div>
  );
}
