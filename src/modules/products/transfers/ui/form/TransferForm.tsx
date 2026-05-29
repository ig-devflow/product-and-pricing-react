import { useEffect, useMemo, useRef } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppSurface, AppInput, AppSwitch, AppTextarea } from '@/shared/ui/primitives';
import { AppField } from '@/shared/ui/controls';
import { AppFormGrid, AppSectionCard } from '@/shared/ui/patterns';
import { AppPill } from '@/shared/ui/data-display';
import type { TransferFormValues } from '@/modules/products/transfers/model/form.types';
import { transferFormSchema } from './schema';
import { ProductFormActions } from '@/modules/products/shared/ui/ProductFormActions';

export interface TransferFormProps {
  mode?: 'create' | 'edit';
  defaultValues: TransferFormValues;
  submitLabel?: string;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  onSubmit: (values: TransferFormValues) => Promise<void> | void;
  onCancel?: () => void;
}

export const TransferForm = ({
  mode = 'create',
  defaultValues,
  submitLabel,
  isSubmitting = false,
  errorMessage,
  onSubmit,
  onCancel,
}: TransferFormProps) => {
  const methods = useForm<TransferFormValues>({
    resolver: zodResolver(transferFormSchema),
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
          <h2 className="app-section__title">Transfer setup</h2>
          <p className="app-section__text">Manage transfer service details.</p>
        </AppSurface>

        <div className="product-form__main">
          <AppSectionCard
            title="General"
            description="Transfer identity and description."
            actions={<AppPill variant={isActive ? 'success' : 'neutral'}>{isActive ? 'Active' : 'Inactive'}</AppPill>}
          >
            <AppFormGrid>
              <AppField label="Name" forId="transfer-name" error={errors.name?.message} required>
                {({ describedBy, labelId }) => (
                  <AppInput id="transfer-name" invalid={Boolean(errors.name?.message)} describedBy={describedBy} labelledBy={labelId} placeholder="e.g. Standard Airport Transfer" {...register('name')} />
                )}
              </AppField>
            </AppFormGrid>

            <AppField label="Description" forId="transfer-description" error={errors.description?.message}>
              {({ describedBy, labelId }) => (
                <AppTextarea id="transfer-description" rows={4} invalid={Boolean(errors.description?.message)} describedBy={describedBy} labelledBy={labelId} placeholder="Brief description…" {...register('description')} />
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
            entityLabel="transfer"
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
