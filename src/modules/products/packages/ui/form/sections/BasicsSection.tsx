import { Controller, useFormContext } from 'react-hook-form';
import type { PackageFormValues } from '@/modules/products/packages/model/form.types';
import { AppField } from '@/shared/ui/controls';
import { AppFormGrid, AppSectionCard } from '@/shared/ui/patterns';
import { AppInput, AppSwitch, AppTextarea } from '@/shared/ui/primitives';

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <rect x="2.5" y="6" width="9" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
    <path d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

interface BasicsSectionProps {
  divisionName: string;
}

export const BasicsSection = ({ divisionName }: BasicsSectionProps) => {
  const { control, register, formState: { errors }, watch } = useFormContext<PackageFormValues>();
  const isActive = watch('isActive');

  return (
    <AppSectionCard
      id="section-basics"
      title="Basics"
      description="Package name, description, and current availability status."
    >
      <AppFormGrid columns={1}>
        <AppField label="Name" forId="pkg-name" error={errors.name?.message} required>
          {({ describedBy, labelId }) => (
            <AppInput
              id="pkg-name"
              invalid={Boolean(errors.name?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="e.g. Standard Package"
              {...register('name')}
            />
          )}
        </AppField>

        <AppField label="Description" forId="pkg-description" error={errors.description?.message}>
          {({ describedBy, labelId }) => (
            <AppTextarea
              id="pkg-description"
              rows={3}
              invalid={Boolean(errors.description?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="Brief description of what this package includes…"
              {...register('description')}
            />
          )}
        </AppField>

        <AppField
          label="Division"
          forId="pkg-division"
          hint="Determined by the division selected at the top of the workspace."
        >
          <div id="pkg-division" className="product-form-locked-field">
            <span className="product-form-locked-field__icon"><LockIcon /></span>
            <span>{divisionName}</span>
          </div>
        </AppField>
      </AppFormGrid>

      <div className="product-form-section__toggle-row">
        <div className="product-form-section__toggle-copy">
          <span className="product-form-section__toggle-title">
            {isActive ? 'Active package' : 'Inactive package'}
          </span>
          <span className="product-form-section__toggle-text">
            Inactive products are hidden from pricing and bookings.
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
