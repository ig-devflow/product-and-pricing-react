import { Controller, useFormContext } from 'react-hook-form';
import type { AddOnFormValues } from '@/modules/products/addons/model/form.types';
import { AppField } from '@/shared/ui/controls';
import { AppSelect, type AppSelectOption } from '@/shared/ui/controls/AppSelect';
import { AppFormGrid, AppSectionCard } from '@/shared/ui/patterns';
import { AppInput } from '@/shared/ui/primitives';
import { useUnitTypesQuery } from '@/shared/queries/useUnitTypesQuery';

function toOptions(items: { id: number; name: string }[] | undefined): AppSelectOption[] {
  return (items ?? []).map((item) => ({ value: String(item.id), label: item.name }));
}

export const ClassificationSection = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<AddOnFormValues>();

  const unitTypesQuery = useUnitTypesQuery();
  const unitTypeOptions = toOptions(unitTypesQuery.data);

  return (
    <AppSectionCard
      id="section-classification"
      title="Classification"
      description="Pricing unit, optional lesson count, and eligible student age range."
    >
      <AppFormGrid>
        <AppField label="Priced per (unit type)" forId="addon-unit-type" error={errors.unitTypeId?.message} required>
          {({ labelId, describedBy }) => (
            <Controller
              name="unitTypeId"
              control={control}
              render={({ field }) => (
                <AppSelect
                  id="addon-unit-type"
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

        <AppField label="One-to-one lessons per week" forId="addon-1to1-lessons" error={errors.oneToOneLessonsPerWeek?.message} hint="Optional — for one-to-one course add-ons.">
          {({ describedBy, labelId }) => (
            <AppInput
              id="addon-1to1-lessons"
              type="number"
              min={1}
              invalid={Boolean(errors.oneToOneLessonsPerWeek?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="e.g. 5"
              {...register('oneToOneLessonsPerWeek', { valueAsNumber: true })}
            />
          )}
        </AppField>

        <AppField label="Age from" forId="addon-age-from" error={errors.ageFrom?.message} hint="Optional — minimum student age.">
          {({ describedBy, labelId }) => (
            <AppInput
              id="addon-age-from"
              type="number"
              min={0}
              max={99}
              invalid={Boolean(errors.ageFrom?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="e.g. 16"
              {...register('ageFrom', { valueAsNumber: true })}
            />
          )}
        </AppField>

        <AppField label="Age to" forId="addon-age-to" error={errors.ageTo?.message} hint="Optional — maximum student age.">
          {({ describedBy, labelId }) => (
            <AppInput
              id="addon-age-to"
              type="number"
              min={0}
              max={99}
              invalid={Boolean(errors.ageTo?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="e.g. 99"
              {...register('ageTo', { valueAsNumber: true })}
            />
          )}
        </AppField>
      </AppFormGrid>
    </AppSectionCard>
  );
};
