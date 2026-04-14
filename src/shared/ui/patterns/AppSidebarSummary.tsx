import { cn } from '@/shared/lib/cn';
import { AppSurface } from '@/shared/ui/primitives';
import { AppSummaryRows } from '@/shared/ui/data-display';
import type { ReactNode } from 'react';

export interface AppSidebarSummaryItem {
  label: string;
  value: string | number;
}

export interface AppSidebarSummaryProps {
  title?: string;
  subtitle?: string;
  sticky?: boolean;
  items?: AppSidebarSummaryItem[];
  children?: ReactNode;
  className?: string;
}

export const AppSidebarSummary = ({
  title = '',
  subtitle = '',
  sticky = true,
  items = [],
  children,
  className,
}: AppSidebarSummaryProps) => (
  <AppSurface
    as="aside"
    padding="lg"
    className={cn(
      'app-summary-card',
      'app-sidebar-summary',
      {
        'app-sidebar-summary--sticky': sticky,
      },
      className,
    )}
  >
    {title || subtitle ? (
      <div className="app-summary-card__header">
        {title ? <h2 className="app-summary-card__title">{title}</h2> : null}
        {subtitle ? <p className="app-summary-card__subtitle">{subtitle}</p> : null}
      </div>
    ) : null}
    {items.length ? (
      <AppSummaryRows
        items={items.map((item) => ({
          key: item.label,
          label: item.label,
          value: item.value,
        }))}
      />
    ) : (
      children
    )}
  </AppSurface>
);
