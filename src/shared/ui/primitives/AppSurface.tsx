import type { ElementType, HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

type AppSurfaceVariant = 'default' | 'soft' | 'outlined' | 'selected';
type AppSurfacePadding = 'none' | 'sm' | 'md' | 'lg';

export interface AppSurfaceProps extends HTMLAttributes<HTMLElement> {
  as?: Extract<ElementType, 'div' | 'section' | 'article' | 'aside'>;
  variant?: AppSurfaceVariant;
  padding?: AppSurfacePadding;
}

export const AppSurface = ({
  as = 'div',
  variant = 'default',
  padding = 'md',
  className,
  ...rest
}: AppSurfaceProps) => {
  const Component = as;

  return (
    <Component
      className={cn(
        'app-surface',
        `app-surface--${variant}`,
        `app-surface--padding-${padding}`,
        className,
      )}
      {...rest}
    />
  );
};
