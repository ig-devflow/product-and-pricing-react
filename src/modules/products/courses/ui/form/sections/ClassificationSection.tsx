import { Controller, useFormContext } from 'react-hook-form';
import type { CourseFormValues } from '@/modules/products/courses/model/form.types';
import { AppField } from '@/shared/ui/controls';
import { AppSelect, type AppSelectOption } from '@/shared/ui/controls/AppSelect';
import { AppFormGrid, AppSectionCard } from '@/shared/ui/patterns';
import { AppInput } from '@/shared/ui/primitives';
import { useCourseLanguagesQuery } from '@/shared/queries/useCourseLanguagesQuery';
import { useCourseIntensitiesQuery } from '@/shared/queries/useCourseIntensitiesQuery';
import { useUnitTypesQuery } from '@/shared/queries/useUnitTypesQuery';

function toOptions(items: { id: number; name: string }[] | undefined): AppSelectOption[] {
  return (items ?? []).map((item) => ({ value: String(item.id), label: item.name }));
}

export const ClassificationSection = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<CourseFormValues>();

  const languagesQuery = useCourseLanguagesQuery();
  const intensitiesQuery = useCourseIntensitiesQuery();
  const unitTypesQuery = useUnitTypesQuery();

  const languageOptions = toOptions(languagesQuery.data);
  const intensityOptions = toOptions(intensitiesQuery.data);
  const unitTypeOptions = toOptions(unitTypesQuery.data);

  return (
    <AppSectionCard
      id="section-classification"
      title="Classification"
      description="How the course is taught and the booking window it accepts."
    >
      <AppFormGrid>
        <AppField label="Course language" forId="course-language" error={errors.courseLanguageId?.message} required>
          {({ labelId, describedBy }) => (
            <Controller
              name="courseLanguageId"
              control={control}
              render={({ field }) => (
                <AppSelect
                  id="course-language"
                  placeholder="Select language…"
                  options={languageOptions}
                  value={field.value !== null ? String(field.value) : ''}
                  invalid={Boolean(errors.courseLanguageId?.message)}
                  describedBy={describedBy}
                  labelledBy={labelId}
                  searchable
                  onValueChange={(v) => field.onChange(v ? Number(v) : null)}
                />
              )}
            />
          )}
        </AppField>

        <AppField label="Intensity" forId="course-intensity" error={errors.courseIntensityId?.message} required>
          {({ labelId, describedBy }) => (
            <Controller
              name="courseIntensityId"
              control={control}
              render={({ field }) => (
                <AppSelect
                  id="course-intensity"
                  placeholder="Select intensity…"
                  options={intensityOptions}
                  value={field.value !== null ? String(field.value) : ''}
                  invalid={Boolean(errors.courseIntensityId?.message)}
                  describedBy={describedBy}
                  labelledBy={labelId}
                  onValueChange={(v) => field.onChange(v ? Number(v) : null)}
                />
              )}
            />
          )}
        </AppField>

        <AppField label="Priced per (unit type)" forId="course-unit-type" error={errors.unitTypeId?.message} required>
          {({ labelId, describedBy }) => (
            <Controller
              name="unitTypeId"
              control={control}
              render={({ field }) => (
                <AppSelect
                  id="course-unit-type"
                  placeholder="Select unit type…"
                  options={unitTypeOptions}
                  value={field.value !== null ? String(field.value) : ''}
                  invalid={Boolean(errors.unitTypeId?.message)}
                  describedBy={describedBy}
                  labelledBy={labelId}
                  onValueChange={(v) => field.onChange(v ? Number(v) : null)}
                />
              )}
            />
          )}
        </AppField>

        <AppField label="Minimum weeks" forId="course-min-weeks" error={errors.minimumWeeks?.message} hint="Optional — leave blank if no minimum.">
          {({ describedBy, labelId }) => (
            <AppInput
              id="course-min-weeks"
              type="number"
              min={1}
              invalid={Boolean(errors.minimumWeeks?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="e.g. 1"
              {...register('minimumWeeks', { valueAsNumber: true })}
            />
          )}
        </AppField>
      </AppFormGrid>
    </AppSectionCard>
  );
};
