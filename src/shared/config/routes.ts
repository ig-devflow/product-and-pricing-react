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

export const LEGACY_PRODUCTS_PRICING_TABS = [
  { label: 'Pricelist', href: '#' },
  { label: 'Products', href: '#' },
  { label: 'Pricing Reference Data', href: '#' },
  { label: 'Calculator', href: '#' },
] as const;
