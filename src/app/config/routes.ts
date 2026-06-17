export const APP_ROUTES = {
  root: '/',
  divisionManager: '/division-manager',
  centreManager: '/centre-manager',
  productManager: '/product-manager',
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

const pm = APP_ROUTES.productManager;

const cm = '/categories-manager';

export const CATEGORIES_MANAGER_ROUTES = {
  root: cm,
  accountCategories: {
    list: `${cm}/account-categories`,
    create: `${cm}/account-categories/create`,
    details: (id: string | number) => `${cm}/account-categories/${id}`,
    edit: (id: string | number) => `${cm}/account-categories/${id}/edit`,
  },
  productCategories: {
    list: `${cm}/product-categories`,
    create: `${cm}/product-categories/create`,
    details: (id: string | number) => `${cm}/product-categories/${id}`,
    edit: (id: string | number) => `${cm}/product-categories/${id}/edit`,
  },
} as const;

export const PRODUCT_MANAGER_ROUTES = {
  root: pm,
  courses: {
    list: `${pm}/courses`,
    create: `${pm}/courses/create`,
    details: (id: string | number) => `${pm}/courses/${id}`,
    edit: (id: string | number) => `${pm}/courses/${id}/edit`,
  },
  accommodations: {
    list: `${pm}/accommodations`,
    create: `${pm}/accommodations/create`,
    details: (id: string | number) => `${pm}/accommodations/${id}`,
    edit: (id: string | number) => `${pm}/accommodations/${id}/edit`,
  },
  rooms: {
    create: (accommodationId: string | number) =>
      `${pm}/accommodations/${accommodationId}/rooms/create`,
    details: (accommodationId: string | number, roomId: string | number) =>
      `${pm}/accommodations/${accommodationId}/rooms/${roomId}`,
    edit: (accommodationId: string | number, roomId: string | number) =>
      `${pm}/accommodations/${accommodationId}/rooms/${roomId}/edit`,
  },
  addons: {
    list: `${pm}/addons`,
    create: `${pm}/addons/create`,
    details: (id: string | number) => `${pm}/addons/${id}`,
    edit: (id: string | number) => `${pm}/addons/${id}/edit`,
  },
  transfers: {
    list: `${pm}/transfers`,
    create: `${pm}/transfers/create`,
    details: (id: string | number) => `${pm}/transfers/${id}`,
    edit: (id: string | number) => `${pm}/transfers/${id}/edit`,
  },
  packages: {
    list: `${pm}/packages`,
    create: `${pm}/packages/create`,
    details: (id: string | number) => `${pm}/packages/${id}`,
    edit: (id: string | number) => `${pm}/packages/${id}/edit`,
  },
} as const;
