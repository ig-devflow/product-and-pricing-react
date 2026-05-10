import { useMemo } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import type { DivisionFormValues } from '@/modules/divisions/model/form.types';
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';
import { useCountriesQuery } from '@/shared/queries/useCountriesQuery';
import { AppField, AppSelect } from '@/shared/ui/controls';
import { AppFormGrid, AppSectionCard } from '@/shared/ui/patterns';
import { AppInput } from '@/shared/ui/primitives';

function getCountryOptionLabel(country: { code: string; name: string }): string {
  return `${country.name} (${country.code})`;
}

export const AddressSection = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<DivisionFormValues>();
  const countriesQuery = useCountriesQuery();
  const selectedCountryId = useWatch({
    control,
    name: 'contactAddress.countryId',
  });
  const hasLoadedCountries = Boolean(countriesQuery.data?.length);

  const countryOptions = useMemo(() => {
    const options = (countriesQuery.data ?? []).map((country) => ({
      label: getCountryOptionLabel(country),
      value: String(country.id),
    }));

    if (
      !selectedCountryId ||
      options.some((option) => option.value === selectedCountryId)
    ) {
      return options;
    }

    return [
      {
        label: `Country #${selectedCountryId}`,
        value: selectedCountryId,
      },
      ...options,
    ];
  }, [countriesQuery.data, selectedCountryId]);

  const countryHint = countriesQuery.isLoading
    ? 'Loading countries...'
    : countriesQuery.error && !hasLoadedCountries
      ? getApiErrorMessage(countriesQuery.error, 'Country list is unavailable right now.')
      : undefined;

  const countryPlaceholder = countriesQuery.isLoading
    ? 'Loading countries...'
    : countriesQuery.error && !hasLoadedCountries
      ? 'Country list unavailable'
      : 'Select country';

  return (
    <AppSectionCard
      title="Contact details"
      description="Main contact channels and address details used by the division profile and supporting flows."
    >
      <AppFormGrid>
        <AppField
          label="Head office email"
          forId="division-email"
          error={errors.headOfficeEmail?.message}
        >
          {({ describedBy, labelId }) => (
            <AppInput
              id="division-email"
              type="email"
              invalid={Boolean(errors.headOfficeEmail?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="hello@ecenglish.com"
              {...register('headOfficeEmail')}
            />
          )}
        </AppField>

        <AppField
          label="Head office phone"
          forId="division-phone"
          error={errors.headOfficeTelephoneNo?.message}
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
        <AppField label="Street" forId="division-street">
          {({ describedBy, labelId }) => (
            <AppInput
              id="division-street"
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="Street and number"
              {...register('contactAddress.street')}
            />
          )}
        </AppField>

        <AppField label="District" forId="division-district">
          {({ describedBy, labelId }) => (
            <AppInput
              id="division-district"
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="Area or district"
              {...register('contactAddress.district')}
            />
          )}
        </AppField>

        <AppField label="City" forId="division-city">
          {({ describedBy, labelId }) => (
            <AppInput
              id="division-city"
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="City"
              {...register('contactAddress.city')}
            />
          )}
        </AppField>

        <AppField label="Postal code" forId="division-postal-code">
          {({ describedBy, labelId }) => (
            <AppInput
              id="division-postal-code"
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="Postal code"
              {...register('contactAddress.postalCode')}
            />
          )}
        </AppField>

        <AppField
          label="Country"
          forId="division-country"
          error={errors.contactAddress?.countryId?.message}
          hint={countryHint}
        >
          {({ describedBy, labelId }) => (
            <Controller
              name="contactAddress.countryId"
              control={control}
              render={({ field }) => (
                <AppSelect
                  id="division-country"
                  value={field.value ?? ''}
                  options={countryOptions}
                  placeholder={countryPlaceholder}
                  searchable
                  searchPlaceholder="Search countries"
                  noOptionsText="No countries found"
                  disabled={
                    countriesQuery.isLoading ||
                    (countriesQuery.isError && !hasLoadedCountries)
                  }
                  invalid={Boolean(errors.contactAddress?.countryId?.message)}
                  describedBy={describedBy}
                  labelledBy={labelId}
                  onValueChange={(value) => {
                    field.onChange(value);
                    field.onBlur();
                  }}
                />
              )}
            />
          )}
        </AppField>
      </AppFormGrid>
    </AppSectionCard>
  );
};
