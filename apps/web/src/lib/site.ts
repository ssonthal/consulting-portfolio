export const site = {
  name: "Shubham Sonthalia",
  title: "Sales automation consultant",
  description:
    "I build FAQ chatbots, lead qualification flows, and follow-up automation for teams that live on inbound enquiries.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@example.com",
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL,
  linkedInUrl:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ??
    "https://www.linkedin.com/in/ssonthal/",
  profileImage: "/profile.jpeg",
} as const;

export const services = [
  {
    title: "FAQ chatbots (RAG)",
    description:
      "Answers from your documents—pricing, services, policies—not generic AI guesses. Website or WhatsApp.",
  },
  {
    title: "Lead qualification",
    description:
      "Capture budget, timeline, and fit in chat, then route the right leads to your team with context.",
  },
  {
    title: "Integrations & handoff",
    description:
      "Sheets, CRM, Slack, or email alerts when a human should take over.",
  },
] as const;
