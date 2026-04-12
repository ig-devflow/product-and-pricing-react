# Products and Pricing React

React-приложение для управления divisions (list/create/details/edit) в домене Products & Pricing.

## Stack

- React 19 + TypeScript
- Vite 8
- React Router 7
- TanStack Query 5
- React Hook Form + Zod
- Vitest + Testing Library
- Playwright
- MSW (опционально в dev)

## Quick Start

```bash
npm install
npm run dev
```

По умолчанию приложение стартует на Vite dev server.

## Environment

Скопируйте значения из `.env.example` в локальный `.env`:

```env
VITE_API_BASE_URL=https://localhost:7275
# VITE_ENABLE_MSW=true
```

`VITE_ENABLE_MSW=true` включает browser mock worker в dev-режиме.

## Scripts

- `npm run dev` - запуск dev server
- `npm run build` - type-check + production build
- `npm run preview` - preview собранного приложения
- `npm run type-check` - TypeScript проверка
- `npm run lint` - oxlint + eslint (с `--fix`)
- `npm run test:unit -- --run` - unit tests (Vitest)
- `npm run test:e2e` - Playwright e2e

## Project Structure

```text
src/
  app/        # app-level routing, providers, shell config/hooks, global styles
  pages/      # page-level screens (thin composition)
  modules/    # feature modules (divisions)
  shared/     # reusable UI, hooks, libs, API client, config
  mocks/      # MSW handlers and fixture data
  tests/      # shared test utilities
```

## Divisions Module Overview

`src/modules/divisions`:

- `api/` - DTO и API calls
- `hooks/` - page hooks (list/create/edit/details)
- `queries/` - React Query hooks
- `model/` - `types`, `mappers`, `formatters`, `query-keys`
- `ui/` - list/details/form components

## Quality Gate

Перед PR рекомендуется запускать:

```bash
npm run type-check
npm run lint
npm run test:unit -- --run
```
