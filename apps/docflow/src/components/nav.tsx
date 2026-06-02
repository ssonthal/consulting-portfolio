import Link from "next/link";
import { signOut } from "@/lib/auth";
import { Button } from "@consulting/ui";

export function Nav({ email }: { email?: string | null }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="font-semibold text-slate-900">
          Doc<span className="text-brand-600">Flow</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/try" className="text-slate-600 hover:text-slate-900">
            Try extraction
          </Link>
          <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">
            Dashboard
          </Link>
          {email && (
            <span className="hidden text-slate-500 sm:inline">{email}</span>
          )}
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <Button type="submit" variant="ghost" size="sm">
              Sign out
            </Button>
          </form>
        </nav>
      </div>
    </header>
  );
}
