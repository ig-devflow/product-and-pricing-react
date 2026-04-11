import type { RouteObject } from 'react-router';
import type { AppRouteHandle, AppShellRouteMeta } from './route-meta';

export const divisionManagerRouteMeta: AppShellRouteMeta = {
  shellSection: 'division-manager',
  shellTab: 'pricing-reference-data',
};

export const divisionManagerContextualRouteMeta: AppShellRouteMeta = {
  ...divisionManagerRouteMeta,
  shellContextualLink: 'all-divisions',
};

export const appRouteMetaManifest: RouteObject[] = [
  {
    path: '/',
  },
  {
    path: '/division-manager',
    handle: {
      shell: divisionManagerRouteMeta,
    } satisfies AppRouteHandle,
  },
  {
    path: '/division-manager/create',
    handle: {
      shell: divisionManagerContextualRouteMeta,
    } satisfies AppRouteHandle,
  },
  {
    path: '/division-manager/:divisionId',
    handle: {
      shell: divisionManagerContextualRouteMeta,
    } satisfies AppRouteHandle,
  },
  {
    path: '/division-manager/:divisionId/edit',
    handle: {
      shell: divisionManagerContextualRouteMeta,
    } satisfies AppRouteHandle,
  },
  {
    path: '*',
  },
];
