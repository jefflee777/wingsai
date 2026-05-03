import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const { wallet_address, username } = await req.json();

    if (!wallet_address) {
      return NextResponse.json({ error: "wallet_address required" }, { status: 400 });
    }

    const user = await prisma.user.upsert({
      where: { wallet_address: wallet_address.toLowerCase() },
      update: {},
      create: {
        wallet_address: wallet_address.toLowerCase(),
        username: username || `explorer_${wallet_address.slice(2, 8)}`,
      },
    });

    // In prisma, decimals are returned as objects, so we stringify/parse to safely send JSON
    // Or we can just let NextResponse handle it, but sometimes it throws on BigInt/Decimal
    // Prisma returns Decimal instance.
    return NextResponse.json(JSON.parse(JSON.stringify(user)));
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
