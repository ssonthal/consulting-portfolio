export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export const QUICK_REPLIES = [
  "What do you do?",
  "How it works",
  "Get in touch",
] as const;

type Intent = {
  patterns: RegExp[];
  reply: string;
};

const INTENTS: Intent[] = [
  {
    patterns: [/hello|hi|hey|namaste|start/i],
    reply:
      "Hi—I'm Shubham's site assistant. I can explain FAQ chatbots, lead qualification, and how to get in touch.",
  },
  {
    patterns: [/what do you (build|do)|services|offer|help/i],
    reply:
      "Shubham builds FAQ chatbots (RAG over your documents), lead qualification in chat, and handoffs to Sheets, CRM, or email. First projects are usually 2–3 weeks.",
  },
  {
    patterns: [/how (it|this) works|rag|document|knowledge/i],
    reply:
      "For FAQ bots, you provide documents (pricing, services, policies). The bot answers from that content—not generic guesses. Full RAG on your docs is what we're building next; this widget is a simple preview.",
  },
  {
    patterns: [/price|pricing|cost|how much|budget/i],
    reply:
      "Pricing depends on channels (web vs WhatsApp) and integrations. Email Shubham with your use case for a scoped quote after a short call.",
  },
  {
    patterns: [/timeline|how long|weeks|launch/i],
    reply:
      "A focused FAQ + lead capture project is often 2–3 weeks: scope and documents, build and test, then go live on your site or WhatsApp.",
  },
  {
    patterns: [/whatsapp|channel/i],
    reply:
      "Yes—FAQ and qualification can run on a website widget or WhatsApp Business API, with handoff to your team when needed.",
  },
  {
    patterns: [/crm|sheet|integrat|slack/i],
    reply:
      "Qualified leads can go to Google Sheets, a CRM, Slack, or email—whatever your team already uses.",
  },
  {
    patterns: [/contact|email|book|call|demo|meet/i],
    reply: "__LEAD_CAPTURE__",
  },
  {
    patterns: [/thank|thanks|bye|goodbye/i],
    reply: "You're welcome. Use Get in touch or the contact page if you want Shubham to follow up.",
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
  "I'm not sure about that. Try What do you do?, How it works, or Get in touch.";

export const WELCOME_MESSAGE =
  "Hi—ask about FAQ chatbots, how RAG works, or how to contact Shubham.";
