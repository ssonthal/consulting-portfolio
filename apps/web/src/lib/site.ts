export const site = {
  name: "Shubham Sonthalia",
  brand: "FlowDesk",
  title: "AI Agents for Sales & Lead Conversion",
  description:
    "Conversational AI for your channels—FAQ chatbots, lead qualification, and follow-ups that turn enquiries into customers. Human-like at scale.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@example.com",
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL,
} as const;

export const stats = [
  { value: "3×", label: "Faster lead response" },
  { value: "40%", label: "More qualified conversations" },
  { value: "24/7", label: "Always-on coverage" },
  { value: "70%", label: "Less repetitive FAQ load" },
] as const;

export type AgentCard = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  featured?: boolean;
};

export const agents: AgentCard[] = [
  {
    id: "whatsapp",
    title: "AI WhatsApp Agent",
    subtitle: "Inbound where it already happens",
    description:
      "Answer pricing and service questions on WhatsApp Business, capture leads in-thread, and hand off with full chat history.",
    gradient: "from-emerald-600 to-green-600",
    featured: true,
  },
  {
    id: "sales",
    title: "AI Sales Agent",
    subtitle: "Turn interest into pipeline",
    description:
      "Guide buyers with tailored recommendations, capture intent, and book calls—without rigid menu trees.",
    gradient: "from-violet-600 to-indigo-600",
  },
  {
    id: "qualification",
    title: "AI Lead Qualification Agent",
    subtitle: "Capture qualified leads",
    description:
      "Ask budget, timeline, and fit questions—score and route hot enquiries to the right rep with full context.",
    gradient: "from-indigo-600 to-blue-600",
  },
  {
    id: "faq",
    title: "AI FAQ Agent",
    subtitle: "Answer before they bounce",
    description:
      "Instant answers on your website—trained on your knowledge base, on-brand every time.",
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    id: "followup",
    title: "AI Follow-up Agent",
    subtitle: "Never let leads go cold",
    description:
      "Timely nudges across WhatsApp and email when prospects go quiet—aligned to your sales cycle.",
    gradient: "from-fuchsia-600 to-violet-600",
  },
] as const;
