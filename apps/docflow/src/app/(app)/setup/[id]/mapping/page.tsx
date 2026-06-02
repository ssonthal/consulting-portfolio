import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { MappingForm } from "@/components/mapping-form";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { workspaces } from "@/db/schema";

type Params = { params: Promise<{ id: string }> };

export default async function MappingPage({ params }: Params) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id || !db) notFound();

  const rows = await db
    .select()
    .from(workspaces)
    .where(
      and(eq(workspaces.id, id), eq(workspaces.userId, session.user.id)),
    )
    .limit(1);

  const ws = rows[0];
  if (!ws) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold">Map fields → columns</h1>
      <p className="mt-1 text-slate-600">
        Workspace: {ws.name} · Tab: {ws.sheetName}
      </p>
      <div className="mt-8">
        <MappingForm
          workspaceId={ws.id}
          spreadsheetId={ws.spreadsheetId}
          sheetName={ws.sheetName}
          initialMapping={(ws.fieldMapping as Record<string, string>) ?? {}}
        />
      </div>
    </div>
  );
}
