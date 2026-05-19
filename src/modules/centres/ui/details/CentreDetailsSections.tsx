import { AppPill } from '@/shared/ui/data-display';
import { AppSectionCard } from '@/shared/ui/patterns';
import { useCountriesQuery } from '@/shared/queries/useCountriesQuery';
import { useCurrenciesQuery } from '@/shared/queries/useCurrenciesQuery';
import type { CentreDetails } from '@/modules/centres/model/types';
import { fmtRatio, fmtRatioSuffix, getCentreContactTypeName, getPrintFormatLabel } from '@/modules/centres/model/helpers';
import { CentreAddressBlock } from './CentreAddressBlock';
import { CentreStatCard } from './CentreStatCard';
import { CentreAccordionItem } from './CentreAccordionItem';

const np = (v: string) =>
  v ? v : <span style={{ color: 'var(--color-text-disabled)' }}>Not provided</span>;

export interface CentreDetailsSectionsProps {
  centre: CentreDetails;
}

export const CentreDetailsSections = ({ centre }: CentreDetailsSectionsProps) => {
  const countriesQuery = useCountriesQuery();
  const currenciesQuery = useCurrenciesQuery();
  const countries = countriesQuery.data ?? [];
  const currencies = currenciesQuery.data ?? [];

  const findCountry = (id: number | null | undefined) =>
    id != null ? countries.find((c) => c.id === id) : null;
  const findCurrency = (id: number) => currencies.find((c) => c.id === id);

  const currency = findCurrency(centre.currencyId);
  const contactCountry = findCountry(centre.contactInfo.contactAddress?.countryId);

  return (
    <div className="app-stack app-stack--lg">
      <AppSectionCard id="overview" title="Overview" description="Identification, print, and physical-centre flag.">
        <dl className="app-key-value-list">
          <div className="app-key-value-list__row">
            <dt className="app-key-value-list__label">Centre name</dt>
            <dd className="app-key-value-list__value">{centre.name}</dd>
          </div>
          <div className="app-key-value-list__row">
            <dt className="app-key-value-list__label">Centre code</dt>
            <dd className="app-key-value-list__value">{centre.code}</dd>
          </div>
          <div className="app-key-value-list__row">
            <dt className="app-key-value-list__label">Currency</dt>
            <dd className="app-key-value-list__value">
              {currency ? `${currency.isoCode} (${currency.symbol})` : np('')}
            </dd>
          </div>
          <div className="app-key-value-list__row">
            <dt className="app-key-value-list__label">Print format</dt>
            <dd className="app-key-value-list__value">{getPrintFormatLabel(centre.printFormat)}</dd>
          </div>
          <div className="app-key-value-list__row">
            <dt className="app-key-value-list__label">Status</dt>
            <dd className="app-key-value-list__value">
              <AppPill variant={centre.isActive ? 'success' : 'neutral'}>
                {centre.isActive ? 'Active' : 'Inactive'}
              </AppPill>
            </dd>
          </div>
          <div className="app-key-value-list__row">
            <dt className="app-key-value-list__label">Centre type</dt>
            <dd className="app-key-value-list__value">
              {centre.isPhysicalCentre ? 'Physical centre' : 'Online'}
            </dd>
          </div>
          {centre.contactInfo.brandColor ? (
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Brand colour</dt>
              <dd className="app-key-value-list__value">
                <span className="color-swatch">
                  <span className="color-swatch__chip" style={{ '--swatch-color': centre.contactInfo.brandColor } as React.CSSProperties} />
                  <span className="color-swatch__value">{centre.contactInfo.brandColor.toUpperCase()}</span>
                </span>
              </dd>
            </div>
          ) : null}
        </dl>
      </AppSectionCard>

      <AppSectionCard id="contact" title="Contact info" description="Emails, phones, brand, and physical address.">
        <div className="app-stack app-stack--lg">
          <dl className="app-key-value-list">
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">General email</dt>
              <dd className="app-key-value-list__value">{np(centre.contactInfo.generalEmail)}</dd>
            </div>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Accommodation email</dt>
              <dd className="app-key-value-list__value">{np(centre.contactInfo.accommodationEmail)}</dd>
            </div>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Telephone</dt>
              <dd className="app-key-value-list__value">{np(centre.contactInfo.telephone)}</dd>
            </div>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Emergency telephone</dt>
              <dd className="app-key-value-list__value">{np(centre.contactInfo.emergencyTelephone)}</dd>
            </div>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Transfer emergency telephone</dt>
              <dd className="app-key-value-list__value">{np(centre.contactInfo.transferEmergencyTelephone)}</dd>
            </div>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Country</dt>
              <dd className="app-key-value-list__value">{contactCountry?.name ?? np('')}</dd>
            </div>
          </dl>
          <CentreAddressBlock
            label="Contact address"
            address={centre.contactInfo.contactAddress}
            countryName={contactCountry?.name}
          />
        </div>
      </AppSectionCard>

      <AppSectionCard id="legal" title="Legal info" description="Registration and tax identifiers used on documents.">
        <dl className="app-key-value-list">
          <div className="app-key-value-list__row">
            <dt className="app-key-value-list__label">Sponsorship number</dt>
            <dd className="app-key-value-list__value">{np(centre.legalInfo.schoolSponsorshipNumber)}</dd>
          </div>
          <div className="app-key-value-list__row">
            <dt className="app-key-value-list__label">VAT number</dt>
            <dd className="app-key-value-list__value">{np(centre.legalInfo.vatNumber)}</dd>
          </div>
          <div className="app-key-value-list__row">
            <dt className="app-key-value-list__label">Registration number</dt>
            <dd className="app-key-value-list__value">{np(centre.legalInfo.registrationNumber)}</dd>
          </div>
          <div className="app-key-value-list__row">
            <dt className="app-key-value-list__label">VAT exemption number</dt>
            <dd className="app-key-value-list__value">{np(centre.legalInfo.vatExemptionNumber)}</dd>
          </div>
          <div className="app-key-value-list__row">
            <dt className="app-key-value-list__label">Cheque payable to</dt>
            <dd className="app-key-value-list__value">{np(centre.legalInfo.chequePayableTo)}</dd>
          </div>
        </dl>
      </AppSectionCard>

      <AppSectionCard id="ratios" title="Operational ratios" description="Forecasting and capacity figures.">
        <div className="stat-grid">
          <CentreStatCard label="Guarantees" value={fmtRatio(centre.operationalRatios.guarantees)} suffix={fmtRatioSuffix(centre.operationalRatios.guarantees)} />
          <CentreStatCard label="Individuals" value={fmtRatio(centre.operationalRatios.individualsRatio)} suffix={fmtRatioSuffix(centre.operationalRatios.individualsRatio)} />
          <CentreStatCard label="Staffing" value={fmtRatio(centre.operationalRatios.staffingRatio)} suffix={fmtRatioSuffix(centre.operationalRatios.staffingRatio)} />
          <CentreStatCard label="Empty beds" value={fmtRatio(centre.operationalRatios.emptyBeds)} suffix={fmtRatioSuffix(centre.operationalRatios.emptyBeds)} />
        </div>
      </AppSectionCard>

      <AppSectionCard id="bank" title="Bank details" description="Account routing and bank correspondence addresses.">
        <div className="app-stack app-stack--lg">
          <dl className="app-key-value-list">
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Beneficiary name</dt>
              <dd className="app-key-value-list__value">{np(centre.bankDetails.beneficiaryName)}</dd>
            </div>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Account number</dt>
              <dd className="app-key-value-list__value">{np(centre.bankDetails.accountNumber)}</dd>
            </div>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Bank name</dt>
              <dd className="app-key-value-list__value">{np(centre.bankDetails.bankName)}</dd>
            </div>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">IBAN</dt>
              <dd className="app-key-value-list__value">{np(centre.bankDetails.iban)}</dd>
            </div>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">SWIFT</dt>
              <dd className="app-key-value-list__value">{np(centre.bankDetails.swiftCode)}</dd>
            </div>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Branch code</dt>
              <dd className="app-key-value-list__value">{np(centre.bankDetails.branchCode)}</dd>
            </div>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">ABA routing</dt>
              <dd className="app-key-value-list__value">{np(centre.bankDetails.abaRoutingNo)}</dd>
            </div>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">ACH ABA</dt>
              <dd className="app-key-value-list__value">{np(centre.bankDetails.achAba)}</dd>
            </div>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Intermediary bank</dt>
              <dd className="app-key-value-list__value">{np(centre.bankDetails.intermediaryBankName)}</dd>
            </div>
            <div className="app-key-value-list__row">
              <dt className="app-key-value-list__label">Intermediary SWIFT</dt>
              <dd className="app-key-value-list__value">{np(centre.bankDetails.intermediarySwiftCode)}</dd>
            </div>
          </dl>
          <div style={{ display: 'grid', gap: 'var(--space-4)', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <CentreAddressBlock
              label="Bank address"
              address={centre.bankDetails.bankAddress}
              countryName={findCountry(centre.bankDetails.bankAddress?.countryId)?.name}
            />
            <CentreAddressBlock
              label="Beneficiary bank address"
              address={centre.bankDetails.beneficiaryBankAddress}
              countryName={findCountry(centre.bankDetails.beneficiaryBankAddress?.countryId)?.name}
            />
            <CentreAddressBlock
              label="Intermediary bank address"
              address={centre.bankDetails.intermediaryBankAddress}
              countryName={findCountry(centre.bankDetails.intermediaryBankAddress?.countryId)?.name}
            />
          </div>
        </div>
      </AppSectionCard>

      <AppSectionCard id="contacts" title="Contacts" description="Centre director and director of studies.">
        {centre.contacts.length === 0 ? (
          <p style={{ margin: 0, color: 'var(--color-text-disabled)' }}>No contacts added yet.</p>
        ) : (
          <div className="app-stack">
            {centre.contacts.map((c, i) => (
              <div key={i} className="contact-card">
                <div className="contact-card__avatar">{c.name.slice(0, 2).toUpperCase()}</div>
                <div className="contact-card__body">
                  <span className="contact-card__role">{getCentreContactTypeName(c.contactType)}</span>
                  <h4 className="contact-card__name">{c.name}</h4>
                  {c.email ? <span className="contact-card__email">{c.email}</span> : null}
                </div>
                {c.signatureImage?.base64 ? (
                  <div style={{ width: 80, height: 40, padding: 4, border: '1px solid var(--color-border-default)', borderRadius: 8, background: '#fff' }}>
                    <img
                      src={`data:${c.signatureImage.contentType};base64,${c.signatureImage.base64}`}
                      alt={`${c.name} signature`}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                ) : (
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-disabled)' }}>No signature</span>
                )}
              </div>
            ))}
          </div>
        )}
      </AppSectionCard>

      <AppSectionCard id="texts" title="Text content" description="Generic text content linked by template and optional audience.">
        {centre.texts.length === 0 ? (
          <p style={{ margin: 0, color: 'var(--color-text-disabled)' }}>No text content added yet.</p>
        ) : (
          <div className="accordion">
            {centre.texts.map((t, i) => (
              <CentreAccordionItem
                key={t.id ?? i}
                title={t.contentTemplateName || `Template #${t.contentTemplateId}`}
                meta={`${t.audienceName || 'All audiences'} · ${t.format === 'plainText' ? 'Plain text' : t.format === 'html' ? 'HTML' : 'None'} · ${t.content?.length || 0} chars`}
                rightSlot={
                  <AppPill variant="info">
                    {t.format === 'plainText' ? 'Plain text' : t.format === 'html' ? 'HTML' : 'None'}
                  </AppPill>
                }
                defaultOpen={i === 0}
              >
                {t.content || 'Empty content'}
              </CentreAccordionItem>
            ))}
          </div>
        )}
      </AppSectionCard>
    </div>
  );
};
