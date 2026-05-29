import { useEffect, useMemo, useRef } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppSurface, AppInput, AppSwitch, AppTextarea } from '@/shared/ui/primitives';
import { AppField } from '@/shared/ui/controls';
import { AppFormGrid, AppSectionCard } from '@/shared/ui/patterns';
import { AppPill } from '@/shared/ui/data-display';
import type { RoomFormValues } from '@/modules/products/rooms/model/form.types';
import { roomFormSchema } from './schema';
import { ProductFormActions } from '@/modules/products/shared/ui/ProductFormActions';

export interface RoomFormProps {
  mode?: 'create' | 'edit';
  defaultValues: RoomFormValues;
  submitLabel?: string;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  onSubmit: (values: RoomFormValues) => Promise<void> | void;
  onCancel?: () => void;
}

export const RoomForm = ({
  mode = 'create',
  defaultValues,
  submitLabel,
  isSubmitting = false,
  errorMessage,
  onSubmit,
  onCancel,
}: RoomFormProps) => {
  const methods = useForm<RoomFormValues>({
    resolver: zodResolver(roomFormSchema),
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
          <h2 className="app-section__title">Room setup</h2>
          <p className="app-section__text">Manage room details, occupancy, and status.</p>
        </AppSurface>

        <div className="product-form__main">
          <AppSectionCard
            title="General"
            description="Core room identity and capacity."
            actions={<AppPill variant={isActive ? 'success' : 'neutral'}>{isActive ? 'Active' : 'Inactive'}</AppPill>}
          >
            <AppFormGrid>
              <AppField label="Room name" forId="room-name" error={errors.name?.message} required>
                {({ describedBy, labelId }) => (
                  <AppInput id="room-name" invalid={Boolean(errors.name?.message)} describedBy={describedBy} labelledBy={labelId} placeholder="e.g. Single Standard" {...register('name')} />
                )}
              </AppField>

              <AppField label="Max occupancy" forId="room-occupancy" error={errors.maxOccupancy?.message} required>
                {({ describedBy, labelId }) => (
                  <AppInput id="room-occupancy" type="number" min={1} max={20} invalid={Boolean(errors.maxOccupancy?.message)} describedBy={describedBy} labelledBy={labelId} placeholder="1" {...register('maxOccupancy', { valueAsNumber: true })} />
                )}
              </AppField>
            </AppFormGrid>

            <AppField label="Description" forId="room-description" error={errors.description?.message}>
              {({ describedBy, labelId }) => (
                <AppTextarea id="room-description" rows={3} invalid={Boolean(errors.description?.message)} describedBy={describedBy} labelledBy={labelId} placeholder="Brief description of the room…" {...register('description')} />
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
            entityLabel="room"
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
