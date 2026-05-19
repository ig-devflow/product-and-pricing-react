import { AppField } from '@/shared/ui/controls';
import { AppInput } from '@/shared/ui/primitives';
import { AppSectionCard } from '@/shared/ui/patterns';
import type { CentreStep4Values } from '@/modules/centres/model/form.types';
import type { FormErrors } from '@/modules/centres/hooks/useCentreForm';
import { isAddressEmpty } from '@/modules/centres/model/helpers';
import { AddressSubForm } from '../AddressSubForm';
import { CentreAccordionItem } from '../../details/CentreAccordionItem';

export interface StepBankDetailsProps {
  values: CentreStep4Values;
  onChange: (patch: Partial<CentreStep4Values>) => void;
  errors: FormErrors;
}

export const StepBankDetails = ({ values, onChange, errors }: StepBankDetailsProps) => {
  const bankAddressMeta = isAddressEmpty({ ...values.bankAddress, countryId: values.bankAddress.countryId ? Number(values.bankAddress.countryId) : null })
    ? 'Empty'
    : [values.bankAddress.city, values.bankAddress.postalCode].filter(Boolean).join(' ');

  const benAddressMeta = isAddressEmpty({ ...values.beneficiaryBankAddress, countryId: values.beneficiaryBankAddress.countryId ? Number(values.beneficiaryBankAddress.countryId) : null })
    ? 'Empty'
    : [values.beneficiaryBankAddress.city, values.beneficiaryBankAddress.postalCode].filter(Boolean).join(' ');

  const intAddressMeta = isAddressEmpty({ ...values.intermediaryBankAddress, countryId: values.intermediaryBankAddress.countryId ? Number(values.intermediaryBankAddress.countryId) : null })
    ? 'Empty'
    : [values.intermediaryBankAddress.city, values.intermediaryBankAddress.postalCode].filter(Boolean).join(' ');

  return (
    <div className="centre-form__step-body">
      <AppSectionCard title="Account & routing" description="Identification and codes for the centre's primary account.">
        <div className="app-form-grid app-form-grid--2col">
          <AppField label="Beneficiary name" required forId="f-b-ben" error={errors.beneficiaryName}>
            <AppInput id="f-b-ben" value={values.beneficiaryName} invalid={!!errors.beneficiaryName} onChange={(e) => onChange({ beneficiaryName: e.target.value })} />
          </AppField>
          <AppField label="Account number" required forId="f-b-acc" error={errors.accountNumber}>
            <AppInput id="f-b-acc" value={values.accountNumber} invalid={!!errors.accountNumber} onChange={(e) => onChange({ accountNumber: e.target.value })} />
          </AppField>
          <AppField label="Bank name" required forId="f-b-bn" error={errors.bankName}>
            <AppInput id="f-b-bn" value={values.bankName} invalid={!!errors.bankName} onChange={(e) => onChange({ bankName: e.target.value })} />
          </AppField>
          <AppField label="IBAN" forId="f-b-iban" error={errors.iban}>
            <AppInput id="f-b-iban" value={values.iban} invalid={!!errors.iban} onChange={(e) => onChange({ iban: e.target.value })} />
          </AppField>
          <AppField label="SWIFT" forId="f-b-swift" error={errors.swiftCode}>
            <AppInput id="f-b-swift" value={values.swiftCode} invalid={!!errors.swiftCode} onChange={(e) => onChange({ swiftCode: e.target.value })} />
          </AppField>
          <AppField label="Branch code" forId="f-b-branch" error={errors.branchCode}>
            <AppInput id="f-b-branch" value={values.branchCode} invalid={!!errors.branchCode} onChange={(e) => onChange({ branchCode: e.target.value })} />
          </AppField>
          <AppField label="ABA routing no." forId="f-b-aba" error={errors.abaRoutingNo}>
            <AppInput id="f-b-aba" value={values.abaRoutingNo} invalid={!!errors.abaRoutingNo} onChange={(e) => onChange({ abaRoutingNo: e.target.value })} />
          </AppField>
          <AppField label="ACH ABA" forId="f-b-ach" error={errors.achAba}>
            <AppInput id="f-b-ach" value={values.achAba} invalid={!!errors.achAba} onChange={(e) => onChange({ achAba: e.target.value })} />
          </AppField>
          <AppField label="Intermediary bank" forId="f-b-ibn" error={errors.intermediaryBankName}>
            <AppInput id="f-b-ibn" value={values.intermediaryBankName} invalid={!!errors.intermediaryBankName} onChange={(e) => onChange({ intermediaryBankName: e.target.value })} />
          </AppField>
          <AppField label="Intermediary SWIFT" forId="f-b-isw" error={errors.intermediarySwiftCode}>
            <AppInput id="f-b-isw" value={values.intermediarySwiftCode} invalid={!!errors.intermediarySwiftCode} onChange={(e) => onChange({ intermediarySwiftCode: e.target.value })} />
          </AppField>
        </div>
      </AppSectionCard>

      <AppSectionCard title="Addresses" description="Bank correspondence addresses. Expand each to edit.">
        <div className="accordion">
          <CentreAccordionItem title="Bank address" meta={bankAddressMeta} defaultOpen={false}>
            <AddressSubForm value={values.bankAddress} onChange={(v) => onChange({ bankAddress: v })} errors={errors} pathPrefix="bankAddress" idPrefix="f-b-ba" />
          </CentreAccordionItem>
          <CentreAccordionItem title="Beneficiary bank address" meta={benAddressMeta} defaultOpen={false}>
            <AddressSubForm value={values.beneficiaryBankAddress} onChange={(v) => onChange({ beneficiaryBankAddress: v })} errors={errors} pathPrefix="beneficiaryBankAddress" idPrefix="f-b-bba" />
          </CentreAccordionItem>
          <CentreAccordionItem title="Intermediary bank address" meta={intAddressMeta} defaultOpen={false}>
            <AddressSubForm value={values.intermediaryBankAddress} onChange={(v) => onChange({ intermediaryBankAddress: v })} errors={errors} pathPrefix="intermediaryBankAddress" idPrefix="f-b-iba" />
          </CentreAccordionItem>
        </div>
      </AppSectionCard>
    </div>
  );
};
