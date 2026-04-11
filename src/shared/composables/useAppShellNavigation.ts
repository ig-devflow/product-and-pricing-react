import { useMemo } from 'react';
import { matchRoutes, useLocation, type To } from 'react-router';
import { appRouteMetaManifest } from '@/app/router/route-manifest';
import type {
  AppRouteHandle,
  AppShellContextualLink,
  AppShellSection,
  AppShellTabId,
} from '@/app/router/route-meta';
import {
  appShellContextualTargets,
  appShellTopTabs,
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
  activeSection: AppShellSection | null;
  activeTab: AppShellTabId | null;
  topTabs: AppShellTopTabItem[];
  showAllDivisionsLink: boolean;
  allDivisionsTarget: To | null;
  primarySection: AppShellNavItem;
}

export const useAppShellNavigation = (): AppShellNavigationState => {
  const location = useLocation();

  return useMemo(() => {
    const matches = matchRoutes(appRouteMetaManifest, location) ?? [];
    const shellMeta =
      [...matches]
        .reverse()
        .map((match) => (match.route.handle as AppRouteHandle | undefined)?.shell)
        .find(Boolean) ?? null;
    const activeSection = shellMeta?.shellSection ?? null;
    const activeTab = shellMeta?.shellTab ?? null;
    const contextualLink: AppShellContextualLink | null =
      shellMeta?.shellContextualLink ?? null;

    return {
      activeSection,
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
        isActive: activeSection === 'division-manager',
      },
    };
  }, [location]);
};
