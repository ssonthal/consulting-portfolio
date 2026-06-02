import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { agents } from "@/lib/site";
import { cn } from "@/lib/cn";

export function AgentGrid() {
  const featured = agents.find((a) => a.featured);
  const rest = agents.filter((a) => !a.featured);

  return (
    <section id="agents" className="scroll-mt-20 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            AI agents for every step of your funnel
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Deploy on WhatsApp, your website, or both—from first question to
            qualified handoff.
          </p>
        </div>

        {featured && (
          <article className="mt-14 overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-8 shadow-md md:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div
                  className={cn(
                    "inline-flex rounded-xl bg-gradient-to-br p-3 text-white shadow-lg",
                    featured.gradient,
                  )}
                >
                  <span className="text-xs font-bold uppercase tracking-wide">
                    Featured
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-bold text-slate-900">
                  {featured.title}
                </h3>
                <p className="mt-1 font-medium text-emerald-700">
                  {featured.subtitle}
                </p>
                <p className="mt-3 max-w-xl text-slate-600">
                  {featured.description}
                </p>
                <Link
                  href="/#whatsapp-demo"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:gap-2 transition-all"
                >
                  See demo above
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {rest.map((agent) => (
            <article
              key={agent.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition hover:border-brand-200 hover:shadow-card-hover"
            >
              <h3 className="text-lg font-bold text-slate-900">{agent.title}</h3>
              <p className="mt-1 text-sm font-medium text-brand-600">
                {agent.subtitle}
              </p>
              <p className="mt-2 text-sm text-slate-600">{agent.description}</p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600"
              >
                Learn more
                <ArrowRight className="h-3 w-3" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
