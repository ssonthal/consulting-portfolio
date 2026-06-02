import Link from "next/link";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/#whatsapp-demo", label: "WhatsApp demo" },
      { href: "/#agents", label: "AI Agents" },
      { href: "/services", label: "Solutions" },
      { href: "/work", label: "Work" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-surface-dark text-slate-400">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="text-xl font-bold text-white">{site.brand}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed">
              {site.description}
            </p>
            <p className="mt-4 text-sm">
              By{" "}
              <span className="text-slate-300">{site.name}</span>
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs md:flex-row">
          <p>© {new Date().getFullYear()} {site.brand}. All rights reserved.</p>
          <a
            href={`mailto:${site.email}`}
            className="hover:text-white transition-colors"
          >
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
