import { z } from "zod";

export const EXTRACTABLE_FIELDS = [
  "invoice_number",
  "invoice_date",
  "vendor_name",
  "vendor_gstin",
  "buyer_gstin",
  "taxable_value",
  "cgst",
  "sgst",
  "igst",
  "total_amount",
  "hsn_summary",
] as const;

export type ExtractableField = (typeof EXTRACTABLE_FIELDS)[number];

export const FIELD_LABELS: Record<ExtractableField, string> = {
  invoice_number: "Invoice number",
  invoice_date: "Invoice date",
  vendor_name: "Vendor name",
  vendor_gstin: "Vendor GSTIN",
  buyer_gstin: "Buyer GSTIN",
  taxable_value: "Taxable value",
  cgst: "CGST",
  sgst: "SGST",
  igst: "IGST",
  total_amount: "Total amount",
  hsn_summary: "HSN summary",
};

export const invoiceExtractionSchema = z.object({
  invoice_number: z.string().nullable(),
  invoice_date: z.string().nullable(),
  vendor_name: z.string().nullable(),
  vendor_gstin: z.string().nullable(),
  buyer_gstin: z.string().nullable(),
  taxable_value: z.number().nullable(),
  cgst: z.number().nullable(),
  sgst: z.number().nullable(),
  igst: z.number().nullable(),
  total_amount: z.number().nullable(),
  hsn_summary: z.string().nullable(),
  confidence: z.enum(["high", "medium", "low"]).optional(),
});

export type InvoiceExtraction = z.infer<typeof invoiceExtractionSchema>;

export const DEMO_EXTRACTION: InvoiceExtraction = {
  invoice_number: "INV-2024-0842",
  invoice_date: "2024-11-15",
  vendor_name: "Acme Supplies Pvt Ltd",
  vendor_gstin: "27AABCU9603R1ZM",
  buyer_gstin: "29ABCDE1234F1Z5",
  taxable_value: 45000,
  cgst: 4050,
  sgst: 4050,
  igst: null,
  total_amount: 53100,
  hsn_summary: "8471, 8504",
  confidence: "high",
};
