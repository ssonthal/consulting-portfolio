import { NextResponse } from "next/server";
import { syncAllEnabledWorkspaces } from "@/lib/sync";

/** Production cron runs on AWS Lambda (EventBridge). This route is for local/dev manual triggers. */
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const results = await syncAllEnabledWorkspaces();
    return NextResponse.json({
      ok: true,
      workspaces: results.length,
      results,
      syncedAt: new Date().toISOString(),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Cron sync failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
