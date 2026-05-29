import type { ReactNode } from 'react';
import type { To } from 'react-router';
import { Link } from 'react-router';
import { cn } from '@/shared/lib/cn';
import { AppNavLink } from '@/shared/ui/primitives';
import type {
  AppShellDropdownFooter,
  AppShellDropdownGroup,
} from '@/app/config/app-shell';

export interface AppShellHeaderTab {
  id: string;
  label: string;
  to: To | null;
  isActive: boolean;
  inert: boolean;
  dropdownGroups?: AppShellDropdownGroup[];
  dropdownFooter?: AppShellDropdownFooter;
  isMegaMenu?: boolean;
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
  subNav?: ReactNode;
}

interface TabDropdownMenuProps {
  groups: AppShellDropdownGroup[];
  footer?: AppShellDropdownFooter;
  isMegaMenu?: boolean;
}

const TabDropdownMenu = ({ groups, footer, isMegaMenu }: TabDropdownMenuProps) => (
  <div
    className={cn('app-shell-header__dropdown', {
      'app-shell-header__dropdown--mega': isMegaMenu,
    })}
    role="menu"
  >
    <div
      className={
        isMegaMenu
          ? 'app-shell-header__dropdown-grid'
          : 'app-shell-header__dropdown-list'
      }
    >
      {groups.map((group) => (
        <div key={group.id} className="app-shell-header__dropdown-group">
          {group.eyebrow ? (
            <p className="app-shell-header__dropdown-eyebrow">{group.eyebrow}</p>
          ) : null}
          {group.items.map((item) => {
            const labelContent = (
              <>
                <span className="app-shell-header__dropdown-label">
                  {item.label}
                  {item.badge ? (
                    <span
                      className={`app-shell-header__dropdown-badge app-shell-header__dropdown-badge--${item.badge}`}
                      aria-hidden="true"
                    />
                  ) : null}
                </span>
                {item.hint ? (
                  <span className="app-shell-header__dropdown-hint">{item.hint}</span>
                ) : null}
              </>
            );
            return item.to ? (
              <Link
                key={item.id}
                to={item.to}
                className="app-shell-header__dropdown-link"
              >
                {labelContent}
              </Link>
            ) : (
              <div
                key={item.id}
                className="app-shell-header__dropdown-link app-shell-header__dropdown-link--inert"
              >
                {labelContent}
              </div>
            );
          })}
        </div>
      ))}
    </div>
    {footer ? (
      <div className="app-shell-header__dropdown-footer">
        <span className="app-shell-header__dropdown-footer-meta">{footer.meta}</span>
        {footer.actionTo && footer.actionLabel ? (
          <Link to={footer.actionTo} className="app-shell-header__dropdown-footer-action">
            {footer.actionLabel}
          </Link>
        ) : null}
      </div>
    ) : null}
  </div>
);

export const AppShellHeader = ({
  navigation,
  serviceLabel = '',
  contextualLinkLabel = '',
  sectionsAriaLabel,
  brandMark,
  showContextualLink,
  subNav,
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
              {navigation.topTabs.map((tab) => {
                if (tab.dropdownGroups?.length) {
                  return (
                    <div key={tab.id} className="app-shell-header__tab-item">
                      <button
                        type="button"
                        className={cn(
                          'app-nav-link',
                          'app-nav-link--tab',
                          'app-shell-header__tab-trigger',
                          { 'is-active': tab.isActive },
                        )}
                      >
                        {tab.label}
                        <span
                          className="app-shell-header__tab-chevron"
                          aria-hidden="true"
                        />
                      </button>
                      <TabDropdownMenu
                        groups={tab.dropdownGroups}
                        footer={tab.dropdownFooter}
                        isMegaMenu={tab.isMegaMenu}
                      />
                    </div>
                  );
                }

                return (
                  <AppNavLink
                    key={tab.id}
                    to={tab.to}
                    active={tab.isActive}
                    inert={tab.inert}
                    variant="tab"
                  >
                    {tab.label}
                  </AppNavLink>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
      {subNav ? (
        <div className="app-shell-header__subnav">
          {subNav}
        </div>
      ) : null}
    </header>
  );
};
