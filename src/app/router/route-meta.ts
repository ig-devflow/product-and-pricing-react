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
