# Consulting Portfolio + DocFlow

Monorepo with two Next.js apps:

| App | Port | Purpose |
|-----|------|---------|
| `apps/web` | 3000 | **Portfolio** — sales automation consulting (FAQ chatbots, lead qual, follow-ups) |
| `apps/docflow` | 3001 | Legacy demo (invoice PDF → Sheets); optional, not linked from portfolio |

| AWS resource | Purpose |
|--------------|---------|
| **RDS PostgreSQL** | Users, workspaces, mappings, processing log |
| **Lambda + EventBridge** | Cron every 5 min — sync Drive folders → Sheets |
| **Amplify** | Next.js SSR / API routes (OAuth, setup UI, manual sync) |

## Quick start (local)

```bash
pnpm install
cp .env.example apps/docflow/.env.local
# Set DATABASE_URL (local Postgres or RDS endpoint), AUTH_SECRET, GOOGLE_*, ENCRYPTION_KEY, OPENAI_API_KEY

pnpm db:push
pnpm dev
```

Portfolio: http://localhost:3000  
DocFlow: http://localhost:3001

## AWS deploy

See **[infra/DEPLOY.md](infra/DEPLOY.md)** for full steps:

1. `sam build && sam deploy` — creates RDS + sync Lambda (EventBridge schedule)
2. Run `pnpm db:push` against RDS `DatabaseUrl` output
3. Connect **Amplify** apps for `apps/web` and `apps/docflow`
4. Set Amplify env vars (`DATABASE_URL`, `AUTH_SECRET`, Google OAuth, etc.)

Cron runs on **Lambda**, not the Next.js app. The `/api/cron/sync` route remains for optional manual triggers during development.

## Google Cloud setup (DocFlow)

1. Create a project at [Google Cloud Console](https://console.cloud.google.com/).
2. Enable **Google Drive API** and **Google Sheets API**.
3. OAuth consent screen (External → Testing → add test users).
4. OAuth client (Web application):
   - Redirect: `http://localhost:3001/api/auth/callback/google`
   - Production: `https://<your-amplify-docflow-domain>/api/auth/callback/google`

## DocFlow flow

1. Sign in with Google.
2. Create a workspace (Drive folder + spreadsheet tab).
3. Map invoice fields → sheet column headers.
4. Drop PDFs in the folder; **Lambda cron** processes them every 5 minutes (or use **Sync now** in the UI).
5. Rows appear in your sheet; dashboard shows the processing log.

## Sample invoices

Add anonymized GST PDFs under `apps/docflow/public/samples/`. Use `/try` for extraction demo without Google.
