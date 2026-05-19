# CodeFolio

A no-code portfolio builder for developers. Think "Linktree meets Squarespace, but built for engineers." Users register, fill in their profile/projects/skills, pick a template, and share a public URL.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/codefolio run dev` — run the React frontend (port 22096)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (auto-provisioned)
- Required env: `SESSION_SECRET` — used as JWT signing secret

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, wouter routing, TanStack Query, react-hook-form + zod, Tailwind CSS
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Auth: JWT (stored in localStorage as `codefolio_token`)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- Email: Nodemailer (falls back to logger if no SMTP configured)
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI contract (source of truth)
- `lib/db/src/schema/users.ts` — User table schema (profile, projects, skills as JSONB)
- `artifacts/api-server/src/routes/` — auth.ts, portfolio.ts, public.ts + health.ts
- `artifacts/api-server/src/middlewares/authMiddleware.ts` — JWT verification
- `artifacts/codefolio/src/` — React frontend
- `artifacts/codefolio/src/templates/` — 6 portfolio templates (Minimalist, Cyberpunk, Corporate, Creative, DataScience, GameDev)
- `artifacts/codefolio/src/lib/auth-context.tsx` — JWT auth context

## Architecture decisions

- Single `users` table with profile/projects/skills stored as JSONB columns — matches the embedded document model from the original spec without needing MongoDB
- JWT signed with `SESSION_SECRET` env var (already exists) rather than adding a new `JWT_SECRET`
- Auth token stored in localStorage as `codefolio_token`, user info as `codefolio_user`
- The custom-fetch in `lib/api-client-react/src/custom-fetch.ts` auto-attaches JWT to all requests
- Contact form falls back to structured logging if no EMAIL_USER/EMAIL_PASS env vars are set

## Product

- Landing page with hero, features section, and 6-template showcase
- Register/Login with JWT auth
- Dashboard: tabbed CMS (Profile, Projects, Skills, Choose Theme) + live scaled preview
- 6 portfolio templates: Minimalist, Cyberpunk, Corporate, Creative, Data Science, Game Dev
- Public portfolio pages at `/{username}` with SEO meta tags

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Always run `pnpm --filter @workspace/api-spec run codegen` after spec changes
- Always run `pnpm run typecheck:libs` after schema changes before running API server typecheck
- DB schema uses JSONB for profile/projects/skills — Drizzle types them with `$type<T>()`
- `>` character in JSX text nodes is invalid — use `{">"}` instead
- Template literal backticks written by subagents sometimes come through as escaped `\`` — fix manually

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
