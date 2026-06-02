import {
  boolean,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import type { InvoiceExtraction } from "@/lib/invoice-schema";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const accounts = pgTable(
  "accounts",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.provider, table.providerAccountId] }),
  }),
);

export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable("verification_tokens", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const workspaces = pgTable("workspaces", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  folderId: text("folder_id").notNull(),
  folderName: text("folder_name"),
  spreadsheetId: text("spreadsheet_id").notNull(),
  spreadsheetName: text("spreadsheet_name"),
  sheetName: text("sheet_name").notNull().default("Sheet1"),
  fieldMapping: jsonb("field_mapping").$type<Record<string, string>>(),
  syncEnabled: boolean("sync_enabled").default(true).notNull(),
  lastSyncAt: timestamp("last_sync_at", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const processedFiles = pgTable("processed_files", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  driveFileId: text("drive_file_id").notNull(),
  fileName: text("file_name"),
  status: text("status").notNull().default("pending"),
  extractedJson: jsonb("extracted_json").$type<InvoiceExtraction>(),
  error: text("error"),
  processedAt: timestamp("processed_at", { mode: "date" }).defaultNow().notNull(),
});

export const usageCounters = pgTable("usage_counters", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  monthKey: text("month_key").notNull(),
  documentsProcessed: integer("documents_processed").default(0).notNull(),
});
