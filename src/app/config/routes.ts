export const APP_ROUTES = {
  root: '/',
  divisionManager: '/division-manager',
  centreManager: '/centre-manager',
} as const;

export const DIVISION_MANAGER_ROUTES = {
  list: APP_ROUTES.divisionManager,
  create: `${APP_ROUTES.divisionManager}/create`,
  details: (divisionId: string | number) =>
    `${APP_ROUTES.divisionManager}/${divisionId}`,
  edit: (divisionId: string | number) =>
    `${APP_ROUTES.divisionManager}/${divisionId}/edit`,
} as const;

export const CENTRE_MANAGER_ROUTES = {
  list: APP_ROUTES.centreManager,
  create: `${APP_ROUTES.centreManager}/create`,
  details: (centreId: string | number) =>
    `${APP_ROUTES.centreManager}/${centreId}`,
  edit: (centreId: string | number) =>
    `${APP_ROUTES.centreManager}/${centreId}/edit`,
} as const;
