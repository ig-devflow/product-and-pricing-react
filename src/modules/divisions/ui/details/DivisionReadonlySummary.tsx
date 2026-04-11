import { AppSummaryRows } from '@/shared/ui/AppSummaryRows';
import { AppSidebarSummary } from '@/shared/ui/patterns';
import type { DivisionDetails } from '@/modules/divisions/model/division';

export interface DivisionReadonlySummaryProps {
  division: DivisionDetails;
}

export const DivisionReadonlySummary = ({
  division,
}: DivisionReadonlySummaryProps) => {
  const yearsText = division.years.length
    ? division.years.join(', ')
    : 'No year values';

  return (
    <AppSidebarSummary
      title="Division summary"
      subtitle="Readonly operational snapshot"
    >
      <AppSummaryRows
        items={[
          {
            key: 'status',
            label: 'Status',
            value: division.isActive ? 'Active' : 'Inactive',
          },
          {
            key: 'years',
            label: 'Years',
            value: yearsText,
          },
          {
            key: 'reportTexts',
            label: 'Report texts',
            value: division.reportTexts.length,
          },
        ]}
      />

      <AppSummaryRows
        items={[
          {
            key: 'createdBy',
            label: 'Created by',
            value: division.createdBy,
          },
          {
            key: 'createdOn',
            label: 'Created on',
            value: division.createdOn,
          },
          {
            key: 'lastModifiedBy',
            label: 'Last modified by',
            value: division.lastModifiedBy,
          },
          {
            key: 'lastModifiedOn',
            label: 'Last modified on',
            value: division.lastModifiedOn,
          },
        ]}
      />
    </AppSidebarSummary>
  );
};
