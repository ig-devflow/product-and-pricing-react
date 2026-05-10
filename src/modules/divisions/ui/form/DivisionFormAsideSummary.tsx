import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { AppPill, AppSummaryRows } from '@/shared/ui/data-display';
import { AppSidebarSummary } from '@/shared/ui/patterns';
import { findReferenceDataNameById } from '@/shared/lib/reference-data/findReferenceDataNameById';
import { useCountriesQuery } from '@/shared/queries/useCountriesQuery';
import type { DivisionFormValues } from '@/modules/divisions/model/form.types';
import type { DivisionDetails } from '@/modules/divisions/model/types';
import { buildDivisionAddressText, removeProtocol } from '@/modules/divisions/model/formatters';

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
  const countriesQuery = useCountriesQuery();

  const [
    name,
    isActive,
    websiteUrl,
    contactAddress,
    headOfficeEmail,
    headOfficeTelephoneNo,
    accreditationBanner,
    texts,
  ] = useWatch({
    control,
    name: [
      'name',
      'isActive',
      'websiteUrl',
      'contactAddress',
      'headOfficeEmail',
      'headOfficeTelephoneNo',
      'accreditationBanner',
      'texts',
    ],
  });

  const summaryValues = useMemo<DivisionFormValues>(
    () => ({
      ...defaultValues,
      name: name ?? defaultValues.name,
      isActive: isActive ?? defaultValues.isActive,
      websiteUrl: websiteUrl ?? defaultValues.websiteUrl,
      contactAddress: {
        ...defaultValues.contactAddress,
        ...contactAddress,
      },
      headOfficeEmail: headOfficeEmail ?? defaultValues.headOfficeEmail,
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
      texts: texts ?? defaultValues.texts,
    }),
    [
      accreditationBanner,
      contactAddress,
      defaultValues,
      headOfficeEmail,
      headOfficeTelephoneNo,
      isActive,
      name,
      texts,
      websiteUrl,
    ],
  );

  const addressPreview = buildDivisionAddressText(
    {
      ...summaryValues.contactAddress,
      countryId: summaryValues.contactAddress.countryId
        ? Number(summaryValues.contactAddress.countryId)
        : null,
    },
    {
      countryName: findReferenceDataNameById(
        countriesQuery.data ?? [],
        summaryValues.contactAddress.countryId,
      ),
    },
  );
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
          <span className="app-summary-card__value">{websitePreview || 'Not provided'}</span>
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
            value: summaryValues.headOfficeEmail || 'Not provided',
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
          {
            key: 'texts',
            label: 'Texts',
            value: summaryValues.texts.length,
          },
        ]}
      />

      {details ? (
        <AppSummaryRows
          items={[
            {
              key: 'version',
              label: 'Version',
              value: details.version,
            },
          ]}
        />
      ) : null}
    </AppSidebarSummary>
  );
};
