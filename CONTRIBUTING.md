# Contributing to Sakank

We follow a strict development process to maintain a production-grade codebase.

## Git Workflow
See [docs/development/workflow.md](./docs/development/workflow.md) for details on the task and Git lifecycles.

## Branch Naming
- `feat/feature-name`
- `fix/issue-description`
- `chore/task-description`
- `refactor/what-is-being-refactored`

## Commit Message Format
We use Conventional Commits:
`type(scope): subject`

Example: `feat(api): add stay request endpoints`

## Pull Request Process
1. Ensure all tests pass.
2. Ensure `pnpm lint` and `pnpm typecheck` pass.
3. Link the PR to the relevant issue or ticket.
4. Require at least one code review approval before merging.

## Code Review Rules
- Review for architectural consistency.
- Ensure no business logic leaks into Prisma schemas.
- Ensure proper use of the shared packages (`@sakank/types`, etc.).

## Definition of Done (DoD)
- Code implemented and tested locally.
- Linting and type-checking pass.
- Documentation updated (if applicable).
- PR reviewed and approved.

## Architecture Rules
- Use Domain-Driven Design (DDD) principles.
- Use strict TypeScript.
- No `any` types.

## AI Workflow
When using AI assistants, ensure they follow the `016-Backend-Implementation-Guide.md` and `017-Mobile-Implementation-Guide.md` strict rules.

## Documentation Rules
Every module must have a `README.md` explaining its purpose, boundaries, and internal architecture.

## Quality Checklist
- [ ] Code passes TypeScript compiler.
- [ ] Code passes ESLint without disabled rules unless justified.
- [ ] Commit message follows Conventional Commits.
- [ ] No hard-deleted queries in Prisma (always use `deletedAt: null`).
