import { Controller, useFormContext } from 'react-hook-form';
import type { DivisionFormValues } from '@/modules/divisions/model/types';
import { AppPill } from '@/shared/ui/data-display';
import { AppField } from '@/shared/ui/controls';
import { AppFormGrid, AppSectionCard } from '@/shared/ui/patterns';
import { AppInput, AppSwitch } from '@/shared/ui/primitives';

export const GeneralInformationSection = () => {
  const {
    control,
    register,
    formState: { errors },
    watch,
  } = useFormContext<DivisionFormValues>();

  const isActive = watch('isActive');

  return (
    <AppSectionCard
      title="General"
      description="Core division identity and public website information used across the manager screens."
      actions={
        <AppPill variant={isActive ? 'success' : 'neutral'}>
          {isActive ? 'Active' : 'Inactive'}
        </AppPill>
      }
    >
      <AppFormGrid>
        <AppField
          label="Division name"
          forId="division-name"
          error={errors.name?.message}
          required
        >
          {({ describedBy, labelId }) => (
            <AppInput
              id="division-name"
              invalid={Boolean(errors.name?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="For example EC Malta"
              {...register('name')}
            />
          )}
        </AppField>

        <AppField
          label="Website URL"
          forId="division-website"
          error={errors.websiteUrl?.message}
          required
        >
          {({ describedBy, labelId }) => (
            <AppInput
              id="division-website"
              type="url"
              invalid={Boolean(errors.websiteUrl?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="https://ecenglish.com"
              {...register('websiteUrl')}
            />
          )}
        </AppField>
      </AppFormGrid>

      <div className="division-form-section__toggle-row">
        <div className="division-form-section__toggle-copy">
          <span className="division-form-section__toggle-title">
            Division status
          </span>
          <span className="division-form-section__toggle-text">
            Disable the division without removing its existing data.
          </span>
        </div>

        <Controller
          name="isActive"
          control={control}
          render={({ field }) => (
            <AppSwitch
              checked={Boolean(field.value)}
              label={field.value ? 'Active' : 'Inactive'}
              onChange={(event) => field.onChange(event.target.checked)}
            />
          )}
        />
      </div>
    </AppSectionCard>
  );
};
