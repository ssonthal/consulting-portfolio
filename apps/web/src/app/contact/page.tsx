import type { Metadata } from "next";
import { Mail, Calendar } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about FAQ chatbots and sales automation.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact"
        description="Email works best. I usually reply within 1–2 business days."
      />
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <div className="space-y-4">
          <a
            href={`mailto:${site.email}?subject=Sales%20automation%20enquiry`}
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300"
          >
            <Mail className="h-6 w-6 shrink-0 text-brand-600" />
            <div>
              <p className="font-medium text-slate-900">Email</p>
              <p className="text-brand-600">{site.email}</p>
            </div>
          </a>
          {site.calendlyUrl && (
            <a
              href={site.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300"
            >
              <Calendar className="h-6 w-6 shrink-0 text-brand-600" />
              <div>
                <p className="font-medium text-slate-900">Schedule a call</p>
                <p className="text-sm text-slate-600">Calendly</p>
              </div>
            </a>
          )}
        </div>
      </div>
    </>
  );
}
