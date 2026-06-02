import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/marketing/feature-sections";

export const metadata: Metadata = {
  title: "Work",
  description: "Sales automation pilots and AI agent builds in progress.",
};

const pilots = [
  {
    name: "Inbound FAQ + lead capture",
    status: "Building",
    description:
      "Website and WhatsApp agent trained on services and FAQs—structured lead data on every session.",
    stack: "Next.js · LLM · WhatsApp Business API",
  },
  {
    name: "Qualification & routing",
    status: "In design",
    description:
      "Score chats and forms, route hot leads with a one-page brief to the right rep.",
    stack: "Rules engine · CRM/Sheet · Slack alerts",
  },
  {
    name: "Follow-up automation",
    status: "In design",
    description:
      "Time-based recovery when prospects go quiet—aligned to your sales motion.",
    stack: "EventBridge · email/WhatsApp",
  },
];

export default function WorkPage() {
  return (
    <>
      <PageHero
        title="Work in progress"
        description="Pilots in progress—focused on enquiry-to-customer conversion."
      />
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 md:py-24">
        <div className="space-y-6">
          {pilots.map((p) => (
            <article
              key={p.name}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-card"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-bold text-slate-900">{p.name}</h2>
                <span className="rounded-full bg-brand-50 px-3 py-0.5 text-xs font-semibold text-brand-700">
                  {p.status}
                </span>
              </div>
              <p className="mt-3 text-slate-600">{p.description}</p>
              <p className="mt-3 text-xs text-slate-500">{p.stack}</p>
            </article>
          ))}
        </div>
        <p className="mt-12 text-center text-slate-600">
          Want to pilot?{" "}
          <Link href="/contact" className="font-semibold text-brand-600 hover:underline">
            Describe your inbound funnel
          </Link>
        </p>
      </div>
      <CtaBanner />
    </>
  );
}
