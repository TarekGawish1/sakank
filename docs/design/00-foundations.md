# Page 01: Foundations (Figma Spec)

This document contains the exact values, variables, and properties required to build the `01 Foundations` page in Figma. Every value below must be created as a **Local Variable** or **Style** in Figma.

---

## 1. Grid System (Layout Grids)

We use a responsive layout grid. Do not hardcode margins in components; use the grid.

### Mobile Grid (Default)
- **Type:** Columns
- **Count:** 4
- **Margin:** 16px (Safe Area padding)
- **Gutter:** 16px

### Tablet Grid (Breakpoint: 768px)
- **Type:** Columns
- **Count:** 8
- **Margin:** 32px
- **Gutter:** 16px

---

## 2. Spacing Variables (8pt Grid)

All spacing (Padding, Margin, Gap) must be linked to these variables.

| Variable Name | Value (px) | Usage Context |
|---------------|------------|---------------|
| `space/0`     | 0          | Reset, overlapping elements |
| `space/2`     | 2          | Tiny tweaks, inner icon padding |
| `space/4`     | 4          | Micro gaps, checkbox text gap |
| `space/8`     | 8          | Standard element gap (e.g., Title & Subtitle) |
| `space/12`    | 12         | Medium gap, button padding |
| `space/16`    | 16         | Standard container padding, screen margins |
| `space/20`    | 20         | Slightly larger section gaps |
| `space/24`    | 24         | Large component padding (e.g., bottom sheets) |
| `space/32`    | 32         | Section gaps, distinct breaks in content |
| `space/40`    | 40         | Large section breaks |
| `space/48`    | 48         | Page headers to content |
| `space/64`    | 64         | Major layout gaps |
| `space/80`    | 80         | Bottom padding for fixed navbars |
| `space/96`    | 96         | Empty state vertical spacing |

---

## 3. Radius Variables (Corner Rounding)

Rounding should feel human and friendly, but not cartoonish.

| Variable Name | Value (px) | Usage Context |
|---------------|------------|---------------|
| `radius/none` | 0          | Full-bleed images, dividers |
| `radius/sm`   | 4          | Checkboxes, tags, tiny badges |
| `radius/md`   | 8          | Buttons, text inputs, dropdowns |
| `radius/lg`   | 12         | Cards, property images, modals |
| `radius/xl`   | 24         | Bottom sheets, large floating containers |
| `radius/full` | 9999       | Avatars, pills, circular icon buttons |

---

## 4. Typography Styles

Create these as **Text Styles** in Figma. We support two typefaces:
- **Primary (EN):** Inter
- **Primary (AR):** Alexandria

*Note: In Figma, use variables for font family if supported, otherwise duplicate styles for AR/EN.*

| Style Name   | Font Size | Line Height | Font Weight (EN/AR) | Letter Spacing | Use Case |
|--------------|-----------|-------------|---------------------|----------------|----------|
| **Display**  | 32px      | 40px (125%) | Bold (700)          | -2%            | Onboarding titles, major heroic headers |
| **Headline** | 24px      | 32px (133%) | Bold (700)          | -1%            | Screen headers, Section titles |
| **Title 1**  | 20px      | 28px (140%) | SemiBold (600)      | 0%             | Card titles, bottom sheet headers |
| **Title 2**  | 18px      | 26px (144%) | SemiBold (600)      | 0%             | Sub-section titles |
| **Body Lg**  | 18px      | 26px (144%) | Regular (400)       | 0%             | Large readable text, intro paragraphs |
| **Body Base**| 16px      | 24px (150%) | Regular (400)       | 0%             | Standard reading text, descriptions |
| **Body Sm**  | 14px      | 20px (142%) | Regular (400)       | 0%             | Metadata, secondary descriptions |
| **Button**   | 16px      | 24px (150%) | SemiBold (600)      | +1%            | Primary/Secondary button text |
| **Label**    | 14px      | 20px (142%) | Medium (500)        | +2%            | Input labels, chips, navigation tabs |
| **Caption**  | 12px      | 16px (133%) | Regular (400)       | +2%            | Time stamps, tiny hints, error messages |

---

## 5. Color Variables (Primitives & Semantics)

Colors must be set up as **Variables** in Figma using two collections: 
1. **Primitives** (Hex codes)
2. **Semantics** (References to primitives)

### Collection 1: Primitives

**Brand Blue**
- `blue/50`: `#EFF4FF`
- `blue/100`: `#D1E0FF`
- `blue/200`: `#B2CCFF`
- `blue/300`: `#84ADFF`
- `blue/400`: `#528BFF`
- `blue/500`: `#155EEF` *(Base Primary)*
- `blue/600`: `#004EEB`
- `blue/700`: `#0040C1`
- `blue/800`: `#00359E`
- `blue/900`: `#002C85`

**Neutrals (Grays)**
- `neutral/0`: `#FFFFFF`
- `neutral/50`: `#F9FAFB`
- `neutral/100`: `#F3F4F6`
- `neutral/200`: `#E5E7EB`
- `neutral/300`: `#D1D5DB`
- `neutral/400`: `#9CA3AF`
- `neutral/500`: `#6B7280`
- `neutral/600`: `#4B5563`
- `neutral/700`: `#374151`
- `neutral/800`: `#1F2937`
- `neutral/900`: `#111827`
- `neutral/1000`: `#000000`

**Success (Green)**
- `green/50`: `#ECFDF3`
- `green/500`: `#12B76A`
- `green/700`: `#027A48`

**Warning (Orange)**
- `orange/50`: `#FFFAEB`
- `orange/500`: `#F79009`
- `orange/700`: `#B54708`

**Error (Red)**
- `red/50`: `#FEF3F2`
- `red/500`: `#F04438`
- `red/700`: `#B42318`

---

### Collection 2: Semantic Tokens (Light Theme)

Map these semantic tokens to the Primitives above. Never use primitives directly in UI components.

**Surface (Backgrounds)**
- `surface/default`: `neutral/0` *(App background)*
- `surface/subdued`: `neutral/50` *(Card backgrounds, secondary areas)*
- `surface/primary`: `blue/500` *(Primary buttons, brand areas)*
- `surface/primary-hover`: `blue/600`
- `surface/primary-pressed`: `blue/700`
- `surface/primary-subtle`: `blue/50` *(Selected states, light brand backgrounds)*
- `surface/inverse`: `neutral/900` *(Dark tooltips, snackbars)*
- `surface/disabled`: `neutral/100`
- `surface/error-subtle`: `red/50`

**Text**
- `text/primary`: `neutral/900` *(Headings, strong text)*
- `text/secondary`: `neutral/500` *(Body text, subtitles)*
- `text/tertiary`: `neutral/400` *(Placeholders, disabled text)*
- `text/inverse`: `neutral/0` *(Text on primary buttons, tooltips)*
- `text/brand`: `blue/500` *(Links, active tabs)*
- `text/error`: `red/500` *(Error messages)*

**Border**
- `border/subtle`: `neutral/200` *(Dividers, inactive borders)*
- `border/strong`: `neutral/300` *(Active borders, input borders)*
- `border/brand`: `blue/500` *(Focused inputs, selected cards)*
- `border/error`: `red/500` *(Error state inputs)*

**Icons**
- `icon/primary`: `neutral/900`
- `icon/secondary`: `neutral/500`
- `icon/inverse`: `neutral/0`
- `icon/brand`: `blue/500`

---

## 6. Elevation & Effects (Shadows & Blurs)

Create these as **Effect Styles** in Figma. Use shadows sparingly to maintain the clean, "spacious" philosophy.

| Style Name       | Shadow Specs (X, Y, Blur, Spread, Color) | Use Case |
|------------------|------------------------------------------|----------|
| **shadow/sm**    | 0px, 1px, 2px, 0px, `neutral/1000` at 5% | Dropdowns, subtle cards |
| **shadow/md**    | 0px, 4px, 8px, -2px, `neutral/1000` at 8%| Sticky headers, FABs |
| **shadow/lg**    | 0px, 12px, 24px, -4px, `neutral/1000` at 12% | Bottom sheets, Modals |
| **blur/sm**      | Background Blur: 8px                     | Subdued glassmorphism (Sticky headers) |
| **blur/md**      | Background Blur: 16px                    | Overlay glassmorphism (Image overlays) |

## 7. Opacity Tokens
For overlays or disabled states, use opacity modifiers:
- `opacity/hover`: 8% (over primary or neutral)
- `opacity/pressed`: 16%
- `opacity/disabled`: 50%
- `opacity/overlay`: 40% (Solid `neutral/900` at 40% for modal backdrops)
