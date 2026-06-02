import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/marketing/feature-sections";

export const metadata: Metadata = {
  title: "About",
  description: "Building conversational AI for sales teams.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="A decade of building for real businesses—now focused on sales AI"
        description="Practical agents for sales and support teams, deployed on AWS with the guardrails enterprises expect."
      />
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 md:py-24">
        <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
          <p>
            I am {`Shubham Sonthalia`}, a software consultant based in India. I
            help businesses that get strong inbound interest but lose deals between
            first message and signed contract.
          </p>
          <p>
            My work mirrors what leading CX platforms do for enterprises—FAQ
            agents, qualification, handoff, and insights—but scoped and priced
            for growing teams, not Fortune 500 procurement cycles.
          </p>
          <p>
            Discovery calls are the best start: walk me through your last ten
            enquiries and where they stalled.
          </p>
        </div>
        <h2 className="mt-12 text-xl font-bold text-slate-900">How I build</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
          <li>TypeScript / Next.js for chat surfaces and admin</li>
          <li>AWS Lambda, RDS, EventBridge, Amplify</li>
          <li>WhatsApp Business API, webhooks, CRM integrations</li>
          <li>LLMs with strict schemas and on-brand guardrails</li>
        </ul>
      </div>
      <CtaBanner />
    </>
  );
}
