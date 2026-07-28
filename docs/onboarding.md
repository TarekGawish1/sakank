# Developer Onboarding

Welcome to Sakank! Follow these steps to get your local environment running.

## 1. Clone Repository
```bash
git clone https://github.com/TarekGawish1/sakank.git
cd sakank
```

## 2. Install Dependencies
```bash
npm install -g pnpm
pnpm install
```

## 3. Configure Environments
Copy the example files and populate them with real values.
```bash
cp apps/api/.env.example apps/api/.env
```
*Note: Ensure `DATABASE_URL` is set to your local or cloud PostgreSQL instance.*

## 4. Prisma Commands
Navigate to the `apps/api` directory to run database commands:
```bash
cd apps/api
pnpm prisma generate
pnpm prisma db push # Or prisma migrate dev
```

## 5. Development Commands
From the monorepo root:
- Start all apps: `pnpm dev`
- Run linting: `pnpm lint`
- Run typecheck: `pnpm typecheck`

## Common Issues & Troubleshooting
- **Prisma Client not found:** Ensure you have run `pnpm prisma generate` in `apps/api` after setting `DATABASE_URL`.
- **Lint errors in shared packages:** Run `pnpm --filter @sakank/<package> build` if a package needs building, though our setup uses raw TS via Turborepo workspaces.
- **Turborepo cache issues:** If builds are acting strange, use `pnpm turbo run <task> --force` to ignore the cache.
