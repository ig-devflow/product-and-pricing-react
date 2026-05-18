import { AppField } from '@/shared/ui/controls';
import { AppInput } from '@/shared/ui/primitives';
import { AppSectionCard } from '@/shared/ui/patterns';
import type { CentreStep3Values } from '@/modules/centres/model/form.types';
import type { FormErrors } from '@/modules/centres/hooks/useCentreForm';

export interface StepLegalRatiosProps {
  values: CentreStep3Values;
  onChange: (patch: Partial<CentreStep3Values>) => void;
  errors: FormErrors;
}

export const StepLegalRatios = ({ values, onChange, errors }: StepLegalRatiosProps) => (
  <div className="centre-form__step-body">
    <AppSectionCard title="Legal info" description="Registration and tax identifiers used on documents.">
      <div className="app-form-grid app-form-grid--2col">
        <AppField label="Sponsorship number" forId="f-l-spons" error={errors.schoolSponsorshipNumber}>
          <AppInput
            id="f-l-spons"
            value={values.schoolSponsorshipNumber}
            invalid={!!errors.schoolSponsorshipNumber}
            onChange={(e) => onChange({ schoolSponsorshipNumber: e.target.value })}
          />
        </AppField>
        <AppField label="VAT number" forId="f-l-vat" error={errors.vatNumber}>
          <AppInput
            id="f-l-vat"
            value={values.vatNumber}
            invalid={!!errors.vatNumber}
            onChange={(e) => onChange({ vatNumber: e.target.value })}
          />
        </AppField>
        <AppField label="Registration number" forId="f-l-reg" error={errors.registrationNumber}>
          <AppInput
            id="f-l-reg"
            value={values.registrationNumber}
            invalid={!!errors.registrationNumber}
            onChange={(e) => onChange({ registrationNumber: e.target.value })}
          />
        </AppField>
        <AppField label="VAT exemption number" forId="f-l-exempt" error={errors.vatExemptionNumber}>
          <AppInput
            id="f-l-exempt"
            value={values.vatExemptionNumber}
            invalid={!!errors.vatExemptionNumber}
            onChange={(e) => onChange({ vatExemptionNumber: e.target.value })}
          />
        </AppField>
        <AppField label="Cheque payable to" forId="f-l-payable" error={errors.chequePayableTo}>
          <AppInput
            id="f-l-payable"
            value={values.chequePayableTo}
            invalid={!!errors.chequePayableTo}
            onChange={(e) => onChange({ chequePayableTo: e.target.value })}
          />
        </AppField>
      </div>
    </AppSectionCard>

    <AppSectionCard title="Operational ratios" description="Decimal values used in forecasting. Values 0–1 are shown as percentages.">
      <div className="app-form-grid app-form-grid--2col">
        <AppField label="Guarantees" forId="f-r-guarantees" error={errors.guarantees} hint="0–1 decimal, e.g. 0.85.">
          <AppInput
            id="f-r-guarantees"
            type="number"
            step="0.01"
            value={values.guarantees}
            invalid={!!errors.guarantees}
            onChange={(e) => onChange({ guarantees: e.target.value })}
          />
        </AppField>
        <AppField label="Individuals ratio" forId="f-r-ind" error={errors.individualsRatio}>
          <AppInput
            id="f-r-ind"
            type="number"
            step="0.01"
            value={values.individualsRatio}
            invalid={!!errors.individualsRatio}
            onChange={(e) => onChange({ individualsRatio: e.target.value })}
          />
        </AppField>
        <AppField label="Staffing ratio" forId="f-r-staff" error={errors.staffingRatio}>
          <AppInput
            id="f-r-staff"
            type="number"
            step="0.01"
            value={values.staffingRatio}
            invalid={!!errors.staffingRatio}
            onChange={(e) => onChange({ staffingRatio: e.target.value })}
          />
        </AppField>
        <AppField label="Empty beds" forId="f-r-beds" error={errors.emptyBeds}>
          <AppInput
            id="f-r-beds"
            type="number"
            step="0.01"
            value={values.emptyBeds}
            invalid={!!errors.emptyBeds}
            onChange={(e) => onChange({ emptyBeds: e.target.value })}
          />
        </AppField>
      </div>
    </AppSectionCard>
  </div>
);
