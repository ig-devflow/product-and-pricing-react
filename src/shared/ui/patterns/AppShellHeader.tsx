import { DIVISION_MANAGER_ROUTES } from '@/shared/config/routes';
import { useAppShellNavigation } from '@/shared/composables/useAppShellNavigation';
import { AppNavLink } from '@/shared/ui/primitives';

export interface AppShellHeaderProps {
  showAllDivisionsLink: boolean;
}

export const AppShellHeader = ({ showAllDivisionsLink }: AppShellHeaderProps) => {
  const navigation = useAppShellNavigation();

  return (
    <header className="app-shell-header">
      <div className="app-shell-header__top">
        <p className="app-shell-header__brand">Products and Pricing</p>
        {showAllDivisionsLink ? (
          <AppNavLink to={DIVISION_MANAGER_ROUTES.list} forceLink>
            All divisions
          </AppNavLink>
        ) : null}
      </div>
      <nav
        className="app-shell-header__tabs"
        aria-label="Products and Pricing sections"
      >
        {navigation.tabs.map((tab) => (
          <a key={tab.label} className="app-shell-header__tab" href={tab.href}>
            {tab.label}
          </a>
        ))}
      </nav>
    </header>
  );
};
