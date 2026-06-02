import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { accounts } from "@/db/schema";
import { getAuthenticatedClient, getSheetHeaders } from "@/lib/google";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Params) {
  const { id: spreadsheetId } = await params;
  const { searchParams } = new URL(request.url);
  const sheetName = searchParams.get("sheet") ?? "Sheet1";

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
    return NextResponse.json({ error: "Google not connected" }, { status: 403 });
  }

  try {
    const authClient = await getAuthenticatedClient(
      account.refresh_token,
      account.access_token,
    );
    const headers = await getSheetHeaders(authClient, spreadsheetId, sheetName);
    return NextResponse.json({ headers, sheetName });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to read headers";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
