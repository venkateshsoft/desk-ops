# DeskOps — Service Desk Operations Platform

DeskOps is a greenfield Next.js/TypeScript service desk operations workspace. The first vertical slice provides a persistent Prisma/SQLite data layer, realistic demo data, an executive operations dashboard, operational alerts, SLA/backlog visibility, workload distribution, ticket search, and a validated `POST /api/tickets` quick-capture endpoint with audit logging.

## Run locally

```powershell
npm.cmd install
Copy-Item .env.example .env
npx.cmd prisma db push
npm.cmd run db:seed
npm.cmd run dev
```

Open `http://localhost:3000`.

## Data model

`prisma/schema.prisma` is PostgreSQL-ready in structure and currently uses SQLite for zero-setup local demonstration. It includes users, teams, services, tickets, comments, immutable ticket history, escalations, major incidents, problems, changes, operational actions, BCP/DR exercises, notifications, audit logs, and import tracking.

## KPI interpretation

The dashboard separates current backlog from resolved volume, exposes breach and at-risk populations, and calculates average first response from stored timestamps. Production reporting will add period-cutoff snapshots, business-hours calendars, pause/resume rules, CSAT, and configurable SLA policies.

## Current limitations / next phases

- Navigation items are the target module map; only the executive operations slice is implemented in this phase.
- The quick-capture API persists tickets and writes an audit record; authentication/RBAC, full ticket detail workflows, imports, exports, reports, and notification providers are next.
- Demo metrics are based on fictional seed data and are explicitly not external ITSM integrations.

## Verification

`npm.cmd run build` passes with the current application and API route. Seed data is fictional and contains 500 tickets plus operational records for dashboard demonstration.
