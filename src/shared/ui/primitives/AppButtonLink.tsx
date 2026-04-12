import { Link, type LinkProps, type To } from 'react-router';
import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

type AppButtonLinkVariant = 'primary' | 'secondary' | 'ghost' | 'info';
type AppButtonLinkSize = 'sm' | 'md' | 'lg';

export interface AppButtonLinkProps
  extends Omit<LinkProps, 'to' | 'className' | 'children'> {
  to: To;
  variant?: AppButtonLinkVariant;
  size?: AppButtonLinkSize;
  block?: boolean;
  className?: string;
  children?: ReactNode;
}

export const AppButtonLink = ({
  to,
  variant = 'primary',
  size = 'md',
  block = false,
  className,
  children,
  ...rest
}: AppButtonLinkProps) => (
  <Link
    to={to}
    className={cn(
      'app-button',
      `app-button--${variant}`,
      `app-button--${size}`,
      {
        'app-button--block': block,
      },
      className,
    )}
    {...rest}
  >
    {children}
  </Link>
);
