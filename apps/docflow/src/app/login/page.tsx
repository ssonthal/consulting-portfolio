import { redirect } from "next/navigation";
import { auth, signIn } from "@/lib/auth";
import { Button } from "@consulting/ui";

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm text-center">
        <h1 className="text-2xl font-bold">Sign in to DocFlow</h1>
        <p className="mt-2 text-slate-600">
          Google account with Drive and Sheets access required.
        </p>
        <form
          className="mt-8"
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/dashboard" });
          }}
        >
          <Button type="submit" className="w-full" size="lg">
            Continue with Google
          </Button>
        </form>
      </div>
    </div>
  );
}
