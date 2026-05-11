import { AppSummaryRows } from '@/shared/ui/data-display';
import { AppSidebarSummary } from '@/shared/ui/patterns';
import { buildAuditDisplayText } from '@/modules/divisions/model/formatters';
import type { DivisionDetails } from '@/modules/divisions/model/types';

export interface DivisionReadonlySummaryProps {
  division: DivisionDetails;
}

export const DivisionReadonlySummary = ({
  division,
}: DivisionReadonlySummaryProps) => {
  const createdText = buildAuditDisplayText(
    division.createdAtText,
    division.createdByText,
    `Unknown date by ${division.createdByText}`,
  );
  const updatedText = buildAuditDisplayText(
    division.updatedAtText,
    division.updatedByText,
    'Not updated yet',
  );

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
            key: 'texts',
            label: 'Texts',
            value: division.texts.length,
          },
          {
            key: 'banner',
            label: 'Banner',
            value:
              division.accreditationBanner?.fileName ||
              (division.accreditationBanner ? 'Uploaded' : 'Not set'),
          },
          {
            key: 'created',
            label: 'Created',
            value: createdText,
          },
          {
            key: 'updated',
            label: 'Last updated',
            value: updatedText,
          },
        ]}
      />

      <AppSummaryRows
        items={[
          {
            key: 'version',
            label: 'Version',
            value: division.version,
          },
        ]}
      />
    </AppSidebarSummary>
  );
};
