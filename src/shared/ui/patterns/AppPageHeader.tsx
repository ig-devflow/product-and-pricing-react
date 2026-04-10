import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

export interface AppPageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export const AppPageHeader = ({
  title,
  description,
  actions,
  className,
}: AppPageHeaderProps) => (
  <div className={cn('app-page-header', className)}>
    <div className="app-page-header__content">
      <h1>{title}</h1>
      {description ? <p>{description}</p> : null}
    </div>
    {actions ? <div className="app-page-header__actions">{actions}</div> : null}
  </div>
);
