import { AppField, AppSelect } from '@/shared/ui/controls';
import { AppInput } from '@/shared/ui/primitives';
import { useCountriesQuery } from '@/shared/queries/useCountriesQuery';
import type { CentreAddressFormValue } from '@/modules/centres/model/form.types';
import type { FormErrors } from '@/modules/centres/hooks/useCentreForm';

export interface AddressSubFormProps {
  value: CentreAddressFormValue;
  onChange: (value: CentreAddressFormValue) => void;
  errors: FormErrors;
  pathPrefix: string;
  idPrefix: string;
}

export const AddressSubForm = ({
  value,
  onChange,
  errors,
  pathPrefix,
  idPrefix,
}: AddressSubFormProps) => {
  const countriesQuery = useCountriesQuery();
  const countries = countriesQuery.data ?? [];

  const set = (k: keyof CentreAddressFormValue, v: string) =>
    onChange({ ...value, [k]: v });

  const countryOptions = [
    { value: '', label: 'No country' },
    ...countries.map((c) => ({ value: String(c.id), label: c.name })),
  ];

  return (
    <div className="app-form-grid app-form-grid--2col">
      <AppField label="Street" forId={`${idPrefix}-street`} error={errors[`${pathPrefix}.street`]}>
        {({ labelId, describedBy }) => (
          <AppInput
            id={`${idPrefix}-street`}
            value={value.street}
            invalid={!!errors[`${pathPrefix}.street`]}
            labelledBy={labelId}
            describedBy={describedBy}
            onChange={(e) => set('street', e.target.value)}
          />
        )}
      </AppField>
      <AppField label="District" forId={`${idPrefix}-district`} error={errors[`${pathPrefix}.district`]}>
        {({ labelId, describedBy }) => (
          <AppInput
            id={`${idPrefix}-district`}
            value={value.district}
            invalid={!!errors[`${pathPrefix}.district`]}
            labelledBy={labelId}
            describedBy={describedBy}
            onChange={(e) => set('district', e.target.value)}
          />
        )}
      </AppField>
      <AppField label="City" forId={`${idPrefix}-city`} error={errors[`${pathPrefix}.city`]}>
        {({ labelId, describedBy }) => (
          <AppInput
            id={`${idPrefix}-city`}
            value={value.city}
            invalid={!!errors[`${pathPrefix}.city`]}
            labelledBy={labelId}
            describedBy={describedBy}
            onChange={(e) => set('city', e.target.value)}
          />
        )}
      </AppField>
      <AppField label="Postal code" forId={`${idPrefix}-postalCode`} error={errors[`${pathPrefix}.postalCode`]}>
        {({ labelId, describedBy }) => (
          <AppInput
            id={`${idPrefix}-postalCode`}
            value={value.postalCode}
            invalid={!!errors[`${pathPrefix}.postalCode`]}
            labelledBy={labelId}
            describedBy={describedBy}
            onChange={(e) => set('postalCode', e.target.value)}
          />
        )}
      </AppField>
      <AppField label="Country" forId={`${idPrefix}-countryId`} error={errors[`${pathPrefix}.countryId`]}>
        {({ labelId, describedBy }) => (
          <AppSelect
            id={`${idPrefix}-countryId`}
            value={value.countryId}
            onValueChange={(v) => set('countryId', v ?? '')}
            options={countryOptions}
            invalid={!!errors[`${pathPrefix}.countryId`]}
            labelledBy={labelId}
            describedBy={describedBy}
            searchable
            searchPlaceholder="Search countries"
          />
        )}
      </AppField>
    </div>
  );
};
