import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { haversineDistance } from "@/lib/gps";
import { calculateReward } from "@/lib/rewards";

export async function POST(req) {
  try {
    const { checkpointId, userId, gpsLat, gpsLng, gpsAccuracy } = await req.json();

    if (!checkpointId || !userId || !gpsLat || !gpsLng) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Get checkpoint with journey and user included to calculate rewards
    const checkpoint = await prisma.checkpoint.findUnique({
      where: { id: checkpointId },
      include: {
        journey: {
          include: { user: true }
        }
      }
    });

    if (!checkpoint) {
      return NextResponse.json({ error: "Checkpoint not found" }, { status: 404 });
    }

    // Calculate distance
    const distance = haversineDistance(gpsLat, gpsLng, checkpoint.lat, checkpoint.lng);
    const radius = 150; // meters
    const withinRadius = distance <= radius;

    // Determine fraud score (simple heuristic)
    let fraudScore = 0;
    if (gpsAccuracy > 100) fraudScore += 0.3;
    if (distance > 100) fraudScore += 0.2;
    if (gpsAccuracy > 200) fraudScore += 0.3;

    const status = !withinRadius ? "rejected" : fraudScore > 0.7 ? "flagged" : "approved";

    // Start Prisma Transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create verification record
      const verification = await tx.verification.create({
        data: {
          checkpoint_id: checkpointId,
          user_id: userId,
          method: "gps",
          gps_lat: gpsLat,
          gps_lng: gpsLng,
          gps_accuracy: gpsAccuracy,
          distance_from_checkpoint: Math.round(distance),
          fraud_score: fraudScore,
          status,
        }
      });

      let reward = null;

      // If approved, mark checkpoint verified and create reward
      if (status === "approved") {
        await tx.checkpoint.update({
          where: { id: checkpointId },
          data: { verified: true, verified_at: new Date() }
        });

        // Get all checkpoints for this journey to calculate completion
        const journeyCheckpoints = await tx.checkpoint.findMany({
          where: { journey_id: checkpoint.journey_id },
          select: { verified: true }
        });

        // The current checkpoint was just verified, so it counts
        const completed = journeyCheckpoints.filter((c) => c.verified).length + 1; // +1 because the query might not reflect the update yet depending on isolation level, though inside same tx it usually does, to be safe we can rely on tx ordering. Actually Prisma update inside tx is visible. Let's just trust filter.
        
        // Actually to be completely safe:
        const completedCount = journeyCheckpoints.filter((c) => c.verified).length;
        const total = journeyCheckpoints.length || 1;

        const rewardCalc = calculateReward({
          category: checkpoint.category,
          rarityScore: checkpoint.rarity_score,
          completedCheckpoints: completedCount,
          totalCheckpoints: total,
        });

        // Save reward
        reward = await tx.reward.create({
          data: {
            user_id: userId,
            source: "checkpoint",
            source_id: checkpointId,
            amount: rewardCalc.amount,
            multiplier: rewardCalc.multiplier,
            final_amount: rewardCalc.finalAmount,
          }
        });

        // Update checkpoint reward value
        await tx.checkpoint.update({
          where: { id: checkpointId },
          data: { reward_value: rewardCalc.finalAmount }
        });

        // Update journey verified count and total rewards
        await tx.journey.update({
          where: { id: checkpoint.journey_id },
          data: {
            verified_checkpoints: completedCount,
            total_rewards: {
              increment: rewardCalc.finalAmount
            }
          }
        });

        // Update user tokens
        await tx.user.update({
          where: { id: userId },
          data: {
            total_tokens: {
              increment: rewardCalc.finalAmount
            }
          }
        });
      }

      return { verification, reward };
    });

    return NextResponse.json({
      verification: JSON.parse(JSON.stringify(result.verification)),
      status,
      distance: Math.round(distance),
      withinRadius,
      fraudScore,
      reward: result.reward ? JSON.parse(JSON.stringify(result.reward)) : null,
    });
  } catch (err) {
    console.error("GPS verify error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
