import { Controller, useFormContext } from 'react-hook-form';
import type { CourseFormValues } from '@/modules/products/courses/model/form.types';
import { AppPill } from '@/shared/ui/data-display';
import { AppField } from '@/shared/ui/controls';
import { AppFormGrid, AppSectionCard } from '@/shared/ui/patterns';
import { AppInput, AppSwitch, AppTextarea } from '@/shared/ui/primitives';

export const GeneralSection = () => {
  const {
    control,
    register,
    formState: { errors },
    watch,
  } = useFormContext<CourseFormValues>();

  const isActive = watch('isActive');

  return (
    <AppSectionCard
      title="General"
      description="Core course identity and scheduling information."
      actions={<AppPill variant={isActive ? 'success' : 'neutral'}>{isActive ? 'Active' : 'Inactive'}</AppPill>}
    >
      <AppFormGrid>
        <AppField label="Course name" forId="course-name" error={errors.name?.message} required>
          {({ describedBy, labelId }) => (
            <AppInput
              id="course-name"
              invalid={Boolean(errors.name?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="e.g. General English"
              {...register('name')}
            />
          )}
        </AppField>

        <AppField label="Lessons per week" forId="course-lpw" error={errors.lessonsPerWeek?.message} required>
          {({ describedBy, labelId }) => (
            <AppInput
              id="course-lpw"
              type="number"
              min={1}
              max={50}
              invalid={Boolean(errors.lessonsPerWeek?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="20"
              {...register('lessonsPerWeek', { valueAsNumber: true })}
            />
          )}
        </AppField>

        <AppField label="Minutes per lesson" forId="course-mpl" error={errors.minutesPerLesson?.message} required>
          {({ describedBy, labelId }) => (
            <AppInput
              id="course-mpl"
              type="number"
              min={1}
              max={240}
              invalid={Boolean(errors.minutesPerLesson?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="45"
              {...register('minutesPerLesson', { valueAsNumber: true })}
            />
          )}
        </AppField>

        <AppField label="Min age" forId="course-min-age" error={errors.minAge?.message} required>
          {({ describedBy, labelId }) => (
            <AppInput
              id="course-min-age"
              type="number"
              min={0}
              max={99}
              invalid={Boolean(errors.minAge?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="16"
              {...register('minAge', { valueAsNumber: true })}
            />
          )}
        </AppField>

        <AppField label="Max age" forId="course-max-age" error={errors.maxAge?.message} required>
          {({ describedBy, labelId }) => (
            <AppInput
              id="course-max-age"
              type="number"
              min={0}
              max={99}
              invalid={Boolean(errors.maxAge?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="99"
              {...register('maxAge', { valueAsNumber: true })}
            />
          )}
        </AppField>
      </AppFormGrid>

      <AppField label="Description" forId="course-description" error={errors.description?.message} hint="Optional — brief summary shown in details view.">
        {({ describedBy, labelId }) => (
          <AppTextarea
            id="course-description"
            rows={4}
            invalid={Boolean(errors.description?.message)}
            describedBy={describedBy}
            labelledBy={labelId}
            placeholder="Describe the course objectives and structure…"
            {...register('description')}
          />
        )}
      </AppField>

      <div className="product-form-section__toggle-row">
        <div className="product-form-section__toggle-copy">
          <span className="product-form-section__toggle-title">Course status</span>
          <span className="product-form-section__toggle-text">Disable the course without removing its data.</span>
        </div>
        <Controller
          name="isActive"
          control={control}
          render={({ field }) => (
            <AppSwitch
              checked={Boolean(field.value)}
              label={field.value ? 'Active' : 'Inactive'}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
      </div>
    </AppSectionCard>
  );
};
