import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

// GET — Fetch user journeys
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");

    if (!userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 });
    }

    const supabase = createServiceClient();
    let query = supabase
      .from("journeys")
      .select("*, checkpoints(id, name, verified, rarity_score, category, sort_order)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (status) query = query.eq("status", status);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json(data);
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

    const supabase = createServiceClient();

    const { data: journey, error: jErr } = await supabase
      .from("journeys")
      .insert({
        user_id: userId,
        title,
        destination: destination || "",
        description: description || "",
        status: "planned",
        route: route || {},
        ai_plan: aiPlan || {},
        budget: budget || null,
        total_checkpoints: checkpoints?.length || 0,
      })
      .select()
      .single();

    if (jErr) throw jErr;

    // Insert checkpoints
    if (checkpoints?.length && journey) {
      const cps = checkpoints.map((cp, i) => ({
        journey_id: journey.id,
        name: cp.name,
        description: cp.description || "",
        lat: cp.lat,
        lng: cp.lng,
        address: cp.address || "",
        rarity_score: cp.rarityScore || 50,
        category: cp.category || "landmark",
        sort_order: i,
      }));

      const { error: cpErr } = await supabase.from("checkpoints").insert(cps);
      if (cpErr) throw cpErr;
    }

    return NextResponse.json(journey, { status: 201 });
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

    const supabase = createServiceClient();
    const update = { status };
    if (status === "active") update.started_at = new Date().toISOString();
    if (status === "completed") update.completed_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("journeys")
      .update(update)
      .eq("id", journeyId)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
