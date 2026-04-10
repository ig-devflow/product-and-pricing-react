import { useMemo } from 'react';
import { LEGACY_PRODUCTS_PRICING_TABS } from '@/shared/config/routes';

export interface AppShellNavigationState {
  tabs: ReadonlyArray<{ label: string; href: string }>;
}

export const useAppShellNavigation = (): AppShellNavigationState => {
  const tabs = useMemo(
    () => LEGACY_PRODUCTS_PRICING_TABS.map((tab) => ({ ...tab })),
    [],
  );

  return {
    tabs,
  };
};
