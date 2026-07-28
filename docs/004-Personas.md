# 004 — Personas

## 1. Executive Summary

Traditional marketing personas (e.g., "Ahmed, 19, loves football") are useless for product development. In a high-stakes, low-trust marketplace like student accommodation, what matters is _behavior, urgency, and constraints_. This document establishes behavior-based personas for Sakank. These profiles directly dictate how our search algorithms rank results, which filters are prominently displayed, how notifications are triggered, and how we design the core Stay Request flow. By designing for specific behaviors rather than abstract demographics, Sakank ensures the MVP solves real friction points.

## 2. Persona Design Principles

- **Behavior over Demographics:** We care about _why_ a user is searching (e.g., urgency vs. budget) rather than their age or faculty.
- **Goals over Personality:** We focus on what the user is trying to achieve within a specific session.
- **Needs over Assumptions:** Every persona trait must map directly to a UX/UI requirement.
- **Actions over Fiction:** No fictional backstories. If a trait doesn't influence a database column, API design, or UI component, it is excluded.

## 3. Primary Personas (Demand Side)

### 3.1. The Urgent Searcher

_A student who needs accommodation within the next 48-72 hours due to late admission or a sudden housing collapse._

- **Goals:** Find an available bed/room instantly and move in tomorrow.
- **Pain Points:** Waiting days for an owner to reply; viewing properties that are already rented.
- **Decision Speed:** Extremely fast (minutes/hours).
- **Risk Tolerance:** High (willing to compromise on quality/distance if available now).
- **Search Behavior:** Sorts by "Available Now" and looks for "Fast Responder" owners.
- **Trust Signals:** Recent activity status of the owner ("Active 1 hour ago").
- **Product Expectations:** Real-time availability; instant contact post-acceptance.
- **UX Implications:** Need a prominent "Available Immediately" toggle.
- **Business Implications:** SLA for Owner response time is critical to capture this segment.
- **Success Metrics:** Time from app open to Accepted Stay Request.

### 3.2. The Budget Hunter

_A student with a strictly capped monthly allowance._

- **Price Sensitivity:** Extreme. Every 100 EGP matters.
- **Trade-offs:** Will accept longer commutes or shared rooms for lower rent.
- **Filters Used:** Max Price, Shared Room, Distance (to calculate transport cost).
- **Decision Factors:** Total cost of living (Rent + Utilities + Commute).
- **UX Implications:** Must explicitly display what is included (Water, Electricity, Wi-Fi) on the listing card. No hidden fees.

### 3.3. The Safety-First Student (Often Female)

_Prioritizes security, verified neighbors, and clear house rules over price or luxury._

- **Goals:** Zero risk of scams, harassment, or unsafe neighborhoods.
- **Pain Points:** Vague listings, unverified owners, mixed-gender buildings.
- **Decision Speed:** Slow. High scrutiny of photos and rules.
- **Search Behavior:** Reads all text; looks for "Female Only" and "Verified Owner" badges.
- **Trust Signals:** Verified badges, clear photos of building exterior and locks, detailed house rules.
- **Product Expectations:** Absolute privacy of personal phone number until request is accepted.
- **UX Implications:** "Female Only" must be a top-level, highly visible filter. "Verified" UI must be dominant.

### 3.4. The Group Seeker

_A group of 3-4 friends wanting to rent an entire apartment together._

- **Goals:** Find high-capacity units (Full Apartments) rather than single beds.
- **Pain Points:** Finding owners willing to rent to a group of students; splitting rent.
- **Shared Decision Making:** One person searches, but all must approve.
- **Search Behavior:** Filters for "Entire Apartment" and "3+ Bedrooms".
- **UX Implications:** Must have a native "Share to WhatsApp" button for easy group consensus.

### 3.5. The Out-of-City / International Student

_Cannot physically visit the property before moving in._

- **Goals:** Secure housing remotely with 100% confidence.
- **Pain Points:** Bait-and-switch scams; arriving in Cairo to find the apartment doesn't exist.
- **Trust Signals:** Video tours, verified map locations, detailed amenity lists.
- **Product Expectations:** What they see on the app must be legally guaranteed to be what they get.
- **UX Implications:** Minimum photo count enforcement for Owners. Map view is critical for orientation.

## 4. Secondary Personas (Supply Side & Internal)

| Persona              | Goals                                 | Workflow                                           | Pain Points                                  | System Needs (UX/DDD)                                              |
| :------------------- | :------------------------------------ | :------------------------------------------------- | :------------------------------------------- | :----------------------------------------------------------------- |
| **Individual Owner** | Fill vacancy fast with good students. | Uploads photos, sets price, waits for leads.       | Wasting time on unqualified leads.           | Simple property creation form; 1-click Accept/Reject for requests. |
| **Dorm Operator**    | Maintain 100% occupancy at scale.     | Manages 50+ beds simultaneously.                   | Updating availability manually for each bed. | Bulk inventory management (future dashboard feature).              |
| **Admin**            | Ensure zero scams on the platform.    | Reviews new listings, checks IDs, handles reports. | High manual workload during peak season.     | Efficient approval dashboard; fast image loading; one-click ban.   |
| **Moderator**        | Resolve user disputes/reports.        | Reviews "Report Listing" tickets.                  | Lack of context on reported issues.          | Admin view of Student-Owner interaction history.                   |

## 5. Decision Influencers

_Users who never log in, but dictate product success._

- **The Parent (The Wallet):** Cares only about safety, price, and proximity. Will veto any property that looks shady. _UX Impact:_ Listings must look professional and shareable via a simple web link that doesn't require downloading the app.
- **The Senior Friend:** Cares about neighborhood reputation (e.g., "Don't live in District X, transport is bad"). _UX Impact:_ Need clear neighborhood boundaries and accurate map pins.

## 6. Persona Comparison Matrix

| Persona             | Urgency | Budget | Trust Need   | Tech Comfort | Share Likelihood   | Visit Before Decision? |
| :------------------ | :------ | :----- | :----------- | :----------- | :----------------- | :--------------------- |
| **Urgent Searcher** | High    | Medium | Low          | High         | Low                | No (No time)           |
| **Budget Hunter**   | Low     | Low    | Medium       | High         | Medium             | Yes                    |
| **Safety-First**    | Low     | High   | **Critical** | Medium       | High (Parents)     | Yes (With Parent)      |
| **Group Seeker**    | Medium  | Medium | Medium       | High         | **High (Friends)** | Yes                    |
| **Out-of-City**     | High    | High   | **Critical** | High         | Medium             | **No (Cannot)**        |

## 7. Product Impact Matrix

| Feature             | Impacted By                 | Resulting Product Decision                                                   |
| :------------------ | :-------------------------- | :--------------------------------------------------------------------------- |
| **Search/Filters**  | Safety-First, Budget Hunter | Top filters must be: Distance, Max Price, Gender Rule, Accommodation Type.   |
| **Listing Details** | Budget Hunter               | Must split pricing: Rent vs. Deposit vs. Utilities.                          |
| **Stay Request**    | Urgent Searcher             | Must show Owner's average response time to manage expectations.              |
| **Favorites**       | Group Seeker                | Must allow saving multiple properties for later comparison.                  |
| **Notifications**   | Urgent Searcher             | Push/SMS notifications for Owners to ensure fast response times.             |
| **Verification**    | Out-of-City                 | Visual "Shield" icon on verified listings to substitute for physical visits. |

## 8. Anti-Personas (Who Sakank is NOT for)

If we build features for these users, the product will fail.

- **Tourists / Short-Term Visitors:** Looking for 3-day stays. _Why banned:_ Distorts pricing, ruins community trust, turns Sakank into an illegal hotel platform.
- **Families Buying Homes:** Looking for permanent real estate. _Why banned:_ Clutters search results, completely different feature set required (mortgages, deeds).
- **Unverified Brokers:** Looking to scrape leads and charge commissions. _Why banned:_ Destroys the "Trust" value proposition.

## 9. Edge Cases

- **Female Student Living Alone:** Highest safety risk. _Product Implication:_ Must ensure exact unit number/floor is hidden from public view until the Stay Request is Accepted.
- **Student with Physical Disability:** Needs elevator/ground floor. _Product Implication:_ "Elevator" must be a explicit Amenity toggle.
- **Late Semester Transfer:** Needs housing in November (off-peak). _Product Implication:_ Availability status must be easy for Owners to update mid-year.

## 10. Prioritization

1. **Tier 1 (Core Focus for MVP):** Safety-First Student, Budget Hunter, Individual Owner. _Reasoning:_ These represent 80% of the Egyptian market. If we solve trust and price transparency, we win.
2. **Tier 2:** Urgent Searcher, Group Seeker. _Reasoning:_ Important for peak season, but requires features like fast-response SLAs and sharing tools.
3. **Tier 3:** Out-of-City Student, Dorm Operator. _Reasoning:_ High value, but smaller volume or requires complex B2B dashboards.

## 11. Future Personas (Post-MVP)

- **Roommate Matcher:** Student looking for a person, not a place. (Requires personality profiling algorithms).
- **University Housing Officer:** Admin looking to place 50 scholarship students. (Requires B2B bulk booking).
- **Maintenance Provider:** Plumber/Electrician fixing issues in verified properties. (Requires gig-economy workflow).

## 12. Final Recommendations (Head of UX Directive)

**Lock these product decisions before design begins:**

1. **The "Share" Button is a Core Action:** Because Parents and Groups make decisions collaboratively, the "Share" button must be as prominent as "Favorite" on the Listing screen.
2. **Mandatory Structured Amenities:** Owners cannot type amenities in a free-text description. They must check boxes (Wi-Fi, AC, Bills Included). This protects the Budget Hunter and Safety-First student.
3. **Privacy by Default:** Because of the Safety-First persona, a Student's phone number is NEVER visible to the Owner until the Owner explicitly Accepts the Stay Request.
4. **Availability Status is Sacred:** To support the Urgent Searcher, if an Owner accepts a request, the system must prompt them: "Is this unit now fully occupied?" to automatically remove stale listings.
