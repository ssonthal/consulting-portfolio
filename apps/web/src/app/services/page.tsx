import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Cta } from "@/components/marketing/cta";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "FAQ chatbots (RAG), lead qualification, and CRM or WhatsApp integrations.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Services"
        description="Focused on turning inbound enquiries into qualified conversations—not generic AI experiments."
      />
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <ul className="divide-y divide-slate-200">
          {services.map((s) => (
            <li key={s.title} className="py-8 first:pt-0">
              <h2 className="text-xl font-semibold text-slate-900">{s.title}</h2>
              <p className="mt-2 text-slate-600">{s.description}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-slate-600">
          Typical first project: an FAQ chatbot trained on your documents (RAG),
          with optional lead capture. Timeline is usually 2–3 weeks after we agree
          scope.
        </p>
        <p className="mt-6">
          <Link href="/contact" className="font-medium text-brand-600 hover:underline">
            Get in touch →
          </Link>
        </p>
      </div>
      <Cta />
    </>
  );
}
