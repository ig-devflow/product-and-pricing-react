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
import {
  ProductManagerLayout,
  CourseListPage,
  CourseDetailsPage,
  CourseCreatePage,
  CourseEditPage,
  AccommodationListPage,
  AccommodationDetailsPage,
  AccommodationCreatePage,
  AccommodationEditPage,
  RoomDetailsPage,
  RoomCreatePage,
  RoomEditPage,
  AddOnListPage,
  AddOnDetailsPage,
  AddOnCreatePage,
  AddOnEditPage,
  TransferListPage,
  TransferDetailsPage,
  TransferCreatePage,
  TransferEditPage,
  PackageListPage,
  PackageDetailsPage,
  PackageCreatePage,
  PackageEditPage,
} from '@/pages/product-manager';
import { NotFoundPage } from '@/pages/not-found';
import {
  centreManagerContextualRouteMeta,
  centreManagerRouteMeta,
  divisionManagerContextualRouteMeta,
  divisionManagerRouteMeta,
  productManagerRouteMeta,
  type AppRouteHandle,
} from '@/app/config/app-shell';
import { APP_ROUTES, CENTRE_MANAGER_ROUTES, DIVISION_MANAGER_ROUTES, PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';

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
  // ─── Product Manager ──────────────────────────────────────────────────────
  {
    path: PRODUCT_MANAGER_ROUTES.root,
    element: <ProductManagerLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={PRODUCT_MANAGER_ROUTES.courses.list} replace />,
      },
      // Courses
      {
        path: 'courses',
        element: <CourseListPage />,
        handle: { shell: productManagerRouteMeta } satisfies AppRouteHandle,
      },
      {
        path: 'courses/create',
        element: <CourseCreatePage />,
        handle: { shell: productManagerRouteMeta } satisfies AppRouteHandle,
      },
      {
        path: 'courses/:courseId',
        element: <CourseDetailsPage />,
        handle: { shell: productManagerRouteMeta } satisfies AppRouteHandle,
      },
      {
        path: 'courses/:courseId/edit',
        element: <CourseEditPage />,
        handle: { shell: productManagerRouteMeta } satisfies AppRouteHandle,
      },
      // Accommodations
      {
        path: 'accommodations',
        element: <AccommodationListPage />,
        handle: { shell: productManagerRouteMeta } satisfies AppRouteHandle,
      },
      {
        path: 'accommodations/create',
        element: <AccommodationCreatePage />,
        handle: { shell: productManagerRouteMeta } satisfies AppRouteHandle,
      },
      {
        path: 'accommodations/:accommodationId',
        element: <AccommodationDetailsPage />,
        handle: { shell: productManagerRouteMeta } satisfies AppRouteHandle,
      },
      {
        path: 'accommodations/:accommodationId/edit',
        element: <AccommodationEditPage />,
        handle: { shell: productManagerRouteMeta } satisfies AppRouteHandle,
      },
      // Rooms (nested under accommodations)
      {
        path: 'accommodations/:accommodationId/rooms/create',
        element: <RoomCreatePage />,
        handle: { shell: productManagerRouteMeta } satisfies AppRouteHandle,
      },
      {
        path: 'accommodations/:accommodationId/rooms/:roomId',
        element: <RoomDetailsPage />,
        handle: { shell: productManagerRouteMeta } satisfies AppRouteHandle,
      },
      {
        path: 'accommodations/:accommodationId/rooms/:roomId/edit',
        element: <RoomEditPage />,
        handle: { shell: productManagerRouteMeta } satisfies AppRouteHandle,
      },
      // Add-ons
      {
        path: 'addons',
        element: <AddOnListPage />,
        handle: { shell: productManagerRouteMeta } satisfies AppRouteHandle,
      },
      {
        path: 'addons/create',
        element: <AddOnCreatePage />,
        handle: { shell: productManagerRouteMeta } satisfies AppRouteHandle,
      },
      {
        path: 'addons/:addonId',
        element: <AddOnDetailsPage />,
        handle: { shell: productManagerRouteMeta } satisfies AppRouteHandle,
      },
      {
        path: 'addons/:addonId/edit',
        element: <AddOnEditPage />,
        handle: { shell: productManagerRouteMeta } satisfies AppRouteHandle,
      },
      // Transfers
      {
        path: 'transfers',
        element: <TransferListPage />,
        handle: { shell: productManagerRouteMeta } satisfies AppRouteHandle,
      },
      {
        path: 'transfers/create',
        element: <TransferCreatePage />,
        handle: { shell: productManagerRouteMeta } satisfies AppRouteHandle,
      },
      {
        path: 'transfers/:transferId',
        element: <TransferDetailsPage />,
        handle: { shell: productManagerRouteMeta } satisfies AppRouteHandle,
      },
      {
        path: 'transfers/:transferId/edit',
        element: <TransferEditPage />,
        handle: { shell: productManagerRouteMeta } satisfies AppRouteHandle,
      },
      // Packages
      {
        path: 'packages',
        element: <PackageListPage />,
        handle: { shell: productManagerRouteMeta } satisfies AppRouteHandle,
      },
      {
        path: 'packages/create',
        element: <PackageCreatePage />,
        handle: { shell: productManagerRouteMeta } satisfies AppRouteHandle,
      },
      {
        path: 'packages/:packageId',
        element: <PackageDetailsPage />,
        handle: { shell: productManagerRouteMeta } satisfies AppRouteHandle,
      },
      {
        path: 'packages/:packageId/edit',
        element: <PackageEditPage />,
        handle: { shell: productManagerRouteMeta } satisfies AppRouteHandle,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export const router = createBrowserRouter(appRoutes);
