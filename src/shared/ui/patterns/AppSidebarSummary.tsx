import { cn } from '@/shared/lib/cn';

export interface AppSidebarSummaryItem {
  label: string;
  value: string;
}

export interface AppSidebarSummaryProps {
  title: string;
  items: AppSidebarSummaryItem[];
  className?: string;
}

export const AppSidebarSummary = ({
  title,
  items,
  className,
}: AppSidebarSummaryProps) => (
  <aside className={cn('app-sidebar-summary', className)}>
    <h2>{title}</h2>
    <dl>
      {items.map((item) => (
        <div key={item.label} className="app-sidebar-summary__item">
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  </aside>
);
