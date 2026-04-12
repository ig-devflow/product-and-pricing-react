import { useFormContext } from 'react-hook-form';
import type { DivisionFormValues } from '@/modules/divisions/model/types';
import { AppField } from '@/shared/ui/controls';
import { AppFormGrid, AppSectionCard } from '@/shared/ui/patterns';
import { AppInput } from '@/shared/ui/primitives';

export const AddressSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<DivisionFormValues>();

  return (
    <AppSectionCard
      title="Contact details"
      description="Main contact channels and address details used by the division profile and supporting flows."
    >
      <AppFormGrid>
        <AppField
          label="Head office email"
          forId="division-email"
          error={errors.headOfficeEmailAddress?.message}
          required
        >
          {({ describedBy, labelId }) => (
            <AppInput
              id="division-email"
              type="email"
              invalid={Boolean(errors.headOfficeEmailAddress?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="hello@ecenglish.com"
              {...register('headOfficeEmailAddress')}
            />
          )}
        </AppField>

        <AppField
          label="Head office phone"
          forId="division-phone"
          error={errors.headOfficeTelephoneNo?.message}
          required
        >
          {({ describedBy, labelId }) => (
            <AppInput
              id="division-phone"
              invalid={Boolean(errors.headOfficeTelephoneNo?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="+44 20 0000 0000"
              {...register('headOfficeTelephoneNo')}
            />
          )}
        </AppField>
      </AppFormGrid>

      <AppFormGrid>
        <AppField label="Address line 1" forId="division-line1">
          {({ describedBy, labelId }) => (
            <AppInput
              id="division-line1"
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="Street and number"
              {...register('address.line1')}
            />
          )}
        </AppField>

        <AppField label="Address line 2" forId="division-line2">
          {({ describedBy, labelId }) => (
            <AppInput
              id="division-line2"
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="Area or district"
              {...register('address.line2')}
            />
          )}
        </AppField>

        <AppField label="Address line 3" forId="division-line3">
          {({ describedBy, labelId }) => (
            <AppInput
              id="division-line3"
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="City"
              {...register('address.line3')}
            />
          )}
        </AppField>

        <AppField label="Address line 4" forId="division-line4">
          {({ describedBy, labelId }) => (
            <AppInput
              id="division-line4"
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="Postal code"
              {...register('address.line4')}
            />
          )}
        </AppField>

        <AppField
          label="Country ISO code"
          forId="division-country"
          error={errors.address?.countryIsoCode?.message}
        >
          {({ describedBy, labelId }) => (
            <AppInput
              id="division-country"
              invalid={Boolean(errors.address?.countryIsoCode?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="GB"
              maxLength={2}
              {...register('address.countryIsoCode', {
                setValueAs: (value: string) => value.toUpperCase(),
              })}
            />
          )}
        </AppField>
      </AppFormGrid>
    </AppSectionCard>
  );
};
