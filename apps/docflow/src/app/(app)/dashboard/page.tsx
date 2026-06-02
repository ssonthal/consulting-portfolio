import { eq } from "drizzle-orm";
import { ExternalLink, Plus, RefreshCw } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { workspaces } from "@/db/schema";
import { sheetUrl } from "@/lib/google";
import { SyncButton } from "@/components/sync-button";
import { Button } from "@consulting/ui";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id || !db) {
    return (
      <p className="text-red-600">
        Database not configured. Set DATABASE_URL in your environment.
      </p>
    );
  }

  const list = await db
    .select()
    .from(workspaces)
    .where(eq(workspaces.userId, session.user.id));

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Workspaces</h1>
          <p className="mt-1 text-slate-600">
            Each workspace watches one Drive folder and appends to one sheet.
          </p>
        </div>
        <Link href="/setup">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New workspace
          </Button>
        </Link>
      </div>

      {list.length === 0 ? (
        <div className="mt-12 rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-600">No workspaces yet.</p>
          <Link href="/setup" className="mt-4 inline-block text-brand-600 font-medium">
            Create your first workspace →
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {list.map((ws) => (
            <li
              key={ws.id}
              className="rounded-xl border border-slate-200 bg-white p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-lg">{ws.name}</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Folder: {ws.folderName ?? ws.folderId} · Sheet:{" "}
                    {ws.spreadsheetName ?? ws.spreadsheetId} / {ws.sheetName}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Last sync:{" "}
                    {ws.lastSyncAt
                      ? new Date(ws.lastSyncAt).toLocaleString("en-IN")
                      : "Never"}
                    {" · "}
                    Sync {ws.syncEnabled ? "on" : "off"}
                    {" · "}
                    Mapping{" "}
                    {ws.fieldMapping && Object.keys(ws.fieldMapping).length > 0
                      ? "configured"
                      : "incomplete"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {!ws.fieldMapping ||
                  Object.keys(ws.fieldMapping).length === 0 ? (
                    <Link href={`/setup/${ws.id}/mapping`}>
                      <Button variant="outline" size="sm">
                        Complete mapping
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <SyncButton workspaceId={ws.id} />
                      <Link href={`/setup/${ws.id}/mapping`}>
                        <Button variant="ghost" size="sm">
                          Edit mapping
                        </Button>
                      </Link>
                    </>
                  )}
                  <a
                    href={sheetUrl(ws.spreadsheetId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
                  >
                    Open sheet
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
              <Link
                href={`/dashboard/${ws.id}`}
                className="mt-4 inline-flex items-center gap-1 text-sm text-brand-600 hover:underline"
              >
                <RefreshCw className="h-3 w-3" />
                View processing log
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
