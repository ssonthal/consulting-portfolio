import { syncAllEnabledWorkspaces } from "@/lib/sync";

/**
 * EventBridge-triggered Lambda: poll all enabled workspaces and process new PDFs.
 */
export const handler = async (): Promise<{
  statusCode: number;
  body: string;
}> => {
  try {
    const results = await syncAllEnabledWorkspaces();
    console.log(JSON.stringify({ workspaces: results.length, results }));
    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        workspaces: results.length,
        results,
        syncedAt: new Date().toISOString(),
      }),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Sync failed";
    console.error(message, err);
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: message }),
    };
  }
};
