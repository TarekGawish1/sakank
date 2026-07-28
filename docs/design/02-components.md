# Page 02: Components (Figma Spec)

All components must be constructed using **Auto Layout**, linked to **Variables**, and structured with **Component Properties** (Variants, Booleans, Text).

## 1. Buttons
**Component:** `Button`
- **Variants:**
  - `Hierarchy`: Primary, Secondary, Tertiary, Text
  - `Size`: Large (48px), Medium (40px)
  - `State`: Default, Hover, Pressed, Disabled, Loading
  - `Icon`: None, Leading, Trailing, Only
- **Auto Layout (Primary/Medium):**
  - Direction: Horizontal
  - Padding: `space/12` (Vertical), `space/24` (Horizontal)
  - Gap: `space/8`
  - Radius: `radius/md`
- **Colors (Primary Default):**
  - Background: `surface/primary`
  - Text: `text/inverse`
  - Typography: `Button`

## 2. Inputs
**Component:** `TextInput`
- **Variants:**
  - `State`: Default, Focused, Filled, Error, Disabled
  - `Icon`: None, Leading, Trailing
- **Auto Layout:**
  - Main Wrapper: Vertical, Gap `space/4`
  - Input Field: Horizontal, Padding `space/12` `space/16`, Gap `space/8`, Radius `radius/md`
- **Colors (Default):**
  - Border: `border/strong` (1px)
  - Background: `surface/default`
  - Text: `text/primary`, Placeholder: `text/tertiary`
  - Label Typography: `Label`

## 3. Search
**Component:** `SearchBar`
- **Variants:**
  - `State`: Default, Focused, Filled
- **Auto Layout:**
  - Direction: Horizontal, Center aligned
  - Padding: `space/12` `space/16`
  - Gap: `space/12`
  - Radius: `radius/full`
  - Shadow: `shadow/sm`
- **Colors:**
  - Background: `surface/default`
  - Border: None
  - Icons: `icon/primary` (Left: Search, Right: Filter)

## 4. Cards (Listing Card)
**Component:** `Card/Listing`
- **Variants:**
  - `Layout`: Vertical (Grid), Horizontal (List)
  - `State`: Default, Hover, Skeleton
- **Auto Layout (Vertical Grid):**
  - Direction: Vertical
  - Gap: `space/12`
  - Width: Fill Container
- **Sub-elements:**
  - `Image Carousel`: Aspect Ratio 4:3, Radius `radius/lg`. Contains pagination dots and Favorite icon button absolute positioned.
  - `Text Stack`: Vertical Auto Layout (Gap `space/4`). 
    - Title: `text/primary`, `Title 2`
    - Subtitle: `text/secondary`, `Body Sm`
    - Price: `text/primary`, `Body Base` (SemiBold)

## 5. Chips
**Component:** `Chip`
- **Variants:**
  - `Type`: Filter, Choice, Action
  - `State`: Default, Selected, Disabled
- **Auto Layout:**
  - Direction: Horizontal, Center aligned
  - Padding: `space/8` `space/16`
  - Gap: `space/8`
  - Radius: `radius/full`
- **Colors (Default):**
  - Border: `border/subtle` (1px)
  - Background: `surface/default`
  - Text: `text/primary`
- **Colors (Selected):**
  - Border: `border/brand`
  - Background: `surface/primary-subtle`
  - Text: `text/brand`

## 6. Bottom Navigation
**Component:** `BottomNav`
- **Variants:**
  - `Active Tab`: Home, Favorites, Requests, Profile
- **Auto Layout:**
  - Direction: Horizontal, Space Between
  - Padding: `space/16` (Top) `space/32` (Bottom/Safe Area) `space/24` (Horizontal)
  - Top Border: `border/subtle`
  - Background: `surface/default`
- **Tab Item (Auto Layout):**
  - Direction: Vertical, Center aligned, Gap `space/4`
  - Colors: Active (`icon/brand`, `text/brand`), Inactive (`icon/secondary`, `text/secondary`)

## 7. Bottom Sheet
**Component:** `BottomSheet`
- **Auto Layout:**
  - Direction: Vertical
  - Padding: `space/24`
  - Gap: `space/24`
  - Radius: `radius/xl` (Top Left/Right only)
  - Shadow: `shadow/lg`
- **Sub-elements:**
  - Handle (Drag indicator): 40x4px, Radius `radius/full`, Color `neutral/200`. Center aligned top.

## 8. Dialogs
**Component:** `Dialog`
- **Variants:**
  - `Type`: Alert, Confirmation, Action
- **Auto Layout:**
  - Direction: Vertical
  - Padding: `space/24`
  - Gap: `space/24`
  - Radius: `radius/lg`
  - Shadow: `shadow/lg`
- **Buttons Stack:** Horizontal (Gap `space/12`), Fill Container.

## 9. Badges
**Component:** `Badge`
- **Variants:**
  - `Intent`: Success, Warning, Error, Info, Neutral
- **Auto Layout:**
  - Padding: `space/4` `space/8`
  - Radius: `radius/sm`
- **Colors (Success):** Background `green/50`, Text `green/700`, Typography `Caption` (Bold).

## 10. Avatars
**Component:** `Avatar`
- **Variants:**
  - `Size`: Small (24px), Medium (40px), Large (64px)
  - `Type`: Image, Initials, Placeholder
- **Properties:**
  - Radius: `radius/full`
  - Image Fill: Crop

## 11. Lists (List Item)
**Component:** `ListItem`
- **Variants:**
  - `Leading`: None, Icon, Avatar, Image
  - `Trailing`: None, Icon, Chevron, Toggle
  - `State`: Default, Hover, Pressed
- **Auto Layout:**
  - Direction: Horizontal, Align Center Left
  - Padding: `space/16` (Vertical/Horizontal)
  - Gap: `space/16`
  - Bottom Border: `border/subtle` (Optional based on list style)

## 12. Tabs (Top Navigation)
**Component:** `Tabs`
- **Variants:**
  - `State`: Default, Active
- **Auto Layout (Item):**
  - Padding: `space/12` (Vertical), Fill Container (Horizontal)
  - Active Indicator: 2px bottom border using `border/brand`.
  - Text: `text/brand` (Active), `text/secondary` (Inactive).

## 13. App Bar (Header)
**Component:** `AppBar`
- **Variants:**
  - `Left Action`: Back, Close, Menu, None
  - `Right Action`: Search, Share, Save, None
  - `Title`: Center, Left aligned
- **Auto Layout:**
  - Direction: Horizontal, Space Between, Align Center
  - Padding: `space/16` (Vertical/Horizontal)
  - Background: `surface/default` (often with `blur/sm` effect if sticky)
  - Typography: `Headline` or `Title 1`
