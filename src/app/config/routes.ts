export const APP_ROUTES = {
  root: '/',
  divisionManager: '/division-manager',
} as const;

export const DIVISION_MANAGER_ROUTES = {
  list: '/division-manager',
  create: '/division-manager/create',
  details: (divisionId: string | number) => `/division-manager/${divisionId}`,
  edit: (divisionId: string | number) => `/division-manager/${divisionId}/edit`,
} as const;
