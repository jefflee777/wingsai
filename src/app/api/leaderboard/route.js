import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const orderCol = searchParams.get("tab") === "tokens" ? "total_tokens" : "reputation_score";

    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        wallet_address: true,
        total_tokens: true,
        reputation_score: true,
        level: true,
      },
      orderBy: { [orderCol]: "desc" },
      take: 25,
    });

    return NextResponse.json(JSON.parse(JSON.stringify(users)));
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
