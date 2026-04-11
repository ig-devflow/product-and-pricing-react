import {
  type LinkProps,
  Link,
  NavLink,
  type NavLinkProps,
  type RelativeRoutingType,
  type To,
} from 'react-router';
import { cn } from '@/shared/lib/cn';
import type { ReactNode } from 'react';

type AppNavLinkVariant = 'header' | 'utility' | 'footer' | 'tab';

interface BaseAppNavLinkProps {
  to?: To | null;
  variant?: AppNavLinkVariant;
  active?: boolean;
  inert?: boolean;
  forceLink?: boolean;
  className?: string;
  children?: ReactNode;
  replace?: boolean;
  state?: LinkProps['state'];
  target?: string;
  rel?: string;
  reloadDocument?: boolean;
  preventScrollReset?: boolean;
  relative?: RelativeRoutingType;
  viewTransition?: boolean;
}

export type AppNavigationLinkProps = BaseAppNavLinkProps;

export const AppNavLink = ({
  to = null,
  variant = 'utility',
  active = false,
  inert = false,
  forceLink = false,
  className,
  children,
  ...rest
}: AppNavigationLinkProps) => {
  const isInert = inert || !to;
  const baseClassName = cn(
    'app-nav-link',
    `app-nav-link--${variant}`,
    {
      'is-active': active,
      'is-inert': isInert,
    },
    className,
  );

  if (isInert) {
    return <span className={baseClassName}>{children}</span>;
  }

  if (forceLink) {
    return (
      <Link
        className={baseClassName}
        to={to}
        aria-current={active ? 'page' : undefined}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  return (
    <NavLink
      to={to}
      aria-current={active ? 'page' : undefined}
      {...(rest as Omit<NavLinkProps, 'to' | 'className' | 'children'>)}
      className={({ isActive }) =>
        cn(
          'app-nav-link',
          `app-nav-link--${variant}`,
          {
            'is-active': active || isActive,
            'is-inert': isInert,
          },
          className,
        )
      }
    >
      {children}
    </NavLink>
  );
};
