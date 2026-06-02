"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@consulting/ui";

type DriveItem = { id: string; name: string };
type SheetItem = { id: string; name: string };

export function SetupWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("My invoice workspace");
  const [folders, setFolders] = useState<DriveItem[]>([]);
  const [sheets, setSheets] = useState<SheetItem[]>([]);
  const [tabs, setTabs] = useState<string[]>([]);
  const [folderId, setFolderId] = useState("");
  const [spreadsheetId, setSpreadsheetId] = useState("");
  const [sheetName, setSheetName] = useState("Sheet1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (step === 2) {
      fetch("/api/google/folders")
        .then((r) => r.json())
        .then((data) => {
          if (data.error) setError(data.error);
          else setFolders(data);
        });
    }
    if (step === 3) {
      fetch("/api/google/sheets")
        .then((r) => r.json())
        .then((data) => {
          if (data.error) setError(data.error);
          else setSheets(data);
        });
    }
  }, [step]);

  useEffect(() => {
    if (spreadsheetId) {
      fetch(`/api/google/sheets/${spreadsheetId}/tabs`)
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setTabs(data);
            if (data[0]) setSheetName(data[0]);
          }
        });
    }
  }, [spreadsheetId]);

  async function handleCreate() {
    setLoading(true);
    setError(null);
    const folder = folders.find((f) => f.id === folderId);
    const sheet = sheets.find((s) => s.id === spreadsheetId);

    const res = await fetch("/api/workspaces", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        folderId,
        folderName: folder?.name,
        spreadsheetId,
        spreadsheetName: sheet?.name,
        sheetName,
      }),
    });

    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "Failed to create workspace");
      return;
    }
    router.push(`/setup/${data.id}/mapping`);
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold">New workspace</h1>
      <p className="mt-1 text-slate-600">Step {step} of 3</p>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {step === 1 && (
        <div className="mt-6 space-y-4">
          <label className="block text-sm font-medium">
            Workspace name
            <input
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <Button onClick={() => setStep(2)}>Next: Choose folder</Button>
        </div>
      )}

      {step === 2 && (
        <div className="mt-6 space-y-4">
          <label className="block text-sm font-medium">
            Drive folder to watch
            <select
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              value={folderId}
              onChange={(e) => setFolderId(e.target.value)}
            >
              <option value="">Select a folder…</option>
              {folders.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </label>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button
              disabled={!folderId}
              onClick={() => {
                setError(null);
                setStep(3);
              }}
            >
              Next: Choose sheet
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-6 space-y-4">
          <label className="block text-sm font-medium">
            Target spreadsheet
            <select
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              value={spreadsheetId}
              onChange={(e) => setSpreadsheetId(e.target.value)}
            >
              <option value="">Select a spreadsheet…</option>
              {sheets.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
          {tabs.length > 0 && (
            <label className="block text-sm font-medium">
              Worksheet tab
              <select
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                value={sheetName}
                onChange={(e) => setSheetName(e.target.value)}
              >
                {tabs.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
          )}
          <p className="text-xs text-slate-500">
            Row 1 of the selected tab should contain your column headers.
          </p>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button
              disabled={!spreadsheetId || loading}
              onClick={handleCreate}
            >
              {loading ? "Creating…" : "Continue to mapping"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
