import { AppPill } from '@/shared/ui/AppPill';
import { AppSummaryRows } from '@/shared/ui/AppSummaryRows';
import { AppSidebarSummary } from '@/shared/ui/patterns';
import type { DivisionDetails, DivisionFormValues } from '@/modules/divisions/model/division';
import { removeProtocol } from '@/modules/divisions/model/mappers';
import { formatDivisionAddressPreview } from '@/modules/divisions/model/validation';

export interface DivisionFormAsideSummaryProps {
  mode: 'create' | 'edit';
  values: DivisionFormValues;
  details?: DivisionDetails | null;
}

export const DivisionFormAsideSummary = ({
  mode,
  values,
  details = null,
}: DivisionFormAsideSummaryProps) => {
  const addressPreview = formatDivisionAddressPreview(values.address);
  const websitePreview = removeProtocol(values.websiteUrl);

  return (
    <AppSidebarSummary
      title={mode === 'create' ? 'Draft preview' : 'Current snapshot'}
      subtitle="Summary"
    >
      <AppSummaryRows>
        <div className="division-form-aside__row">
          <span className="app-summary-card__label">Status</span>
          <span className="app-summary-card__value">
            <AppPill variant={values.isActive ? 'success' : 'neutral'}>
              {values.isActive ? 'Active' : 'Inactive'}
            </AppPill>
          </span>
        </div>

        <div className="division-form-aside__row">
          <span className="app-summary-card__label">Name</span>
          <span className="app-summary-card__value">
            {values.name || 'Untitled division'}
          </span>
        </div>

        <div className="division-form-aside__row">
          <span className="app-summary-card__label">Website</span>
          <span className="app-summary-card__value">
            {websitePreview || 'Not provided'}
          </span>
        </div>

        <div className="division-form-aside__row division-form-aside__row--multiline">
          <span className="app-summary-card__label">Address</span>
          <span className="app-summary-card__value division-form-aside__value--address">
            {addressPreview || 'Address not provided'}
          </span>
        </div>
      </AppSummaryRows>

      <AppSummaryRows
        items={[
          {
            key: 'email',
            label: 'Email',
            value: values.headOfficeEmailAddress || 'Not provided',
          },
          {
            key: 'phone',
            label: 'Phone',
            value: values.headOfficeTelephoneNo || 'Not provided',
          },
          {
            key: 'banner',
            label: 'Banner',
            value:
              values.accreditationBanner?.fileName ||
              (values.accreditationBanner ? 'Uploaded' : 'Not set'),
          },
        ]}
      />

      {details ? (
        <AppSummaryRows
          items={[
            {
              key: 'createdBy',
              label: 'Created by',
              value: details.createdBy,
            },
            {
              key: 'lastModifiedBy',
              label: 'Last modified by',
              value: details.lastModifiedBy,
            },
            {
              key: 'reportTexts',
              label: 'Report texts',
              value: details.reportTexts.length,
            },
          ]}
        />
      ) : null}
    </AppSidebarSummary>
  );
};
