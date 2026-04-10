import type { ReactNode } from 'react';
import { AppSurface } from '@/shared/ui/primitives';
import { cn } from '@/shared/lib/cn';

export interface AppSectionCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export const AppSectionCard = ({
  title,
  description,
  children,
  className,
}: AppSectionCardProps) => (
  <AppSurface className={cn('app-section-card', className)}>
    <header className="app-section-card__header">
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
    <div className="app-section-card__body">{children}</div>
  </AppSurface>
);
