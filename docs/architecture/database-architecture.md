# Database Architecture

The database is built on PostgreSQL using Prisma ORM.

## Aggregates

### 1. Identity Aggregate
- **User:** Stores authentication details (phone, email) and role.
- **StudentProfile:** 1:1 relation with User.
- **OwnerProfile:** 1:1 relation with User.
- **VerificationRequest:** 1:N relation with User for KYC processes.

### 2. Geography Aggregate
- **Governorate, City, Area:** Hierarchical location mapping.
- **University:** Distinct lookup for students.

### 3. Property Aggregate
- **Property:** Belongs to an OwnerProfile and Area. Represents the physical building.
- **PropertyImage:** Images showcasing the building exterior and shared amenities.

### 4. Unit Aggregate
- **Unit:** Belongs to a Property. Represents the rentable space (Room, Bed, Studio) and its pricing/capacity constraints.
- **UnitImage:** Images specific to the rentable unit.

### 5. Marketplace Aggregate
- **Listing:** Belongs to a Unit. Represents the public-facing advertisement that is currently available.
- **Favorite:** Join table linking StudentProfile and Listing.
- **StayRequest:** Transactional record linking a StudentProfile to a Listing with intent to rent.

## Design Philosophy

- **Soft Delete:** No records are hard-deleted. We use `deletedAt`. Soft deletes ensure historical relationships (like a past StayRequest) are preserved.
- **Audit Trails:** Every table has `createdAt`, `updatedAt`, `deletedAt`, and `version` columns.
- **Optimistic Locking:** The `version` column is used to prevent lost updates when multiple users attempt to modify the same row simultaneously.
- **UUIDs:** All primary keys are UUIDs to prevent ID enumeration attacks and maintain unguessable resource locators.
- **Naming Conventions:** All Prisma models use `camelCase` in code but map to `snake_case` in the database using the `@map` and `@@map` directives.
