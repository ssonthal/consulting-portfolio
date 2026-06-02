"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/services", label: "Services" },
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
          ? "border-white/10 bg-surface-dark/90 backdrop-blur-md"
          : "border-slate-200 bg-white/95 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className={cn(
            "text-sm font-semibold",
            onHome ? "text-white" : "text-slate-900",
          )}
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm",
                onHome
                  ? "text-slate-300 hover:text-white"
                  : "text-slate-600 hover:text-slate-900",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={cn(
              "text-sm font-medium",
              onHome ? "text-white" : "text-brand-600",
            )}
          >
            Contact
          </Link>
        </nav>

        <button
          type="button"
          className={cn("md:hidden", onHome ? "text-white" : "text-slate-900")}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          className={cn(
            "border-t px-6 py-3 md:hidden",
            onHome ? "border-white/10 bg-surface-dark" : "border-slate-200 bg-white",
          )}
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block py-2 text-sm",
                onHome ? "text-slate-300" : "text-slate-700",
              )}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="block py-2 text-sm font-medium text-brand-600"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
