import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { processedFiles, workspaces } from "@/db/schema";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
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
    .where(
      and(eq(workspaces.id, id), eq(workspaces.userId, session.user.id)),
    )
    .limit(1);

  if (!rows[0]) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const files = await db
    .select()
    .from(processedFiles)
    .where(eq(processedFiles.workspaceId, id))
    .orderBy(desc(processedFiles.processedAt))
    .limit(50);

  return NextResponse.json({ workspace: rows[0], files });
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!db) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const body = await request.json();
  const { fieldMapping, syncEnabled, name } = body;

  const [updated] = await db
    .update(workspaces)
    .set({
      ...(fieldMapping !== undefined && { fieldMapping }),
      ...(syncEnabled !== undefined && { syncEnabled }),
      ...(name !== undefined && { name }),
      updatedAt: new Date(),
    })
    .where(
      and(eq(workspaces.id, id), eq(workspaces.userId, session.user.id)),
    )
    .returning();

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!db) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  await db
    .delete(workspaces)
    .where(
      and(eq(workspaces.id, id), eq(workspaces.userId, session.user.id)),
    );

  return NextResponse.json({ ok: true });
}
