import type { HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

export interface AppSurfaceProps extends HTMLAttributes<HTMLElement> {
  as?: 'section' | 'article' | 'div';
}

export const AppSurface = ({ as = 'section', className, ...rest }: AppSurfaceProps) => {
  const Component = as;

  return <Component className={cn('app-surface', className)} {...rest} />;
};
