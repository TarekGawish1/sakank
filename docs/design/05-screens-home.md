# Screen: Home (Discover)

## 1. UX Goal
To allow students to instantly view the most relevant housing options near their university with minimal cognitive load. The goal is to build immediate trust by showcasing high-quality, verified listings.

## 2. User Problem
Students are overwhelmed by chaotic Facebook groups with missing information, fake images, and unclear pricing. They need a structured, trustworthy feed where key decision factors (price, distance, gender restriction) are immediately visible.

## 3. Layout Reasoning
Inspired by Airbnb's feed, the layout prioritizes large, edge-to-edge (or near edge-to-edge with standard 16px margins) high-quality images. 
- **Top Bar:** Search bar (acts as a button to open full search modal) with an adjacent "Filter" icon button.
- **Category Chips:** Horizontal scrolling pills underneath search (e.g., "All", "Apartments", "Studios", "Shared Rooms") to allow quick pivoting.
- **Feed:** Vertical scroll of `ListingCard` components.
- **Bottom Navigation:** Fixed bottom bar for quick access to (Explore, Favorites, Requests, Profile).

## 4. Component Usage
- **SearchHeader:** Fixed at top, uses `surface-default` with a slight blur/translucency.
- **FilterChip:** Uses `radius-full`, `border-subtle`, active state uses `surface-primary` with `text-inverse`.
- **ListingCard:**
  - **Image Carousel:** Aspect ratio 4:3, `radius-lg`.
  - **Badges:** Absolute positioned at top-left of image (e.g., "Verified" or "Male Only").
  - **Text Stack:** 
    - `Title` (e.g., "Private Room in Dokki") -> `text-primary`, `Body Base`, `SemiBold`.
    - `Subtitle` (e.g., "2 km from Cairo University") -> `text-secondary`, `Body Small`.
    - `Price` (e.g., "EGP 3000 / month") -> `text-primary`, `Body Base`, `SemiBold`.
- **BottomNav:** Fixed at bottom, 4 tabs, active tab uses `text-brand`.

## 5. Accessibility
- **Contrast:** Ensure gray text (`text-secondary`) on `surface-default` passes WCAG AA 4.5:1 ratio.
- **Touch Targets:** Search bar, filter chips, and bottom nav items all have a minimum 44x44px touch area.
- **Screen Readers:** All image carousels must have `aria-label` equivalent attributes in React Native describing the property.

## Figma Construction (Visual Spec)
```text
Frame: Home_Screen (393 x 852 - iPhone 14 Pro)
Background: var(--surface-default)

Auto Layout (Vertical, Spacing: 0, Padding: 0)

1. Header (Sticky Top)
   - Auto Layout (Vertical, Spacing: 16, Padding: 16 16 8 16)
   - Search_Bar_Component
   - Horizontal_Scroll_List (Filter_Chips)

2. Feed (Scrollable)
   - Auto Layout (Vertical, Spacing: 32, Padding: 16 16 100 16)
   - Listing_Card_Component (Instance 1)
   - Listing_Card_Component (Instance 2)
   - Listing_Card_Component (Instance 3)

3. Bottom_Navigation (Fixed Bottom)
   - Auto Layout (Horizontal, Space Between, Padding: 16 24 32 24)
   - Background: var(--surface-default) + Top Border: var(--border-subtle)
```
