import OpenAI from "openai";
import {
  invoiceExtractionSchema,
  type InvoiceExtraction,
  type ExtractableField,
} from "./invoice-schema";

const SYSTEM_PROMPT = `You extract structured data from Indian GST tax invoices and purchase bills.
Return ONLY valid JSON matching this schema. Use null for missing fields.
Dates as ISO YYYY-MM-DD. Amounts as numbers without currency symbols.
GSTIN format: 15 characters. Be careful with CGST/SGST vs IGST.`;

function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  return new OpenAI({ apiKey });
}

export async function extractFromPdfBuffer(
  pdfBuffer: Buffer,
  fileName: string,
): Promise<InvoiceExtraction> {
  const openai = getOpenAI();
  const { toFile } = await import("openai");
  const file = await openai.files.create({
    file: await toFile(pdfBuffer, fileName, { type: "application/pdf" }),
    purpose: "assistants",
  });

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            {
              type: "file",
              file: { file_id: file.id },
            },
            {
              type: "text",
              text: `Extract invoice fields from this PDF (${fileName}). JSON keys: invoice_number, invoice_date, vendor_name, vendor_gstin, buyer_gstin, taxable_value, cgst, sgst, igst, total_amount, hsn_summary, confidence (high|medium|low).`,
            },
          ],
        },
      ],
    });

    const raw = response.choices[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(raw) as unknown;
    const result = invoiceExtractionSchema.safeParse(parsed);
    if (result.success) {
      return result.data;
    }

    const retry = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Fix this JSON to match the schema. Errors: ${result.error.message}\n\n${raw}`,
        },
      ],
    });
    const retryRaw = retry.choices[0]?.message?.content ?? "{}";
    const retryParsed = invoiceExtractionSchema.parse(JSON.parse(retryRaw));
    return retryParsed;
  } finally {
    try {
      await openai.files.del(file.id);
    } catch {
      /* best-effort cleanup */
    }
  }
}

export async function extractFromPdfBase64(
  base64: string,
  fileName: string,
): Promise<InvoiceExtraction> {
  return extractFromPdfBuffer(Buffer.from(base64, "base64"), fileName);
}

export function mapExtractionToRow(
  extraction: InvoiceExtraction,
  fieldMapping: Record<string, string>,
  headers: string[],
): (string | number | null)[] {
  const headerIndex = new Map(headers.map((h, i) => [h, i]));
  const row: (string | number | null)[] = new Array(headers.length).fill("");

  for (const [field, header] of Object.entries(fieldMapping)) {
    const idx = headerIndex.get(header);
    if (idx === undefined) continue;
    const value = extraction[field as ExtractableField];
    if (value === null || value === undefined) {
      row[idx] = "";
    } else if (typeof value === "number") {
      row[idx] = value;
    } else {
      row[idx] = String(value);
    }
  }
  return row;
}
