import { useEffect, useMemo } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { DivisionFormValues } from '@/modules/divisions/model/division-form';
import { AppSurface } from '@/shared/ui/primitives';
import type { DivisionDetails } from '@/modules/divisions/model/division';
import { divisionFormSchema } from './schema';
import {
  AddressSection,
  BannerSection,
  GeneralInformationSection,
  PolicySection,
} from './sections';
import { DivisionFormActions } from './DivisionFormActions';
import { DivisionFormAsideSummary } from './DivisionFormAsideSummary';

export interface DivisionFormProps {
  mode?: 'create' | 'edit';
  defaultValues: DivisionFormValues;
  submitLabel?: string;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  division?: DivisionDetails | null;
  onSubmit: (values: DivisionFormValues) => Promise<void> | void;
  onCancel?: () => void;
}

export const DivisionForm = ({
  mode = 'create',
  defaultValues,
  isSubmitting = false,
  errorMessage,
  division = null,
  onSubmit,
  onCancel,
}: DivisionFormProps) => {
  const methods = useForm<DivisionFormValues>({
    resolver: zodResolver(divisionFormSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const resetKey = useMemo(
    () => (mode === 'edit' ? `edit:${division?.id ?? 'loading'}` : 'create'),
    [division?.id, mode],
  );

  useEffect(() => {
    methods.reset(defaultValues);
  }, [defaultValues, methods, resetKey]);

  const watchedValues = useWatch({
    control: methods.control,
  })
  const values = useMemo<DivisionFormValues>(
    () => ({
      ...defaultValues,
      ...watchedValues,
      address: {
        ...defaultValues.address,
        ...watchedValues?.address,
      },
      accreditationBanner: watchedValues?.accreditationBanner
        ? {
            ...(defaultValues.accreditationBanner ?? {
              imageBase64: '',
              contentType: '',
              fileName: '',
            }),
            ...watchedValues.accreditationBanner,
          }
        : defaultValues.accreditationBanner,
    }),
    [defaultValues, watchedValues],
  )

  return (
    <FormProvider {...methods}>
      <form
        className="division-form"
        onSubmit={methods.handleSubmit(async (values: DivisionFormValues) => {
          await onSubmit(values);
        })}
      >
        <AppSurface
          className="app-section division-form__notice"
          variant="soft"
          padding="md"
        >
          <h2 className="app-section__title">Division setup</h2>
          <p className="app-section__text">
            Use this form to manage division settings, contact details, content
            blocks, and banner media.
          </p>
        </AppSurface>

        <div className="app-split division-form__layout">
          <div className="division-form__main">
            <GeneralInformationSection />
            <AddressSection />
            <PolicySection />
            <BannerSection />

            {errorMessage ? (
              <AppSurface className="division-form__error" padding="md">
                <h2 className="division-form__error-title">Save failed</h2>
                <p className="division-form__error-text">{errorMessage}</p>
              </AppSurface>
            ) : null}

            <DivisionFormActions
              mode={mode}
              isSubmitting={isSubmitting}
              canReset={methods.formState.isDirty}
              onSubmit={() => void methods.handleSubmit(onSubmit)()}
              onCancel={onCancel ?? (() => {})}
              onReset={() => methods.reset(defaultValues)}
            />
          </div>

          <DivisionFormAsideSummary
            mode={mode}
            values={values}
            details={division}
          />
        </div>
      </form>
    </FormProvider>
  );
};
