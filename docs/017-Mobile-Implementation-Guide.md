# 017 — Mobile Implementation Guide

## 1. Executive Summary

This document is the official Mobile Implementation Guide for Sakank, built on React Native and Expo. It serves as the engineering handbook for all human developers and AI assistants. Mobile architecture must prioritize maintainability and predictability over short-term velocity. In a mobile environment, bad state management leads to crashes, and poor component design leads to unreadable code and dropped frames. By adhering to a strict Feature-First architecture and centralized Design Tokens, we ensure the app remains performant, cohesive, and easy to scale.

## 2. Architecture Principles

- **Feature-first Architecture:** Group code by domain (e.g., `features/listings`), not by technical concern (e.g., all hooks in one folder). This isolates complexity.
- **Composition over Inheritance:** Build complex UI by combining small, focused components.
- **Single Responsibility:** A screen component only handles layout. Data fetching belongs in hooks. API calls belong in services.
- **Separation of Concerns:** Never mix business logic with UI rendering.
- **Design Tokens Only:** Hardcoded colors or spacing values (e.g., `padding: 15`, `color: '#ff0000'`) are strictly forbidden. Use the central theme system.
- **Offline-first Readiness:** Assume the user has a poor connection. Cache aggressively and handle errors gracefully.
- **Performance by Default:** If a list can grow beyond 20 items, use `FlashList`. If an image is remote, use `Expo Image`.
- **Never Trust Client State:** The server is the source of truth for business data. The client only caches it.

## 3. Project Folder Structure

```text
sakank-mobile/
├── app/                  # Expo Router file-based routing (_layout.tsx, index.tsx)
├── src/
│   ├── features/         # Domain-specific modules (listings, auth, stay-requests)
│   ├── components/       # Global, highly reusable UI components (Button, Input, Card)
│   ├── hooks/            # Global hooks (useKeyboard, useTheme)
│   ├── services/         # Global API client configuration (Axios/Fetch setup)
│   ├── stores/           # Global Zustand stores (AuthStore, ThemeStore)
│   ├── theme/            # Design tokens (colors, typography, spacing)
│   ├── assets/           # Local images, fonts, icons
│   ├── constants/        # Global constants (API URLs, Timeout limits)
│   ├── lib/              # Wrapped 3rd-party libraries (Sentry, Firebase)
│   ├── providers/        # React Context Providers (QueryClientProvider, ThemeProvider)
│   ├── utils/            # Helper functions (formatting dates, currency)
│   ├── types/            # Global TypeScript types and interfaces
│   └── locales/          # i18n translation files (ar.json, en.json)
```

## 4. Feature Structure

Inside `src/features/[feature-name]/`:

- `/components`: UI components specific ONLY to this feature.
- `/screens`: The actual screen layouts (imported into the `app/` router).
- `/hooks`: Feature-specific logic.
- `/services`: API call definitions (e.g., `getListings`).
- `/queries`: TanStack Query hooks (e.g., `useListings`).
- `/mutations`: TanStack Query mutation hooks (e.g., `useCreateStayRequest`).
- `/types`: Types specific to this domain.
- `/validators`: Zod schemas for forms.
- `/utils`: Helper functions specific to the feature.
- `/constants`: Magic strings or numbers for the feature.

## 5. Routing Strategy (Expo Router)

- **Structure:** File-based routing located in the `/app` directory.
- **Protected Routes:** Use a `(protected)` group layout that redirects to `/auth` if the Zustand AuthStore lacks a valid token.
- **Public Routes:** Grouped under `(auth)` or `(public)`.
- **Modal Routes:** Screens needing a bottom-sheet presentation should be configured in `_layout.tsx` using `presentation: 'modal'`.
- **Deep Linking:** Handled natively by Expo Router. Ensure all routes use typed navigation params.

## 6. Component Philosophy

- **Atoms:** Smallest UI elements (Button, Text, Icon).
- **Molecules:** Combinations (InputField with Label and Error text).
- **Organisms:** Complex blocks (ListingCard, FilterForm).
- **Props Conventions:** Interface should be named `${ComponentName}Props`. Always extend standard React Native props (e.g., `ViewProps`, `PressableProps`) when wrapping base components.
- **Memoization:** Use `React.memo` only for heavy components in lists or forms. Avoid premature optimization.

## 7. State Management

- **TanStack Query (Server State):** The ONLY tool for managing async data, fetching, caching, and background synchronization.
- **Zustand (Global UI State):** Use exclusively for global, synchronous state (e.g., `useAuthStore`, `useThemeStore`). NEVER store API responses in Zustand.
- **React Hook Form (Form State):** Handles all user input state.
- **`useState` (Local UI State):** Handles transient component state (e.g., `isModalOpen`, `isExpanded`).
- **Derived State:** Calculate on the fly during render. Do not store in state variables.

## 8. Data Fetching

- **Caching:** TanStack Query handles caching. Configure `staleTime` appropriately (e.g., 5 mins for listings, 0 mins for stay requests).
- **Retry Policy:** Default to 2 retries with exponential backoff on network failure.
- **Optimistic Updates:** Mandatory for actions like "Favorite". Update the TanStack cache immediately, rollback on API error.
- **Pagination:** Use `useInfiniteQuery` for all feeds, integrating seamlessly with `FlashList`'s `onEndReached`.

## 9. Forms & Validation

- **Libraries:** `react-hook-form` coupled with `@hookform/resolvers/zod`.
- **Flow:** Define Zod schema -> Create Form -> Pass `control` to reusable `<ControlledInput />` components.
- **Errors:** Validation errors must appear inline immediately below the input, colored red (Danger token).

## 10. Theme & Design Tokens

- **Tokens:** Define precise objects for `colors`, `spacing`, `radii`, and `typography` in `src/theme/`.
- **Styling:** Use a utility-first approach (like Tailwind via NativeWind) or strict StyleSheet creation utilizing tokens. NEVER hardcode `#155EEF` or `padding: 16`. Use `theme.colors.primary` and `theme.spacing.m`.
- **RTL Support:** React Native handles RTL automatically if you use `start` and `end` instead of `left` and `right` (e.g., `paddingStart`, `marginLeft` -> `marginStart`). This is strictly enforced.

## 11. Typography

- **Font:** `Alexandria` is the sole font family.
- **Weights:** Use mapped weights (e.g., `Regular`, `Medium`, `Bold`).
- **Arabic-first:** Ensure line heights (`lineHeight`) are explicitly set to at least 1.5x the font size to prevent clipping of Arabic diacritics.

## 12. Images

- **Component:** `Expo Image` (`expo-image`) is strictly required. Never use the standard React Native `<Image>`.
- **Caching:** Use memory and disk caching policies provided by Expo Image.
- **Placeholders:** Every remote image must have a low-res blurhash placeholder or a skeleton background color (`#F2F4F7`).

## 13. Lists

- **Component:** `@shopify/flash-list` is strictly required for any list that can exceed 20 items. Standard `FlatList` is banned for core feeds.
- **Keys:** Use `keyExtractor` returning stable, unique strings (UUIDs).
- **Empty States:** Provide a `ListEmptyComponent` that adheres to the UI Specification (Illustration + Text).

## 14. Animations

- **Library:** `react-native-reanimated`.
- **Principles:** Motion must serve a purpose (e.g., transition, feedback). Maximum duration is 250ms. Standard easing is `Easing.inOut`.
- **When NOT to use:** Do not animate standard screen transitions beyond native OS defaults.

## 15. Error & Offline Handling

- **Global Errors:** Catch fatal crashes with an Error Boundary wrapping the app, logging to Sentry, and showing a fallback UI.
- **Network Errors:** Intercepted globally to show a non-intrusive Toast ("لا يوجد اتصال بالإنترنت").
- **Retry UX:** Any screen failing to load data must display a "Retry" button linked to the query's `refetch` method.

## 16. Accessibility & Localization

- **Accessibility:** Minimum touch targets of 48x48 points. Wrap icons in `Pressable` with `hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}`.
- **Localization (i18n):** `i18next` or `expo-localization`. Default layout is RTL. Text strings must be keys (e.g., `t('home.title')`), not hardcoded Arabic text in the TSX files.

## 17. Performance Standards

- **Memoization:** Avoid anonymous functions in `renderItem` or `onPress` inside large lists. Extract them or use `useCallback`.
- **Bundle Size:** Audit imports. Do not import massive monolithic libraries (e.g., use `date-fns` instead of `moment`).

## 18. Security

- **Secure Storage:** Store JWTs using `expo-secure-store`. Never use `AsyncStorage` for tokens.
- **Log Policy:** Never `console.log` user data, tokens, or phone numbers.

## 19. Testing Strategy

- **Unit Tests (Jest):** Mandatory for utility functions, hooks, and Zod schemas.
- **Component Tests (React Native Testing Library):** Mandatory for reusable global UI components. Ensure RTL rendering works.
- **No Snapshot Testing:** They break too often and provide false security. Test behavior (e.g., "Pressing submit calls the mutation").

## 20. Development Workflow (Creating a Feature)

1. **Design Tokens:** Verify required tokens exist.
2. **Types & Validators:** Create `types.ts` and `validators.ts` (Zod).
3. **Services:** Write Axios/Fetch functions in `services.ts`.
4. **Queries/Mutations:** Create custom hooks using TanStack Query.
5. **Components:** Build feature-specific UI.
6. **Screens:** Assemble components in `screens/`.
7. **Routing:** Add screen to `app/` Expo Router.

## 21. AI Coding Rules (Strict Directives)

When generating React Native code, AI assistants MUST:

- **Never use `any`:** Define precise TypeScript interfaces.
- **Never use inline styles:** Or hardcoded hex colors. Use the theme object/tokens.
- **Never fetch inside screens:** Use `useQuery` from a separate file.
- **Never use `FlatList` for feeds:** Use `FlashList`.
- **Never use standard `<Image>`:** Use `Image` from `expo-image`.
- **Always use Zod for forms:** Pass it to `react-hook-form`'s resolver.
- **Always respect RTL:** Use `paddingStart` instead of `paddingLeft`.

## 22. Final Recommendations (Principal Mobile Architect Directive)

**The Implementation Rules that MUST NEVER be violated:**

1. **State Purity:** If you put an API response into Zustand, the PR will be rejected. Server state belongs exclusively to TanStack Query.
2. **UI Thread Blocking:** Any heavy computation MUST be moved out of the render cycle. Use `useMemo`, move it to a background thread (Reanimated worklets), or handle it on the backend. A dropped frame is a failed PR.
3. **Token Compliance:** A designer should be able to change the primary brand color in ONE file (`src/theme/tokens.ts`) and have the entire app update perfectly without searching for hex codes.
