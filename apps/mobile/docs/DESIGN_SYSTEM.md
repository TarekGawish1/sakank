# Design System

## Purpose

This document defines the visual language of the application.

The Design System is the single source of truth for all UI decisions.

Every screen, component, and interaction must follow this document.

No visual decision may be made outside this Design System.

---

# Design Principles

The interface should be:

- Minimal
- Modern
- Clean
- Consistent
- Accessible
- Mobile First
- RTL First

Avoid visual noise.

Prefer whitespace over unnecessary decorations.

Consistency is always more important than creativity.

---

# Color System

The application uses semantic colors.

Never reference colors directly inside components.

Always use semantic tokens.

## Color Palettes

### Primary (Light)
- **50:** `#F1F5FF`
- **100:** `#E0EAFF`
- **200:** `#C8D9FF`
- **300:** `#A3C0FF`
- **400:** `#709EFF`
- **500:** `#155EEF`
- **600:** `#1B64FB`
- **700:** `#0A50CF`
- **800:** `#003DA2`
- **900:** `#002B77`

### Success (Light)
- **50:** `#EFF8F2`
- **100:** `#DDEFE3`
- **200:** `#C0E4CB`
- **300:** `#90D3A8`
- **400:** `#49BB79`
- **500:** `#12B76A`
- **600:** `#038B4D`
- **700:** `#03703C`
- **800:** `#02572C`
- **900:** `#003E1E`

### Warning (Light)
- **50:** `#FBF4ED`
- **100:** `#F7E6D9`
- **200:** `#F2D2B7`
- **300:** `#EDB481`
- **400:** `#E08A30`
- **500:** `#F79009`
- **600:** `#A95F00`
- **700:** `#894C00`
- **800:** `#6B3900`
- **900:** `#4E2800`

### Error (Light)
- **50:** `#FFF2EF`
- **100:** `#FEE2DD`
- **200:** `#FFCBC2`
- **300:** `#FFA699`
- **400:** `#FD6D5E`
- **500:** `#F04438`
- **600:** `#D61B19`
- **700:** `#B00F10`
- **800:** `#89090B`
- **900:** `#640406`

### Sky (Light)
- **50:** `#EFF7F9`
- **100:** `#DCEDF2`
- **200:** `#BEE0E9`
- **300:** `#8CCDDD`
- **400:** `#3FB2CB`
- **500:** `#06B6D4`
- **600:** `#008399`
- **700:** `#00697B`
- **800:** `#00515F`
- **900:** `#003A45`

### Neutrals (Light)
- **50:** `#F8FAFC`
- **100:** `#F1F5F9`
- **200:** `#E2E8F0`
- **300:** `#CBD5E1`
- **400:** `#94A3B8`
- **500:** `#64748B`
- **600:** `#475569`
- **700:** `#334155`
- **800:** `#1E293B`
- **900:** `#0F172A`

## Brand

- **Primary:** Primary 500 (`#155EEF`)
- **Pressed:** Primary 700 (`#0A50CF`)
- **Disabled:** Primary 200 (`#C8D9FF`)

## Text

- **Primary:** Neutrals 900 (`#0F172A`)
- **Secondary:** Neutrals 600 (`#475569`)
- **Tertiary:** Neutrals 500 (`#64748B`)
- **Disabled:** Neutrals 400 (`#94A3B8`)
- **Inverse:** White (`#FFFFFF`)
- **Brand:** Primary 600 (`#1B64FB`)

## Background

- **Primary:** White (`#FFFFFF`)
- **Secondary:** Neutrals 50 (`#F8FAFC`)
- **Brand:** Primary 50 (`#F1F5FF`)

## Surface

- **Primary:** White (`#FFFFFF`)
- **Secondary:** Neutrals 50 (`#F8FAFC`)
- **Elevated:** White (`#FFFFFF`)
- **Disabled:** Neutrals 100 (`#F1F5F9`)

## Border

- **Default:** Neutrals 200 (`#E2E8F0`)
- **Subtle:** Neutrals 100 (`#F1F5F9`)
- **Strong:** Neutrals 300 (`#CBD5E1`)
- **Disabled:** Neutrals 200 (`#E2E8F0`)
- **Success:** Success 500 (`#12B76A`)

## Status

- **Success:** Success 500 (`#12B76A`)
- **Warning:** Warning 500 (`#F79009`)
- **Error:** Error 500 (`#F04438`)
- **Info:** Sky 500 (`#06B6D4`)

---

# Typography

## Font Family

Arabic

- Alexandria

English

- Inter

---

## Display

- **Display XL:** Size: 48px, Line Height: 58px, Weight: Bold (700)
- **Display L:** Size: 40px, Line Height: 50px, Weight: Bold (700)

---

## Heading

- **H1:** Size: 32px, Line Height: 40px, Weight: Bold (700)
- **H2:** Size: 28px, Line Height: 36px, Weight: Bold (700)
- **H3:** Size: 24px, Line Height: 32px, Weight: Bold (700)

---

## Title

- **Title L (Large):** Size: 20px, Line Height: 28px, Weight: SemiBold (600)
- **Title M (Medium):** Size: 18px, Line Height: 26px, Weight: SemiBold (600)

---

## Body

- **Body L (Large):** Size: 16px, Line Height: 24px, Weight: Regular (400)
- **Body M (Medium):** Size: 14px, Line Height: 22px, Weight: Regular (400)

---

## Label

- **Label:** Size: 14px, Line Height: 20px, Weight: Medium (500)

---

## Caption

- **Caption:** Size: 12px, Line Height: 18px, Weight: Regular (400)

---

## Overline

- **Overline:** Size: 11px, Line Height: 16px, Weight: Medium (500)

---

Every typography style must define:

- Font Family
- Font Size
- Font Weight
- Line Height
- Letter Spacing

---

# Spacing System

The application uses an 8pt spacing system.

Available spacing tokens:

2
4
8
12
16
20
24
32
40
48
56
64
80

Spacing must always come from tokens.

Never hardcode margins or paddings.

---

# Radius

Radius tokens:

- **none:** 0px
- **xs:** 4px
- **sm:** 8px
- **md:** 12px
- **lg:** 16px
- **xl:** 24px
- **full / pill:** 999px (or 50%)

---

# Elevation

Elevation Levels

0

1

2

3

4

Use elevation only when necessary.

---

# Shadows

Shadow tokens

Small

Medium

Large

---

# Opacity

Disabled

Hover

Pressed

Focused

---

# Icon System

Supported icon sizes

16

20

24

28

32

40

Icons should use semantic colors.

Directional icons must support RTL.

---

# Illustration

Illustrations should be:

Minimal

Simple

Friendly

Use brand colors only.

---

# Motion

Animation durations

Fast

Normal

Slow

Animations should never distract users.

---

# Layout

The application follows an 8pt grid.

Avoid fixed widths.

Prefer Flexbox.

Support:

- Small Phones
- Large Phones
- Tablets

---

# RTL

RTL is mandatory.

Never use:

left

right

Always use:

start

end

All layouts must behave correctly in RTL.

---

# Dark Mode

Every color token must support:

Light

Dark

Never create components that only work in one theme.

---

# Accessibility

Support:

Dynamic Font Scaling

Touch Target >= 44

Proper Contrast

Screen Readers

---

# Components

Every component must use Design Tokens.

No component may define its own colors.

No component may define its own typography.

No component may define its own spacing.

Every component must support:

- Disabled
- Loading (if applicable)
- RTL
- Dark Mode

---

# Design Tokens

Every token must exist inside the theme folder.

Example:

theme/

colors.ts

typography.ts

spacing.ts

radius.ts

shadow.ts

animation.ts

icons.ts

zIndex.ts
