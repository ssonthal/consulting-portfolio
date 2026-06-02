"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@consulting/ui";

export function SyncButton({ workspaceId }: { workspaceId: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSync() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/sync/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Sync failed");
      setMessage(
        `Processed ${data.processed}, skipped ${data.skipped}${
          data.errors?.length ? ` · ${data.errors.length} error(s)` : ""
        }`,
      );
      window.location.reload();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Sync failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleSync}
        disabled={loading}
      >
        <RefreshCw
          className={`mr-2 h-3 w-3 ${loading ? "animate-spin" : ""}`}
        />
        Sync now
      </Button>
      {message && (
        <p className="mt-1 text-xs text-slate-500">{message}</p>
      )}
    </div>
  );
}
