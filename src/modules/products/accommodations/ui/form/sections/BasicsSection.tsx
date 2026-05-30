import { Controller, useFormContext } from 'react-hook-form';
import type { AccommodationFormValues } from '@/modules/products/accommodations/model/form.types';
import { AppField } from '@/shared/ui/controls';
import { AppSelect, type AppSelectOption } from '@/shared/ui/controls/AppSelect';
import { AppFormGrid, AppSectionCard } from '@/shared/ui/patterns';
import { AppInput, AppSwitch } from '@/shared/ui/primitives';
import { useAccommodationTypesQuery } from '@/shared/queries/useAccommodationTypesQuery';

function toOptions(items: { id: number; name: string }[] | undefined): AppSelectOption[] {
  return (items ?? []).map((item) => ({ value: String(item.id), label: item.name }));
}

export const BasicsSection = () => {
  const {
    control,
    register,
    formState: { errors },
    watch,
  } = useFormContext<AccommodationFormValues>();

  const typesQuery = useAccommodationTypesQuery();
  const typeOptions = toOptions(typesQuery.data);
  const isActive = watch('isActive');

  return (
    <AppSectionCard
      id="section-basics"
      title="Basics"
      description="Name, accommodation type, and availability status."
    >
      <AppFormGrid columns={1}>
        <AppField label="Accommodation name" forId="acc-name" error={errors.name?.message} required>
          {({ describedBy, labelId }) => (
            <AppInput
              id="acc-name"
              invalid={Boolean(errors.name?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="e.g. Residence Malta"
              {...register('name')}
            />
          )}
        </AppField>

        <AppField label="Accommodation type" forId="acc-type" error={errors.accommodationTypeId?.message} required>
          {({ labelId, describedBy }) => (
            <Controller
              name="accommodationTypeId"
              control={control}
              render={({ field }) => (
                <AppSelect
                  id="acc-type"
                  placeholder="Select type…"
                  options={typeOptions}
                  value={field.value !== null ? String(field.value) : ''}
                  invalid={Boolean(errors.accommodationTypeId?.message)}
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
            {isActive ? 'Active accommodation' : 'Inactive accommodation'}
          </span>
          <span className="product-form-section__toggle-text">
            Inactive accommodations are hidden from pricing and bookings.
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
