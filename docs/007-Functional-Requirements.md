# 007 — Functional Requirements (FRD)

## 1. Executive Summary

The Functional Requirements Document (FRD) translates the Business Rules (006) and Domain-Driven Design (005) into specific, testable system behaviors. It defines _what_ the system must do from the user's perspective without dictating _how_ it will be implemented (API or DB schema). This document acts as the definitive contract for engineering and QA. If a feature is not listed here, it is not in the MVP.

## 2. Requirement Format

Each functional requirement adheres to the following structure to ensure testability and traceability. Due to document scale, core P0/P1 requirements are fully detailed, while others are summarized.

| Field                   | Description                                              |
| :---------------------- | :------------------------------------------------------- |
| **ID**                  | Unique identifier (e.g., FR-AUTH-001).                   |
| **Actor**               | Who initiates the action.                                |
| **Pre/Post-conditions** | System state before/after the action.                    |
| **Flow**                | Normal and Alternative flows.                            |
| **Acceptance Criteria** | Pass/Fail conditions for QA.                             |
| **BR Ref & Priority**   | Links to Business Rules (006) and Priority (P0, P1, P2). |

---

## 3. Functional Modules

### 3.1. Authentication & Onboarding

| ID             | FR-AUTH-001: Student Registration via OTP                                                                                      |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| **Actor**      | Unregistered Student                                                                                                           |
| **Pre/Post**   | Pre: App installed. Post: Student account created, Identity aggregate instantiated.                                            |
| **Flow**       | 1. Student enters phone number. 2. System sends OTP. 3. Student enters OTP. 4. System authenticates and requests Profile data. |
| **Alt Flow**   | Invalid OTP: Display error, allow retry.                                                                                       |
| **Acceptance** | System successfully verifies OTP. Phone number is masked and stored. User is redirected to Profile Completion.                 |
| **Refs**       | BR-USR-001 \| **Priority:** P0                                                                                                 |

| ID             | FR-AUTH-002: Profile Completion                                                           |
| :------------- | :---------------------------------------------------------------------------------------- |
| **Actor**      | Authenticated Student                                                                     |
| **Pre/Post**   | Pre: Registered via OTP. Post: Profile aggregate marked as complete.                      |
| **Flow**       | 1. Student selects University from dropdown. 2. Enters Name and Gender. 3. Saves Profile. |
| **Acceptance** | Student cannot browse listings or submit requests until University and Gender are saved.  |
| **Refs**       | BR-USR-002 \| **Priority:** P0                                                            |

### 3.2. Property Discovery (Search)

| ID             | FR-SRC-001: Filtered Home Feed                                                                                                         |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| **Actor**      | Authenticated Student                                                                                                                  |
| **Pre/Post**   | Pre: Profile completed. Post: Display relevant listings.                                                                               |
| **Flow**       | 1. System reads Student's University. 2. System queries `Approved` listings within X radius of University. 3. Displays paginated feed. |
| **Acceptance** | Listings displayed must possess `Approved` status and `Available` availability.                                                        |
| **Refs**       | BR-SRC-001, BR-SRC-002 \| **Priority:** P0                                                                                             |

| ID             | FR-SRC-002: Advanced Search Filters                                                                                                       |
| :------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| **Actor**      | Authenticated Student                                                                                                                     |
| **Flow**       | 1. Student opens filters. 2. Selects `Max Price`, `Gender Restriction`, and `Accommodation Type` (e.g., Single Room). 3. Applies filters. |
| **Acceptance** | Results update in real-time matching exact filter criteria.                                                                               |
| **Refs**       | BR-SRC-001 \| **Priority:** P0                                                                                                            |

### 3.3. Listing Details

| ID             | FR-LST-001: View Listing Details                                                                                                             |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| **Actor**      | Student                                                                                                                                      |
| **Flow**       | 1. Clicks a listing card. 2. Views image gallery (min 4 photos). 3. Views split pricing (Rent + Deposit). 4. Views Owner Verification badge. |
| **Acceptance** | UI explicitly shows if utilities are included. Owner's phone number remains completely hidden.                                               |
| **Refs**       | BR-LST-003, BR-PRV-001 \| **Priority:** P0                                                                                                   |

| ID             | FR-LST-002: Share to WhatsApp                                                               |
| :------------- | :------------------------------------------------------------------------------------------ |
| **Actor**      | Student                                                                                     |
| **Flow**       | 1. Taps "Share". 2. Native OS share sheet opens. 3. Generates public deep-link to Listing.  |
| **Acceptance** | Deep-link opens the Listing details in the app or a basic web view if app is not installed. |
| **Refs**       | User Research (Parent Veto) \| **Priority:** P1                                             |

### 3.4. Stay Requests

| ID             | FR-REQ-001: Submit Stay Request                                                                                    |
| :------------- | :----------------------------------------------------------------------------------------------------------------- |
| **Actor**      | Student                                                                                                            |
| **Pre/Post**   | Pre: Less than 5 active requests. Post: StayRequest created in `Pending` state.                                    |
| **Flow**       | 1. Taps "Request to Stay". 2. Confirms intent in modal. 3. System creates Request, triggers notification to Owner. |
| **Alt Flow**   | Duplicate Request: System blocks creation and shows ERR-REQ-001.                                                   |
| **Acceptance** | Request appears in Student's "My Requests" tab as `Pending`. Student phone number remains hidden.                  |
| **Refs**       | BR-REQ-001, BR-REQ-002, BR-CON-001, BR-PRV-001 \| **Priority:** P0                                                 |

| ID             | FR-REQ-002: Owner Accepts Request                                                                                                     |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| **Actor**      | Owner                                                                                                                                 |
| **Pre/Post**   | Pre: Request is `Pending`. Post: Request is `Accepted`.                                                                               |
| **Flow**       | 1. Owner views Pending Request. 2. Taps "Accept". 3. System unlocks Student phone number. 4. System triggers notification to Student. |
| **Acceptance** | Student receives Owner's phone number. Owner receives Student's phone number.                                                         |
| **Refs**       | BR-REQ-003, BR-PRV-002, BR-PRV-003 \| **Priority:** P0                                                                                |

### 3.5. Favorites

| ID             | FR-FAV-001: Toggle Favorite                                                                         |
| :------------- | :-------------------------------------------------------------------------------------------------- |
| **Actor**      | Student                                                                                             |
| **Flow**       | 1. Taps heart icon on Listing. 2. Listing is saved to "Favorites" tab. 3. Tapping again removes it. |
| **Acceptance** | Favorites persist across app sessions.                                                              |
| **Refs**       | BR-FAV-001 \| **Priority:** P1                                                                      |

### 3.6. Verification & Moderation

| ID             | FR-VER-001: Owner ID Submission                                                             |
| :------------- | :------------------------------------------------------------------------------------------ |
| **Actor**      | Owner                                                                                       |
| **Flow**       | 1. Owner uploads National ID photo. 2. Status changes to `Pending`. 3. System alerts Admin. |
| **Acceptance** | Owner cannot publish listings until Admin explicitly approves this ID.                      |
| **Refs**       | BR-OWN-001, BR-VER-001 \| **Priority:** P0                                                  |

| ID             | FR-MOD-001: Report Listing                                                          |
| :------------- | :---------------------------------------------------------------------------------- |
| **Actor**      | Student                                                                             |
| **Flow**       | 1. Selects "Report". 2. Chooses reason (e.g., Scam, Broker Fee). 3. Submits report. |
| **Acceptance** | Report appears in Admin Dashboard. If 3 reports hit, listing auto-hides.            |
| **Refs**       | BR-MOD-001, BR-MOD-002 \| **Priority:** P1                                          |

### 3.7. Admin Panel

| ID             | FR-ADM-001: Verification Queue                                                                                        |
| :------------- | :-------------------------------------------------------------------------------------------------------------------- |
| **Actor**      | Admin                                                                                                                 |
| **Flow**       | 1. Admin logs into web dashboard. 2. Views pending Owner and Property verifications. 3. Clicks "Approve" or "Reject". |
| **Acceptance** | Approval instantly allows Owner to publish. Rejection requires text reason.                                           |
| **Refs**       | BR-VER-003 \| **Priority:** P0                                                                                        |

---

## 4. Cross-Module Functional Requirements

1. **Search & Verification Sync:** If an Admin revokes an Owner's Verification status, all associated Listings must instantly disappear from the public Search module.
2. **Availability Sync:** If an Owner manually changes a Unit's Availability to `Occupied`, the system must prevent any new Stay Requests from being created for that unit via the Listing Details module.

## 5. Functional Constraints

- **Maximum Active Stay Requests:** Hardcapped at 5 per Student (prevents spamming Owners).
- **Maximum Listings:** Individual Owners are capped at 10 active listings.
- **Image Upload Limits:** Minimum 4, Maximum 15 images per Listing. Max file size 5MB per image.

## 6. Traceability Matrix

| Functional Requirement    | Business Rule | DDD Aggregate  | Persona Driven By      | UX Research Insight          |
| :------------------------ | :------------ | :------------- | :--------------------- | :--------------------------- |
| `FR-AUTH-001` (OTP Auth)  | `BR-USR-001`  | `Student`      | All                    | Facebook fake accounts       |
| `FR-SRC-002` (Filters)    | `BR-SRC-001`  | `Listing`      | Budget Hunter          | Focus on Price/Distance      |
| `FR-LST-002` (Share)      | N/A (UX Rule) | `Listing`      | Group Seeker / Parents | The "Parent Veto"            |
| `FR-REQ-001` (Create Req) | `BR-REQ-001`  | `Stay Request` | Urgent Searcher        | Need direct, fast connection |
| `FR-REQ-002` (Accept Req) | `BR-PRV-002`  | `Stay Request` | Safety-First           | Absolute Privacy by Default  |
| `FR-VER-001` (ID Upload)  | `BR-OWN-001`  | `Verification` | Safety-First           | The Verification Monopoly    |

## 7. Out of Scope (MVP)

The following features are intentionally excluded to ensure a fast, lean MVP launch:

- **Payments:** No rent collection, no escrow, no wallet system.
- **Booking / Contracts:** No digital signature or binding agreements.
- **Chat:** No in-app messaging. All post-acceptance communication occurs via phone/WhatsApp.
- **Roommate Matching:** No algorithms to pair students based on personality.
- **AI Recommendations:** Simple spatial and filtered search only.

## 8. Functional Priorities

- **P0 (Must Have):** Core Lead Generation Loop. Auth, Verification, Listing Creation, Search, Stay Request submission/acceptance, Admin Panel. _Without these, the product does not function._
- **P1 (Should Have):** Trust & UX Enhancers. Favorites, Share to WhatsApp, Report Listing, SMS Notifications. _Required for PMF, but can launch Beta without them._
- **P2 (Nice to Have):** Advanced Filters, Push Notifications, Analytics Dashboards. _Fast follows post-launch._

## 9. MVP Launch Checklist

- [ ] Student Auth & Profile (P0)
- [ ] Owner Auth & ID Upload (P0)
- [ ] Property & Listing Creation Flow (P0)
- [ ] Admin Approval Dashboard (P0)
- [ ] Map-based / Distance Search (P0)
- [ ] Stay Request State Machine (Pending -> Accept/Reject) (P0)
- [ ] Privacy Masking of Phone Numbers (P0)

## 10. Final Recommendations (Head of Product Directive)

**What must NEVER be increased before PMF:**
If engineering finishes the P0 and P1 checklist early, **do not** start building In-App Chat or Payment Gateways. Instead, invest that time in making the P0 features flawlessly fast and bug-free.
_Specifically, lock the scope on the Stay Request flow._ It must be as simple as a Tinder swipe. If we add complex negotiation steps, chat systems, or contract uploading to the MVP, we will delay launch by 3 months and confuse the users. Focus 100% on generating the _Lead_ and let the users handle the rest offline.
