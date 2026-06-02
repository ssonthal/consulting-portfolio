import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Cta } from "@/components/marketing/cta";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects and what is in progress.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        title="Work"
        description="A sample of what I am building for clients."
      />
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <article className="rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-600">
            In progress
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">
            FAQ chatbot with RAG
          </h2>
          <p className="mt-3 text-slate-600">
            Answers grounded in the business owner&apos;s documents—pricing,
            services, policies—with lead capture when someone wants a human.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Try the chat widget on this site for a lightweight preview. Full RAG
            with your docs is the next build.
          </p>
        </article>
        <p className="mt-10 text-slate-600">
          Have a similar problem?{" "}
          <Link href="/contact" className="font-medium text-brand-600 hover:underline">
            Describe your inbound flow
          </Link>
        </p>
      </div>
      <Cta />
    </>
  );
}
