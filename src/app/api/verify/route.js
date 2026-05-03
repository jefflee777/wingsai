import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const wallet = searchParams.get("wallet");

    if (!wallet) {
      return NextResponse.json({ error: "wallet required" }, { status: 400 });
    }

    let user = await prisma.user.findUnique({ where: { wallet_address: wallet.toLowerCase() } });
    if (!user) {
      user = await prisma.user.create({ data: { wallet_address: wallet.toLowerCase(), username: `explorer_${wallet.slice(2, 8).toLowerCase()}` } });
    }

    // Pending checkpoints from active or planned journeys
    const journeys = await prisma.journey.findMany({
      where: {
        user_id: user.id,
        status: { in: ["active", "planned"] }
      },
      select: { id: true }
    });

    const journeyIds = journeys.map(j => j.id);
    let checkpoints = [];
    if (journeyIds.length > 0) {
      checkpoints = await prisma.checkpoint.findMany({
        where: {
          journey_id: { in: journeyIds },
          verified: false
        },
        include: {
          journey: { select: { title: true, destination: true } }
        },
        orderBy: { sort_order: "asc" }
      });
    }

    // Recent verifications
    const verifications = await prisma.verification.findMany({
      where: { user_id: user.id },
      include: {
        checkpoint: { select: { name: true } }
      },
      orderBy: { created_at: "desc" },
      take: 10
    });

    return NextResponse.json(JSON.parse(JSON.stringify({ checkpoints, verifications })));
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
