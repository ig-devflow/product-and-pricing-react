import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { AppPill, AppSummaryRows } from '@/shared/ui/data-display';
import { AppSidebarSummary } from '@/shared/ui/patterns';
import type { DivisionFormValues } from '@/modules/divisions/model/form.types';
import type { DivisionDetails } from '@/modules/divisions/model/types';
import {
  buildDivisionAddressText,
  removeProtocol,
} from '@/modules/divisions/model/formatters';

export interface DivisionFormAsideSummaryProps {
  mode: 'create' | 'edit';
  defaultValues: DivisionFormValues;
  details?: DivisionDetails | null;
}

export const DivisionFormAsideSummary = ({
  mode,
  defaultValues,
  details = null,
}: DivisionFormAsideSummaryProps) => {
  const { control } = useFormContext<DivisionFormValues>();

  const [
    name,
    isActive,
    websiteUrl,
    address,
    headOfficeEmailAddress,
    headOfficeTelephoneNo,
    accreditationBanner,
  ] = useWatch({
    control,
    name: [
      'name',
      'isActive',
      'websiteUrl',
      'address',
      'headOfficeEmailAddress',
      'headOfficeTelephoneNo',
      'accreditationBanner',
    ],
  });

  const summaryValues = useMemo<DivisionFormValues>(
    () => ({
      ...defaultValues,
      name: name ?? defaultValues.name,
      isActive: isActive ?? defaultValues.isActive,
      websiteUrl: websiteUrl ?? defaultValues.websiteUrl,
      address: {
        ...defaultValues.address,
        ...address,
      },
      headOfficeEmailAddress:
        headOfficeEmailAddress ?? defaultValues.headOfficeEmailAddress,
      headOfficeTelephoneNo:
        headOfficeTelephoneNo ?? defaultValues.headOfficeTelephoneNo,
      accreditationBanner:
        accreditationBanner === undefined
          ? defaultValues.accreditationBanner
          : accreditationBanner === null
            ? null
            : {
                imageBase64: accreditationBanner.imageBase64 ?? '',
                contentType: accreditationBanner.contentType ?? '',
                fileName: accreditationBanner.fileName ?? '',
              },
    }),
    [
      accreditationBanner,
      address,
      defaultValues,
      headOfficeEmailAddress,
      headOfficeTelephoneNo,
      isActive,
      name,
      websiteUrl,
    ],
  );

  const addressPreview = buildDivisionAddressText(summaryValues.address);
  const websitePreview = removeProtocol(summaryValues.websiteUrl);

  return (
    <AppSidebarSummary
      title={mode === 'create' ? 'Draft preview' : 'Current snapshot'}
      subtitle="Summary"
    >
      <AppSummaryRows>
        <div className="division-form-aside__row">
          <span className="app-summary-card__label">Status</span>
          <span className="app-summary-card__value">
            <AppPill variant={summaryValues.isActive ? 'success' : 'neutral'}>
              {summaryValues.isActive ? 'Active' : 'Inactive'}
            </AppPill>
          </span>
        </div>

        <div className="division-form-aside__row">
          <span className="app-summary-card__label">Name</span>
          <span className="app-summary-card__value">
            {summaryValues.name || 'Untitled division'}
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
            value: summaryValues.headOfficeEmailAddress || 'Not provided',
          },
          {
            key: 'phone',
            label: 'Phone',
            value: summaryValues.headOfficeTelephoneNo || 'Not provided',
          },
          {
            key: 'banner',
            label: 'Banner',
            value:
              summaryValues.accreditationBanner?.fileName ||
              (summaryValues.accreditationBanner ? 'Uploaded' : 'Not set'),
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
