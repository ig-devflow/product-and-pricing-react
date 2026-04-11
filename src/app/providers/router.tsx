import { createBrowserRouter, Navigate, type RouteObject } from 'react-router'
import {
  DivisionCreatePage,
  DivisionDetailsPage,
  DivisionEditPage,
  DivisionListPage,
  DivisionManagerLayout,
} from '@/pages/division-manager'
import { NotFoundPage } from '@/pages/not-found'
import { APP_ROUTES, DIVISION_MANAGER_ROUTES } from '@/shared/config/routes'
import {
  divisionManagerContextualRouteMeta,
  divisionManagerRouteMeta,
} from '@/app/router/route-manifest'
import type { AppRouteHandle } from '@/app/router/route-meta'

export const appRoutes: RouteObject[] = [
  {
    path: APP_ROUTES.root,
    element: <Navigate to={DIVISION_MANAGER_ROUTES.list} replace />,
  },
  {
    path: DIVISION_MANAGER_ROUTES.list,
    element: <DivisionManagerLayout />,
    children: [
      {
        index: true,
        element: <DivisionListPage />,
        handle: {
          shell: divisionManagerRouteMeta,
        } satisfies AppRouteHandle,
      },
      {
        path: 'create',
        element: <DivisionCreatePage />,
        handle: {
          shell: divisionManagerContextualRouteMeta,
        } satisfies AppRouteHandle,
      },
      {
        path: ':divisionId',
        element: <DivisionDetailsPage />,
        handle: {
          shell: divisionManagerContextualRouteMeta,
        } satisfies AppRouteHandle,
      },
      {
        path: ':divisionId/edit',
        element: <DivisionEditPage />,
        handle: {
          shell: divisionManagerContextualRouteMeta,
        } satisfies AppRouteHandle,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]

export const router = createBrowserRouter(appRoutes)
