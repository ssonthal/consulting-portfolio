import { NextResponse } from "next/server";
import { matchIntent, FALLBACK_REPLY } from "@/lib/chat-knowledge";

export async function POST(request: Request) {
  const { message } = (await request.json()) as { message?: string };

  if (!message?.trim()) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  const ruleReply = matchIntent(message);
  if (ruleReply) {
    return NextResponse.json({ reply: ruleReply, source: "rules" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ reply: FALLBACK_REPLY, source: "fallback" });
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        max_tokens: 300,
        messages: [
          {
            role: "system",
            content: `You are FlowDesk's website assistant. You help businesses with AI chatbots for sales: FAQ agents, lead qualification, WhatsApp, follow-ups. Be concise (2-4 sentences). If they want a demo or pricing call, say you'll collect their details. Do not invent specific prices. Brand: FlowDesk by Shubham Sonthalia.`,
          },
          { role: "user", content: message },
        ],
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ reply: FALLBACK_REPLY, source: "fallback" });
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const reply =
      data.choices?.[0]?.message?.content?.trim() ?? FALLBACK_REPLY;
    return NextResponse.json({ reply, source: "openai" });
  } catch {
    return NextResponse.json({ reply: FALLBACK_REPLY, source: "fallback" });
  }
}
