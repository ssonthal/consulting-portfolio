"use client";

import { useState } from "react";
import { Button } from "@consulting/ui";
import { FIELD_LABELS, type ExtractableField } from "@/lib/invoice-schema";

export function DemoExtract() {
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function runSample() {
    setLoading(true);
    setError(null);
    const form = new FormData();
    form.append("sample", "true");
    const res = await fetch("/api/demo/extract", { method: "POST", body: form });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) setError(data.error);
    else setResult(data);
  }

  async function runFile(file: File) {
    setLoading(true);
    setError(null);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/demo/extract", { method: "POST", body: form });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) setError(data.error);
    else setResult(data);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <Button onClick={runSample} disabled={loading}>
          Run sample invoice
        </Button>
        <label className="inline-flex cursor-pointer items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50">
          Upload PDF
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) runFile(f);
            }}
          />
        </label>
      </div>
      {loading && <p className="mt-4 text-sm text-slate-500">Extracting…</p>}
      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}
      {result && (
        <dl className="mt-6 grid gap-2 rounded-xl border border-slate-200 bg-white p-6 sm:grid-cols-2">
          {Object.entries(result).map(([key, value]) => (
            <div key={key}>
              <dt className="text-xs font-medium text-slate-500">
                {FIELD_LABELS[key as ExtractableField] ?? key}
              </dt>
              <dd className="text-sm font-mono text-slate-900">
                {value === null ? "—" : String(value)}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
