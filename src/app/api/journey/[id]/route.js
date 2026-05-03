import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "journey ID required" }, { status: 400 });
    }

    const journey = await prisma.journey.findUnique({
      where: { id },
      include: {
        checkpoints: {
          orderBy: { sort_order: "asc" }
        }
      }
    });

    if (!journey) {
      return NextResponse.json({ error: "Journey not found" }, { status: 404 });
    }

    return NextResponse.json(JSON.parse(JSON.stringify(journey)));
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
