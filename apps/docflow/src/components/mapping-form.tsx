"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  EXTRACTABLE_FIELDS,
  FIELD_LABELS,
  type ExtractableField,
} from "@/lib/invoice-schema";
import { Button } from "@consulting/ui";

export function MappingForm({
  workspaceId,
  spreadsheetId,
  sheetName,
  initialMapping,
}: {
  workspaceId: string;
  spreadsheetId: string;
  sheetName: string;
  initialMapping: Record<string, string>;
}) {
  const router = useRouter();
  const [headers, setHeaders] = useState<string[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>(initialMapping);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      `/api/google/sheets/${spreadsheetId}/headers?sheet=${encodeURIComponent(sheetName)}`,
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setHeaders(data.headers ?? []);
      });
  }, [spreadsheetId, sheetName]);

  function setField(field: ExtractableField, header: string) {
    setMapping((prev) => {
      const next = { ...prev };
      if (header) next[field] = header;
      else delete next[field];
      return next;
    });
  }

  async function handleSave() {
    setLoading(true);
    setError(null);
    const res = await fetch(`/api/workspaces/${workspaceId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fieldMapping: mapping }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Save failed");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div>
      {error && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}
      {headers.length === 0 ? (
        <p className="text-slate-600">
          Loading headers from row 1… (ensure your sheet has column headers)
        </p>
      ) : (
        <div className="space-y-4">
          {EXTRACTABLE_FIELDS.map((field) => (
            <label
              key={field}
              className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="text-sm font-medium text-slate-700">
                {FIELD_LABELS[field]}
              </span>
              <select
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm sm:w-64"
                value={mapping[field] ?? ""}
                onChange={(e) => setField(field, e.target.value)}
              >
                <option value="">— skip —</option>
                {headers.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      )}
      <Button className="mt-8" onClick={handleSave} disabled={loading}>
        {loading ? "Saving…" : "Save mapping & go to dashboard"}
      </Button>
    </div>
  );
}
