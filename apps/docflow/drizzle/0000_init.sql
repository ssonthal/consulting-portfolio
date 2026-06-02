CREATE TABLE IF NOT EXISTS "users" (
  "id" text PRIMARY KEY NOT NULL,
  "name" text,
  "email" text NOT NULL,
  "email_verified" timestamp,
  "image" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "users_email_unique" UNIQUE("email")
);

CREATE TABLE IF NOT EXISTS "accounts" (
  "user_id" text NOT NULL,
  "type" text NOT NULL,
  "provider" text NOT NULL,
  "provider_account_id" text NOT NULL,
  "refresh_token" text,
  "access_token" text,
  "expires_at" integer,
  "token_type" text,
  "scope" text,
  "id_token" text,
  "session_state" text,
  PRIMARY KEY("provider","provider_account_id")
);

CREATE TABLE IF NOT EXISTS "sessions" (
  "session_token" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL,
  "expires" timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS "verification_tokens" (
  "identifier" text NOT NULL,
  "token" text NOT NULL,
  "expires" timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS "workspaces" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" text NOT NULL,
  "name" text NOT NULL,
  "folder_id" text NOT NULL,
  "folder_name" text,
  "spreadsheet_id" text NOT NULL,
  "spreadsheet_name" text,
  "sheet_name" text DEFAULT 'Sheet1' NOT NULL,
  "field_mapping" jsonb,
  "sync_enabled" boolean DEFAULT true NOT NULL,
  "last_sync_at" timestamp,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "processed_files" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "workspace_id" uuid NOT NULL,
  "drive_file_id" text NOT NULL,
  "file_name" text,
  "status" text DEFAULT 'pending' NOT NULL,
  "extracted_json" jsonb,
  "error" text,
  "processed_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "usage_counters" (
  "user_id" text PRIMARY KEY NOT NULL,
  "month_key" text NOT NULL,
  "documents_processed" integer DEFAULT 0 NOT NULL
);

ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "processed_files" ADD CONSTRAINT "processed_files_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "usage_counters" ADD CONSTRAINT "usage_counters_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;

CREATE UNIQUE INDEX IF NOT EXISTS "processed_files_workspace_drive_idx" ON "processed_files" ("workspace_id","drive_file_id");
