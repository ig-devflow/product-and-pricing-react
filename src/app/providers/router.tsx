import { createBrowserRouter, Navigate, type RouteObject } from 'react-router';
import {
  DivisionCreatePage,
  DivisionDetailsPage,
  DivisionEditPage,
  DivisionListPage,
  DivisionManagerLayout,
} from '@/pages/division-manager';
import {
  CentreCreatePage,
  CentreDetailsPage,
  CentreEditPage,
  CentreListPage,
  CentreManagerLayout,
} from '@/pages/centre-manager';
import { NotFoundPage } from '@/pages/not-found';
import {
  centreManagerContextualRouteMeta,
  centreManagerRouteMeta,
  divisionManagerContextualRouteMeta,
  divisionManagerRouteMeta,
  type AppRouteHandle,
} from '@/app/config/app-shell';
import { APP_ROUTES, CENTRE_MANAGER_ROUTES, DIVISION_MANAGER_ROUTES } from '@/app/config/routes';

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
    path: CENTRE_MANAGER_ROUTES.list,
    element: <CentreManagerLayout />,
    children: [
      {
        index: true,
        element: <CentreListPage />,
        handle: {
          shell: centreManagerRouteMeta,
        } satisfies AppRouteHandle,
      },
      {
        path: 'create',
        element: <CentreCreatePage />,
        handle: {
          shell: centreManagerContextualRouteMeta,
        } satisfies AppRouteHandle,
      },
      {
        path: ':centreId',
        element: <CentreDetailsPage />,
        handle: {
          shell: centreManagerContextualRouteMeta,
        } satisfies AppRouteHandle,
      },
      {
        path: ':centreId/edit',
        element: <CentreEditPage />,
        handle: {
          shell: centreManagerContextualRouteMeta,
        } satisfies AppRouteHandle,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export const router = createBrowserRouter(appRoutes);
