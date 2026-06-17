import { Controller, useFormContext } from 'react-hook-form';
import type { TransferFormValues } from '@/modules/products/transfers/model/form.types';
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
  } = useFormContext<TransferFormValues>();

  const unitTypesQuery = useUnitTypesQuery();
  const unitTypeOptions = toOptions(unitTypesQuery.data);

  return (
    <AppSectionCard
      id="section-classification"
      title="Classification"
      description="Pricing unit and optional pickup / drop-off times."
    >
      <AppFormGrid>
        <AppField label="Priced per (unit type)" forId="transfer-unit-type" error={errors.unitTypeId?.message} required>
          {({ labelId, describedBy }) => (
            <Controller
              name="unitTypeId"
              control={control}
              render={({ field }) => (
                <AppSelect
                  id="transfer-unit-type"
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

        <AppField label="Pickup time" forId="transfer-time-from" error={errors.timeFrom?.message} hint="Optional — scheduled departure time.">
          {({ describedBy, labelId }) => (
            <AppInput
              id="transfer-time-from"
              type="time"
              invalid={Boolean(errors.timeFrom?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              {...register('timeFrom')}
            />
          )}
        </AppField>

        <AppField label="Drop-off time" forId="transfer-time-to" error={errors.timeTo?.message} hint="Optional — scheduled arrival time.">
          {({ describedBy, labelId }) => (
            <AppInput
              id="transfer-time-to"
              type="time"
              invalid={Boolean(errors.timeTo?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              {...register('timeTo')}
            />
          )}
        </AppField>
      </AppFormGrid>
    </AppSectionCard>
  );
};
