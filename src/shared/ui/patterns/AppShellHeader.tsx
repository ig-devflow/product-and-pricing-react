import { useAppShellNavigation } from '@/shared/composables/useAppShellNavigation';
import { DIVISION_MANAGER_ROUTES } from '@/shared/config/routes';
import { AppNavLink } from '@/shared/ui/primitives';
import { AppBrandMark } from '@/shared/ui/patterns/AppBrandMark';

export interface AppShellHeaderProps {
  showAllDivisionsLink?: boolean;
}

export const AppShellHeader = ({ showAllDivisionsLink }: AppShellHeaderProps) => {
  const navigation = useAppShellNavigation();
  const resolvedShowAllDivisionsLink =
    showAllDivisionsLink ?? navigation.showAllDivisionsLink;
  const allDivisionsTarget =
    navigation.allDivisionsTarget ?? DIVISION_MANAGER_ROUTES.list;

  return (
    <header className="app-shell-header">
      <div className="app-shell-header__service-strip">
        <div className="app-container app-shell-header__service-inner">
          <p className="app-shell-header__service-label">Division operations workspace</p>
          {resolvedShowAllDivisionsLink ? (
            <AppNavLink to={allDivisionsTarget} variant="utility" forceLink>
              All divisions
            </AppNavLink>
          ) : null}
        </div>
      </div>

      <div className="app-shell-header__main">
        <div className="app-container app-shell-header__main-inner">
          <AppBrandMark />

          <nav
            className="app-shell-header__tab-nav"
            aria-label="Products and Pricing sections"
          >
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
