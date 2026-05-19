# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev           # Start Vite dev server
npm run build         # Type-check + production build
npm run type-check    # TypeScript compiler check only
npm run lint          # Run oxlint + eslint with --fix
npm run format        # Prettier formatting
npm run test:unit     # Vitest unit tests
npm run test:e2e      # Playwright e2e tests (requires preview:e2e first)
npm run preview:e2e   # Build + serve for e2e testing
```

Run a single Vitest test file:
```bash
npx vitest run src/modules/divisions/model/__tests__/mapper.test.ts
```

## Architecture

This is a React 19 admin workspace for managing **Products & Pricing reference data** — specifically Divisions and Centres. The app lives inside a larger host shell that provides navigation tabs (Pricelist, Products, Discounts, etc.); this repo only owns the **Pricing Reference Data** tab.

### Routing

React Router v7, configured in `src/app/config/routes.ts`. Root `/` redirects to `/division-manager`. Each manager section (`/division-manager`, `/centre-manager`) uses a layout route with nested list/create/details/edit child routes.

Route `handle` metadata (defined in `src/app/config/app-shell.ts`) is read by `useAppShellNavigation` to integrate with the host shell's tab system.

### State management

- **Server state**: TanStack Query v5. All API calls go through query/mutation hooks in `src/modules/*/queries/`.
- **Form state**: React Hook Form + Zod. Schemas live in `src/modules/*/model/` alongside DTO mappers and payload builders.
- **URL state**: React Router (navigation, params).

### Module structure

Feature modules live in `src/modules/`. Both `divisions/` and `centres/` follow the same internal layout:

```
modules/<feature>/
├── api/        # fetch functions (raw HTTP calls)
├── queries/    # TanStack Query hooks wrapping api/
├── model/      # types, Zod schemas, DTO mappers, form↔payload converters
├── hooks/      # local UI hooks
└── ui/         # React components specific to this feature
```

Pages in `src/pages/` are thin composition layers — they import module UI components and wire up routing props.

Shared building blocks (API client, common query hooks, reusable UI components, utilities) live in `src/shared/`.

### API & mocking

The API base URL is set via `VITE_API_BASE_URL` (defaults to `http://localhost:5265`). Copy `.env.example` to `.env.local` to configure.

MSW (Mock Service Worker) can be enabled with `VITE_ENABLE_MSW=true`. Handlers and fixture data are in `src/mocks/`.

### Testing

- **Unit tests**: Vitest + Testing Library. Test files sit in `__tests__/` folders next to the code they test. Setup file: `src/tests/setup.ts`.
- **e2e tests**: Playwright, configured for Chromium/Firefox/WebKit. Test files in `e2e/`.

### Path alias

`@/*` maps to `src/*` in both TypeScript and Vite config.
