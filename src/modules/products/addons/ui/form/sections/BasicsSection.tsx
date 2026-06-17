import { Controller, useFormContext } from 'react-hook-form';
import type { AddOnFormValues } from '@/modules/products/addons/model/form.types';
import { AddOnType } from '@/modules/products/addons/api/dto';
import { AppField } from '@/shared/ui/controls';
import { AppSelect, type AppSelectOption } from '@/shared/ui/controls/AppSelect';
import { AppFormGrid, AppSectionCard } from '@/shared/ui/patterns';
import { AppInput, AppSwitch } from '@/shared/ui/primitives';

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <rect x="2.5" y="6" width="9" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
    <path d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const ADD_ON_TYPE_OPTIONS: AppSelectOption[] = [
  { value: String(AddOnType.OneToOneCourse), label: 'One-to-one course' },
  { value: String(AddOnType.Exam), label: 'Exam' },
  { value: String(AddOnType.Activity), label: 'Activity' },
  { value: String(AddOnType.Insurance), label: 'Insurance' },
  { value: String(AddOnType.Generic), label: 'Generic' },
];

interface BasicsSectionProps {
  divisionName: string;
}

export const BasicsSection = ({ divisionName }: BasicsSectionProps) => {
  const {
    control,
    register,
    formState: { errors },
    watch,
  } = useFormContext<AddOnFormValues>();

  const isActive = watch('isActive');

  return (
    <AppSectionCard
      id="section-basics"
      title="Basics"
      description="Name, add-on type, and current availability status."
    >
      <AppFormGrid columns={1}>
        <AppField label="Name" forId="addon-name" error={errors.name?.message} required>
          {({ describedBy, labelId }) => (
            <AppInput
              id="addon-name"
              invalid={Boolean(errors.name?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="e.g. Airport Pickup"
              {...register('name')}
            />
          )}
        </AppField>

        <AppField label="Add-on type" forId="addon-type" error={errors.addOnType?.message} required>
          {({ labelId, describedBy }) => (
            <Controller
              name="addOnType"
              control={control}
              render={({ field }) => (
                <AppSelect
                  id="addon-type"
                  placeholder="Select add-on type…"
                  options={ADD_ON_TYPE_OPTIONS}
                  value={field.value !== null ? String(field.value) : ''}
                  invalid={Boolean(errors.addOnType?.message)}
                  describedBy={describedBy}
                  labelledBy={labelId}
                  onValueChange={(v) => field.onChange(v ? Number(v) : null)}
                />
              )}
            />
          )}
        </AppField>

        <AppField
          label="Division"
          forId="addon-division"
          hint="Determined by the division selected at the top of the workspace."
        >
          <div id="addon-division" className="product-form-locked-field">
            <span className="product-form-locked-field__icon"><LockIcon /></span>
            <span>{divisionName}</span>
          </div>
        </AppField>
      </AppFormGrid>

      <div className="product-form-section__toggle-row">
        <div className="product-form-section__toggle-copy">
          <span className="product-form-section__toggle-title">
            {isActive ? 'Active add-on' : 'Inactive add-on'}
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
