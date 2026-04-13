export const APP_ROUTES = {
  root: '/',
  divisionManager: '/division-manager',
} as const;

export const DIVISION_MANAGER_ROUTES = {
  list: APP_ROUTES.divisionManager,
  create: `${APP_ROUTES.divisionManager}/create`,
  details: (divisionId: string | number) =>
    `${APP_ROUTES.divisionManager}/${divisionId}`,
  edit: (divisionId: string | number) =>
    `${APP_ROUTES.divisionManager}/${divisionId}/edit`,
} as const;
