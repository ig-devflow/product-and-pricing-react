import { AppKeyValueList, AppPill } from '@/shared/ui/data-display'
import { AppSectionCard } from '@/shared/ui/patterns'
import { findReferenceDataNameById } from '@/shared/lib/reference-data/findReferenceDataNameById'
import { useCountriesQuery } from '@/shared/queries/useCountriesQuery'
import type { DivisionDetails } from '@/modules/divisions/model/types'
import type { ContentFormat } from '@/modules/divisions/model/content-format'
import { divisionVisaLetterNoteFormatOptions } from '@/modules/divisions/model/view-options'
import { buildDivisionAddressText, removeProtocol } from '@/modules/divisions/model/formatters'

export interface DivisionDetailsSectionsProps {
  division: DivisionDetails
}

function getContentFormatLabel(value: ContentFormat): string {
  return (
    divisionVisaLetterNoteFormatOptions.find((option) => option.value === value)?.label ?? value
  )
}

export const DivisionDetailsSections = ({ division }: DivisionDetailsSectionsProps) => {
  const countriesQuery = useCountriesQuery()
  const websiteDisplayUrl = removeProtocol(division.websiteUrl)
  const addressText = buildDivisionAddressText(division.address, {
    countryName: findReferenceDataNameById(
      countriesQuery.data ?? [],
      division.address.countryIsoCode,
    ),
    fallbackToCountryCode: false,
  })

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
                <a className="app-link" href={division.websiteUrl} target="_blank" rel="noreferrer">
                  {websiteDisplayUrl}
                </a>
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
              <dd className="app-key-value-list__value">{division.headOfficeEmailAddress}</dd>
            </div>
          </AppKeyValueList>

          <AppKeyValueList>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Head office phone</dt>
              <dd className="app-key-value-list__value">{division.headOfficeTelephoneNo}</dd>
            </div>
          </AppKeyValueList>
        </div>
      </AppSectionCard>

      <AppSectionCard
        title="Content"
        description="Content blocks exposed to learners, agents, or internal users in downstream flows."
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

          <article className="division-details-sections__content-item">
            <div className="division-details-sections__inline-heading">
              <h3 className="division-details-sections__subheading">Visa letter note</h3>
              <AppPill variant="info">
                {getContentFormatLabel(division.visaLetterNoteFormat)}
              </AppPill>
            </div>
            <p className="division-details-sections__copy">
              {division.visaLetterNote || 'No visa letter note added yet.'}
            </p>
          </article>
        </div>
      </AppSectionCard>

      <AppSectionCard
        title="Report text configuration"
        description="Existing report text records linked to the division from the backend details endpoint."
      >
        {division.reportTexts.length ? (
          <div className="division-details-sections__reports">
            {division.reportTexts.map((reportText) => (
              <article key={reportText.id} className="division-details-sections__report-item">
                <div className="division-details-sections__report-meta">
                  <span>Report text #{reportText.reportTextId}</span>
                  <AppPill variant="neutral">{getContentFormatLabel(reportText.format)}</AppPill>
                </div>
                <p className="division-details-sections__copy">
                  {reportText.content || 'Empty content'}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="division-details-sections__empty-copy">
            No report texts were returned for this division.
          </p>
        )}
      </AppSectionCard>
    </div>
  )
}
