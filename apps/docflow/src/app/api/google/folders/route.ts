import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { accounts } from "@/db/schema";
import { getAuthenticatedClient, listDriveFolders } from "@/lib/google";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!db) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const rows = await db
    .select()
    .from(accounts)
    .where(
      and(
        eq(accounts.userId, session.user.id),
        eq(accounts.provider, "google"),
      ),
    )
    .limit(1);

  const account = rows[0];
  if (!account?.refresh_token) {
    return NextResponse.json(
      { error: "Reconnect Google to grant Drive access" },
      { status: 403 },
    );
  }

  try {
    const authClient = await getAuthenticatedClient(
      account.refresh_token,
      account.access_token,
    );
    const folders = await listDriveFolders(authClient);
    return NextResponse.json(folders);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to list folders";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
