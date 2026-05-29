import { useEffect, useMemo, useRef } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppSurface, AppInput, AppSwitch, AppTextarea } from '@/shared/ui/primitives';
import { AppField } from '@/shared/ui/controls';
import { AppFormGrid, AppSectionCard } from '@/shared/ui/patterns';
import { AppPill } from '@/shared/ui/data-display';
import type { AddOnFormValues } from '@/modules/products/addons/model/form.types';
import { addonFormSchema } from './schema';
import { ProductFormActions } from '@/modules/products/shared/ui/ProductFormActions';

export interface AddOnFormProps {
  mode?: 'create' | 'edit';
  defaultValues: AddOnFormValues;
  submitLabel?: string;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  onSubmit: (values: AddOnFormValues) => Promise<void> | void;
  onCancel?: () => void;
}

export const AddOnForm = ({
  mode = 'create',
  defaultValues,
  submitLabel,
  isSubmitting = false,
  errorMessage,
  onSubmit,
  onCancel,
}: AddOnFormProps) => {
  const methods = useForm<AddOnFormValues>({
    resolver: zodResolver(addonFormSchema),
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
          <h2 className="app-section__title">Add-on setup</h2>
          <p className="app-section__text">Manage optional extra product details.</p>
        </AppSurface>

        <div className="product-form__main">
          <AppSectionCard
            title="General"
            description="Add-on identity and description."
            actions={<AppPill variant={isActive ? 'success' : 'neutral'}>{isActive ? 'Active' : 'Inactive'}</AppPill>}
          >
            <AppFormGrid>
              <AppField label="Name" forId="addon-name" error={errors.name?.message} required>
                {({ describedBy, labelId }) => (
                  <AppInput id="addon-name" invalid={Boolean(errors.name?.message)} describedBy={describedBy} labelledBy={labelId} placeholder="e.g. Airport Pickup" {...register('name')} />
                )}
              </AppField>
            </AppFormGrid>

            <AppField label="Description" forId="addon-description" error={errors.description?.message}>
              {({ describedBy, labelId }) => (
                <AppTextarea id="addon-description" rows={4} invalid={Boolean(errors.description?.message)} describedBy={describedBy} labelledBy={labelId} placeholder="Brief description…" {...register('description')} />
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

          {errorMessage ? (
            <AppSurface className="product-form__error" padding="md">
              <h2 className="product-form__error-title">Save failed</h2>
              <p className="product-form__error-text">{errorMessage}</p>
            </AppSurface>
          ) : null}

          <ProductFormActions
            mode={mode}
            entityLabel="add-on"
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
