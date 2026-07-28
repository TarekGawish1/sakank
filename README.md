# Sakank

Sakank is a purpose-built, mobile-first marketplace designed to solve a localized, highly painful problem: university student accommodation in Egypt. It creates a trusted, verified ecosystem connecting students with property owners, focusing relentlessly on safety, transparency, and the specific needs of the academic calendar.

## Tech Stack
- **Monorepo:** Turborepo, pnpm workspaces
- **Backend:** Node.js, Express, TypeScript, Prisma, PostgreSQL
- **Mobile:** React Native, Expo, Expo Router
- **Authentication:** Firebase Phone OTP + JWT

## Monorepo Structure
```
sakank/
├── apps/
│   ├── api/        # Express Backend
│   ├── mobile/     # Expo React Native App
│   └── admin/      # Future Admin Dashboard
├── packages/
│   ├── config/     # Shared configuration
│   ├── constants/  # Shared constants
│   ├── types/      # Shared types and interfaces
│   ├── utils/      # Shared utility functions
│   └── validation/ # Shared Zod schemas
└── docs/           # Documentation
```

## Getting Started

See [docs/onboarding.md](./docs/onboarding.md) for complete setup instructions.

## Development Commands
- `pnpm install` - Install dependencies
- `pnpm dev` - Start development servers
- `pnpm lint` - Run ESLint across workspace
- `pnpm typecheck` - Run TypeScript compiler checks

## Git Workflow
See [CONTRIBUTING.md](./CONTRIBUTING.md) for branch strategy, conventional commits, and pull request guidelines.

## Roadmap
For an overview of the system, see [docs/architecture/system-overview.md](./docs/architecture/system-overview.md).
