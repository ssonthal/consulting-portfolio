"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/#agents", label: "Agents" },
  { href: "/services", label: "Solutions" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors",
        onHome
          ? "border-white/10 bg-surface-dark/80 backdrop-blur-xl"
          : "border-slate-200 bg-white/90 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className={cn(
            "text-lg font-bold tracking-tight",
            onHome ? "text-white" : "text-slate-900",
          )}
        >
          {site.brand}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors",
                onHome
                  ? "text-slate-300 hover:text-white"
                  : "text-slate-600 hover:text-slate-900",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/contact"
            className={cn(
              "text-sm font-medium",
              onHome ? "text-slate-300 hover:text-white" : "text-slate-600",
            )}
          >
            Contact
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-500"
          >
            Book a demo
          </Link>
        </div>

        <button
          type="button"
          className={cn("md:hidden", onHome ? "text-white" : "text-slate-900")}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-surface-dark px-6 py-4 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 text-slate-300"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-3 block rounded-full bg-brand-600 py-2.5 text-center text-sm font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            Book a demo
          </Link>
        </div>
      )}
    </header>
  );
}
