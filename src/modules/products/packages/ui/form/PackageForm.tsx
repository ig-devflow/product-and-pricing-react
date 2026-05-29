import { useEffect, useMemo, useRef } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppSurface, AppInput, AppSwitch, AppTextarea } from '@/shared/ui/primitives';
import { AppField } from '@/shared/ui/controls';
import { AppFormGrid, AppSectionCard } from '@/shared/ui/patterns';
import { AppPill } from '@/shared/ui/data-display';
import type { PackageFormValues } from '@/modules/products/packages/model/form.types';
import { packageFormSchema } from './schema';
import { ProductFormActions } from '@/modules/products/shared/ui/ProductFormActions';

export interface PackageFormProps {
  mode?: 'create' | 'edit';
  defaultValues: PackageFormValues;
  submitLabel?: string;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  onSubmit: (values: PackageFormValues) => Promise<void> | void;
  onCancel?: () => void;
}

export const PackageForm = ({
  mode = 'create',
  defaultValues,
  submitLabel,
  isSubmitting = false,
  errorMessage,
  onSubmit,
  onCancel,
}: PackageFormProps) => {
  const methods = useForm<PackageFormValues>({
    resolver: zodResolver(packageFormSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const resetKey = useMemo(() => (mode === 'edit' ? 'edit' : 'create'), [mode]);
  const defaultValuesRef = useRef(defaultValues);
  useEffect(() => { defaultValuesRef.current = defaultValues; }, [defaultValues]);
  useEffect(() => { methods.reset(defaultValuesRef.current); }, [methods, resetKey]);

  const { register, control, formState: { errors, isDirty }, watch } = methods;
  const isActive = watch('isActive');

  return (
    <FormProvider {...methods}>
      <form className="product-form" onSubmit={methods.handleSubmit(onSubmit)}>
        <AppSurface className="app-section product-form__notice" variant="soft" padding="md">
          <h2 className="app-section__title">Package setup</h2>
          <p className="app-section__text">Bundle courses, accommodations, add-ons, and transfers into a package.</p>
        </AppSurface>

        <div className="product-form__main">
          <AppSectionCard
            title="General"
            description="Package identity and description."
            actions={<AppPill variant={isActive ? 'success' : 'neutral'}>{isActive ? 'Active' : 'Inactive'}</AppPill>}
          >
            <AppFormGrid>
              <AppField label="Name" forId="pkg-name" error={errors.name?.message} required>
                {({ describedBy, labelId }) => (
                  <AppInput id="pkg-name" invalid={Boolean(errors.name?.message)} describedBy={describedBy} labelledBy={labelId} placeholder="e.g. Standard Package" {...register('name')} />
                )}
              </AppField>
            </AppFormGrid>

            <AppField label="Description" forId="pkg-description" error={errors.description?.message}>
              {({ describedBy, labelId }) => (
                <AppTextarea id="pkg-description" rows={4} invalid={Boolean(errors.description?.message)} describedBy={describedBy} labelledBy={labelId} placeholder="Brief description…" {...register('description')} />
              )}
            </AppField>

            <div className="product-form-section__toggle-row">
              <div className="product-form-section__toggle-copy">
                <span className="product-form-section__toggle-title">Status</span>
                <span className="product-form-section__toggle-text">Disable without removing data.</span>
              </div>
              <Controller name="isActive" control={control} render={({ field }) => (
                <AppSwitch checked={Boolean(field.value)} label={field.value ? 'Active' : 'Inactive'} onChange={(e) => field.onChange(e.target.checked)} />
              )} />
            </div>
          </AppSectionCard>

          <AppSectionCard title="Components" description="Specify which products this package bundles together.">
            <AppFormGrid>
              <AppField label="Course ID" forId="pkg-course" error={errors.courseId?.message} hint="Optional course to include">
                {({ describedBy, labelId }) => (
                  <AppInput id="pkg-course" type="number" min={1} describedBy={describedBy} labelledBy={labelId} placeholder="Course ID" {...register('courseId', { valueAsNumber: true, setValueAs: (v) => v === '' ? null : Number(v) })} />
                )}
              </AppField>

              <AppField label="Accommodation ID" forId="pkg-accommodation" error={errors.accommodationId?.message} hint="Optional accommodation to include">
                {({ describedBy, labelId }) => (
                  <AppInput id="pkg-accommodation" type="number" min={1} describedBy={describedBy} labelledBy={labelId} placeholder="Accommodation ID" {...register('accommodationId', { valueAsNumber: true, setValueAs: (v) => v === '' ? null : Number(v) })} />
                )}
              </AppField>

              <AppField label="Room ID" forId="pkg-room" error={errors.roomId?.message} hint="Optional room to include">
                {({ describedBy, labelId }) => (
                  <AppInput id="pkg-room" type="number" min={1} describedBy={describedBy} labelledBy={labelId} placeholder="Room ID" {...register('roomId', { valueAsNumber: true, setValueAs: (v) => v === '' ? null : Number(v) })} />
                )}
              </AppField>
            </AppFormGrid>
          </AppSectionCard>

          {errorMessage ? (
            <AppSurface className="product-form__error" padding="md">
              <h2 className="product-form__error-title">Save failed</h2>
              <p className="product-form__error-text">{errorMessage}</p>
            </AppSurface>
          ) : null}

          <ProductFormActions
            mode={mode}
            entityLabel="package"
            submitLabel={submitLabel}
            isSubmitting={isSubmitting}
            canReset={isDirty}
            onCancel={onCancel ?? (() => {})}
            onReset={() => methods.reset(defaultValues)}
          />
        </div>
      </form>
    </FormProvider>
  );
};
