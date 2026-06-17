import type { ReactNode } from 'react';
import { AppSummaryRows } from '@/shared/ui/data-display';
import { AppSidebarSummary } from '@/shared/ui/patterns';
import type { AuditFields } from '../model/audit';

export interface ProductReadonlySummaryProps {
  title: string;
  isActive: boolean;
  audit: AuditFields;
  extraItems?: ReactNode;
}

export const ProductReadonlySummary = ({
  title,
  isActive,
  audit,
  extraItems,
}: ProductReadonlySummaryProps) => {
  const createdText = audit.createdAtText
    ? `${audit.createdAtText} by ${audit.createdByText}`
    : `Unknown date by ${audit.createdByText}`;
  const updatedText = audit.updatedAtText
    ? `${audit.updatedAtText} by ${audit.updatedByText}`
    : 'Not updated yet';

  return (
    <AppSidebarSummary title={title} subtitle="Read-only operational snapshot">
      <AppSummaryRows
        items={[
          { key: 'status', label: 'Status', value: isActive ? 'Active' : 'Inactive' },
          { key: 'created', label: 'Created', value: createdText },
          { key: 'updated', label: 'Last updated', value: updatedText },
        ]}
      />
      {extraItems}
      <AppSummaryRows
        items={[{ key: 'version', label: 'Version', value: audit.version }]}
      />
    </AppSidebarSummary>
  );
};
