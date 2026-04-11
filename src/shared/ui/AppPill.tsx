import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

type AppPillVariant = 'neutral' | 'info' | 'success' | 'warning';

export interface AppPillProps {
  variant?: AppPillVariant;
  children: ReactNode;
  className?: string;
}

export const AppPill = ({
  variant = 'neutral',
  children,
  className,
}: AppPillProps) => (
  <span className={cn('app-pill', `app-pill--${variant}`, className)}>{children}</span>
);
