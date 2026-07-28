# 008 — Non-Functional Requirements (NFR)

## 1. Executive Summary

If the Functional Requirements Document (FRD) defines _what_ the system does, the Non-Functional Requirements (NFR) document defines _how well_ it does it. NFRs are the engineering constraints that guarantee Sakank can survive peak traffic (e.g., August housing rush), protect sensitive user data (e.g., female student phone numbers), and run smoothly on low-end Android devices in Egypt under poor network conditions. This document is the definitive contract for Site Reliability Engineers (SRE), Security, and Mobile Architecture.

## 2. Quality Attribute Overview

- **Performance:** Speed and efficiency on both client and server.
- **Scalability:** Ability to handle August/September traffic spikes without degradation.
- **Availability:** Uptime guarantees.
- **Reliability:** Data integrity and error tolerance.
- **Security:** Protection of data at rest and in transit.
- **Privacy:** Strict enforcement of domain privacy rules.
- **Accessibility/Usability:** Ease of use for all demographics.
- **Observability:** Telemetry and logging for fast debugging.
- **Compatibility:** Device and network resilience.

## 3. Performance Requirements

| ID               | Requirement                  | Measurable Target                                                       | Priority |
| :--------------- | :--------------------------- | :---------------------------------------------------------------------- | :------- |
| **NFR-PERF-001** | App Launch Time (Cold Start) | < 2.5 seconds on a mid-range Android (e.g., Samsung A series).          | High     |
| **NFR-PERF-002** | Search API Response Time     | P95 < 200ms for geospatial search within a 5km radius.                  | Critical |
| **NFR-PERF-003** | Listing Details API          | P95 < 150ms.                                                            | High     |
| **NFR-PERF-004** | Image Loading (Thumbnails)   | < 500ms on 4G networks (images must be compressed to WebP/AVIF < 50kb). | High     |
| **NFR-PERF-005** | Image Loading (Gallery)      | < 1.0 second for high-res images (max 300kb per image).                 | Medium   |
| **NFR-PERF-006** | Scroll Performance           | Minimum 60 FPS while scrolling the Search Feed on mid-range devices.    | High     |
| **NFR-PERF-007** | Admin Dashboard Load         | P95 < 1.5 seconds for complex Verification queues.                      | Medium   |
| **NFR-PERF-008** | Battery Consumption          | App must consume < 2% battery per hour of active foreground use.        | Low      |

## 4. Scalability Requirements

_MVP launches for one University, but architecture must support nationwide scale._

| ID              | Requirement            | Measurable Target                                                                     | Priority |
| :-------------- | :--------------------- | :------------------------------------------------------------------------------------ | :------- |
| **NFR-SCA-001** | Concurrent Users (CCU) | Support 5,000 CCU with zero performance degradation.                                  | High     |
| **NFR-SCA-002** | Peak Traffic Handling  | Auto-scale to handle a 5x traffic spike within 2 minutes during August rush.          | Critical |
| **NFR-SCA-003** | Database Connections   | Connection pooling must support 10,000 active concurrent queries.                     | Critical |
| **NFR-SCA-004** | Maximum Image Storage  | Architecture must support storing/serving up to 5,000,000 images seamlessly (S3/CDN). | High     |

## 5. Availability Requirements

| ID              | Requirement          | Measurable Target                                                                     | Priority |
| :-------------- | :------------------- | :------------------------------------------------------------------------------------ | :------- |
| **NFR-AVA-001** | Target Uptime        | 99.9% uptime per month (~43 minutes allowed downtime).                                | Critical |
| **NFR-AVA-002** | Maintenance Windows  | Scheduled downtime must occur between 3:00 AM and 5:00 AM Cairo Time (EET).           | High     |
| **NFR-AVA-003** | Graceful Degradation | If Image CDN fails, the app must display text data and placeholders without crashing. | High     |

## 6. Reliability Requirements

| ID              | Requirement          | Measurable Target                                                                                        | Priority |
| :-------------- | :------------------- | :------------------------------------------------------------------------------------------------------- | :------- |
| **NFR-REL-001** | Mutation Idempotency | All `POST`/`PUT` requests (like Submit Stay Request) must be strictly idempotent using idempotency keys. | Critical |
| **NFR-REL-002** | Database ACID        | 100% ACID compliance on all Core Domain state transitions (Stay Request lifecycle).                      | Critical |
| **NFR-REL-003** | Notification Retry   | Failed SMS/Push notifications must retry exponentially up to 3 times over 15 minutes.                    | Medium   |

## 7. Security Requirements

| ID              | Requirement           | Measurable Target                                                                             | Priority |
| :-------------- | :-------------------- | :-------------------------------------------------------------------------------------------- | :------- |
| **NFR-SEC-001** | Encryption In Transit | 100% of API traffic must use TLS 1.2 or 1.3.                                                  | Critical |
| **NFR-SEC-002** | Encryption At Rest    | Database volumes and S3 buckets must be encrypted (AES-256).                                  | Critical |
| **NFR-SEC-003** | Auth Token Expiry     | JWT/Access tokens must expire in < 1 hour. Refresh tokens must be rotatable.                  | High     |
| **NFR-SEC-004** | Rate Limiting         | Limit OTP requests to 3 per minute per IP/Phone. Limit Stay Requests to 10 per hour per User. | Critical |
| **NFR-SEC-005** | SQLi / XSS Protection | 100% of user input (including Admin panels) must be sanitized and use parameterized queries.  | Critical |

## 8. Privacy Requirements

| ID              | Requirement                | Measurable Target                                                                                                     | Priority |
| :-------------- | :------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :------- |
| **NFR-PRV-001** | Phone Number Masking       | Phone numbers must never leave the backend API response unless the `StayRequest` status is `Accepted`.                | Critical |
| **NFR-PRV-002** | Data Deletion (GDPR/Local) | User deletion request must hard-delete PII within 30 days (while anonymizing historical Stay Requests for analytics). | High     |
| **NFR-PRV-003** | Location Obfuscation       | Property exact coordinates are never shown to unauthenticated users; they see a 200m radius circle.                   | High     |

## 9. Accessibility & Usability Requirements

| ID              | Requirement       | Measurable Target                                                                   | Priority |
| :-------------- | :---------------- | :---------------------------------------------------------------------------------- | :------- |
| **NFR-ACC-001** | Touch Target Size | All interactive UI elements must be at least 48x48 dp.                              | High     |
| **NFR-ACC-002** | Text Scaling      | UI must not break when OS font size is set to 150%.                                 | Medium   |
| **NFR-USE-001** | Click Depth       | A Student must be able to submit a Stay Request within 3 clicks from the Home Feed. | High     |

## 10. Localization Requirements

| ID              | Requirement        | Measurable Target                                                                    | Priority |
| :-------------- | :----------------- | :----------------------------------------------------------------------------------- | :------- |
| **NFR-LOC-001** | RTL Support        | App must flawlessly support Arabic Right-To-Left layout natively.                    | Critical |
| **NFR-LOC-002** | Numbers & Currency | All prices must display as "ج.م" (EGP) formatted with thousands separators natively. | High     |

## 11. Observability Requirements

| ID              | Requirement     | Measurable Target                                                                                     | Priority |
| :-------------- | :-------------- | :---------------------------------------------------------------------------------------------------- | :------- |
| **NFR-OBS-001** | Crash Reporting | 100% of unhandled client exceptions must be logged to a tracker (e.g., Sentry, Firebase Crashlytics). | Critical |
| **NFR-OBS-002** | API Tracing     | Every API request must include a `X-Correlation-ID` header passing through all backend logs.          | High     |
| **NFR-OBS-003** | Health Checks   | Backend must expose a `/health` endpoint responding in < 50ms for Load Balancers.                     | Critical |

## 12. Backup & Recovery Requirements

| ID              | Requirement              | Measurable Target                                                                                   | Priority |
| :-------------- | :----------------------- | :-------------------------------------------------------------------------------------------------- | :------- |
| **NFR-BKP-001** | RPO (Recovery Point Obj) | < 5 minutes of data loss allowed in case of catastrophic database failure (Point-in-Time Recovery). | Critical |
| **NFR-BKP-002** | RTO (Recovery Time Obj)  | < 2 hours to restore total service from backups in a new region/zone.                               | Critical |
| **NFR-BKP-003** | Backup Retention         | Database backups retained for 30 days.                                                              | Medium   |

## 13. Maintainability & Deployment Requirements

| ID              | Requirement          | Measurable Target                                                                         | Priority |
| :-------------- | :------------------- | :---------------------------------------------------------------------------------------- | :------- |
| **NFR-DEP-001** | Environment Parity   | Dev, Staging, and Prod must use identical infrastructure definitions (IaC).               | High     |
| **NFR-DEP-002** | Zero Downtime Deploy | Deployments to Production API must cause 0 dropped requests (Rolling Updates/Blue-Green). | High     |
| **NFR-MNT-001** | Test Coverage        | Core Domain (Stay Request State Machine) must have 100% Unit Test coverage.               | Critical |

## 14. Compatibility Requirements

| ID              | Requirement   | Measurable Target                                                                    | Priority |
| :-------------- | :------------ | :----------------------------------------------------------------------------------- | :------- |
| **NFR-CMP-001** | Android OS    | Support Android 8.0 (API 26) and above.                                              | High     |
| **NFR-CMP-002** | iOS OS        | Support iOS 14.0 and above.                                                          | High     |
| **NFR-CMP-003** | Low Bandwidth | App must successfully load search results on 3G network (< 1 Mbps) within 3 seconds. | High     |

## 15. Monitoring KPIs

- **App Crash-Free Rate:** Target > 99.5%.
- **API Error Rate (HTTP 5xx):** Target < 0.1%.
- **P95 Latency:** Tracked across `/search` and `/stay-requests`.
- **Admin Review Queue Depth:** Alert if queue exceeds 100 pending listings for > 4 hours.

## 16. Non-Functional Constraints (MVP)

- **Infrastructure Budget:** Under $200/month for MVP hosting (utilize managed PaaS like Render, Heroku, or AWS serverless).
- **CDN Dependency:** Images MUST be hosted on a CDN (e.g., Cloudflare, AWS CloudFront); never served directly from the API server.

## 17. Risk Matrix

| Category         | Risk                               | Impact       | Likelihood | Mitigation                                                                 | Owner        |
| :--------------- | :--------------------------------- | :----------- | :--------- | :------------------------------------------------------------------------- | :----------- |
| **Security**     | PII Leak (Phone numbers scraped)   | Catastrophic | Low        | Strict API rate limiting and enforcing `BR-PRV-001` at the database level. | Backend Lead |
| **Performance**  | Image overload crashes client app. | High         | High       | Enforce max resolution upload; generate and serve WebP thumbnails.         | Mobile Lead  |
| **Availability** | Database lock on Stay Requests.    | High         | Medium     | Keep Stay Request transactions strictly bounded to single aggregates.      | DB Architect |

## 18. Validation Strategy

- **Performance Testing:** Use `k6` to simulate 1,000 concurrent searches with geospatial bounding boxes.
- **Security Testing:** Run OWASP ZAP automated scans on Staging API before Production release.
- **Chaos Engineering:** Manually kill a server node during QA load test to verify Load Balancer recovers traffic.
- **Accessibility:** Use Android Accessibility Scanner to ensure minimum touch targets.

## 19. Final Recommendations (CTO Directive)

**What must NEVER be compromised during implementation:**

1. **Idempotency on State Changes:** The `AcceptStayRequest` and `SubmitStayRequest` APIs MUST be idempotent. A user mashing the button on a slow 3G connection must not result in 5 identical requests in the database.
2. **Never Serve Unoptimized Images:** The biggest reason real estate apps fail in Egypt is data consumption. If a user opens Sakank and burns 50MB loading one listing, they will uninstall it immediately. Implement on-the-fly image compression (e.g., Cloudinary, or AWS Serverless Image Handler) from Day 1.
3. **P95 over Average:** Stop looking at Average response times. If the average is 50ms but P95 is 2000ms, 5% of users are having a terrible experience. Optimize for the 95th percentile.
