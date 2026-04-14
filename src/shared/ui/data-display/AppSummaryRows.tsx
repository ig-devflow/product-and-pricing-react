import type { ReactNode } from 'react';

export interface AppSummaryRowItem {
  key: string;
  label: string;
  value: string | number;
}

export interface AppSummaryRowsProps {
  items?: AppSummaryRowItem[];
  children?: ReactNode;
}

export const AppSummaryRows = ({
  items = [],
  children,
}: AppSummaryRowsProps) => (
  <div className="app-summary-card__section app-summary-rows">
    {items.length
      ? items.map((item) => (
          <div key={item.key} className="app-summary-card__row">
            <span className="app-summary-card__label">{item.label}</span>
            <span className="app-summary-card__value">{item.value}</span>
          </div>
        ))
      : children}
  </div>
);
