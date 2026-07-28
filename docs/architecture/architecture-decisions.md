# Architecture Decision Records (ADRs)

### Why Property != Unit
A property represents a physical building (e.g., a villa). A unit represents the rentable space inside it (e.g., a room or a bed). Separating these allows owners to manage a building's location once, and manage pricing/availability per room.

### Why Listing exists alongside Unit
A Unit is physical reality. A Listing is the advertisement. This separation allows a unit's rent to change for a new season without altering the historical stay requests of past listings. It also allows an owner to pause an advertisement (Listing) while the unit remains physically unchanged.

### Why PropertyImage vs UnitImage
Property images show the exterior and shared amenities (building facade, garden). Unit images show the specific room or bed. Splitting them keeps unit galleries clean.

### Why Decimal is used for Money
Floating-point numbers suffer from precision loss. `Decimal` ensures exact currency calculations for rent and deposits.

### Why Soft Delete exists
Hard deleting a user or property would cascade and destroy historical records of Stay Requests, breaking analytics and audit trails.

### Why Version column exists
To implement Optimistic Locking. When two admins update a record simultaneously, the `version` column prevents lost updates.

### Why UUID is used
Integer IDs allow attackers to guess URLs (e.g., `/users/5`) and scrape data. UUIDs are unguessable.

### Why OwnerProfile exists
Separating `User` from `OwnerProfile` and `StudentProfile` adheres to the Single Responsibility Principle. A User handles authentication, while profiles store domain-specific business data.
