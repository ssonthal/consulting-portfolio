import Link from "next/link";
import { DemoExtract } from "@/components/demo-extract";

const portfolioUrl =
  process.env.NEXT_PUBLIC_PORTFOLIO_URL ?? "http://localhost:3000";

export default function TryPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
          <Link href="/" className="font-semibold">
            Doc<span className="text-brand-600">Flow</span>
          </Link>
          <Link href="/login" className="text-sm text-brand-600">
            Sign in for full demo
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-2xl font-bold">Try invoice extraction</h1>
        <p className="mt-2 text-slate-600">
          See how DocFlow parses GST invoice fields—without connecting Google.
          Upload a PDF or run the built-in sample.
        </p>
        <div className="mt-8">
          <DemoExtract />
        </div>
        <p className="mt-8 text-sm text-slate-500">
          <a href={portfolioUrl} className="text-brand-600 hover:underline">
            ← Back to portfolio
          </a>
        </p>
      </main>
    </div>
  );
}
