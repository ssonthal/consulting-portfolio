import { NextResponse } from "next/server";
import { site } from "@/lib/site";

type LeadBody = {
  name: string;
  email: string;
  need?: string;
  transcript?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as LeadBody;

  if (!body.name?.trim() || !body.email?.trim()) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 },
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const lead = {
    ...body,
    receivedAt: new Date().toISOString(),
  };

  console.info("[lead]", JSON.stringify(lead));

  const resendKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.LEAD_NOTIFY_EMAIL ?? site.email;

  if (resendKey && notifyTo) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM ?? "FlowDesk <onboarding@resend.dev>",
          to: [notifyTo],
          subject: `New lead from chat: ${body.name}`,
          text: [
            `Name: ${body.name}`,
            `Email: ${body.email}`,
            `Need: ${body.need ?? "—"}`,
            "",
            "Conversation:",
            body.transcript ?? "—",
          ].join("\n"),
        }),
      });
    } catch (err) {
      console.error("[lead] Resend failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
