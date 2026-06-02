import { redirect } from "next/navigation";
import { Nav } from "@/components/nav";
import { auth } from "@/lib/auth";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <>
      <Nav email={session.user.email} />
      <div className="mx-auto max-w-5xl px-6 py-8">{children}</div>
    </>
  );
}
