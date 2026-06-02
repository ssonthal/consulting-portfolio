# DocFlow AWS deployment

Architecture:

```
Amplify (apps/docflow)  ──►  RDS PostgreSQL
        │                        ▲
        │                        │
EventBridge (5 min)  ──►  Lambda (sync-cron) ──┘
```

Portfolio (`apps/web`) deploys to Amplify only — no RDS/Lambda required.

## Prerequisites

- AWS CLI + [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam.html)
- Node 20+, pnpm
- Default VPC in your AWS account (RDS uses it)

## 1. Deploy RDS + sync Lambda

```bash
export DB_MASTER_PASSWORD='your-secure-password-min-12'   # avoid @ : / in password
export ENCRYPTION_KEY='openssl rand -base64 32'
export OPENAI_API_KEY='sk-...'
export GOOGLE_CLIENT_ID='...'
export GOOGLE_CLIENT_SECRET='...'

chmod +x infra/scripts/deploy.sh
./infra/scripts/deploy.sh
```

Or manually:

```bash
cd infra
sam build --base-dir ..
sam deploy --guided
```

Copy **DatabaseUrl** from stack outputs.

## 2. Apply database schema

```bash
DATABASE_URL='postgresql://...' pnpm db:push
```

## 3. Amplify Hosting (both apps)

Create two Amplify apps (Git connect or manual):

| App | Monorepo root | Build command | Output |
|-----|---------------|---------------|--------|
| Portfolio | `apps/web` | `cd ../.. && pnpm install && pnpm --filter @consulting/web build` | `.next` |
| DocFlow | `apps/docflow` | `cd ../.. && pnpm install && pnpm --filter @consulting/docflow build` | `.next` |

**DocFlow Amplify environment variables:**

- `DATABASE_URL` — from CloudFormation output
- `AUTH_SECRET` — `openssl rand -base64 32`
- `AUTH_URL` — `https://your-docflow.amplifyapp.com`
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
- `ENCRYPTION_KEY` — same value as Lambda deploy
- `OPENAI_API_KEY` / `OPENAI_MODEL`
- `NEXT_PUBLIC_PORTFOLIO_URL`

**Portfolio environment variables:**

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_DOCFLOW_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`

## 4. Security hardening (before production)

- Set `AllowPublicDbAccess=false` and place Lambda in the same VPC as RDS
- Restrict RDS security group to Lambda SG + your office IP only
- Move secrets to AWS Secrets Manager
- Complete Google OAuth verification for public users

## Local cron testing

Without Lambda, trigger sync manually:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" http://localhost:3001/api/cron/sync
```

In production, rely on EventBridge → Lambda only.
