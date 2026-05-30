import { Controller, useFormContext } from 'react-hook-form';
import type { PackageFormValues } from '@/modules/products/packages/model/form.types';
import { AppField } from '@/shared/ui/controls';
import { AppSelect, type AppSelectOption } from '@/shared/ui/controls/AppSelect';
import { AppFormGrid, AppSectionCard } from '@/shared/ui/patterns';
import { AppInput } from '@/shared/ui/primitives';
import { useUnitTypesQuery } from '@/shared/queries/useUnitTypesQuery';

function toOptions(items: { id: number; name: string }[] | undefined): AppSelectOption[] {
  return (items ?? []).map((item) => ({ value: String(item.id), label: item.name }));
}

export const ClassificationSection = () => {
  const { control, register, formState: { errors } } = useFormContext<PackageFormValues>();
  const unitTypesQuery = useUnitTypesQuery();
  const unitTypeOptions = toOptions(unitTypesQuery.data);

  return (
    <AppSectionCard
      id="section-classification"
      title="Classification"
      description="Pricing unit, commission rate, age range, and minimum booking duration."
    >
      <AppFormGrid>
        <AppField label="Priced per (unit type)" forId="pkg-unit-type" error={errors.unitTypeId?.message} required>
          {({ labelId, describedBy }) => (
            <Controller
              name="unitTypeId"
              control={control}
              render={({ field }) => (
                <AppSelect
                  id="pkg-unit-type"
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

        <AppField label="Commission (%)" forId="pkg-commission" error={errors.commission?.message} hint="Optional — agent commission rate.">
          {({ describedBy, labelId }) => (
            <AppInput
              id="pkg-commission"
              type="number"
              min={0}
              max={100}
              step="0.01"
              invalid={Boolean(errors.commission?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="e.g. 10"
              {...register('commission', { valueAsNumber: true })}
            />
          )}
        </AppField>

        <AppField label="Age from" forId="pkg-age-from" error={errors.ageFrom?.message} hint="Optional — minimum student age.">
          {({ describedBy, labelId }) => (
            <AppInput
              id="pkg-age-from"
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

        <AppField label="Age to" forId="pkg-age-to" error={errors.ageTo?.message} hint="Optional — maximum student age.">
          {({ describedBy, labelId }) => (
            <AppInput
              id="pkg-age-to"
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

        <AppField label="Minimum weeks" forId="pkg-min-weeks" error={errors.minimumWeeks?.message} hint="Optional — minimum booking duration.">
          {({ describedBy, labelId }) => (
            <AppInput
              id="pkg-min-weeks"
              type="number"
              min={1}
              invalid={Boolean(errors.minimumWeeks?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="e.g. 2"
              {...register('minimumWeeks', { valueAsNumber: true })}
            />
          )}
        </AppField>
      </AppFormGrid>
    </AppSectionCard>
  );
};
