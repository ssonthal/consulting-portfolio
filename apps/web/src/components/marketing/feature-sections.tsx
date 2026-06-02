import {
  BarChart3,
  Globe,
  Layers,
  MessageCircle,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

const blocks = [
  {
    icon: MessageCircle,
    title: "Omnichannel engagement",
    description:
      "Deploy on your website, WhatsApp Business, and Instagram—reach customers where they already message you.",
    dark: false,
  },
  {
    icon: Globe,
    title: "Multilingual by default",
    description:
      "English, Hindi, and Hinglish out of the box—so every enquiry feels natural, not robotic.",
    dark: false,
  },
  {
    icon: Layers,
    title: "Your data. Your AI.",
    description:
      "Train agents on your FAQs, pricing sheets, and service catalog—PDFs, docs, and your website content.",
    dark: true,
  },
  {
    icon: Users,
    title: "AI + human handoff",
    description:
      "Escalate complex deals to your team with full conversation context—no repeating the same questions.",
    dark: true,
  },
  {
    icon: BarChart3,
    title: "Insights that matter",
    description:
      "See top questions, conversion from chat to lead, and response times—metrics your sales lead actually uses.",
    dark: false,
  },
  {
    icon: Shield,
    title: "You stay in control",
    description:
      "Guardrails keep answers on-brand. You approve flows before they go live—no black-box surprises.",
    dark: false,
  },
];

export function FeatureSections() {
  return (
    <>
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Automate inbound without losing the human touch
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Teams do not need another CRM—they need faster replies, better
                qualification, and follow-ups that actually happen.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Intent detection—not just keyword matching",
                  "Context-aware replies across the conversation",
                  "Structured lead capture on every session",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Zap className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-surface-dark p-8 shadow-2xl md:p-10">
              <p className="text-sm font-medium text-indigo-300">
                Website chat · same brain as WhatsApp
              </p>
              <div className="mt-6 space-y-4">
                {[
                  { role: "user", text: "Do you integrate with Zoho CRM?" },
                  {
                    role: "agent",
                    text: "Yes—we sync qualified leads to Zoho automatically. What’s your team size?",
                  },
                  { role: "user", text: "8 people, mostly inbound from Google" },
                  {
                    role: "agent",
                    text: "Got it. I’ve flagged this as high intent—expect a call within 2 hours.",
                  },
                ].map((m, i) => (
                  <div
                    key={i}
                    className={
                      m.role === "user"
                        ? "rounded-xl bg-surface-muted px-4 py-3 text-slate-300"
                        : "rounded-xl bg-brand-600/90 px-4 py-3 text-white"
                    }
                  >
                    {m.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Your AI agent builder for high-impact use cases
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Flexible model selection, enterprise-ready integrations, and
              deployments that fit how you already sell.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blocks.map((b) => (
              <div
                key={b.title}
                className={
                  b.dark
                    ? "rounded-2xl bg-surface-dark p-8 text-white"
                    : "rounded-2xl border border-slate-200 bg-white p-8 shadow-card"
                }
              >
                <b.icon
                  className={
                    b.dark ? "h-8 w-8 text-indigo-400" : "h-8 w-8 text-brand-600"
                  }
                />
                <h3 className="mt-4 text-lg font-bold">{b.title}</h3>
                <p
                  className={
                    b.dark ? "mt-2 text-slate-400" : "mt-2 text-slate-600"
                  }
                >
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function CtaBanner() {
  return (
    <section className="mesh-dark relative overflow-hidden py-20 md:py-28">
      <div className="bg-hero-glow absolute inset-0 pointer-events-none" />
      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Ready to shape the future of your inbound sales?
        </h2>
        <p className="mt-4 text-lg text-slate-400">
          Book a 15-minute discovery call. We will map your enquiry → close
          funnel and identify the first agent to ship.
        </p>
        <Link
          href="/contact"
          className="mt-10 inline-flex rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-surface-dark transition hover:bg-slate-100"
        >
          Book a demo
        </Link>
      </div>
    </section>
  );
}
