import Link from "next/link";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="mesh-dark relative overflow-hidden pb-16 pt-14 md:pb-20 md:pt-20">
      <div className="bg-hero-glow absolute inset-0 pointer-events-none" />
      <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
        <p className="text-sm font-medium text-indigo-300">{site.name}</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
          {site.title}
        </h1>
        <p className="mt-5 text-lg text-slate-400">{site.description}</p>
        <Link
          href="/contact"
          className="mt-8 inline-flex rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-500"
        >
          Get in touch
        </Link>
      </div>
    </section>
  );
}
