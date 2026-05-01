import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.YOUR_SITE_URL || "https://wings.app",
    "X-Title": "Wings AI Travel",
  },
});

export async function POST(req) {
  try {
    const { destination, days, budget, style, notes } = await req.json();

    if (!destination) {
      return NextResponse.json({ error: "Destination required" }, { status: 400 });
    }

    const prompt = `You are Wings AI, a travel intelligence engine. Generate an optimized travel route plan.

DESTINATION: ${destination}
DURATION: ${days} days
BUDGET: ${budget ? `$${budget} USD` : "Flexible"}
TRAVEL STYLE: ${style}
${notes ? `NOTES: ${notes}` : ""}

Create a detailed route with ${Math.min(days * 3, 12)} checkpoints. For each checkpoint, provide real coordinates.

Respond ONLY with valid JSON in this exact format:
{
  "title": "Journey title",
  "description": "Brief description of the route",
  "estimatedRewards": <total estimated WINGS tokens as number>,
  "route": {
    "summary": "Route overview",
    "totalDistance": "estimated total km"
  },
  "checkpoints": [
    {
      "name": "Place name",
      "description": "Why visit this place (1-2 sentences)",
      "lat": <latitude as number>,
      "lng": <longitude as number>,
      "address": "Address or area",
      "category": "landmark|food|hidden|nature|culture|nightlife|shopping",
      "rarityScore": <1-100 integer>,
      "estimatedReward": <WINGS tokens as number>,
      "suggestedTime": "Best time to visit"
    }
  ]
}

Rules:
- Use REAL coordinates for the destination
- Rarity scores: well-known = 20-40, moderate = 40-70, hidden gems = 70-100
- Higher rarity = higher reward
- Categories must be exactly one of: landmark, food, hidden, nature, culture, nightlife, shopping
- estimatedReward should be between 5 and 50 WINGS per checkpoint
- Order checkpoints in a logical travel sequence
- Mix categories for a varied experience`;

    const response = await openai.chat.completions.create({
      model: "anthropic/claude-sonnet-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 3000,
    });

    const content = response.choices[0]?.message?.content || "";

    // Extract JSON from response
    let plan;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        plan = JSON.parse(jsonMatch[0]);
      } else {
        plan = JSON.parse(content);
      }
    } catch (parseErr) {
      return NextResponse.json(
        { error: "Failed to parse AI response", raw: content },
        { status: 500 }
      );
    }

    return NextResponse.json(plan);
  } catch (err) {
    console.error("Route plan error:", err);
    return NextResponse.json(
      { error: err.message || "AI route generation failed" },
      { status: 500 }
    );
  }
}
