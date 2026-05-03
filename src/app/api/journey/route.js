import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET — Fetch user journeys
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const wallet = searchParams.get("wallet");
    const status = searchParams.get("status");

    if (!userId && !wallet) {
      return NextResponse.json({ error: "userId or wallet required" }, { status: 400 });
    }

    let targetUserId = userId;
    if (wallet) {
      let user = await prisma.user.findUnique({ where: { wallet_address: wallet.toLowerCase() } });
      if (!user) {
        user = await prisma.user.create({ data: { wallet_address: wallet.toLowerCase(), username: `explorer_${wallet.slice(2, 8).toLowerCase()}` } });
      }
      targetUserId = user.id;
    }

    const where = { user_id: targetUserId };
    if (status) where.status = status;

    const data = await prisma.journey.findMany({
      where,
      orderBy: { created_at: "desc" },
      include: {
        checkpoints: {
          select: {
            id: true,
            name: true,
            verified: true,
            rarity_score: true,
            category: true,
            sort_order: true,
          },
        },
      },
    });

    return NextResponse.json(JSON.parse(JSON.stringify(data)));
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST — Create a new journey
export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, title, destination, description, route, aiPlan, budget, checkpoints } = body;

    if (!userId || !title) {
      return NextResponse.json({ error: "userId and title required" }, { status: 400 });
    }

    const journey = await prisma.journey.create({
      data: {
        user_id: userId,
        title,
        destination: destination || "",
        description: description || "",
        status: "planned",
        route: route || {},
        ai_plan: aiPlan || {},
        budget: budget || null,
        total_checkpoints: checkpoints?.length || 0,
        checkpoints: checkpoints?.length ? {
          create: checkpoints.map((cp, i) => ({
            name: cp.name,
            description: cp.description || "",
            lat: cp.lat,
            lng: cp.lng,
            address: cp.address || "",
            rarity_score: cp.rarityScore || 50,
            category: cp.category || "landmark",
            sort_order: i,
          })),
        } : undefined,
      },
      include: { checkpoints: true }
    });

    return NextResponse.json(JSON.parse(JSON.stringify(journey)), { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PATCH — Update journey status
export async function PATCH(req) {
  try {
    const { journeyId, status } = await req.json();

    if (!journeyId || !status) {
      return NextResponse.json({ error: "journeyId and status required" }, { status: 400 });
    }

    const update = { status };
    if (status === "active") update.started_at = new Date();
    if (status === "completed") update.completed_at = new Date();

    const journey = await prisma.journey.update({
      where: { id: journeyId },
      data: update,
    });

    return NextResponse.json(JSON.parse(JSON.stringify(journey)));
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
