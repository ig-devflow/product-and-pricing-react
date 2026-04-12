import { useMemo } from 'react';
import { useMatches, type To } from 'react-router';
import {
  appShellContextualTargets,
  appShellTopTabs,
  type AppRouteHandle,
} from '@/app/config/app-shell';

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
  const matches = useMatches();

  return useMemo(() => {
    const shellMeta =
      [...matches]
        .reverse()        
        .map((match) => (match.handle as AppRouteHandle | undefined)?.shell)
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
  }, [matches]);
};
