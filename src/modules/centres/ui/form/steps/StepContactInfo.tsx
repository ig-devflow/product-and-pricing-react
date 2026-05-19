import { AppField } from '@/shared/ui/controls';
import { AppInput } from '@/shared/ui/primitives';
import { AppSectionCard } from '@/shared/ui/patterns';
import type { CentreStep2Values } from '@/modules/centres/model/form.types';
import type { FormErrors } from '@/modules/centres/hooks/useCentreForm';
import { AddressSubForm } from '../AddressSubForm';
import { ColourSwatchInput } from '../ColourSwatchInput';
import { CentreImageUpload } from '../CentreImageUpload';

export interface StepContactInfoProps {
  values: CentreStep2Values;
  onChange: (patch: Partial<CentreStep2Values>) => void;
  errors: FormErrors;
}

export const StepContactInfo = ({ values, onChange, errors }: StepContactInfoProps) => (
  <div className="centre-form__step-body">
    <AppSectionCard title="Contact info" description="Emails, phones, brand, and physical address.">
      <div className="app-form-grid app-form-grid--2col">
        <AppField label="General email" forId="f-ge" error={errors.generalEmail}>
          {({ labelId, describedBy }) => (
            <AppInput
              id="f-ge"
              type="email"
              value={values.generalEmail}
              invalid={!!errors.generalEmail}
              labelledBy={labelId}
              describedBy={describedBy}
              onChange={(e) => onChange({ generalEmail: e.target.value })}
            />
          )}
        </AppField>

        <AppField label="Accommodation email" forId="f-ae" error={errors.accommodationEmail}>
          {({ labelId, describedBy }) => (
            <AppInput
              id="f-ae"
              type="email"
              value={values.accommodationEmail}
              invalid={!!errors.accommodationEmail}
              labelledBy={labelId}
              describedBy={describedBy}
              onChange={(e) => onChange({ accommodationEmail: e.target.value })}
            />
          )}
        </AppField>

        <AppField label="Telephone" forId="f-tel" error={errors.telephone} hint="Include country code, e.g. +44 20 7404 0080.">
          {({ labelId, describedBy }) => (
            <AppInput
              id="f-tel"
              value={values.telephone}
              invalid={!!errors.telephone}
              labelledBy={labelId}
              describedBy={describedBy}
              onChange={(e) => onChange({ telephone: e.target.value })}
            />
          )}
        </AppField>

        <AppField label="Emergency telephone" forId="f-et" error={errors.emergencyTelephone}>
          {({ labelId, describedBy }) => (
            <AppInput
              id="f-et"
              value={values.emergencyTelephone}
              invalid={!!errors.emergencyTelephone}
              labelledBy={labelId}
              describedBy={describedBy}
              onChange={(e) => onChange({ emergencyTelephone: e.target.value })}
            />
          )}
        </AppField>

        <AppField label="Transfer emergency telephone" forId="f-tt" error={errors.transferEmergencyTelephone}>
          {({ labelId, describedBy }) => (
            <AppInput
              id="f-tt"
              value={values.transferEmergencyTelephone}
              invalid={!!errors.transferEmergencyTelephone}
              labelledBy={labelId}
              describedBy={describedBy}
              onChange={(e) => onChange({ transferEmergencyTelephone: e.target.value })}
            />
          )}
        </AppField>

        <AppField label="Brand colour" forId="f-bc" error={errors.brandColor} hint="Used on lists and the details hero. Hex format.">
          <ColourSwatchInput
            id="f-bc"
            value={values.brandColor}
            invalid={!!errors.brandColor}
            onChange={(v) => onChange({ brandColor: v })}
          />
        </AppField>
      </div>
    </AppSectionCard>

    <AppSectionCard title="Logo" description="Used on the details hero. PNG, JPEG, WebP, or SVG up to 2 MB.">
      <CentreImageUpload
        image={values.logoImage}
        label="logo"
        error={errors.logoImage}
        onChange={(img) => onChange({ logoImage: img })}
      />
    </AppSectionCard>

    <AppSectionCard title="Contact address" description="Head office address used on documentation.">
      <AddressSubForm
        value={values.contactAddress}
        onChange={(v) => onChange({ contactAddress: v })}
        errors={errors}
        pathPrefix="contactAddress"
        idPrefix="f-ca"
      />
    </AppSectionCard>
  </div>
);
