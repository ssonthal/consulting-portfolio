import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-600 md:flex-row">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <div className="flex flex-wrap justify-center gap-6 md:justify-end">
          <Link href="/services" className="hover:text-slate-900">
            Services
          </Link>
          <Link href="/about" className="hover:text-slate-900">
            About
          </Link>
          <a
            href={site.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900"
          >
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-slate-900">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
