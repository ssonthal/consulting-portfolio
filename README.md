# FlowDesk Portfolio

Marketing site for sales automation consulting—FAQ chatbots, lead qualification, and follow-ups.

| App | Port | Description |
|-----|------|-------------|
| `apps/web` | 3000 | Next.js portfolio + live FAQ chat widget |

## Quick start

```bash
pnpm install
cp .env.example apps/web/.env.local
# Edit apps/web/.env.local (contact email, optional OpenAI/Resend)

pnpm dev
```

Open http://localhost:3000

## Deploy (Vercel)

1. Import repo in [Vercel](https://vercel.com)
2. **Root directory:** `apps/web`
3. **Build command:** `cd ../.. && pnpm install && pnpm --filter @consulting/web build`
4. Set env vars from `.env.example`

## Features

- Haptik-inspired landing page with WhatsApp demo animation
- Floating FAQ chat widget with lead capture (`/api/leads`, optional Resend)
- Pages: Services, Work, About, Contact
