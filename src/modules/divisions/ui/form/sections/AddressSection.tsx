import { useFormContext } from 'react-hook-form';
import type { DivisionFormValues } from '@/modules/divisions/model/division-form';
import { AppField } from '@/shared/ui/controls';
import { AppInput } from '@/shared/ui/primitives';
import { AppSectionCard } from '@/shared/ui/patterns';

export const AddressSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<DivisionFormValues>();

  return (
    <AppSectionCard title="Address">
      <div className="division-form__section-grid">
        <AppField
          id="division-address-line-1"
          label="Address line 1"
          error={errors.addressLine1?.message}
          required
        >
          <AppInput id="division-address-line-1" {...register('addressLine1')} />
        </AppField>

        <AppField id="division-address-line-2" label="Address line 2" error={errors.addressLine2?.message}>
          <AppInput id="division-address-line-2" {...register('addressLine2')} />
        </AppField>

        <AppField id="division-address-line-3" label="Address line 3" error={errors.addressLine3?.message}>
          <AppInput id="division-address-line-3" {...register('addressLine3')} />
        </AppField>

        <AppField id="division-address-line-4" label="Address line 4" error={errors.addressLine4?.message}>
          <AppInput id="division-address-line-4" {...register('addressLine4')} />
        </AppField>

        <AppField
          id="division-country-iso-code"
          label="Country ISO code"
          error={errors.countryISOCode?.message}
          required
        >
          <AppInput
            id="division-country-iso-code"
            maxLength={2}
            {...register('countryISOCode')}
          />
        </AppField>
      </div>
    </AppSectionCard>
  );
};
