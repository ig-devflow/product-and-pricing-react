import { useMemo } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import type { DivisionFormValues } from '@/modules/divisions/model/form.types'
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage'
import { findReferenceDataNameById } from '@/shared/lib/reference-data/findReferenceDataNameById'
import { useCountriesQuery } from '@/shared/queries/useCountriesQuery'
import { AppField, AppSelect } from '@/shared/ui/controls'
import { AppFormGrid, AppSectionCard } from '@/shared/ui/patterns'
import { AppInput } from '@/shared/ui/primitives'

export const AddressSection = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<DivisionFormValues>()
  const countriesQuery = useCountriesQuery()
  const selectedCountryId = useWatch({
    control,
    name: 'address.countryIsoCode',
  })
  const normalizedSelectedCountryId = selectedCountryId?.trim().toUpperCase() ?? ''
  const hasLoadedCountries = Boolean(countriesQuery.data?.length)

  const countryOptions = useMemo(() => {
    const options = (countriesQuery.data ?? []).map((country) => ({
      label: country.name,
      value: country.id,
    }))

    if (
      !normalizedSelectedCountryId ||
      options.some((option) => option.value === normalizedSelectedCountryId)
    ) {
      return options
    }

    return [
      {
        label:
          findReferenceDataNameById(countriesQuery.data ?? [], normalizedSelectedCountryId) ||
          normalizedSelectedCountryId,
        value: normalizedSelectedCountryId,
      },
      ...options,
    ]
  }, [countriesQuery.data, normalizedSelectedCountryId])

  const countryHint = countriesQuery.isLoading
    ? 'Loading countries...'
    : countriesQuery.error && !hasLoadedCountries
      ? getApiErrorMessage(countriesQuery.error, 'Country list is unavailable right now.')
      : undefined

  const countryPlaceholder = countriesQuery.isLoading
    ? 'Loading countries...'
    : countriesQuery.error && !hasLoadedCountries
      ? 'Country list unavailable'
      : 'Select country'

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
          label="Country"
          forId="division-country"
          error={errors.address?.countryIsoCode?.message}
          hint={countryHint}
        >
          {({ describedBy, labelId }) => (
            <Controller
              name="address.countryIsoCode"
              control={control}
              render={({ field }) => (
                <AppSelect
                  id="division-country"
                  value={field.value?.trim().toUpperCase() ?? ''}
                  options={countryOptions}
                  placeholder={countryPlaceholder}
                  disabled={
                    countriesQuery.isLoading || (countriesQuery.isError && !hasLoadedCountries)
                  }
                  invalid={Boolean(errors.address?.countryIsoCode?.message)}
                  describedBy={describedBy}
                  labelledBy={labelId}
                  onValueChange={(value) => {
                    field.onChange(value.toUpperCase())
                    field.onBlur()
                  }}
                />
              )}
            />
          )}
        </AppField>
      </AppFormGrid>
    </AppSectionCard>
  )
}
