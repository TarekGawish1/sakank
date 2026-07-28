# Sakank Design System (Figma Spec)

This document serves as the source of truth for the Sakank Design System. All Figma variables, components, and eventually React Native UI elements must map exactly to these tokens.

## 1. Design Philosophy
Inspired by Airbnb: Minimal, Calm, Premium, Spacious, Human, Clean, Modern, Trustworthy.
- **Whitespace:** Use whitespace intelligently (8pt grid) to separate elements rather than relying on heavy borders or cards.
- **Visual Noise:** Keep it to an absolute minimum.
- **Shadows:** Soft, large, diffused shadows only when elevation is strictly necessary (e.g., floating action buttons, bottom sheets).

## 2. Typography Tokens
We support a bilingual interface out of the box.
- **Arabic Font:** `Alexandria` (RTL)
- **English Font:** `Inter` (LTR)

### Type Scale (Variables)
| Token | Size (pt) | Line Height | Weight | Letter Spacing |
|-------|-----------|-------------|--------|----------------|
| `Display` | 32 | 40 | 700 (Bold) | -2% |
| `Headline` | 24 | 32 | 700 (Bold) | -1% |
| `Title` | 20 | 28 | 600 (SemiBold)| 0% |
| `Body Large` | 18 | 26 | 400 (Regular)| 0% |
| `Body Base` | 16 | 24 | 400 (Regular)| 0% |
| `Body Small` | 14 | 20 | 400 (Regular)| 0% |
| `Button` | 16 | 24 | 600 (SemiBold)| +1% |
| `Label` | 14 | 20 | 500 (Medium) | +2% |
| `Caption` | 12 | 16 | 400 (Regular)| +2% |

## 3. Color Tokens
**Primary Brand Color:** `#155EEF` (Sakank Blue)

### Primitives
- `blue-50`: `#EFF4FF`
- `blue-100`: `#D1E0FF`
- `blue-500`: `#155EEF` (Primary)
- `blue-600`: `#004EEB`
- `blue-700`: `#0040C1`

- `neutral-0`: `#FFFFFF`
- `neutral-50`: `#F9FAFB`
- `neutral-100`: `#F3F4F6`
- `neutral-200`: `#E5E7EB`
- `neutral-300`: `#D1D5DB`
- `neutral-500`: `#6B7280`
- `neutral-800`: `#1F2937`
- `neutral-900`: `#111827`

### Semantic Tokens (Light Mode)
- **Surface:**
  - `surface-default`: `neutral-0` (Main backgrounds)
  - `surface-subdued`: `neutral-50` (Secondary backgrounds)
  - `surface-primary`: `blue-500`
- **Text:**
  - `text-primary`: `neutral-900`
  - `text-secondary`: `neutral-500`
  - `text-inverse`: `neutral-0`
  - `text-brand`: `blue-500`
- **Border:**
  - `border-subtle`: `neutral-200`
  - `border-strong`: `neutral-300`
  - `border-focus`: `blue-500`
- **Feedback:**
  - `success`: `#039855`
  - `warning`: `#F79009`
  - `error`: `#D92D20`
  - `info`: `#155EEF`

## 4. Spacing & Grid (8pt System)
All padding and margins must use these exact variable names in Figma.
- `space-4`: 4px
- `space-8`: 8px
- `space-12`: 12px
- `space-16`: 16px (Standard screen padding)
- `space-20`: 20px
- `space-24`: 24px
- `space-32`: 32px
- `space-40`: 40px
- `space-48`: 48px
- `space-64`: 64px
- `space-80`: 80px
- `space-96`: 96px

## 5. Radius
Use rounding to create a soft, friendly UI.
- `radius-sm`: 4px (Checkboxes, small tags)
- `radius-md`: 8px (Buttons, inputs)
- `radius-lg`: 12px (Cards, property images)
- `radius-xl`: 24px (Bottom sheets, large modal containers)
- `radius-full`: 9999px (Avatars, pills)

## 6. Components Standard
Every Figma component must be built using **Auto Layout** and include the following states:
- Default
- Hover (for Web/Tablet)
- Pressed (Active touch state)
- Focused (Accessibility)
- Disabled
- Loading (Skeleton or spinner state)
- Error
- Empty (If applicable, e.g., lists)

## 7. Figma File Structure
Ensure your Figma file matches this page structure:
1. `01 Foundations` (Variables: Colors, Typography, Spacing, Radius)
2. `02 Components` (Buttons, Inputs, Cards, Headers)
3. `03 Patterns` (Forms, Nav Bars, Bottom Sheets)
4. `04 Templates` (Empty states, Skeleton loading layouts)
5. `05 Screens` (Final assembled screens with real data)
6. `06 Prototype` (Connected user flows)
