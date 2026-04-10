import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

export interface AppFormGridProps {
  children: ReactNode;
  className?: string;
}

export const AppFormGrid = ({ children, className }: AppFormGridProps) => (
  <div className={cn('app-form-grid', className)}>{children}</div>
);
