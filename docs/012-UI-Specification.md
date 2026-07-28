# 012 — UI Specification & Screen Blueprint

## 1. Executive Summary

This document is the definitive UI Specification for Sakank. It is optimized as a semantic blueprint for AI UI generators and frontend developers. It translates the Information Architecture (010) and Design Philosophy (011) into exact layout structures, component hierarchies, and visual states.

## 2. Visual Identity

- **Primary Color:** `#155EEF` (Sakank Blue - conveys trust, clarity, and safety).
- **Surface Colors:** `#FFFFFF` (Main Background), `#F9FAFB` (Secondary Background), `#F2F4F7` (Divider/Stroke).
- **Text Colors:** `#101828` (Primary text), `#475467` (Secondary text), `#98A2B3` (Disabled/Placeholder).
- **Semantic Colors:** `#039855` (Success/Verified), `#D92D20` (Error/Danger), `#F79009` (Warning).
- **Primary Font:** `Alexandria` (Modern, geometric Arabic typeface with excellent English pairing).
- **Radius:** `12px` (Cards, Bottom Sheets), `8px` (Buttons, Inputs), `16px` (Dialogs).
- **Style:** Minimal, Editorial, Flat (No shadows except subtle elevation on sticky elements and bottom sheets).

## 3. Global UI Principles & Component Rules

- **Buttons:** 48dp height minimum. Primary buttons use `#155EEF` background. Secondary buttons use transparent background with `#D0D5DD` outline. Disabled buttons use `#F2F4F7` background and `#98A2B3` text.
- **Inputs:** 56dp height. Floating label or persistent top label. Active state gets a `#155EEF` 2px border. Error state gets `#D92D20` border + helper text.
- **Badges/Chips:** Used for Status and Gender. 28dp height. Pill-shaped (fully rounded). Background is 10% opacity of the text color.
- **Bottom Navigation:** `#FFFFFF` background, top border `#F2F4F7`. Icons are 24x24. Active state tint is `#155EEF`. Inactive is `#98A2B3`. Tabs: Home, Favorites, My Requests, Profile.

---

## 4. Listing Card Specification (The Core Component)

_The most important UI component in the app. Must be flawless._

- **Layout:** Vertical Stack (Image top, Details bottom).
- **Cover Image:** Aspect ratio 4:3. Full width of the card. `#F2F4F7` background while loading.
- **Image Overlays:**
  - Top-Right: `Favorite` Heart Icon Button (Circular, blurred background).
  - Bottom-Left (Inside Image): `Verification Badge` (Green background, white checkmark, text "موثق").
- **Content Area:** 16px padding.
  - **Row 1:** `Price` (H2, Bold, `#101828`) + " / شهر" (Caption). Right-aligned (RTL).
  - **Row 2:** `Property Type` (e.g., "شقة كاملة") • `Gender Restriction` Badge (e.g., "سكن بنات").
  - **Row 3:** Location Icon + `Distance` (e.g., "5 دقائق من الجامعة"). Text `#475467`.
- **Spacing:** 8px between rows. 16px padding inside the card.
- **States:** Default (White bg). Pressed (Slight scale down 0.98, opacity 0.9). Loading (Skeleton matching exact layout).

---

## 5. Screen Blueprints (P0 Core Flows)

### 5.1. Authentication (Login / OTP)

- **Screen Name:** Login
- **Layout Structure:**
  - Header: Sakank Logo + "أهلاً بك في سكنك" (Welcome).
  - Body: Phone Number Input (Prefix +20 forced).
  - Footer: Primary Action Button "متابعة" (Continue). Sticky to keyboard.
- **Microcopy:** "سجل برقم هاتفك للبدء" (Register with your phone to start).
- **States:** Button disabled until 10 digits entered.

### 5.2. Complete Profile

- **Purpose:** Capture University and Gender before allowing search.
- **Layout Structure:**
  - Header: "أخبرنا عن نفسك" (Tell us about yourself).
  - Body:
    1. Input: Name.
    2. Dropdown (Bottom Sheet): Select University.
    3. Segmented Control: Gender (Male / Female).
  - Footer: Primary Button "حفظ والبدء" (Save and Start).
- **Validation:** All fields required. Cannot skip.

### 5.3. Home / Feed (SCR-NAV-01)

- **Layout Structure:**
  - **App Bar (Top):**
    - Right: User Greeting + University Name.
    - Left: Notification Bell Icon (with red dot if unread).
  - **Search Area:** Large grey input pill "ابحث عن سكن..." + Filter Icon button next to it.
  - **Content (Scrollable):**
    - Horizontal scroll section (Future): "أقرب الإعلانات للجامعة" (Closest to University).
    - Vertical list: `Listing Cards` with 16px gap.
- **Empty State:** "لا توجد إعلانات متاحة حالياً" + illustration.
- **Loading State:** 3 Skeleton Listing Cards.

### 5.4. Search Filters (Bottom Sheet)

- **Layout Structure:**
  - Header: "تصفية النتائج" (Filter Results) + "مسح الكل" (Clear All) text button.
  - Body:
    - Section 1: Price Range (Slider 500 - 10,000 EGP).
    - Section 2: Gender Rule (Chips: البنات, الأولاد, الكل).
    - Section 3: Accommodation Type (Chips: شقة, غرفة, سرير).
  - Footer: Primary Button "إظهار X نتيجة" (Show X Results). Sticky bottom.

### 5.5. Listing Details (SCR-LST-01)

- **Navigation:** Back arrow (Top Left/Right based on RTL).
- **Layout Structure:**
  - **Hero:** Full-width Image Carousel (Page indicator dots at bottom). Top gradient overlay for Back and Favorite buttons.
  - **Header Info:** Price, Type, Gender Restriction (Same as Listing Card but larger).
  - **Verification Banner:** Green horizontal strip if Verified.
  - **Section: Distance:** Map preview static image + text "X mins from University".
  - **Section: Amenities:** Grid of icons + text (e.g., 📶 واي فاي).
  - **Section: Rules & Utilities:** Bullet points checking what is included.
  - **Bottom Action Bar (Sticky):**
    - Left: "تواصل مع المالك" (Contact Owner) - Disabled/Hidden if not requested.
    - Right (Full width): Primary Button "طلب سكن" (Request to Stay). `#155EEF`.
- **Microcopy (Trust):** Below the Request button, small text: "لن يظهر رقم هاتفك للمالك إلا بعد الموافقة" (Phone number hidden until approved).

### 5.6. Create Stay Request (Modal / Bottom Sheet)

- **Purpose:** Confirm intent to rent.
- **Layout Structure:**
  - Header: "تأكيد طلب السكن".
  - Body: Mini summary card of the listing (Thumbnail + Price). Warning text regarding the 48-hour SLA.
  - Action: Primary Button "تأكيد الطلب" (Confirm Request).
- **Success State:** Transitions to `Stay Request Success` full screen.

### 5.7. My Stay Requests (SCR-NAV-03)

- **Layout Structure:**
  - App Bar: "طلباتي" (My Requests).
  - Tabs: "الحالية" (Active) / "السابقة" (Past).
  - Body: List of `Request Cards`.
- **Request Card UI:**
  - Row 1: Listing Title + Status Badge (Pending [Amber], Accepted [Green], Rejected [Red]).
  - Row 2: "تاريخ الطلب" (Request Date).
  - Action (If Accepted): Primary Button "إظهار رقم المالك" (Show Owner Number) or Call Icon.
  - Action (If Pending): Secondary Text Button "إلغاء الطلب" (Cancel).
- **Empty State:** "ليس لديك أي طلبات حالياً". Action: "تصفح الإعلانات".

---

## 6. Secondary Screen Blueprints (P1 / Support)

| Screen             | Layout / Component Notes                                                              | Empty/Error States                  |
| :----------------- | :------------------------------------------------------------------------------------ | :---------------------------------- |
| **Favorites**      | Grid/List of Listing Cards. App Bar: "المفضلات".                                      | **Empty:** "لم تقم بحفظ أي سكن."    |
| **Notifications**  | Simple list. Icon + Title + Timestamp. Unread has light blue bg.                      | **Empty:** "لا توجد إشعارات جديدة." |
| **Profile**        | Avatar, Name, Uni. List of links: Settings, Support, Terms, Logout.                   | N/A                                 |
| **Settings**       | Toggles for Push Notifications. Text link for "Delete Account" (Red).                 | N/A                                 |
| **Report Listing** | Bottom sheet. Radio buttons for reason (Scam, Wrong Info, etc.). Primary btn: Submit. | N/A                                 |
| **Image Gallery**  | Full screen, black background. Swipeable. Close X top right.                          | N/A                                 |

---

## 7. Standardized States

### 7.1. Empty States

All empty states share this exact layout:

1. Centered, minimal monochromatic illustration (120x120dp).
2. H2 Text (e.g., "لا توجد نتائج"). Text color `#101828`.
3. Body Text (e.g., "جرب تغيير الفلاتر للوصول لنتائج أكثر"). Text color `#475467`.
4. (Optional) Primary Button to escape (e.g., "مسح الفلاتر").

### 7.2. Error States

- **Network Error:** Full screen. Icon (Broken Wifi). Text: "لا يوجد اتصال بالإنترنت". Button: "إعادة المحاولة" (Retry).
- **Toast / Snackbar (Transient Errors):** Bottom of screen, black background, white text. E.g., "حدث خطأ، يرجى المحاولة لاحقاً".

### 7.3. Loading Experience

- **Skeletons:** Used for all list views (Feed, Favorites, Requests). Base color `#F2F4F7`, Shimmer color `#EAECF0`.
- **Button Loading:** Text hides, small white circular spinner appears in the center of the button.

---

## 8. Bottom Sheets & Dialogs

- **Share Sheet:** Triggered from Listing Details. Uses Native OS share sheet.
- **Confirmation Dialog:** Used for destructive actions (e.g., Cancel Request).
  - Layout: Center screen, 16px radius, dark overlay.
  - Title: Bold.
  - Actions: Side-by-side buttons. Right/Top is Primary (Confirm - Red if destructive), Left/Bottom is Secondary (Cancel).

---

## 9. Accessibility & UX Constraints

- **Touch Targets:** Absolute minimum of 48x48 dp for all icons, checkboxes, and buttons.
- **RTL Support:** In Arabic mode, the "Back" arrow points Right (→). Icons like User Profile shift to the Right. Price formatting remains logical (e.g., 2000 ج.م).
- **Motion:** Maximum 250ms duration. Standard ease-in-out. Used ONLY for Bottom Sheet slide-up, Dialog fade-in, and Skeleton shimmer. NO page-flip animations.

---

## 10. Final Directives for AI UI Generators

When feeding this document into an AI generator (e.g., v0.dev, Antigravity):

1. **Prompt Instruction:** "Build a mobile web UI utilizing Tailwind CSS and Lucide Icons. Force RTL (`dir="rtl"`). Use Inter or Cairo font. Apply the `#155EEF` primary color. The layout must be strictly mobile-first (max-width: 480px, mx-auto)."
2. **Hierarchy Rule:** Do not add gradients to backgrounds. Keep surface borders 1px solid `#F2F4F7`.
3. **Card Rule:** Listing cards must look perfectly aligned; image aspect ratio 4:3 with `object-cover` is mandatory.
