# React Native Engineering Constitution

## Purpose

This document defines the mandatory engineering principles for every React Native project in this repository.

These rules are not suggestions.
They are mandatory and must always be followed.

Every decision must prioritize:

- Consistency
- Scalability
- Maintainability
- Reusability
- Performance
- Accessibility
- User Experience

---

# Core Principles

## 1. Design System First

The Design System is the single source of truth.

No UI may be implemented before the Design System exists.

Every color, spacing, typography, border radius, elevation, animation, and sizing value must come from design tokens.

Hardcoded design values are forbidden.

---

## 2. Reusability First

Before creating any new component:

- Search existing components.
- Reuse existing solutions whenever possible.
- Extend existing components instead of duplicating them.

Duplicate UI is forbidden.

---

## 3. Single Responsibility

Every file must have one responsibility.

Every component should solve one problem only.

Large components must be split into smaller reusable components.

---

## 4. Business Logic Separation

Business logic must never live inside UI components.

UI components should only render data and trigger actions.

Logic belongs inside:

- Services
- Hooks
- State
- Utilities

---

## 5. Consistency Over Creativity

Consistency is always more important than visual creativity.

All screens must follow the same spacing, typography, colors, and interaction patterns.

Users should feel they are using one application, not many different screens.

---

## 6. Accessibility

Accessibility is mandatory.

Every screen should support:

- Dynamic font scaling
- Screen readers
- Proper touch targets
- Proper contrast

---

## 7. RTL First

Applications are RTL-first.

Every layout must work correctly in Arabic.

Never hardcode:

- left
- right

Always use:

- start
- end

Directional icons must flip automatically.

---

## 8. Responsive Design

Layouts must adapt to different screen sizes.

Avoid fixed dimensions whenever possible.

Prefer flexible layouts.

---

## 9. Performance

Performance is part of the design.

Avoid unnecessary renders.

Avoid duplicated state.

Avoid unnecessary API calls.

Optimize images and lists.

---

## 10. Clean Code

Code should be readable before being clever.

Prioritize:

- Simplicity
- Readability
- Predictability

---

# Development Philosophy

Build the foundation first.

Never rush into creating screens.

Always build in this order:

1. Theme
2. Design Tokens
3. Typography
4. Shared Components
5. Navigation
6. State Management
7. API Layer
8. Features
9. Screens
10. Testing

---

# Final Rule

If there are multiple possible implementations,
always choose the one that improves long-term maintainability.
