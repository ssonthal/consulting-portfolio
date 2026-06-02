import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { site, stats } from "@/lib/site";

export function Hero() {
  return (
    <section className="mesh-dark relative overflow-hidden pb-20 pt-12 md:pb-28 md:pt-16">
      <div className="bg-hero-glow absolute inset-0 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
          AI agents that deliver{" "}
          <span className="text-gradient">human-like sales experiences</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-400 md:text-xl">
          {site.description}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-8 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-500"
          >
            Build your AI agent
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/#whatsapp-demo"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            <Play className="h-4 w-4 fill-current" />
            Watch WhatsApp demo
          </Link>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-8 border-t border-white/10 pt-12 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-3xl font-bold text-white md:text-4xl">
                {s.value}
              </dt>
              <dd className="mt-1 text-sm text-slate-400">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
