import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { usageCounters } from "@/db/schema";

const MONTHLY_LIMIT = Number(process.env.DOCFLOW_MONTHLY_DOC_LIMIT ?? "20");

function currentMonthKey(): string {
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
}

export async function checkAndIncrementUsage(userId: string): Promise<{
  allowed: boolean;
  used: number;
  limit: number;
}> {
  if (!db) {
    return { allowed: true, used: 0, limit: MONTHLY_LIMIT };
  }

  const monthKey = currentMonthKey();
  const existing = await db
    .select()
    .from(usageCounters)
    .where(
      and(
        eq(usageCounters.userId, userId),
        eq(usageCounters.monthKey, monthKey),
      ),
    )
    .limit(1);

  const used = existing[0]?.documentsProcessed ?? 0;
  if (used >= MONTHLY_LIMIT) {
    return { allowed: false, used, limit: MONTHLY_LIMIT };
  }

  if (existing[0]) {
    await db
      .update(usageCounters)
      .set({ documentsProcessed: used + 1 })
      .where(eq(usageCounters.userId, userId));
  } else {
    await db.insert(usageCounters).values({
      userId,
      monthKey,
      documentsProcessed: 1,
    });
  }

  return { allowed: true, used: used + 1, limit: MONTHLY_LIMIT };
}
