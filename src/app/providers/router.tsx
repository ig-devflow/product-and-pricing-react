import { createBrowserRouter, Navigate } from 'react-router';
import {
  DivisionCreatePage,
  DivisionDetailsPage,
  DivisionEditPage,
  DivisionListPage,
  DivisionManagerLayout,
} from '@/pages/division-manager';
import { APP_ROUTES, DIVISION_MANAGER_ROUTES } from '@/shared/config/routes';

export const router = createBrowserRouter([
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
      },
      {
        path: 'create',
        element: <DivisionCreatePage />,
      },
      {
        path: ':divisionId',
        element: <DivisionDetailsPage />,
      },
      {
        path: ':divisionId/edit',
        element: <DivisionEditPage />,
      },
    ],
  },
]);
