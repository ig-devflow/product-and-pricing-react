import { Controller, useFormContext } from 'react-hook-form';
import type { RoomFormValues } from '@/modules/products/rooms/model/form.types';
import { AppField } from '@/shared/ui/controls';
import { AppSelect, type AppSelectOption } from '@/shared/ui/controls/AppSelect';
import { AppFormGrid, AppSectionCard } from '@/shared/ui/patterns';
import { AppInput, AppSwitch } from '@/shared/ui/primitives';
import { useUnitTypesQuery } from '@/shared/queries/useUnitTypesQuery';

function toOptions(items: { id: number; name: string }[] | undefined): AppSelectOption[] {
  return (items ?? []).map((item) => ({ value: String(item.id), label: item.name }));
}

export const BasicsSection = () => {
  const {
    control,
    register,
    formState: { errors },
    watch,
  } = useFormContext<RoomFormValues>();

  const unitTypesQuery = useUnitTypesQuery();
  const unitTypeOptions = toOptions(unitTypesQuery.data);
  const isActive = watch('isActive');
  const occupyRoom = watch('occupyRoom');

  return (
    <AppSectionCard
      id="section-basics"
      title="Basics"
      description="Room name, pricing unit, and availability status."
    >
      <AppFormGrid columns={1}>
        <AppField label="Room name" forId="room-name" error={errors.name?.message} required>
          {({ describedBy, labelId }) => (
            <AppInput
              id="room-name"
              invalid={Boolean(errors.name?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="e.g. Single Standard"
              {...register('name')}
            />
          )}
        </AppField>

        <AppField label="Priced per (unit type)" forId="room-unit-type" error={errors.unitTypeId?.message} required>
          {({ labelId, describedBy }) => (
            <Controller
              name="unitTypeId"
              control={control}
              render={({ field }) => (
                <AppSelect
                  id="room-unit-type"
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
      </AppFormGrid>

      <div className="product-form-section__toggle-row">
        <div className="product-form-section__toggle-copy">
          <span className="product-form-section__toggle-title">
            {occupyRoom ? 'Occupies room' : 'Does not occupy room'}
          </span>
          <span className="product-form-section__toggle-text">
            Whether booking this room physically occupies it for the student.
          </span>
        </div>
        <Controller
          name="occupyRoom"
          control={control}
          render={({ field }) => (
            <AppSwitch
              checked={Boolean(field.value)}
              label={occupyRoom ? 'Yes' : 'No'}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
      </div>

      <div className="product-form-section__toggle-row">
        <div className="product-form-section__toggle-copy">
          <span className="product-form-section__toggle-title">
            {isActive ? 'Active room' : 'Inactive room'}
          </span>
          <span className="product-form-section__toggle-text">
            Inactive rooms are hidden from pricing and bookings.
          </span>
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
