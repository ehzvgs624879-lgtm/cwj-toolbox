# CWJ Tools

CWJ Tools is a personal AI & utility platform — a curated collection of AI and practical tools, styled as a high-end cyberpunk ops center.

## Run & Operate

- `pnpm --filter @workspace/cwj-tools run dev` — run the CWJ Tools frontend (React + Vite)
- `pnpm --filter @workspace/api-server run dev` — run the Express API server
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Flask weather legacy app: `cd weather-app && PORT=8000 python app.py`

## Stack

- **Frontend**: React 18 + Vite, Tailwind CSS, Framer Motion, Wouter routing
- **Backend API**: Express 5 (Node.js 24, TypeScript 5.9)
- **Legacy tool**: Flask (Python 3.11) — original weather app at `weather-app/`
- **DB**: PostgreSQL + Drizzle ORM (provisioned separately)
- **Build**: pnpm workspaces, esbuild (API), Vite (frontend)

## Where things live

- `artifacts/cwj-tools/src/` — React frontend (CWJ Tools platform)
- `artifacts/cwj-tools/src/pages/` — Home, Tools, About, individual tool pages
- `artifacts/cwj-tools/src/index.css` — global cyberpunk theme (CSS custom properties)
- `artifacts/api-server/src/` — Express API server
- `weather-app/app.py` — legacy Flask weather app (Python)
- `lib/api-spec/openapi.yaml` — OpenAPI source of truth

## Architecture decisions

- CWJ Tools frontend is purely client-side — all tools call external public APIs directly (wttr.in for weather, exchangerate-api.com for currency). No backend proxy needed.
- Flask weather app (`weather-app/`) is kept as a legacy service but is not routed through the proxy. The weather feature is now also available in the React app at `/tools/weather`.
- The proxy routes `/` → cwj-tools (React, port allocated by artifact), `/api` → Express (port 8080).
- Cyberpunk theme is implemented via CSS custom properties in `index.css` — blue-to-purple neon gradient (#00d4ff → #7c3aed), glassmorphism cards, dark background.

## Product

- **Home** (`/`): Hero with neon CWJ TOOLS title, stats strip, tool search, featured tools, changelog
- **Tools** (`/tools`): Full catalog — AI Tools, Utility Tools, Dev Tools, File Tools
- **About** (`/about`): Personal page about CWJ and the platform
- **Functional tools**: Weather, Currency converter, World Time, Date Calculator, Password Generator, JSON Formatter, Base64, URL Encode/Decode, Text Formatter
- **Placeholder tools**: AI Chat, AI Translate, AI Copy, AI Code, Image Compress, PDF Tools, Site Info

## User preferences

- Brand name: CWJ Tools
- Visual style: black cyberpunk, blue-purple neon gradient, glassmorphism, mobile-first
- No emojis in the UI
- Language: Chinese/English bilingual content

## Gotchas

- Do not restart the frontend workflow during design subagent runs — it will show a broken app mid-build.
- The Flask app at `weather-app/` must NOT be registered at path `/` in artifact.toml — that path belongs to the React frontend.
- `verifyAndReplaceArtifactToml` requires the target artifact.toml to already exist; it cannot create new ones from scratch.
- Artifact-managed workflows cannot be deleted via `removeWorkflow` — update the artifact.toml instead.
- CSS custom properties in the scaffold's `index.css` are initialized to `red` — must be fully replaced before any components render.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
