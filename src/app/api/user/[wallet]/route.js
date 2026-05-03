import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const { wallet } = await params;

    if (!wallet) {
      return NextResponse.json({ error: "wallet required" }, { status: 400 });
    }

    let user = await prisma.user.findUnique({
      where: { wallet_address: wallet.toLowerCase() },
      include: {
        journeys: { select: { verified_checkpoints: true } },
        _count: {
          select: {
            journeys: true,
            verifications: { where: { status: "approved" } }
          }
        }
      }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          wallet_address: wallet.toLowerCase(),
          username: `explorer_${wallet.slice(2, 8).toLowerCase()}`,
        },
        include: {
          journeys: { select: { verified_checkpoints: true } },
          _count: {
            select: {
              journeys: true,
              verifications: { where: { status: "approved" } }
            }
          }
        }
      });
    }

    return NextResponse.json(JSON.parse(JSON.stringify(user)));
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
