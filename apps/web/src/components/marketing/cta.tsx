import Link from "next/link";

export function Cta() {
  return (
    <section className="border-t border-slate-200 bg-white py-14">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <p className="text-lg text-slate-700">
          Tell me how enquiries reach you today—email is enough to start.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-500"
        >
          Contact
        </Link>
      </div>
    </section>
  );
}
