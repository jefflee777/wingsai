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

    const data = await prisma.content.findMany({
      where: { user_id: user.id },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(JSON.parse(JSON.stringify(data)));
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { wallet, type, title, body } = await req.json();

    if (!wallet || !title || !body) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let user = await prisma.user.findUnique({ where: { wallet_address: wallet.toLowerCase() } });
    if (!user) {
      user = await prisma.user.create({ data: { wallet_address: wallet.toLowerCase(), username: `explorer_${wallet.slice(2, 8).toLowerCase()}` } });
    }

    const content = await prisma.content.create({
      data: {
        user_id: user.id,
        type,
        title,
        body,
        status: "pending",
      },
    });

    return NextResponse.json(JSON.parse(JSON.stringify(content)), { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
