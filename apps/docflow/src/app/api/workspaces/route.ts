import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { workspaces } from "@/db/schema";

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
    .from(workspaces)
    .where(eq(workspaces.userId, session.user.id));

  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!db) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const body = await request.json();
  const {
    name,
    folderId,
    folderName,
    spreadsheetId,
    spreadsheetName,
    sheetName,
  } = body;

  if (!name || !folderId || !spreadsheetId || !sheetName) {
    return NextResponse.json(
      { error: "name, folderId, spreadsheetId, and sheetName are required" },
      { status: 400 },
    );
  }

  const [created] = await db
    .insert(workspaces)
    .values({
      userId: session.user.id,
      name,
      folderId,
      folderName: folderName ?? null,
      spreadsheetId,
      spreadsheetName: spreadsheetName ?? null,
      sheetName,
    })
    .returning();

  return NextResponse.json(created, { status: 201 });
}
