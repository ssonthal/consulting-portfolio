import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { accounts, processedFiles, workspaces } from "@/db/schema";
import { extractFromPdfBuffer, mapExtractionToRow } from "./extract";
import {
  appendRow,
  downloadPdf,
  getAuthenticatedClient,
  getSheetHeaders,
  listPdfsInFolder,
} from "./google";
import type { InvoiceExtraction } from "./invoice-schema";
import { checkAndIncrementUsage } from "./usage";

export type SyncResult = {
  workspaceId: string;
  processed: number;
  skipped: number;
  errors: string[];
};

async function getUserGoogleTokens(userId: string) {
  if (!db) throw new Error("Database not configured");
  const rows = await db
    .select()
    .from(accounts)
    .where(
      and(eq(accounts.userId, userId), eq(accounts.provider, "google")),
    )
    .limit(1);
  const account = rows[0];
  if (!account?.refresh_token) {
    throw new Error("Google account not linked");
  }
  return account;
}

export async function syncWorkspace(workspaceId: string): Promise<SyncResult> {
  if (!db) throw new Error("Database not configured");

  const wsRows = await db
    .select()
    .from(workspaces)
    .where(eq(workspaces.id, workspaceId))
    .limit(1);
  const workspace = wsRows[0];
  if (!workspace) throw new Error("Workspace not found");
  if (!workspace.syncEnabled) {
    return { workspaceId, processed: 0, skipped: 0, errors: [] };
  }
  if (!workspace.fieldMapping || Object.keys(workspace.fieldMapping).length === 0) {
    throw new Error("Field mapping not configured");
  }

  const account = await getUserGoogleTokens(workspace.userId);
  const auth = await getAuthenticatedClient(
    account.refresh_token!,
    account.access_token,
  );

  const pdfs = await listPdfsInFolder(auth, workspace.folderId);
  const headers = await getSheetHeaders(
    auth,
    workspace.spreadsheetId,
    workspace.sheetName,
  );

  if (headers.length === 0) {
    throw new Error("Sheet has no headers in row 1");
  }

  const result: SyncResult = {
    workspaceId,
    processed: 0,
    skipped: 0,
    errors: [],
  };

  for (const pdf of pdfs) {
    if (!pdf.id) continue;

    const existing = await db
      .select({ id: processedFiles.id })
      .from(processedFiles)
      .where(
        and(
          eq(processedFiles.workspaceId, workspaceId),
          eq(processedFiles.driveFileId, pdf.id),
        ),
      )
      .limit(1);

    if (existing.length > 0) {
      result.skipped++;
      continue;
    }

    const usage = await checkAndIncrementUsage(workspace.userId);
    if (!usage.allowed) {
      result.errors.push(`Monthly limit reached (${usage.limit} documents)`);
      break;
    }

    try {
      const buffer = await downloadPdf(auth, pdf.id);
      let extraction: InvoiceExtraction;
      try {
        extraction = await extractFromPdfBuffer(buffer, pdf.name ?? "invoice.pdf");
      } catch (extractErr) {
        const message =
          extractErr instanceof Error ? extractErr.message : "Extraction failed";
        await db.insert(processedFiles).values({
          workspaceId,
          driveFileId: pdf.id,
          fileName: pdf.name,
          status: "error",
          error: message,
        });
        result.errors.push(`${pdf.name}: ${message}`);
        continue;
      }

      const row = mapExtractionToRow(
        extraction,
        workspace.fieldMapping,
        headers,
      );
      await appendRow(
        auth,
        workspace.spreadsheetId,
        workspace.sheetName,
        row,
      );

      await db.insert(processedFiles).values({
        workspaceId,
        driveFileId: pdf.id,
        fileName: pdf.name,
        status: "success",
        extractedJson: extraction,
      });
      result.processed++;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      await db.insert(processedFiles).values({
        workspaceId,
        driveFileId: pdf.id,
        fileName: pdf.name,
        status: "error",
        error: message,
      });
      result.errors.push(`${pdf.name}: ${message}`);
    }
  }

  await db
    .update(workspaces)
    .set({ lastSyncAt: new Date(), updatedAt: new Date() })
    .where(eq(workspaces.id, workspaceId));

  return result;
}

export async function syncAllEnabledWorkspaces(): Promise<SyncResult[]> {
  if (!db) return [];
  const all = await db
    .select({ id: workspaces.id })
    .from(workspaces)
    .where(eq(workspaces.syncEnabled, true));
  const results: SyncResult[] = [];
  for (const ws of all) {
    try {
      results.push(await syncWorkspace(ws.id));
    } catch (err) {
      results.push({
        workspaceId: ws.id,
        processed: 0,
        skipped: 0,
        errors: [err instanceof Error ? err.message : "Sync failed"],
      });
    }
  }
  return results;
}
