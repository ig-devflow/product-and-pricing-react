import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

export interface AppPageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export const AppPageHeader = ({
  eyebrow = '',
  title,
  subtitle,
  description,
  actions,
  className,
}: AppPageHeaderProps) => {
  const resolvedSubtitle = subtitle ?? description ?? '';

  return (
    <header className={cn('app-page__header', 'app-page-header', className)}>
      <div className="app-page__header-main">
        {eyebrow ? <p className="app-page__eyebrow">{eyebrow}</p> : null}
        <h1 className="app-page__title">{title}</h1>
        {resolvedSubtitle ? (
          <p className="app-page__subtitle">{resolvedSubtitle}</p>
        ) : null}
      </div>
      {actions ? <div className="app-page-header__actions">{actions}</div> : null}
    </header>
  );
};
