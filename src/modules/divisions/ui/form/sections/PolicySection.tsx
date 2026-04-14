import { Controller, useFormContext } from 'react-hook-form';
import type { DivisionFormValues } from '@/modules/divisions/model/form.types';
import { divisionVisaLetterNoteFormatOptions } from '@/modules/divisions/model/view-options';
import { AppField, AppSelect } from '@/shared/ui/controls';
import { AppFormGrid, AppSectionCard } from '@/shared/ui/patterns';
import { AppTextarea } from '@/shared/ui/primitives';

export const PolicySection = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<DivisionFormValues>();

  return (
    <AppSectionCard
      title="Content blocks"
      description="Manage long-form content shown for this division."
    >
      <div className="division-form-content__stack">
        <AppField
          label="Terms and conditions"
          forId="division-terms"
          error={errors.termsAndConditions?.message}
        >
          {({ describedBy, labelId }) => (
            <AppTextarea
              id="division-terms"
              className="division-form-content__textarea division-form-content__textarea--lg"
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="Paste or write the division terms and conditions"
              {...register('termsAndConditions')}
            />
          )}
        </AppField>

        <AppField
          label="Groups payment terms"
          forId="division-groups"
          error={errors.groupsPaymentTerms?.message}
        >
          {({ describedBy, labelId }) => (
            <AppTextarea
              id="division-groups"
              className="division-form-content__textarea"
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="Describe groups payment terms"
              {...register('groupsPaymentTerms')}
            />
          )}
        </AppField>
      </div>

      <AppFormGrid className="division-form-content__note-grid">
        <AppField
          label="Visa letter note format"
          forId="division-visa-note-format"
          className="division-form-content__format-field"
          error={errors.visaLetterNoteFormat?.message}
        >
          {({ describedBy, labelId }) => (
            <Controller
              name="visaLetterNoteFormat"
              control={control}
              render={({ field }) => (
                <AppSelect
                  id="division-visa-note-format"
                  value={field.value}
                  options={divisionVisaLetterNoteFormatOptions}
                  describedBy={describedBy}
                  labelledBy={labelId}
                  invalid={Boolean(errors.visaLetterNoteFormat?.message)}
                  onValueChange={(value) => {
                    field.onChange(value);
                    field.onBlur();
                  }}
                />
              )}
            />
          )}
        </AppField>

        <AppField
          label="Visa letter note"
          forId="division-visa-note"
          error={errors.visaLetterNote?.message}
        >
          {({ describedBy, labelId }) => (
            <AppTextarea
              id="division-visa-note"
              className="division-form-content__textarea division-form-content__textarea--xl"
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="Provide any visa letter instructions or disclaimers"
              {...register('visaLetterNote')}
            />
          )}
        </AppField>
      </AppFormGrid>
    </AppSectionCard>
  );
};
