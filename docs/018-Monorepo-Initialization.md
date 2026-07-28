# 018 — Monorepo Initialization & Engineering Foundation

## 1. Executive Summary

This document defines the absolute foundational structure for the Sakank codebase. We are utilizing a **pnpm + Turborepo** monorepo architecture. This is not about feature development; this is about establishing an engineering environment that prevents bad code from being merged. By enforcing shared configurations, strict TypeScript typing, and automated code quality pipelines, we ensure that a team of any size—or an AI assistant—can contribute securely and consistently. The repository must feel like it belongs to Stripe or Linear: pristine, deterministic, and highly productive.

## 2. Monorepo Architecture & Applications

The repository is split into isolated `apps` and reusable `packages`.

- `apps/mobile`: The React Native Expo application.
- `apps/api`: The Node.js Express/Prisma backend.
- `apps/admin`: Reserved for a future React web dashboard.

## 3. Shared Packages

Packages live in the `packages/` directory and are consumed by the apps.

- `packages/config`: Houses shared `tsconfig.json`, `.eslintrc.js`, and `.prettierrc`. Prevents copy-pasting config files.
- `packages/types`: The single source of truth for TypeScript interfaces, enums, and API request/response contracts.
- `packages/validation`: Contains all Zod schemas. Used by both the mobile form validation and backend request validation.
- `packages/constants`: Global constants (e.g., SLA timeouts, Feature Flags).
- `packages/utils`: Pure utility functions (e.g., date formatting). Must be platform-agnostic (no DOM or Node-specific APIs).
- `packages/ui`: Reserved for future shared web/React components.

## 4. Root Configuration

- `package.json`: Defines workspace dependencies and root-level scripts (e.g., `pnpm dev`, `pnpm build`).
- `pnpm-workspace.yaml`: Tells pnpm which directories (`apps/*`, `packages/*`) belong to the monorepo.
- `turbo.json`: Defines the Turborepo pipeline, caching dependencies, and task order (e.g., `build` depends on `^build`).
- `.gitignore` & `.gitattributes`: Ignores `node_modules`, `dist`, `.env` files. Enforces LF line endings globally.
- `.editorconfig`: Enforces basic formatting (2 spaces, trailing newline) across all IDEs.
- `.nvmrc`: Locks the Node.js version (e.g., `v20.x`) for all developers.
- `README.md`: Repository overview and quickstart guide.
- `LICENSE`: Project license.
- `.env.example`: Template for local development variables. No actual secrets.

## 5. TypeScript Strategy

- **Strict Mode:** `strict: true` is non-negotiable. No implicit `any`.
- **Shared Config:** `packages/config/tsconfig.base.json` defines base rules. Apps extend this (e.g., `tsconfig.node.json`, `tsconfig.react-native.json`).
- **Path Aliases:** Used extensively (`@sakank/types`, `@sakank/validation`, `~/*` for internal app paths) to avoid relative import hell (`../../../`).

## 6. Turborepo Pipelines (`turbo.json`)

- `dev`: Runs `api` and `mobile` in parallel. No cache.
- `build`: Builds all apps. Caches output (`dist`, `.next`). Depends on topological `^build`.
- `lint`: Runs ESLint across all apps and packages. Highly cacheable.
- `typecheck`: Runs `tsc --noEmit`. Fails if any type errors exist.
- `test`: Runs unit tests via Vitest/Jest.
- **Remote Caching:** Ready for Vercel Remote Cache to speed up CI/CD.

## 7. Dependency Management

- **Internal:** Linked via pnpm workspace protocol (`workspace:*`). E.g., `"@sakank/types": "workspace:*"`.
- **External:** Installed at the specific app/package level, NOT the root, unless it's a global dev dependency (like `turbo` or `typescript`).
- **Versions:** Use exact versions or strictly lock dependencies using `pnpm-lock.yaml`.

## 8. Git & Workflow Strategy

- **Branch Naming:** `feat/ticket-id-name`, `fix/ticket-id-name`, `chore/name`.
- **Commits:** Enforced via `commitlint` (e.g., `feat(api): add user routes`).
- **Hooks:** `Husky` runs `lint-staged` pre-commit to format code and run fast linting.

## 9. Code Quality Tools

- **ESLint & Prettier:** Prettier handles formatting, ESLint handles code logic rules.
- **Import Sorting:** Enforced via `eslint-plugin-simple-import-sort`.
- **Unused Imports:** Fails the build if unused imports exist.

## 10. GitHub Infrastructure

- `.github/workflows/ci.yml`: Runs on every PR. Executes: Install -> Type Check -> Lint -> Test.
- `.github/workflows/cd.yml`: Runs on merge to `main`. Deploys API and triggers Expo build.
- `CODEOWNERS`: Ensures specific teams review specific app changes.
- `Dependabot`: Automated dependency security updates.

## 11. Testing Foundation

- **Tooling:** `Vitest` for fast backend/package unit tests. `Jest` + React Native Testing Library for Mobile. `Supertest` for API integration tests.
- **Naming:** Files named `*.test.ts`.

## 12. Mobile Bootstrap (app/mobile)

- **Init:** Created via `create-expo-app` with Expo Router template.
- **Key Packages:** `expo`, `expo-router`, `@tanstack/react-query`, `zustand`, `react-hook-form`, `@hookform/resolvers`, `zod`, `expo-image`, `@shopify/flash-list`, `react-native-reanimated`.
- **Foundation:** Includes `ThemeProvider`, `QueryClientProvider`, and global error boundaries.

## 13. Backend Bootstrap (app/api)

- **Init:** Bare Node.js + Express + TypeScript setup.
- **Key Packages:** `express`, `cors`, `helmet`, `compression`, `express-rate-limit`, `zod`, `prisma`, `firebase-admin`, `jsonwebtoken`.
- **Foundation:** Health check endpoint (`/health`), global error handling middleware, and graceful shutdown handling.

## 14. Shared Package Rules

- **Rule of Thumb:** If code is used in `mobile` and `api`, it belongs in a shared package.
- **No Duplication:** Never define a User interface in Mobile and a separate User interface in API. They both import `User` from `@sakank/types`.

## 15. Engineering Standards

- **Naming:** Files are `kebab-case.ts`. Classes/Types are `PascalCase`. Variables are `camelCase`.
- **Exports:** Prefer named exports. Default exports are only used when forced (e.g., Expo Router screens).
- **Barrel Files:** Use `index.ts` to export public API of a folder, but avoid deep nesting to prevent circular dependency issues.

## 16. Development Workflow (Day 1 Setup)

1. `git clone`
2. `nvm use`
3. `pnpm install`
4. Copy `.env.example` to `.env` in `apps/api` and `apps/mobile`.
5. `pnpm run db:setup` (Generates Prisma client and runs migrations).
6. `pnpm dev` (Turborepo boots API on :3000 and Expo Bundler on :8081).

## 17. Repository Rules (Strict Directives)

- Never use JavaScript (`.js`). TypeScript (`.ts`/`.tsx`) only.
- Never use `any`. Use `unknown` if truly dynamic, then validate it.
- Never bypass shared packages.
- Never commit secrets (API keys, DB passwords).
- Never disable lint rules without an explicit inline comment explaining why.

## 18. AI Development Rules

When generating code for this monorepo, AI MUST:

- Add dependencies to the correct specific workspace (`apps/api`), not the root.
- Import types and validators from the `@sakank/` packages.
- Follow the feature-first folder structure.
- Ensure all new files pass `pnpm typecheck` and `pnpm lint`.

## 19. Success Checklist (Ready for Features)

- [ ] Turborepo runs `build`, `lint`, and `typecheck` successfully across all workspaces.
- [ ] Prisma client generates correctly.
- [ ] Expo boots on simulator without errors.
- [ ] Express boots and `/health` returns 200 OK.
- [ ] GitHub Actions CI workflow passes on a test PR.

## 20. Final Recommendations (VP of Engineering Directive)

**Decisions that must NEVER change after v1.0:**

1. **The Monorepo Boundary:** Never break the workspace links. The frontend and backend must always deploy from the exact same git commit to guarantee contract compatibility.
2. **Strict TypeScript:** Lowering `strict: true` to `false` is a one-way door to a legacy, unmaintainable codebase. It must never be disabled.
