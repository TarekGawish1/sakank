# Sakank Authentication Module Architecture

This document serves as the implementation roadmap and architectural foundation for the Authentication module. It outlines the flows, required services, environments, dependencies, and APIs without implementing them yet.

## 1. Authentication Flow

Sakank uses a passwordless authentication model based on Phone OTP via Firebase, coupled with stateless JWTs (JSON Web Tokens) for API authorization.

### OTP Flow (Firebase)
1. **Client Request**: The mobile app requests a verification code using Firebase Phone Auth.
2. **Firebase Action**: Firebase sends an SMS to the provided phone number.
3. **Verification**: The user enters the OTP in the mobile app.
4. **Firebase Token**: If successful, Firebase returns a short-lived ID Token (`firebaseToken`) to the mobile app.

### Authentication Lifecycle & JWT Flow
1. **Login API Call**: The mobile app sends the `firebaseToken` to the Sakank Backend (`POST /auth/login`).
2. **Token Verification**: The backend verifies the `firebaseToken` using the Firebase Admin SDK.
3. **User Resolution**: 
   - Extract the `phoneNumber` from the decoded token.
   - Query the `User` database table for this `phoneNumber`.
   - **User Registration Flow (New User)**: If the user doesn't exist, create a new `User` record, issue tokens, and mark them as needing profile completion.
   - **Existing User Flow**: If the user exists, retrieve their `id` and `role`.
4. **Token Generation**: The backend generates a short-lived **Access Token** (e.g., 15 mins) and a long-lived **Refresh Token** (e.g., 7 days).
5. **Response**: Tokens are returned to the client.

### Refresh Token Strategy
- The client stores the Refresh Token securely.
- When the Access Token expires (HTTP 401), the client calls `POST /auth/refresh` with the Refresh Token.
- The backend verifies the Refresh Token, ensures it hasn't been revoked, and issues a new Access Token.

### Logout Flow
- The client calls `POST /auth/logout` (optional, can clear refresh token from database/Redis if tracked).
- The client deletes both tokens locally.

### Token Expiration Strategy
- **Access Token**: 15 minutes. Very short-lived to minimize the risk of stolen tokens.
- **Refresh Token**: 7 days. Allows users to stay logged in without needing a new OTP every time.

## 2. Security Considerations
- **Firebase Token Validation**: Never trust the client. Always verify the `firebaseToken` signature with Firebase Admin SDK.
- **JWT Secrets**: The `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` must be cryptographically secure strings and strictly separated.
- **Payload Minimization**: JWT payloads should only contain necessary claims (e.g., `userId`, `role`) to prevent exposing sensitive data like PII.
- **Rate Limiting**: Critical for the login/verification endpoints to prevent DoS attacks or excessive verification requests (even though Firebase handles SMS rate limits, the backend verification must also be protected).

## 3. Required Infrastructure

### Firebase Services
- Firebase Authentication (Phone Sign-In enabled).
- Firebase Admin SDK (Service Account Key for backend verification).

### Environment Variables
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `JWT_ACCESS_EXPIRATION` (e.g., `15m`)
- `JWT_REFRESH_EXPIRATION` (e.g., `7d`)

### Dependencies
- `firebase-admin`
- `jsonwebtoken`
- `@types/jsonwebtoken`

### Database Tables (Defined in Database Design)
- `User` (id, phoneNumber, role, createdAt, deletedAt, version)

## 4. Required Middleware
- **requireAuth**: Verifies the Access Token and injects `req.user`.
- **requireRole(roles[])**: Ensures `req.user.role` matches allowed roles (e.g., `ADMIN`, `OWNER`).

## 5. Implementation Roadmap: API Endpoints

### 5.1 Login Endpoint
- **Method**: `POST`
- **Path**: `/auth/login`
- **Description**: Verifies Firebase token and issues JWTs.
- **Request Body**:
  ```json
  {
    "firebaseToken": "string (required)"
  }
  ```
- **Response (200 OK - Existing User / 201 Created - New User)**:
  ```json
  {
    "success": true,
    "data": {
      "accessToken": "eyJhbG...",
      "refreshToken": "eyJhbG...",
      "user": {
        "id": "uuid",
        "role": "STUDENT",
        "isNewUser": false
      }
    },
    "meta": null,
    "error": null
  }
  ```
- **Error Codes**: `400 Bad Request` (Invalid payload), `401 Unauthorized` (Invalid Firebase Token).

### 5.2 Refresh Token Endpoint
- **Method**: `POST`
- **Path**: `/auth/refresh`
- **Description**: Issues a new access token using a valid refresh token.
- **Request Body**:
  ```json
  {
    "refreshToken": "string (required)"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "accessToken": "eyJhbG..."
    },
    "meta": null,
    "error": null
  }
  ```
- **Error Codes**: `400 Bad Request`, `401 Unauthorized` (Invalid/Expired Refresh Token).

### 5.3 Logout Endpoint
- **Method**: `POST`
- **Path**: `/auth/logout`
- **Description**: Logs out the user (revokes refresh token if stateful).
- **Request Body**:
  ```json
  {
    "refreshToken": "string (optional)"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": null,
    "meta": null,
    "error": null
  }
  ```

## 6. Required Validation Rules (Zod)
- `loginSchema`: Validates `firebaseToken` is a non-empty string.
- `refreshSchema`: Validates `refreshToken` is a non-empty string.
