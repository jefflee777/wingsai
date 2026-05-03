import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const wallet = searchParams.get("wallet");
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")) : undefined;

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

    const data = await prisma.reward.findMany({
      where: { user_id: targetUserId },
      orderBy: { earned_at: "desc" },
      take: limit,
    });

    return NextResponse.json(JSON.parse(JSON.stringify(data)));
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
