import Link from "next/link";
import { services } from "@/lib/site";

export function ServicesOverview() {
  return (
    <section id="services" className="scroll-mt-20 border-b border-slate-200 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900">What I do</h2>
        <ul className="mt-8 divide-y divide-slate-200">
          {services.map((s) => (
            <li key={s.title} className="py-6 first:pt-0 last:pb-0">
              <h3 className="font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-1 text-slate-600">{s.description}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-slate-500">
          <Link href="/services" className="font-medium text-brand-600 hover:underline">
            More detail on services →
          </Link>
        </p>
      </div>
    </section>
  );
}
