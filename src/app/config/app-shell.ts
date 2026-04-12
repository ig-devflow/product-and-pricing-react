import type { To } from 'react-router';
import { DIVISION_MANAGER_ROUTES } from '@/shared/config/routes';

export type AppShellSection = 'division-manager';

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
  shellSection?: AppShellSection;
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
  shellSection: 'division-manager',
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
