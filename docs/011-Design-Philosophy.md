# 011 — Design Philosophy

## 1. Executive Summary

A Design System dictates _what_ a button looks like; a Design Philosophy dictates _why_ that button exists. In a low-trust market like student accommodation in Egypt, design is our primary vehicle for establishing credibility. Users will not upload their National IDs or trust us to find them safe housing if the app feels chaotic, cheap, or confusing. This document establishes the foundational design values that must guide every UX decision, UI component, and microcopy string in Sakank.

## 2. Design Vision

**"If Apple designed a student accommodation platform for Egypt."**
Sakank must feel premium, invisible, and deeply reassuring. The interface should step out of the way and let the content—the photos, the pricing, the location—do the talking. We do not use loud colors to scream for attention. We do not use pop-ups to force engagement. We use calmness to project confidence. Sakank is the quiet, reliable concierge that handles the chaos of Cairo's housing market so the student doesn't have to.

## 3. Core Principles

- **Content before Decoration:** If a visual element doesn't help the user make a housing decision, remove it.
- **One Primary Action:** Every screen must have exactly one obvious next step (e.g., "Request to Stay" or "Save Profile").
- **Whitespace is a Feature:** Negative space is not "empty" space. It is the breathing room that prevents cognitive overload and creates a premium feel.
- **Trust through Simplicity:** Complex forms look suspicious. Simple, bite-sized interactions feel secure.
- **Consistency over Creativity:** Do not reinvent the wheel for standard interactions (like navigation or search). Users spend 99% of their time on other apps; use standard paradigms.
- **Accessibility by Default:** High contrast, large touch targets, and legible typography are non-negotiable baselines, not afterthoughts.

## 4. Visual Philosophy

- **Density:** Keep it low. Use ample padding. A screen crammed with data feels stressful.
- **Alignment:** Strict adherence to an 8pt grid system. Every margin and padding must be a multiple of 8.
- **Hierarchy through Scale:** Use size and weight to draw the eye, not just color. The Price and the Action button should be the heaviest elements on a Listing card.
- **Elevation:** Use shadows sparingly. Elevation should only be used to indicate layering (e.g., a Bottom Sheet over the main screen, or a sticky action bar).

## 5. Color Philosophy

Colors in Sakank communicate state, not just brand identity.

- **Primary Brand Color:** Used exclusively for primary actions (e.g., The "Request" button). It should be a single, confident, calming hue (e.g., a deep slate blue or forest green—TBD in the Design System).
- **Neutrals:** The UI is predominantly white and shades of grey. Neutrals carry the interface, allowing property photos to provide the color.
- **Success:** Deep, legible Green. Used for "Accepted" requests and "Verified" badges.
- **Warning:** Deep Amber. Used for SLA timeouts or incomplete profiles.
- **Error:** Calming Red. Used for failed validations, never to scream at the user, but to firmly guide them.
- **Backgrounds:** Pure white (`#FFFFFF`) for primary surfaces. Off-white (`#F9F9F9`) for secondary backgrounds (like the feed behind cards) to create subtle depth.

## 6. Typography Philosophy

- **Arabic-First:** The typography must be optimized for Arabic reading. Choose a modern, geometric Arabic typeface (e.g., IBM Plex Sans Arabic, Cairo, or Readex Pro) that supports multiple weights and maintains legibility at small sizes.
- **English Compatibility:** The English typeface must pair perfectly with the Arabic choice in terms of x-height and stroke width (e.g., Inter or Roboto).
- **Reading Rhythm:** Line height (leading) for Arabic text must be at least 150% of the font size to account for diacritics and ascenders/descenders.
- **Hierarchy:**
  - **H1:** Page titles only (e.g., "تفاصيل السكن").
  - **H2/H3:** Section headers (e.g., "المرافق").
  - **Body:** Readable descriptions (min 16sp).
  - **Caption:** Timestamps, secondary labels (min 12sp).

## 7. Component Philosophy

- **Buttons:** Large, pill-shaped or slightly rounded (radius 8px-12px) to feel tactile and friendly.
- **Inputs:** Outlined text fields with clear, persistent labels. Never use placeholder text as the only label (it disappears when typing).
- **Cards:** Clean borders, subtle or zero shadow. The image should span full width where possible.
- **Bottom Sheets:** Preferred over full-screen modals for transient tasks (Filters, Confirmations) to keep the user anchored to their context.
- **Badges/Chips:** Used for filtering and status. Must have distinct background tints based on status (e.g., Light green bg with dark green text for "Verified").

## 8. Motion Philosophy

- **Motion with Purpose:** Animation should only exist to guide the eye or explain state changes.
- **Transitions:** Push/pop for navigating deeper. Slide up for bottom sheets. Fade for state changes.
- **Feedback:** Immediate micro-interactions on tap (e.g., a slight scale-down on a button press) to confirm input instantly.
- **Loading:** Prefer skeleton screens over infinite spinners for content loading. Skeleton shapes must match the final layout.

## 9. Trust Design

In a zero-trust market, the UI must act as the guarantor.

- **Verification Badges:** The "Verified Owner" badge must be prominently displayed next to the Owner's avatar. It must look official and un-counterfeitable.
- **Transparency:** Pricing must explicitly state what is included. Use checklists (✅ Water, ✅ Electricity, ❌ Wi-Fi) rather than paragraphs of text.
- **Privacy Assurance:** On the Request screen, explicitly state: _"لن يتم مشاركة رقم هاتفك إلا بعد موافقة المالك"_ (Your phone number will not be shared until the owner accepts).

## 10. Mobile Philosophy

- **Thumb-Friendly:** 80% of interactions must happen in the bottom third of the screen.
- **One-Handed Usage:** The "Request", "Filter", and "Back" actions must be easily reachable with a single hand.
- **Tap Targets:** Absolute minimum of 44x44 points (Apple HIG) or 48x48 dp (Material) for any tappable element.

## 11. Writing Philosophy (Microcopy)

- **Tone of Voice:** Professional, reassuring, clear, and direct. Not overly playful, not overly corporate.
- **Error Messages:** Never blame the user.
  - _Bad:_ "You entered the wrong OTP."
  - _Good:_ "الكود غير صحيح، يرجى التأكد والمحاولة مرة أخرى" (The code is incorrect, please check and try again).
- **Empty States:** Always provide an escape hatch.
  - _Example:_ Instead of just "No Favorites," add a button saying "تصفح الإعلانات المتاحة" (Browse available listings).

## 12. Anti-Patterns (Forbidden Decisions)

- **NO Infinite Scroll without purpose:** Feed must have a logical end or explicit pagination loading.
- **NO Dark Patterns:** Hiding fees or tricking users into actions is strictly banned.
- **NO "Hamburgers" for primary navigation:** Core navigation must be visible at the bottom of the screen.
- **NO Small Grey Text:** Contrast ratios must pass WCAG AA standards (minimum 4.5:1).

## 13. Final Recommendations (Design Director Directive)

**What must NEVER be compromised:**

1. **The Sticky Action Button:** On the Listing Details page, the "Request to Stay" button must always be visible at the bottom of the screen, floating above the content. The user should never have to hunt for the checkout action.
2. **Performance over Effects:** Do not use heavy blurs, complex gradients, or intensive animations. Sakank must feel buttery smooth on a 4-year-old Android device. The design fails if it causes frame drops.
3. **Arabic-First Legibility:** If the Arabic text looks cramped, adjust the entire component layout. Do not shrink the font to fit a box designed for English text.
