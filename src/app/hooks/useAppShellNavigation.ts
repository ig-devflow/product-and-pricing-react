import { useMemo } from 'react';
import { matchRoutes, useLocation, type To } from 'react-router';
import {
  appShellContextualTargets,
  appShellTopTabs,
  type AppRouteHandle,
} from '@/app/config/app-shell';
import { appRoutes } from '@/app/providers/router';

interface AppShellTopTabItem {
  id: string;
  label: string;
  to: To | null;
  isActive: boolean;
  inert: boolean;
}

export interface AppShellNavigationState {
  topTabs: AppShellTopTabItem[];
  showAllDivisionsLink: boolean;
  allDivisionsTarget: To | null;
}

export const useAppShellNavigation = (): AppShellNavigationState => {
  const location = useLocation();

  return useMemo(() => {
    const matches = matchRoutes(appRoutes, location) ?? [];
    const shellMeta =
      [...matches]
        .reverse()
        .map((match) => (match.route.handle as AppRouteHandle | undefined)?.shell)
        .find(Boolean) ?? null;
    const activeTab = shellMeta?.shellTab ?? null;
    const contextualLink = shellMeta?.shellContextualLink ?? null;

    return {
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
    };
  }, [location]);
};
