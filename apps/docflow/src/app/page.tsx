import { FileSpreadsheet, FolderOpen, Settings2 } from "lucide-react";
import Link from "next/link";
import { auth, signIn } from "@/lib/auth";
import { Button } from "@consulting/ui";

const portfolioUrl =
  process.env.NEXT_PUBLIC_PORTFOLIO_URL ?? "http://localhost:3000";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <span className="font-semibold">
            Doc<span className="text-brand-600">Flow</span>
          </span>
          <div className="flex gap-3">
            <Link
              href="/try"
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              Try extraction
            </Link>
            {session ? (
              <Link
                href="/dashboard"
                className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white"
              >
                Dashboard
              </Link>
            ) : (
              <form
                action={async () => {
                  "use server";
                  await signIn("google", { redirectTo: "/dashboard" });
                }}
              >
                <Button type="submit" size="sm">
                  Sign in with Google
                </Button>
              </form>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-sm font-medium text-brand-600">Demo · CA workflows</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          PDF invoices in Drive → rows in your Google Sheet
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Connect a Drive folder and target spreadsheet, map extracted fields to
          your column headers, then drop GST bills—new entries append every few
          minutes.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: FolderOpen,
              title: "1. Pick a folder",
              text: "Watch a Google Drive folder for new PDF invoices.",
            },
            {
              icon: Settings2,
              title: "2. Map columns",
              text: "Match invoice fields to your sheet headers (GSTIN, amounts, dates).",
            },
            {
              icon: FileSpreadsheet,
              title: "3. Drop PDFs",
              text: "Rows append automatically—no manual retyping.",
            },
          ].map((step) => (
            <div
              key={step.title}
              className="rounded-xl border border-slate-200 bg-white p-6"
            >
              <step.icon className="h-8 w-8 text-brand-600" />
              <h2 className="mt-3 font-semibold">{step.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          {session ? (
            <Link
              href="/setup"
              className="rounded-lg bg-brand-600 px-6 py-3 font-medium text-white hover:bg-brand-700"
            >
              Configure workspace
            </Link>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/setup" });
              }}
            >
              <Button type="submit" size="lg">
                Get started with Google
              </Button>
            </form>
          )}
          <Link
            href="/try"
            className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium hover:bg-slate-50"
          >
            Try extraction without signing in
          </Link>
        </div>

        <p className="mt-12 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Demo notice:</strong> Use test data only. OAuth stays in Google
          Testing mode until verified. Production deployments available on request.{" "}
          <a href={portfolioUrl} className="underline">
            Back to portfolio
          </a>
        </p>
      </main>
    </div>
  );
}
