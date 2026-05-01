import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.YOUR_SITE_URL || "https://wings.app",
    "X-Title": "Wings AI Companion",
  },
});

export async function POST(req) {
  try {
    const { currentLat, currentLng, destination, checkpoints, message } = await req.json();

    const remainingCheckpoints = checkpoints
      ?.filter((cp) => !cp.verified)
      ?.map((cp) => `${cp.name} (${cp.category}, rarity: ${cp.rarity_score})`)
      ?.join(", ");

    const prompt = `You are Wings AI Companion, a friendly and knowledgeable travel assistant embedded in a mobile travel app. The user is currently exploring ${destination || "their journey"}.

CURRENT LOCATION: ${currentLat}, ${currentLng}
REMAINING CHECKPOINTS: ${remainingCheckpoints || "None"}

USER MESSAGE: ${message || "Give me a travel tip for my current area"}

Respond in a helpful, concise, and friendly way (2-3 sentences max). If the user is near a checkpoint, mention it. Give practical local tips. Be specific, not generic.`;

    const response = await openai.chat.completions.create({
      model: "anthropic/claude-sonnet-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 300,
    });

    const reply = response.choices[0]?.message?.content || "I am here to help with your journey!";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Companion error:", err);
    return NextResponse.json(
      { reply: "I am having trouble connecting right now. Please try again shortly." },
      { status: 200 }
    );
  }
}
