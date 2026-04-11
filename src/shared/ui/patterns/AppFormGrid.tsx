import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

export interface AppFormGridProps {
  columns?: 1 | 2;
  children: ReactNode;
  className?: string;
}

export const AppFormGrid = ({
  columns = 2,
  children,
  className,
}: AppFormGridProps) => (
  <div className={cn('app-form-grid', `app-form-grid--${columns}col`, className)}>
    {children}
  </div>
);
