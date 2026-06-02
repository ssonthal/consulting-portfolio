import { and, desc, eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { processedFiles, workspaces } from "@/db/schema";
import { SyncButton } from "@/components/sync-button";

type Params = { params: Promise<{ id: string }> };

export default async function WorkspaceLogPage({ params }: Params) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id || !db) notFound();

  const wsRows = await db
    .select()
    .from(workspaces)
    .where(
      and(eq(workspaces.id, id), eq(workspaces.userId, session.user.id)),
    )
    .limit(1);

  const ws = wsRows[0];
  if (!ws) notFound();

  const files = await db
    .select()
    .from(processedFiles)
    .where(eq(processedFiles.workspaceId, id))
    .orderBy(desc(processedFiles.processedAt))
    .limit(50);

  return (
    <div>
      <Link href="/dashboard" className="text-sm text-brand-600 hover:underline">
        ← Back to workspaces
      </Link>
      <h1 className="mt-4 text-2xl font-bold">{ws.name}</h1>
      <p className="mt-1 text-slate-600">Processing log (latest 50)</p>
      <div className="mt-4">
        <SyncButton workspaceId={id} />
      </div>
      <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left">
              <th className="p-3 font-medium">File</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Time</th>
              <th className="p-3 font-medium">Details</th>
            </tr>
          </thead>
          <tbody>
            {files.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-slate-500">
                  No files processed yet. Drop PDFs in your Drive folder and
                  sync.
                </td>
              </tr>
            ) : (
              files.map((f) => (
                <tr key={f.id} className="border-b border-slate-100">
                  <td className="p-3">{f.fileName ?? f.driveFileId}</td>
                  <td className="p-3">
                    <span
                      className={
                        f.status === "success"
                          ? "text-green-700"
                          : f.status === "error"
                            ? "text-red-700"
                            : "text-slate-600"
                      }
                    >
                      {f.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-500">
                    {f.processedAt
                      ? new Date(f.processedAt).toLocaleString("en-IN")
                      : "—"}
                  </td>
                  <td className="p-3 max-w-xs truncate text-slate-500">
                    {f.error ??
                      (f.extractedJson
                        ? `Invoice ${(f.extractedJson as { invoice_number?: string }).invoice_number ?? "parsed"}`
                        : "—")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
