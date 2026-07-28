# 015 — API Specification

## 1. Executive Summary

This document defines the REST API contract for Sakank. It is the definitive communication standard between the Mobile application, Admin dashboard, and the Node.js/Express.js Backend. Our API philosophy is built on predictability: every endpoint follows strict REST conventions, utilizes a unified response format, and ensures forward compatibility through explicit versioning. This document is structurally prepared for seamless translation into an OpenAPI 3.0 (Swagger) specification.

## 2. Global Standards

- **Base URL:** `https://api.sakank.com`
- **Versioning:** URI prefix strategy. Current version is `v1`. Example: `/api/v1/listings`.
- **Content-Type:** Strictly `application/json` for all requests and responses, except for file uploads (`multipart/form-data`).
- **Authentication:** `Authorization: Bearer <JWT>` header required for protected routes.
- **Timezone:** All timestamps are ISO 8601 strings in UTC (e.g., `2026-08-15T14:30:00Z`).
- **Language:** Localization via `Accept-Language: ar-EG` header. Error messages and dynamic enum translations default to Arabic.
- **Idempotency:** `POST`, `PUT`, `PATCH`, and `DELETE` requests that mutate critical state (e.g., Stay Requests) must accept an `Idempotency-Key` header.
- **Request IDs:** The API generates and returns an `X-Request-ID` header on every response for exact log tracing in Kibana/Datadog.

## 3. Unified Response Format

Every endpoint (Success or Error) strictly adheres to the following wrapper. This prevents frontend parsing logic from branching unnecessarily.

### 3.1. Success Response (20x)

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  },
  "error": null
}
```

### 3.2. Error Response (40x, 50x)

```json
{
  "success": false,
  "data": null,
  "meta": null,
  "error": {
    "code": "REQ_001",
    "message": "You already have an active request for this listing.",
    "details": [{ "field": "listingId", "issue": "Duplicate active request found." }]
  }
}
```

## 4. API Endpoints

### 4.1. Authentication APIs

| Method | Endpoint                   | Description                                              | Auth   |
| :----- | :------------------------- | :------------------------------------------------------- | :----- |
| `POST` | `/api/v1/auth/otp/request` | Requests a Firebase OTP via phone number.                | None   |
| `POST` | `/api/v1/auth/otp/verify`  | Exchanges Firebase token for Sakank Access/Refresh JWTs. | None   |
| `POST` | `/api/v1/auth/refresh`     | Issues a new Access JWT using the Refresh token.         | None   |
| `POST` | `/api/v1/auth/logout`      | Invalidates the Refresh token.                           | Bearer |
| `GET`  | `/api/v1/auth/me`          | Retrieves the current user's profile and roles.          | Bearer |

### 4.2. Student & Profile APIs

| Method | Endpoint                  | Description                                                | Auth   |
| :----- | :------------------------ | :--------------------------------------------------------- | :----- |
| `PUT`  | `/api/v1/profile/student` | Completes or updates the student profile (Gender, Uni).    | Bearer |
| `POST` | `/api/v1/profile/avatar`  | Generates a presigned Cloudflare R2 URL for avatar upload. | Bearer |
| `GET`  | `/api/v1/universities`    | Lists supported universities for the dropdown.             | None   |

### 4.3. Listing APIs

| Method | Endpoint                       | Description                                              | Auth   |
| :----- | :----------------------------- | :------------------------------------------------------- | :----- |
| `GET`  | `/api/v1/listings`             | Fetches the paginated Home Feed (supports Filters/Sort). | Bearer |
| `GET`  | `/api/v1/listings/:id`         | Fetches full Listing details.                            | Bearer |
| `GET`  | `/api/v1/listings/:id/related` | Fetches 3 nearby listings.                               | Bearer |
| `POST` | `/api/v1/favorites/:listingId` | Toggles a listing in the Student's favorites.            | Bearer |
| `GET`  | `/api/v1/favorites`            | Lists saved listings.                                    | Bearer |

### 4.4. Stay Request APIs

| Method | Endpoint                           | Description                                                     | Auth   |
| :----- | :--------------------------------- | :-------------------------------------------------------------- | :----- |
| `POST` | `/api/v1/stay-requests`            | Submits a request for a Unit. Body: `{ listingId }`             | Bearer |
| `GET`  | `/api/v1/stay-requests`            | Lists active/past requests for the Student or Owner.            | Bearer |
| `GET`  | `/api/v1/stay-requests/:id`        | Fetches specific request details (and Owner Phone if accepted). | Bearer |
| `POST` | `/api/v1/stay-requests/:id/accept` | Owner only: Transitions request to `ACCEPTED`.                  | Bearer |
| `POST` | `/api/v1/stay-requests/:id/reject` | Owner only: Transitions request to `REJECTED`.                  | Bearer |
| `POST` | `/api/v1/stay-requests/:id/cancel` | Student only: Transitions request to `CANCELLED`.               | Bearer |

### 4.5. Notification APIs

| Method  | Endpoint                         | Description                             | Auth   |
| :------ | :------------------------------- | :-------------------------------------- | :----- |
| `GET`   | `/api/v1/notifications`          | Lists paginated notifications.          | Bearer |
| `PATCH` | `/api/v1/notifications/:id/read` | Marks a single notification as read.    | Bearer |
| `PATCH` | `/api/v1/notifications/read-all` | Marks all as read.                      | Bearer |
| `GET`   | `/api/v1/notifications/unread`   | Returns integer count of unread alerts. | Bearer |

### 4.6. Trust & Verification APIs

| Method | Endpoint                      | Description                                 | Auth   |
| :----- | :---------------------------- | :------------------------------------------ | :----- |
| `POST` | `/api/v1/verification`        | Submits National ID for Owner verification. | Bearer |
| `GET`  | `/api/v1/verification/status` | Returns current Verification status.        | Bearer |

### 4.7. Admin APIs

_All routes strictly require `Admin` role JWT._

| Method | Endpoint                                  | Description                             | Auth  |
| :----- | :---------------------------------------- | :-------------------------------------- | :---- |
| `GET`  | `/api/v1/admin/verifications`             | Lists pending verifications.            | Admin |
| `POST` | `/api/v1/admin/verifications/:id/approve` | Approves Owner verification.            | Admin |
| `POST` | `/api/v1/admin/verifications/:id/reject`  | Rejects Owner verification with reason. | Admin |
| `GET`  | `/api/v1/admin/reports`                   | Lists listings flagged by students.     | Admin |
| `POST` | `/api/v1/admin/listings/:id/hide`         | Force-hides a listing.                  | Admin |

## 5. Query Standards (Pagination & Filtering)

- **Cursor Pagination:** Preferred for feeds (`/listings?cursor=uuid-123&limit=20`).
- **Offset Pagination:** Accepted for Admin tables (`/admin/users?page=2&limit=50`).
- **Filtering:** Use standard query parameters. Multi-values use commas.
  - `GET /listings?gender=FEMALE_ONLY&maxPrice=3000&amenities=WIFI,AC`
- **Sorting:** Use `sort` parameter. Prefix with `-` for descending.
  - `GET /listings?sort=-createdAt`

## 6. Validation Rules

- **Request Validation (Zod):** Occurs at the Express Middleware layer. If `req.body` violates schema, immediately return 400 Bad Request with `error.details`. The Controller is never reached.
- **Business Validation:** Occurs at the Service layer (e.g., checking if Unit is `Available`). Throws a custom `AppError` caught by the global error handler.
- **Authorization Validation:** Occurs at the Middleware layer (e.g., comparing `req.user.id` against the resource owner). Returns 403 Forbidden.

## 7. Error Catalog

| Code       | HTTP Status | Description                             | Recovery Suggestion                       |
| :--------- | :---------- | :-------------------------------------- | :---------------------------------------- |
| `AUTH_001` | 401         | Invalid or expired Access Token.        | Client must call `/auth/refresh`.         |
| `AUTH_002` | 403         | User is Suspended.                      | Contact support.                          |
| `REQ_001`  | 409         | Duplicate Stay Request for Unit.        | Wait for owner response or cancel.        |
| `REQ_002`  | 400         | Unit is no longer Available.            | Refresh feed and select another unit.     |
| `LST_001`  | 403         | Attempt to publish without Approved ID. | Go to Verification Center.                |
| `VAL_001`  | 400         | Zod schema validation failed.           | Check `error.details` for missing fields. |
| `SYS_500`  | 500         | Unhandled internal exception.           | Try again later. (Logged to Sentry).      |

## 8. Security

- **JWT Storage:** Mobile uses Secure Storage. Future Web Admin uses `HttpOnly` Secure cookies to prevent XSS.
- **RBAC:** Admin endpoints require the `ADMIN` role embedded in the JWT payload.
- **Data Obfuscation:** The `/api/v1/listings/:id` response strictly omits the `Owner.phoneNumber` field. The phone number is only attached to the `/api/v1/stay-requests/:id` response _if_ the `status === ACCEPTED`.
- **Output Sanitization:** All user-generated text (descriptions, names) must be sanitized before being returned by the API to prevent XSS on the client.

## 9. Performance

- **Compression:** Enable gzip/brotli compression globally in Express.
- **Caching:** Enable `Cache-Control` headers for immutable data (e.g., `/universities`). Do NOT cache `/stay-requests`.
- **Image URLs:** The API never returns raw binary images. It returns Cloudflare R2 CDN URLs.

## 10. API Lifecycle & Documentation

- **Lifecycle:** All APIs documented here are considered `Stable` (v1).
- **Documentation Standard:** The API will be documented using **OpenAPI 3.0**. The specification will be generated from code (e.g., `tsoa` or `zod-openapi`) rather than maintained manually in YAML, ensuring the docs never drift from the implementation.

## 11. Traceability

| API Group        | Bounded Context (DDD) | Business Rules (BR)    | Funct. Req (FR) |
| :--------------- | :-------------------- | :--------------------- | :-------------- |
| `/auth`          | Identity Context      | BR-USR-001             | FR-AUTH-001     |
| `/listings`      | Property Catalog      | BR-LST-001, BR-SRC-001 | FR-SRC-001      |
| `/stay-requests` | Matching Context      | BR-REQ-001, BR-REQ-002 | FR-REQ-001, 002 |
| `/verification`  | Trust Context         | BR-OWN-001, BR-VER-001 | FR-VER-001      |

## 12. Future APIs (Reserved)

The following URI namespaces are reserved for Post-MVP features. Do not use them.

- `/api/v1/payments/*` (Stripe/Fawry Webhooks)
- `/api/v1/contracts/*` (PDF Generation)
- `/api/v1/messages/*` (WebSockets/Chat)
- `/api/v1/reviews/*` (Rating properties)

## 13. Final Recommendations (Principal API Architect Directive)

**The Non-Negotiable Directives:**

1. **Never Break the Response Contract:** The `{ success, data, meta, error }` wrapper is sacred. If you throw an error in Node.js, the global error handler MUST format it into this shape. If you return a 500 HTML page from Express, the mobile app will crash.
2. **Never Trust the Client:** Do not trust IDs sent in the body if they can be inferred from the JWT. (e.g., When creating a Stay Request, pull `studentId` from `req.user.id`, NOT `req.body.studentId`).
3. **Over-Fetching is a Bug:** Use Prisma `select` to return exactly what the Mobile UI needs. Returning a 50-field User object when the UI only needs `name` and `avatar` wastes bandwidth and risks exposing PII.
