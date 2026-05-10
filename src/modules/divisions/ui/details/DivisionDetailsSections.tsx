import { AppKeyValueList, AppPill } from '@/shared/ui/data-display';
import { AppSectionCard } from '@/shared/ui/patterns';
import { findReferenceDataNameById } from '@/shared/lib/reference-data/findReferenceDataNameById';
import { useCountriesQuery } from '@/shared/queries/useCountriesQuery';
import type { DivisionDetails } from '@/modules/divisions/model/types';
import { getContentFormatLabel } from '@/modules/divisions/model/view-options';
import { buildDivisionAddressText, removeProtocol } from '@/modules/divisions/model/formatters';

export interface DivisionDetailsSectionsProps {
  division: DivisionDetails;
}

export const DivisionDetailsSections = ({ division }: DivisionDetailsSectionsProps) => {
  const countriesQuery = useCountriesQuery();
  const websiteDisplayUrl = removeProtocol(division.websiteUrl);
  const addressText = buildDivisionAddressText(division.contactAddress, {
    countryName: findReferenceDataNameById(
      countriesQuery.data ?? [],
      division.contactAddress.countryId,
    ),
  });

  return (
    <div className="app-stack app-stack--lg">
      <AppSectionCard
        title="Overview"
        description="High-level public details used across the division profile."
      >
        <div className="division-details-sections__grid">
          <AppKeyValueList>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Website</dt>
              <dd className="app-key-value-list__value">
                {division.websiteUrl ? (
                  <a className="app-link" href={division.websiteUrl} target="_blank" rel="noreferrer">
                    {websiteDisplayUrl}
                  </a>
                ) : (
                  'Not provided'
                )}
              </dd>
            </div>
          </AppKeyValueList>

          <AppKeyValueList>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Address</dt>
              <dd className="app-key-value-list__value">{addressText || 'Address is empty'}</dd>
            </div>
          </AppKeyValueList>

          <AppKeyValueList>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Head office email</dt>
              <dd className="app-key-value-list__value">
                {division.headOfficeEmail || 'Not provided'}
              </dd>
            </div>
          </AppKeyValueList>

          <AppKeyValueList>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Head office phone</dt>
              <dd className="app-key-value-list__value">
                {division.headOfficeTelephoneNo || 'Not provided'}
              </dd>
            </div>
          </AppKeyValueList>
        </div>
      </AppSectionCard>

      <AppSectionCard
        title="Policies"
        description="Policy copy stored directly on the division."
      >
        <div className="division-details-sections__content-list">
          <article className="division-details-sections__content-item">
            <h3 className="division-details-sections__subheading">Terms and conditions</h3>
            <p className="division-details-sections__copy">
              {division.termsAndConditions || 'No terms and conditions added yet.'}
            </p>
          </article>

          <article className="division-details-sections__content-item">
            <h3 className="division-details-sections__subheading">Groups payment terms</h3>
            <p className="division-details-sections__copy">
              {division.groupsPaymentTerms || 'No groups payment terms added yet.'}
            </p>
          </article>
        </div>
      </AppSectionCard>

      <AppSectionCard
        title="Text content"
        description="Generic text content linked by template and optional audience."
      >
        {division.texts.length ? (
          <div className="division-details-sections__reports">
            {division.texts.map((text) => (
              <article key={text.id ?? `${text.contentTemplateId}:${text.audienceId ?? 'all'}`} className="division-details-sections__report-item">
                <div className="division-details-sections__report-meta">
                  <span>
                    {text.contentTemplateName}
                    {text.audienceName ? ` / ${text.audienceName}` : ' / All audiences'}
                  </span>
                  <AppPill variant="neutral">{getContentFormatLabel(text.format)}</AppPill>
                </div>
                <p className="division-details-sections__copy">
                  {text.content || 'Empty content'}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="division-details-sections__empty-copy">
            No text content was returned for this division.
          </p>
        )}
      </AppSectionCard>
    </div>
  );
};
