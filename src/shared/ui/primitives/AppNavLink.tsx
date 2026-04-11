import {
  NavLink,
  type NavLinkProps,
  type LinkProps,
  Link,
} from 'react-router';
import { cn } from '@/shared/lib/cn';

interface BaseAppNavLinkProps {
  className?: string;
  activeClassName?: string;
}

type AppNavLinkProps = BaseAppNavLinkProps &
  Omit<NavLinkProps, 'className'> & {
    forceLink?: false;
  };

type AppLinkProps = BaseAppNavLinkProps &
  Omit<LinkProps, 'className'> & {
    forceLink: true;
  };

export type AppNavigationLinkProps = AppNavLinkProps | AppLinkProps;

export const AppNavLink = ({
  className,
  activeClassName = 'is-active',
  forceLink = false,
  ...rest
}: AppNavigationLinkProps) => {
  if (forceLink) {
    const linkProps = rest as Omit<LinkProps, 'className'>;

    return <Link className={cn('app-nav-link', className)} {...linkProps} />;
  }

  const navLinkProps = rest as Omit<NavLinkProps, 'className'>;

  return (
    <NavLink
      {...navLinkProps}
      className={({ isActive }) =>
        cn('app-nav-link', className, isActive && activeClassName)
      }
    />
  );
};
