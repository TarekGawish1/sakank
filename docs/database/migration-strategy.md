# Database Migration Strategy

We use Prisma Migrate for managing database schema changes.

## Migration Rules
- **NEVER edit old migrations:** Once a migration is pushed to production, its SQL file is immutable.
- **Atomic Migrations:** Each migration should serve a single logical change (e.g., `add_listing_table`).
- **Naming:** Provide descriptive names when running `prisma migrate dev --name <description>`.

## Partial Indexes
Prisma `schema.prisma` does not natively support partial unique indexes (e.g., enforcing uniqueness only when `deletedAt IS NULL`).
- These must be implemented by manually editing the generated migration SQL file **before** applying it.
- E.g., `CREATE UNIQUE INDEX "User_email_key" ON "User"("email") WHERE "deletedAt" IS NULL;`

## Production Migration Workflow
1. Develop locally and run `prisma migrate dev`.
2. Commit the `prisma/migrations` folder and `schema.prisma`.
3. In production/CI pipeline, run `prisma migrate deploy` to safely apply pending migrations.

## Rollback Strategy
- Prisma does not have a native "down" migration feature out of the box.
- To rollback, you must create a **new** migration that reverts the changes made by the previous one.
- Always backup the production database before running `prisma migrate deploy`.
