import type { Metadata } from "next";
import { Mail, Calendar } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a demo or discovery call for sales AI agents.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Book a demo"
        description="Tell us how enquiries reach you today and where leads drop off—we will reply within 1–2 business days."
      />
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 md:py-24">
        <div className="grid gap-6">
          <a
            href={`mailto:${site.email}?subject=AI%20sales%20agent%20demo`}
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition hover:shadow-card-hover"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50">
              <Mail className="h-7 w-7 text-brand-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Email</p>
              <p className="text-brand-600">{site.email}</p>
            </div>
          </a>
          {site.calendlyUrl ? (
            <a
              href={site.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition hover:shadow-card-hover"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50">
                <Calendar className="h-7 w-7 text-brand-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Schedule a call</p>
                <p className="text-slate-600">15 minutes · Calendly</p>
              </div>
            </a>
          ) : (
            <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
              Add <code className="rounded bg-slate-200 px-1">NEXT_PUBLIC_CALENDLY_URL</code> to
              enable scheduling.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
