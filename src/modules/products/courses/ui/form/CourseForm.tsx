import { useEffect, useMemo, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppSurface } from '@/shared/ui/primitives';
import type { CourseFormValues } from '@/modules/products/courses/model/form.types';
import { courseFormSchema } from './schema';
import { GeneralSection } from './sections';
import { ProductFormActions } from '@/modules/products/shared/ui/ProductFormActions';

export interface CourseFormProps {
  mode?: 'create' | 'edit';
  defaultValues: CourseFormValues;
  submitLabel?: string;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  onSubmit: (values: CourseFormValues) => Promise<void> | void;
  onCancel?: () => void;
}

export const CourseForm = ({
  mode = 'create',
  defaultValues,
  submitLabel,
  isSubmitting = false,
  errorMessage,
  onSubmit,
  onCancel,
}: CourseFormProps) => {
  const methods = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const resetKey = useMemo(() => (mode === 'edit' ? `edit` : 'create'), [mode]);
  const defaultValuesRef = useRef(defaultValues);
  useEffect(() => { defaultValuesRef.current = defaultValues; }, [defaultValues]);
  useEffect(() => { methods.reset(defaultValuesRef.current); }, [methods, resetKey]);

  return (
    <FormProvider {...methods}>
      <form className="product-form" onSubmit={methods.handleSubmit(onSubmit)}>
        <AppSurface className="app-section product-form__notice" variant="soft" padding="md">
          <h2 className="app-section__title">Course setup</h2>
          <p className="app-section__text">
            Use this form to manage course details, scheduling, and status.
          </p>
        </AppSurface>

        <div className="product-form__main">
          <GeneralSection />

          {errorMessage ? (
            <AppSurface className="product-form__error" padding="md">
              <h2 className="product-form__error-title">Save failed</h2>
              <p className="product-form__error-text">{errorMessage}</p>
            </AppSurface>
          ) : null}

          <ProductFormActions
            mode={mode}
            entityLabel="course"
            submitLabel={submitLabel}
            isSubmitting={isSubmitting}
            canReset={methods.formState.isDirty}
            onCancel={onCancel ?? (() => {})}
            onReset={() => methods.reset(defaultValues)}
          />
        </div>
      </form>
    </FormProvider>
  );
};
