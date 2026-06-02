import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} helps businesses save time and scale revenue through automation and AI.`,
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Intro — name, photo, context (no separate dark banner) */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-3xl px-6 py-14 md:py-16 lg:px-8">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:gap-8 sm:text-left">
            <Image
              src={site.profileImage}
              alt={site.name}
              width={120}
              height={120}
              className="h-[120px] w-[120px] shrink-0 rounded-full object-cover object-center ring-2 ring-white shadow-md"
              priority
            />
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {site.name}
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Bengaluru · Amazon, Flipkart, Qualcomm
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-6 py-14 lg:px-8 md:py-16">
        <div className="space-y-6 text-[1.0625rem] leading-relaxed text-slate-600">
          <p className="text-lg text-slate-700">
            Businesses today lose countless hours to repetitive processes—finding
            leads, qualifying prospects, following up with customers, updating
            CRMs, managing operations, and coordinating across teams.
          </p>

          <div className="rounded-xl border border-brand-100 bg-brand-50/60 px-5 py-4">
            <p className="font-semibold text-slate-900">
              ⚡ That&apos;s where I come in.
            </p>
            <p className="mt-2 text-slate-600">
              I help businesses save time, reduce operational overhead, and scale
              revenue through automation and AI.
            </p>
          </div>

          <p>
            Over the last 5 years, I&apos;ve built scalable systems at Amazon,
            Flipkart, and Qualcomm, working on products that process millions of
            transactions and serve some of the world&apos;s largest businesses.
            My experience spans large-scale software systems, workflow automation,
            and AI-powered solutions that help teams operate more efficiently.
          </p>

          <p>
            Today, I partner with businesses to identify bottlenecks, automate
            workflows, and create systems that scale. Whether it&apos;s automating
            sales processes, improving operational efficiency, or reducing time
            spent on repetitive tasks, my focus is always the same: delivering
            practical solutions that create measurable business impact.
          </p>

          <blockquote className="border-l-4 border-brand-500 py-1 pl-5 text-slate-800">
            🚀 Technology should simplify work, not add complexity. Every solution I
            build is designed to save time, reduce operational overhead, and help
            businesses grow more efficiently.
          </blockquote>

          <p className="rounded-xl bg-slate-50 px-5 py-4 text-slate-800">
            🤝 If you&apos;re looking to automate repetitive work, improve team
            productivity, or explore practical AI solutions for your business,{" "}
            <Link
              href="/contact"
              className="font-semibold text-brand-600 hover:underline"
            >
              let&apos;s connect
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
