#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
INFRA="$ROOT/infra"

if [[ -z "${DB_MASTER_PASSWORD:-}" ]]; then
  echo "Set DB_MASTER_PASSWORD (min 12 chars) before deploy."
  exit 1
fi
if [[ -z "${ENCRYPTION_KEY:-}" || -z "${OPENAI_API_KEY:-}" ]]; then
  echo "Set ENCRYPTION_KEY and OPENAI_API_KEY before deploy."
  exit 1
fi

cd "$INFRA"

cd "$ROOT"
sam build --template-file "$INFRA/template.yaml"

sam deploy \
  --parameter-overrides \
    "DbMasterPassword=${DB_MASTER_PASSWORD}" \
    "EncryptionKey=${ENCRYPTION_KEY}" \
    "OpenAIApiKey=${OPENAI_API_KEY}" \
    "GoogleClientId=${GOOGLE_CLIENT_ID:-placeholder}" \
    "GoogleClientSecret=${GOOGLE_CLIENT_SECRET:-placeholder}" \
    "AllowPublicDbAccess=${ALLOW_PUBLIC_DB_ACCESS:-true}"

echo ""
echo "After deploy, copy DatabaseUrl from stack outputs into apps/docflow/.env.local"
echo "Run schema: pnpm db:push (from repo root)"
