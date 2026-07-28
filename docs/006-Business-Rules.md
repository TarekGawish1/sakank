# 006 — Business Rules

## 1. Executive Summary

Business Rules are the immutable laws of the Sakank domain. While the Domain-Driven Design (DDD) document outlines _what_ the concepts are, this document dictates exactly _how_ they behave. These rules serve as the single source of truth for backend validation, database constraints, frontend state management, and QA test cases. By defining atomic, testable rules before writing code, we eliminate ambiguity and prevent the UI from masking backend vulnerabilities.

## 2. Rule Design Principles

Every rule in this document adheres to the following principles:

- **Atomic:** Each rule governs exactly one behavior.
- **Deterministic:** Given the same inputs, the rule always yields the same outcome.
- **Testable:** QA can write a distinct pass/fail test for every rule.
- **Technology Independent:** Rules are defined by business logic, not SQL constraints or HTTP methods.
- **Business Driven:** The rule exists to protect business value, not engineering convenience.
- **No Duplication:** A rule is stated once and referenced globally.

## 3. User Rules (Student)

| ID             | Rule Description                                                                                   | Priority |
| :------------- | :------------------------------------------------------------------------------------------------- | :------- |
| **BR-USR-001** | A user identity is uniquely tied to one verified phone number via OTP.                             | Critical |
| **BR-USR-002** | A Student profile must include a valid University selection before they can submit a Stay Request. | High     |
| **BR-USR-003** | If a Student account is `Suspended`, they cannot login, search, or submit Stay Requests.           | Critical |
| **BR-USR-004** | A Student can delete their account only if they have zero `Pending` or `Accepted` Stay Requests.   | Medium   |

## 4. Owner Rules

| ID             | Rule Description                                                                              | Priority |
| :------------- | :-------------------------------------------------------------------------------------------- | :------- |
| **BR-OWN-001** | An Owner cannot publish any Listings until their identity Verification is `Approved`.         | Critical |
| **BR-OWN-002** | An Owner account can hold multiple Properties and multiple Units.                             | High     |
| **BR-OWN-003** | If an Owner is `Suspended`, all their `Approved` Listings immediately transition to `Hidden`. | Critical |

## 5. Property Rules

| ID             | Rule Description                                                                                     | Priority |
| :------------- | :--------------------------------------------------------------------------------------------------- | :------- |
| **BR-PRP-001** | A Property must belong to exactly one Owner. Ownership cannot be transferred in MVP.                 | High     |
| **BR-PRP-002** | A Property cannot be permanently deleted if it contains any Unit with historical Stay Requests.      | Medium   |
| **BR-PRP-003** | A Property's location (Coordinates) cannot be altered after the Property Verification is `Approved`. | High     |

## 6. Unit Rules

| ID             | Rule Description                                                                             | Priority |
| :------------- | :------------------------------------------------------------------------------------------- | :------- |
| **BR-UNT-001** | A Unit must declare a `GenderRestriction` (`MaleOnly`, `FemaleOnly`, `Mixed`).               | Critical |
| **BR-UNT-002** | A Unit must have an explicit `Capacity` (number of beds).                                    | High     |
| **BR-UNT-003** | If a Unit's `Availability` is set to `Occupied`, new Stay Requests cannot be created for it. | Critical |
| **BR-UNT-004** | A Unit must define its base monthly rent and explicit utility inclusions.                    | High     |

## 7. Listing Rules

| ID             | Rule Description                                                                                                          | Priority |
| :------------- | :------------------------------------------------------------------------------------------------------------------------ | :------- |
| **BR-LST-001** | A Listing is public only if its Status is `Approved`.                                                                     | Critical |
| **BR-LST-002** | A Listing cannot transition to `Approved` unless its parent Property is `Verified` AND the Owner is `Verified`.           | Critical |
| **BR-LST-003** | A Listing must contain a minimum of 4 distinct images to be submitted for Verification.                                   | High     |
| **BR-LST-004** | If an Owner edits a critical field (Price, Gender) of an `Approved` Listing, the status reverts to `PendingVerification`. | High     |

## 8. Stay Request Rules

| ID             | Rule Description                                                                                                          | Priority |
| :------------- | :------------------------------------------------------------------------------------------------------------------------ | :------- |
| **BR-REQ-001** | A Student cannot have more than one active (`Pending` or `Accepted`) Stay Request for the exact same Unit simultaneously. | Critical |
| **BR-REQ-002** | A Stay Request can only be created if the target Unit's Availability is `Available`.                                      | Critical |
| **BR-REQ-003** | An Owner can `Accept` or `Reject` a request only while it is in the `Pending` state.                                      | High     |
| **BR-REQ-004** | A Student can `Cancel` a request only while it is in the `Pending` state.                                                 | High     |
| **BR-REQ-005** | If a request remains `Pending` for 48 hours without Owner action, it automatically transitions to `Expired`.              | Medium   |

## 9. Favorite Rules

| ID             | Rule Description                                                                            | Priority |
| :------------- | :------------------------------------------------------------------------------------------ | :------- |
| **BR-FAV-001** | A Student can Favorite an `Approved` Listing exactly once.                                  | Low      |
| **BR-FAV-002** | If a Listing becomes `Archived`, it is automatically removed from all Student Favorites.    | Low      |
| **BR-FAV-003** | If a Listing becomes `Hidden`, it remains in Favorites but displays an "Unavailable" badge. | Low      |

## 10. Search Rules

| ID             | Rule Description                                                                                        | Priority |
| :------------- | :------------------------------------------------------------------------------------------------------ | :------- |
| **BR-SRC-001** | Only Listings with Status `Approved` AND Unit Availability `Available` appear in public search results. | Critical |
| **BR-SRC-002** | Search results must be filterable by `Distance` relative to a selected University.                      | High     |
| **BR-SRC-003** | Listings with Owners who have a high response rate (>80%) rank higher in default search results.        | Medium   |

## 11. Verification Rules

| ID             | Rule Description                                                                     | Priority |
| :------------- | :----------------------------------------------------------------------------------- | :------- |
| **BR-VER-001** | Owner Verification requires a valid National ID or Passport submission.              | Critical |
| **BR-VER-002** | A Rejected Verification must include a standardized rejection reason from the Admin. | High     |
| **BR-VER-003** | Verifications can only be `Approved` or `Rejected` by a user with the `Admin` role.  | Critical |

## 12. Moderation Rules

| ID             | Rule Description                                                                                                             | Priority |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------- | :------- |
| **BR-MOD-001** | Any Student can flag/report an `Approved` Listing.                                                                           | High     |
| **BR-MOD-002** | If a Listing receives 3 distinct reports within 24 hours, it is automatically transitioned to `Hidden` pending Admin review. | High     |

## 13. Notification Rules

| ID             | Rule Description                                                                                | Priority |
| :------------- | :---------------------------------------------------------------------------------------------- | :------- |
| **BR-NOT-001** | When a Stay Request is created, an SMS/Push notification is immediately triggered to the Owner. | High     |
| **BR-NOT-002** | When a Stay Request is `Accepted`, a Push notification is immediately triggered to the Student. | High     |

## 14. Privacy Rules

| ID             | Rule Description                                                                                                    | Priority |
| :------------- | :------------------------------------------------------------------------------------------------------------------ | :------- |
| **BR-PRV-001** | A Student's phone number is strictly masked from the Owner while a Stay Request is `Pending`.                       | Critical |
| **BR-PRV-002** | A Student's phone number is permanently revealed to the Owner ONLY when the Stay Request transitions to `Accepted`. | Critical |
| **BR-PRV-003** | An Owner's exact phone number is revealed to the Student ONLY when the Stay Request transitions to `Accepted`.      | Critical |

## 15. Authorization Rules (Matrix)

| Action                 | Student | Owner     | Admin | Moderator |
| :--------------------- | :------ | :-------- | :---- | :-------- |
| View Approved Listings | YES     | YES       | YES   | YES       |
| Submit Stay Request    | YES     | NO        | NO    | NO        |
| Manage Unit Pricing    | NO      | YES (Own) | NO    | NO        |
| Accept Stay Request    | NO      | YES (Own) | NO    | NO        |
| Approve Verification   | NO      | NO        | YES   | NO        |
| Hide Listing           | NO      | YES (Own) | YES   | YES       |

## 16. State Transition Rules

### Stay Request State Transitions

| Current State | Action  | Next State  | Allowed By |
| :------------ | :------ | :---------- | :--------- |
| `None`        | Submit  | `Pending`   | Student    |
| `Pending`     | Accept  | `Accepted`  | Owner      |
| `Pending`     | Reject  | `Rejected`  | Owner      |
| `Pending`     | Cancel  | `Cancelled` | Student    |
| `Pending`     | Timeout | `Expired`   | System     |
| `Accepted`    | _None_  | _Terminal_  | -          |

### Listing State Transitions

| Current State         | Action  | Next State            | Allowed By    |
| :-------------------- | :------ | :-------------------- | :------------ |
| `Draft`               | Submit  | `PendingVerification` | Owner         |
| `PendingVerification` | Approve | `Approved`            | Admin         |
| `PendingVerification` | Reject  | `Rejected`            | Admin         |
| `Approved`            | Pause   | `Hidden`              | Owner / Admin |
| `Hidden`              | Resume  | `Approved`            | Owner         |

## 17. Validation Rules (Catalog)

| ID             | Target   | Field         | Rule                                                           |
| :------------- | :------- | :------------ | :------------------------------------------------------------- |
| **BR-VAL-001** | Unit     | `Price`       | Must be an integer > 0 (EGP).                                  |
| **BR-VAL-002** | Listing  | `Images`      | Array length must be >= 4 and <= 15.                           |
| **BR-VAL-003** | Property | `Coordinates` | Must be valid Lat (-90 to 90) and Lng (-180 to 180).           |
| **BR-VAL-004** | User     | `Phone`       | Must match Egyptian mobile regex (e.g., `^01[0125][0-9]{8}$`). |

## 18. Business Constraints

| ID             | Rule Description                                                                                                         | Priority |
| :------------- | :----------------------------------------------------------------------------------------------------------------------- | :------- |
| **BR-CON-001** | Maximum Active Stay Requests: A Student cannot have more than 5 `Pending` requests at the same time (prevents spamming). | High     |
| **BR-CON-002** | Maximum Listings per Owner (MVP): An Individual Owner cannot exceed 10 active listings without Admin exception.          | Medium   |

## 19. Time-Based Rules

| ID             | Rule Description                                                                                              | Priority |
| :------------- | :------------------------------------------------------------------------------------------------------------ | :------- |
| **BR-TIM-001** | SLA Expiration: A `Pending` request automatically expires exactly 48 hours after creation.                    | High     |
| **BR-TIM-002** | Listing Freshness: A Listing not updated or confirmed active by the Owner in 90 days drops in search ranking. | Low      |

## 20. Error Catalog

| Error Code    | Business Error          | Description                          | Recommended User Message                               | HTTP Status       |
| :------------ | :---------------------- | :----------------------------------- | :----------------------------------------------------- | :---------------- |
| `ERR-REQ-001` | Duplicate Stay Request  | Student already requested this unit. | "You already have an active request for this listing." | 409 Conflict      |
| `ERR-REQ-002` | Unit Unavailable        | Target unit is no longer available.  | "Sorry, this unit was just occupied."                  | 400 Bad Req       |
| `ERR-LST-001` | Insufficient Images     | Owner submitted < 4 images.          | "Please upload at least 4 photos."                     | 422 Unproc Entity |
| `ERR-OWN-001` | Unverified Owner Action | Owner tried to publish without ID.   | "You must verify your identity first."                 | 403 Forbidden     |

## 21. Edge Cases & Handling

1. **Owner deleted their account while a Request is `Pending`:** The Request is automatically transitioned to `Cancelled`, and the Student is notified.
2. **Listing is `Archived` by Owner while Admin is reviewing it:** Admin Verification task is cancelled/closed automatically.
3. **Student account is `Suspended` after they `Accepted` a request:** The Request remains `Accepted` (transaction happened offline), but the Owner is notified of the suspension if they view the profile.

## 22. Rule Dependency Matrix

- **Listing Approval (`BR-LST-002`)** depends absolutely on **Owner Verification (`BR-OWN-001`)** and **Property Verification (`BR-PRP-001`)**.
- **Stay Request Creation (`BR-REQ-002`)** depends on **Unit Availability (`BR-UNT-003`)** and **Listing Visibility (`BR-LST-001`)**.

## 23. Rule Priorities

- **Critical:** System integrity or user safety fails without this rule (e.g., Privacy Rules, Verification Dependencies). Must be enforced at the database/API level immediately.
- **High:** Core business value is impacted (e.g., Search visibility, Pricing).
- **Medium:** Operational efficiency (e.g., SLA timeouts).
- **Low:** Nice-to-have UX features (e.g., Favorite syncing).

## 24. Future Rules (Reserved)

The following rules are intentionally deferred to avoid MVP scope creep:

- **Payments:** Rule for holding deposits in escrow.
- **Contracts:** Rule for generating and digitally signing PDF leases.
- **Chat:** Rule allowing in-app messaging only post-acceptance.
- **Roommate Matching:** Rule matching students based on behavioral tags.

## 25. Final Recommendations (Chief Architect Directive)

**The Non-Negotiable Directives:**

1. **Never Trust the Client:** The Frontend/Mobile app is solely a presentation layer. Every rule listed in this document (especially `BR-REQ-001` and `BR-PRV-001`) MUST be enforced strictly by the Backend APIs.
2. **Privacy is Absolute:** `BR-PRV-001` (Phone Number Masking) is the most critical rule in this entire document. If a bug leaks a student's phone number before an Owner accepts the request, the platform's trust model collapses. Treat this field like a password hash.
3. **Audit State Changes:** Every transition in the Stay Request and Listing state machines must be logged in an audit table with a timestamp and the actor ID who initiated the change.
