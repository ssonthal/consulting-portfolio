export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export const QUICK_REPLIES = [
  "What do you build?",
  "Pricing & timeline",
  "WhatsApp integration",
  "Book a demo",
] as const;

type Intent = {
  patterns: RegExp[];
  reply: string;
};

const INTENTS: Intent[] = [
  {
    patterns: [/hello|hi|hey|namaste|start/i],
    reply:
      "Hi! I'm the FlowDesk assistant. I can explain our AI agents for inbound sales—FAQ bots, lead qualification, and follow-ups. What would you like to know?",
  },
  {
    patterns: [/what do you (build|do)|services|offer|help/i],
    reply:
      "We build conversational AI: FAQ agents on your website or WhatsApp, lead qualification (budget, timeline, fit), and automated follow-ups. Typical first project is live in 2–3 weeks.",
  },
  {
    patterns: [/price|pricing|cost|how much|budget/i],
    reply:
      "Pilot projects usually start with a focused FAQ + lead-capture agent. Pricing depends on channels (web vs WhatsApp), integrations (CRM/Sheets), and volume. Book a demo and we'll scope a fixed quote after a 15-min call.",
  },
  {
    patterns: [/timeline|how long|weeks|launch/i],
    reply:
      "A first FAQ + lead capture agent is often live in 2–3 weeks: week 1 discovery + knowledge base, week 2 build + test, week 3 pilot on your site or WhatsApp.",
  },
  {
    patterns: [/whatsapp|instagram|channel|omnichannel/i],
    reply:
      "Yes—we deploy on your website widget, WhatsApp Business API, and can hand off to your team with full chat context. English, Hindi, and Hinglish are supported.",
  },
  {
    patterns: [/crm|zoho|hubspot|sheet|integrat/i],
    reply:
      "Qualified leads can sync to Google Sheets, Zoho, HubSpot, or Slack/email alerts—whatever your team already uses. No forced CRM migration.",
  },
  {
    patterns: [/human|handoff|escalat|talk to (a )?person/i],
    reply:
      "Complex queries escalate to your team with the full conversation attached—so reps don't re-ask budget and timeline questions.",
  },
  {
    patterns: [/inbound|sme|who is this for|fit/i],
    reply:
      "We work with any business that gets enquiries online—service companies, B2B, e-commerce, agencies—especially when leads stall between first message and follow-up.",
  },
  {
    patterns: [/demo|call|meet|contact|book/i],
    reply: "__LEAD_CAPTURE__",
  },
  {
    patterns: [/thank|thanks|bye|goodbye/i],
    reply:
      "You're welcome! If you'd like a custom walkthrough, tap \"Book a demo\" or leave your details and Shubham will reach out within 1–2 business days.",
  },
];

export function matchIntent(text: string): string {
  const normalized = text.trim();
  for (const intent of INTENTS) {
    if (intent.patterns.some((p) => p.test(normalized))) {
      return intent.reply;
    }
  }
  return "";
}

export const FALLBACK_REPLY =
  "I'm not sure about that yet. Try asking about pricing, WhatsApp setup, timelines, or tap **Book a demo** to speak with Shubham directly.";

export const WELCOME_MESSAGE =
  "Hi there 👋 I'm FlowDesk's AI assistant. Ask me about WhatsApp chatbots, lead qualification, or how we help turn more enquiries into customers.";
