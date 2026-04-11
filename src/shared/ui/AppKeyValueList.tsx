import type { ReactNode } from 'react';

export interface AppKeyValueItem {
  key: string;
  label: string;
  value: string | number;
}

export interface AppKeyValueListProps {
  items?: AppKeyValueItem[];
  children?: ReactNode;
}

export const AppKeyValueList = ({
  items = [],
  children,
}: AppKeyValueListProps) => (
  <dl className="app-key-value-list">
    {items.length
      ? items.map((item) => (
          <div key={item.key} className="app-key-value-list__row">
            <dt className="app-key-value-list__label">{item.label}</dt>
            <dd className="app-key-value-list__value">{item.value}</dd>
          </div>
        ))
      : children}
  </dl>
);
