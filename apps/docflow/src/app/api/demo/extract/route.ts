import { NextResponse } from "next/server";
import { extractFromPdfBuffer } from "@/lib/extract";
import { DEMO_EXTRACTION } from "@/lib/invoice-schema";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const useSample = formData.get("sample") === "true";

  if (useSample) {
    return NextResponse.json(DEMO_EXTRACTION);
  }

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json(
      { error: "Only PDF files are supported" },
      { status: 400 },
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      {
        error: "OPENAI_API_KEY not configured — use sample=true for demo",
      },
      { status: 503 },
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const extraction = await extractFromPdfBuffer(buffer, file.name);
    return NextResponse.json(extraction);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Extraction failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
