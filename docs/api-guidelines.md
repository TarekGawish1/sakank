# API Guidelines

## REST Conventions
- Use standard HTTP methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
- Resource names should be plural nouns: `/users`, `/properties`, `/listings`.

## Naming
- Endpoints use kebab-case: `/student-profiles`.
- JSON payloads use camelCase: `{ "firstName": "John" }`.

## Status Codes
- `200 OK`: Successful read or update.
- `201 Created`: Successful creation.
- `204 No Content`: Successful deletion.
- `400 Bad Request`: Validation failure.
- `401 Unauthorized`: Missing or invalid token.
- `403 Forbidden`: Insufficient permissions.
- `404 Not Found`: Resource does not exist.
- `500 Internal Server Error`: Unexpected server issue.

## Validation
- All incoming requests must be validated using `Zod` schemas located in `packages/validation`.
- Validation happens at the route/middleware level.

## Error Format
All errors must return a standardized JSON structure:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": []
  }
}
```

## Pagination, Filtering, Sorting
- **Pagination:** Use query parameters `?page=1&limit=20`.
- **Filtering:** Use exact or partial matches `?cityId=uuid&status=PUBLISHED`.
- **Sorting:** Use `?sort=createdAt:desc`.

## Versioning Strategy
- APIs are versioned in the URL: `/api/v1/...`
- Breaking changes require a new version (e.g., `/api/v2/...`).
