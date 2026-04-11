import { useMemo } from 'react';
import { matchPath, useLocation, type To } from 'react-router';
import {
  appShellContextualTargets,
  appShellTopTabs,
  type AppShellContextualLink,
  type AppShellTopTabId,
} from '@/shared/config/app-shell';
import { DIVISION_MANAGER_ROUTES } from '@/shared/config/routes';

interface AppShellNavItem {
  id: string;
  label: string;
  to: To;
  isActive: boolean;
}

interface AppShellTopTabItem {
  id: string;
  label: string;
  to: To | null;
  isActive: boolean;
  inert: boolean;
}

export interface AppShellNavigationState {
  activeSection: 'division-manager';
  activeTab: AppShellTopTabId | null;
  topTabs: AppShellTopTabItem[];
  showAllDivisionsLink: boolean;
  allDivisionsTarget: To | null;
  primarySection: AppShellNavItem;
}

export const useAppShellNavigation = (): AppShellNavigationState => {
  const location = useLocation();

  return useMemo(() => {
    const path = location.pathname;
    const onListPage = path === DIVISION_MANAGER_ROUTES.list;
    const onCreatePage = path === DIVISION_MANAGER_ROUTES.create;
    const onDetailsPage = Boolean(
      matchPath({ path: '/division-manager/:divisionId' }, path),
    );
    const onEditPage = Boolean(
      matchPath({ path: '/division-manager/:divisionId/edit' }, path),
    );

    const contextualLink: AppShellContextualLink | null =
      !onListPage && (onCreatePage || onDetailsPage || onEditPage)
        ? 'all-divisions'
        : null;
    const activeTab: AppShellTopTabId | null =
      path.startsWith(DIVISION_MANAGER_ROUTES.list)
        ? 'pricing-reference-data'
        : null;

    return {
      activeSection: 'division-manager',
      activeTab,
      topTabs: appShellTopTabs.map((tab) => ({
        id: tab.id,
        label: tab.label,
        to: tab.to ?? null,
        inert: tab.inert ?? !tab.to,
        isActive: tab.id === activeTab,
      })),
      showAllDivisionsLink: contextualLink === 'all-divisions',
      allDivisionsTarget: contextualLink
        ? appShellContextualTargets[contextualLink]
        : null,
      primarySection: {
        id: 'division-manager',
        label: 'Division Manager',
        to: DIVISION_MANAGER_ROUTES.list,
        isActive: true,
      },
    };
  }, [location.pathname]);
};
