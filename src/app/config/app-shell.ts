import type { To } from 'react-router';
import { DIVISION_MANAGER_ROUTES } from '@/app/config/routes';

export type AppShellTabId =
  | 'pricelist'
  | 'products'
  | 'discounts'
  | 'agents'
  | 'pricing-reference-data'
  | 'new-pricing-year'
  | 'calculator';

export type AppShellContextualLink = 'all-divisions';

export interface AppShellRouteMeta {
  shellTab?: AppShellTabId;
  shellContextualLink?: AppShellContextualLink;
}

export interface AppRouteHandle {
  shell?: AppShellRouteMeta;
}

export interface AppShellTopTabConfig {
  id: AppShellTabId;
  label: string;
  to?: To | null;
  inert?: boolean;
}

export interface AppShellFooterLinkConfig {
  id: string;
  label: string;
  to: To;
}

export const divisionManagerRouteMeta: AppShellRouteMeta = {
  shellTab: 'pricing-reference-data',
};

export const divisionManagerContextualRouteMeta: AppShellRouteMeta = {
  ...divisionManagerRouteMeta,
  shellContextualLink: 'all-divisions',
};

export const appShellTopTabs: AppShellTopTabConfig[] = [
  {
    id: 'pricelist',
    label: 'Pricelist',
    inert: true,
  },
  {
    id: 'products',
    label: 'Products',
    inert: true,
  },
  {
    id: 'discounts',
    label: 'Discounts',
    inert: true,
  },
  {
    id: 'agents',
    label: 'Agents',
    inert: true,
  },
  {
    id: 'pricing-reference-data',
    label: 'Pricing Reference Data',
    inert: true,
  },
  {
    id: 'new-pricing-year',
    label: 'New Pricing Year',
    inert: true,
  },
  {
    id: 'calculator',
    label: 'Calculator',
    inert: true,
  },
];

export const appShellContextualTargets: Record<AppShellContextualLink, To> = {
  'all-divisions': DIVISION_MANAGER_ROUTES.list,
};

export const appShellBrand = {
  to: DIVISION_MANAGER_ROUTES.list,
  title: 'Products & Pricing',
  subtitle: 'Division Manager',
  ariaLabel: 'Products and Pricing home',
} as const;

export const appShellHeaderCopy = {
  serviceLabel: 'Division operations workspace',
  contextualLinkLabel: 'All divisions',
  sectionsAriaLabel: 'Products and Pricing sections',
} as const;

export const appShellFooterCopy = {
  title: 'Products & Pricing',
  description:
    'Division Manager keeps division details, pricing context, and content settings in one clean workspace.',
  metaTitle: 'Product',
  metaDescription: 'Admin shell for operational workflows.',
  copyrightLabel: 'Products & Pricing. Internal product interface.',
} as const;

export const appShellFooterLinks: AppShellFooterLinkConfig[] = [
  {
    id: 'division-manager',
    label: 'Division Manager',
    to: DIVISION_MANAGER_ROUTES.list,
  },
  {
    id: 'create-division',
    label: 'Create division',
    to: DIVISION_MANAGER_ROUTES.create,
  },
];
