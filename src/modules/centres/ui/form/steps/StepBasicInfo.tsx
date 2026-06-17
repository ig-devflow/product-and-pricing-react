import { AppField, AppSelect } from '@/shared/ui/controls';
import { AppInput, AppSwitch } from '@/shared/ui/primitives';
import { AppSectionCard } from '@/shared/ui/patterns';
import { useCurrenciesQuery } from '@/shared/queries/useCurrenciesQuery';
import { usePrintFormatsQuery } from '@/shared/queries/usePrintFormatsQuery';
import type { CentreStep1Values } from '@/modules/centres/model/form.types';
import type { FormErrors } from '@/modules/centres/hooks/useCentreForm';

export interface StepBasicInfoProps {
  values: CentreStep1Values;
  onChange: (patch: Partial<CentreStep1Values>) => void;
  errors: FormErrors;
}

export const StepBasicInfo = ({ values, onChange, errors }: StepBasicInfoProps) => {
  const currenciesQuery = useCurrenciesQuery();
  const printFormatsQuery = usePrintFormatsQuery();
  const currencyOptions = (currenciesQuery.data ?? []).map((c) => ({
    value: String(c.id),
    label: `${c.isoCode} — ${c.name}`,
  }));
  const printFormats = printFormatsQuery.data ?? [];

  return (
    <div className="centre-form__step-body">
      <AppSectionCard title="Basic info" description="Identifiers, currency, print format, and centre type.">
        <div className="app-form-grid app-form-grid--2col">
          <AppField label="Centre name" required forId="f-name" error={errors.name} hint="Shown across the workspace.">
            {({ labelId, describedBy }) => (
              <AppInput
                id="f-name"
                value={values.name}
                invalid={!!errors.name}
                labelledBy={labelId}
                describedBy={describedBy}
                onChange={(e) => onChange({ name: e.target.value })}
              />
            )}
          </AppField>

          <AppField label="Centre code" required forId="f-code" error={errors.code} hint="3–5 letter identifier, e.g. LDN.">
            {({ labelId, describedBy }) => (
              <AppInput
                id="f-code"
                value={values.code}
                invalid={!!errors.code}
                labelledBy={labelId}
                describedBy={describedBy}
                onChange={(e) => onChange({ code: e.target.value.toUpperCase() })}
              />
            )}
          </AppField>

          <AppField label="Currency" required forId="f-cur" error={errors.currencyId}>
            {({ labelId, describedBy }) => (
              <AppSelect
                id="f-cur"
                value={values.currencyId}
                onValueChange={(v) => onChange({ currencyId: v ?? '' })}
                options={currencyOptions}
                invalid={!!errors.currencyId}
                labelledBy={labelId}
                describedBy={describedBy}
                placeholder="Select currency"
                searchable
                searchPlaceholder="Search currencies"
              />
            )}
          </AppField>

          <AppField label="Print format" required error={errors.printFormatId}>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              {printFormats.map((f) => (
                <label
                  key={f.id}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', gap: 8,
                    padding: '12px 14px',
                    border: '1px solid',
                    borderColor: values.printFormatId === f.id
                      ? 'var(--color-border-interactive)'
                      : 'var(--color-border-strong)',
                    borderRadius: 'var(--radius-xs)',
                    background: values.printFormatId === f.id
                      ? 'var(--color-bg-surface-muted)'
                      : 'var(--color-bg-surface)',
                    cursor: 'pointer',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 600,
                    color: values.printFormatId === f.id
                      ? 'var(--color-shell-nav-active-text)'
                      : 'var(--color-text-secondary)',
                  }}
                >
                  <input
                    type="radio"
                    name="printFormatId"
                    value={f.id}
                    checked={values.printFormatId === f.id}
                    onChange={() => onChange({ printFormatId: f.id })}
                    style={{ accentColor: 'var(--color-brand-orange)' }}
                  />
                  {f.name}
                </label>
              ))}
            </div>
          </AppField>
        </div>

        <div style={{ marginTop: 'var(--space-5)', display: 'grid', gap: 'var(--space-3)' }}>
          <div className="division-form-section__toggle-row">
            <div className="division-form-section__toggle-copy">
              <span className="division-form-section__toggle-title">Active</span>
              <span className="division-form-section__toggle-text app-section__text">Visible in pricing and reference data flows.</span>
            </div>
            <AppSwitch
              id="f-active"
              checked={values.isActive}
              onChange={(e) => onChange({ isActive: e.target.checked })}
              label={values.isActive ? 'On' : 'Off'}
            />
          </div>
          <div className="division-form-section__toggle-row">
            <div className="division-form-section__toggle-copy">
              <span className="division-form-section__toggle-title">Physical centre</span>
              <span className="division-form-section__toggle-text app-section__text">Turn off for online-only centres.</span>
            </div>
            <AppSwitch
              id="f-physical"
              checked={values.isPhysicalCentre}
              onChange={(e) => onChange({ isPhysicalCentre: e.target.checked })}
              label={values.isPhysicalCentre ? 'Physical' : 'Online'}
            />
          </div>
        </div>
      </AppSectionCard>
    </div>
  );
};
