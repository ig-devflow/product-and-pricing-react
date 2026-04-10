import { Controller, useFormContext } from 'react-hook-form'
import {
  DivisionVisaLetterNoteFormat,
  divisionVisaLetterNoteFormatOptions,
} from '@/modules/divisions/model/division'
import type { DivisionFormValues } from '@/modules/divisions/model/division-form'
import { AppField, AppSelect } from '@/shared/ui/controls'
import { AppTextarea } from '@/shared/ui/primitives'
import { AppSectionCard } from '@/shared/ui/patterns'

const selectOptions = divisionVisaLetterNoteFormatOptions.map((option) => ({
  label: option.label,
  value: String(option.value),
}))

export const PolicySection = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<DivisionFormValues>()

  return (
    <AppSectionCard title="Policies">
      <div className="division-form__section-grid">
        <AppField
          id="division-visa-letter-note-format"
          label="Visa letter note format"
          error={errors.visaLetterNoteFormat?.message}
          required
        >
          <Controller
            name="visaLetterNoteFormat"
            control={control}
            render={({ field }) => (
              <AppSelect
                id="division-visa-letter-note-format"
                name="Visa letter note format"
                value={String(field.value)}
                onValueChange={(value) =>
                  field.onChange(Number(value) as DivisionVisaLetterNoteFormat)
                }
                options={selectOptions}
              />
            )}
          />
        </AppField>

        <AppField
          id="division-visa-letter-note"
          label="Visa letter note"
          error={errors.visaLetterNote?.message}
        >
          <AppTextarea id="division-visa-letter-note" rows={4} {...register('visaLetterNote')} />
        </AppField>

        <AppField
          id="division-terms-and-conditions"
          label="Terms and conditions"
          error={errors.termsAndConditions?.message}
          required
        >
          <AppTextarea
            id="division-terms-and-conditions"
            rows={4}
            {...register('termsAndConditions')}
          />
        </AppField>

        <AppField
          id="division-groups-payment-terms"
          label="Groups payment terms"
          error={errors.groupsPaymentTerms?.message}
          required
        >
          <AppTextarea
            id="division-groups-payment-terms"
            rows={4}
            {...register('groupsPaymentTerms')}
          />
        </AppField>
      </div>
    </AppSectionCard>
  )
}
