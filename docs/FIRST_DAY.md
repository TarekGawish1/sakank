# First Day Guide

Welcome to Sakank! Your first day should be focused on getting your environment running and understanding the core domain.

## 1. Setup Your Environment
- **Clone:** `git clone https://github.com/TarekGawish1/sakank.git`
- **Install:** Run `npm i -g pnpm` followed by `pnpm install`.
- **Environment:** Copy `.env.example` to `.env` in `apps/api` and update `DATABASE_URL`.
- **Run project:** Execute `pnpm dev` in the root folder. You should see both the API and Mobile bundles starting.

## 2. Reading Order
To understand the project quickly, read the docs in this order:
1. `README.md`
2. `docs/architecture/system-overview.md`
3. `docs/architecture/architecture-decisions.md`
4. `docs/api-guidelines.md`

## 3. Your First Task
- Pick a "good first issue" from the backlog.
- Typical first tasks involve adding a simple endpoint, fixing a UI bug, or writing a missing test.
- Follow the workflow in `CONTRIBUTING.md`.

## Common Mistakes
- **Forgetting Prisma Generate:** Whenever you pull changes to `schema.prisma`, you MUST run `pnpm prisma generate`.
- **Using `any`:** TypeScript strict mode is enabled. Do not use `any`.
- **Working on `main`:** Always create a new branch (`feat/xxx` or `fix/xxx`).
