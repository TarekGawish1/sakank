# Development Workflow

## Task Lifecycle
1. **Assign:** Pick a task from the backlog or Jira.
2. **Discuss:** Align on technical approach in the issue if needed.
3. **Branch:** Create a new branch off `main`.
4. **Implement:** Write code, following all architectural guidelines and coding standards.
5. **Review:** Open a Pull Request (PR).
6. **Merge:** Squash and Merge into `main` once approved.

## Git Lifecycle & Branch Strategy
- **Main branch:** `main` (Production-ready state).
- **Feature branches:** `<type>/<short-description>`
  - `feat/add-auth`
  - `fix/login-crash`
  - `chore/update-deps`
  - `refactor/listing-service`

## Code Review Process
- Open a Pull Request against `main`.
- Fill out the PR template completely.
- Request reviews from at least one core contributor.
- Address comments and push fixes.

## Merge Strategy
We use **Squash and Merge**. This maintains a clean, linear history on the `main` branch, turning multiple commit WIPs into a single, cohesive commit describing the feature or fix.
