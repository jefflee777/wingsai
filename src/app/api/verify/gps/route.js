import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { haversineDistance } from "@/lib/gps";
import { calculateReward } from "@/lib/rewards";

export async function POST(req) {
  try {
    const { checkpointId, userId, gpsLat, gpsLng, gpsAccuracy } = await req.json();

    if (!checkpointId || !userId || !gpsLat || !gpsLng) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = createServiceClient();

    // Get checkpoint
    const { data: checkpoint, error: cpErr } = await supabase
      .from("checkpoints")
      .select("*, journey:journeys(*)")
      .eq("id", checkpointId)
      .single();

    if (cpErr || !checkpoint) {
      return NextResponse.json({ error: "Checkpoint not found" }, { status: 404 });
    }

    // Calculate distance
    const distance = haversineDistance(gpsLat, gpsLng, checkpoint.lat, checkpoint.lng);
    const radius = 150; // meters
    const withinRadius = distance <= radius;

    // Determine fraud score (simple heuristic — real version would use Claude)
    let fraudScore = 0;
    if (gpsAccuracy > 100) fraudScore += 0.3;
    if (distance > 100) fraudScore += 0.2;
    if (gpsAccuracy > 200) fraudScore += 0.3;

    const status = !withinRadius ? "rejected" : fraudScore > 0.7 ? "flagged" : "approved";

    // Create verification record
    const { data: verification, error: vErr } = await supabase
      .from("verifications")
      .insert({
        checkpoint_id: checkpointId,
        user_id: userId,
        method: "gps",
        gps_lat: gpsLat,
        gps_lng: gpsLng,
        gps_accuracy: gpsAccuracy,
        distance_from_checkpoint: Math.round(distance),
        fraud_score: fraudScore,
        status,
      })
      .select()
      .single();

    if (vErr) throw vErr;

    let reward = null;

    // If approved, mark checkpoint verified and create reward
    if (status === "approved") {
      await supabase
        .from("checkpoints")
        .update({ verified: true, verified_at: new Date().toISOString() })
        .eq("id", checkpointId);

      // Calculate reward
      const journeyCheckpoints = await supabase
        .from("checkpoints")
        .select("verified")
        .eq("journey_id", checkpoint.journey_id);

      const completed = journeyCheckpoints.data?.filter((c) => c.verified).length || 0;
      const total = journeyCheckpoints.data?.length || 1;

      const rewardCalc = calculateReward({
        category: checkpoint.category,
        rarityScore: checkpoint.rarity_score,
        completedCheckpoints: completed,
        totalCheckpoints: total,
      });

      // Save reward
      const { data: rewardData } = await supabase
        .from("rewards")
        .insert({
          user_id: userId,
          source: "checkpoint",
          source_id: checkpointId,
          amount: rewardCalc.amount,
          multiplier: rewardCalc.multiplier,
          final_amount: rewardCalc.finalAmount,
        })
        .select()
        .single();

      reward = rewardData;

      // Update checkpoint reward value
      await supabase
        .from("checkpoints")
        .update({ reward_value: rewardCalc.finalAmount })
        .eq("id", checkpointId);

      // Update journey verified count
      await supabase
        .from("journeys")
        .update({
          verified_checkpoints: completed,
          total_rewards: checkpoint.journey?.total_rewards
            ? Number(checkpoint.journey.total_rewards) + rewardCalc.finalAmount
            : rewardCalc.finalAmount,
        })
        .eq("id", checkpoint.journey_id);

      // Update user tokens
      await supabase.rpc("increment_user_tokens", {
        p_user_id: userId,
        p_amount: rewardCalc.finalAmount,
      }).catch(() => {
        // RPC might not exist, update directly
        supabase
          .from("users")
          .update({
            total_tokens: (checkpoint.journey?.user?.total_tokens || 0) + rewardCalc.finalAmount,
          })
          .eq("id", userId);
      });
    }

    return NextResponse.json({
      verification,
      status,
      distance: Math.round(distance),
      withinRadius,
      fraudScore,
      reward,
    });
  } catch (err) {
    console.error("GPS verify error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
