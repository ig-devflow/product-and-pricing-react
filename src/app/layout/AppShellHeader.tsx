import type { ReactNode } from 'react';
import type { To } from 'react-router';
import { AppNavLink } from '@/shared/ui/primitives';

export interface AppShellHeaderTab {
  id: string;
  label: string;
  to: To | null;
  isActive: boolean;
  inert: boolean;
}

export interface AppShellHeaderNavigation {
  topTabs: AppShellHeaderTab[];
  showAllDivisionsLink: boolean;
  allDivisionsTarget: To | null;
}

export interface AppShellHeaderProps {
  navigation: AppShellHeaderNavigation;
  serviceLabel?: string;
  contextualLinkLabel?: string;
  sectionsAriaLabel?: string;
  brandMark: ReactNode;
  showContextualLink?: boolean;
}

export const AppShellHeader = ({
  navigation,
  serviceLabel = '',
  contextualLinkLabel = '',
  sectionsAriaLabel,
  brandMark,
  showContextualLink,
}: AppShellHeaderProps) => {
  const resolvedShowContextualLink =
    showContextualLink ?? navigation.showAllDivisionsLink;
  const contextualLinkTarget = navigation.allDivisionsTarget;

  return (
    <header className="app-shell-header">
      <div className="app-shell-header__service-strip">
        <div className="app-container app-shell-header__service-inner">
          {serviceLabel ? (
            <p className="app-shell-header__service-label">{serviceLabel}</p>
          ) : null}
          {resolvedShowContextualLink && contextualLinkTarget && contextualLinkLabel ? (
            <AppNavLink to={contextualLinkTarget} variant="utility" forceLink>
              {contextualLinkLabel}
            </AppNavLink>
          ) : null}
        </div>
      </div>

      <div className="app-shell-header__main">
        <div className="app-container app-shell-header__main-inner">
          {brandMark}

          <nav className="app-shell-header__tab-nav" aria-label={sectionsAriaLabel}>
            <div className="app-shell-header__tab-list">
              {navigation.topTabs.map((tab) => (
                <AppNavLink
                  key={tab.id}
                  to={tab.to}
                  active={tab.isActive}
                  inert={tab.inert}
                  variant="tab"
                >
                  {tab.label}
                </AppNavLink>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
