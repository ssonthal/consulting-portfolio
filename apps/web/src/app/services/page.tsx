import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/marketing/feature-sections";
import {
  Bot,
  Filter,
  Mail,
  PhoneForwarded,
  RefreshCw,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "FAQ chatbots, lead qualification, follow-ups, and sales automation.",
};

const services = [
  {
    icon: Bot,
    title: "Inbound FAQ agents",
    outcome:
      "24/7 answers on pricing, services, and availability—with structured lead capture on every chat.",
  },
  {
    icon: Filter,
    title: "Lead qualification",
    outcome:
      "Budget, timeline, and fit scoring before your team spends an hour on discovery.",
  },
  {
    icon: RefreshCw,
    title: "Follow-up automation",
    outcome:
      "Recover stale leads with timed WhatsApp and email nudges aligned to your cycle.",
  },
  {
    icon: Mail,
    title: "Outbound outreach",
    outcome:
      "Consistent first touch from qualified lists—personalized, not copy-paste spam.",
  },
  {
    icon: PhoneForwarded,
    title: "Human handoff",
    outcome:
      "Escalate with full context so reps never re-ask the same three questions.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Solutions for every stage of your funnel"
        description="From first enquiry to signed deal—deploy agents where they move the needle, not everywhere at once."
      />
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 md:py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-card transition hover:shadow-card-hover"
            >
              <s.icon className="h-8 w-8 text-brand-600" />
              <h2 className="mt-4 text-xl font-bold text-slate-900">{s.title}</h2>
              <p className="mt-3 text-slate-600">{s.outcome}</p>
            </article>
          ))}
        </div>
      </div>
      <CtaBanner />
    </>
  );
}
