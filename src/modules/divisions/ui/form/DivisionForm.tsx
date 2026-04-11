import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { DivisionFormValues } from '@/modules/divisions/model/division-form';
import {
  AppFormActionsPanel,
  AppFormGrid,
  AppSidebarSummary,
} from '@/shared/ui/patterns';
import {
  AddressSection,
  GeneralInformationSection,
  PolicySection,
} from './sections';
import { divisionFormSchema } from './schema';
import { formatUtcDateTime } from '@/shared/lib/date';
import { createDivisionSummaryItems } from '@/modules/divisions/model/factory';
import type { DivisionDetails } from '@/modules/divisions/model/division';

export interface DivisionFormProps {
  defaultValues: DivisionFormValues;
  submitLabel: string;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  division?: DivisionDetails | null;
  onSubmit: (values: DivisionFormValues) => Promise<void> | void;
  onCancel?: () => void;
}

export const DivisionForm = ({
  defaultValues,
  submitLabel,
  isSubmitting = false,
  errorMessage,
  division,
  onSubmit,
  onCancel,
}: DivisionFormProps) => {
  const methods = useForm<DivisionFormValues>({
    resolver: zodResolver(divisionFormSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const summaryItems = division
    ? createDivisionSummaryItems({
        id: division.id,
        createdBy: division.createdBy,
        lastModifiedBy: division.lastModifiedBy,
        createdOn: formatUtcDateTime(division.createdOn),
        lastModifiedOn: formatUtcDateTime(division.lastModifiedOn),
      })
    : [];

  return (
    <FormProvider {...methods}>
      <form
        className="division-form"
        onSubmit={methods.handleSubmit(async (values: DivisionFormValues) => {
          await onSubmit(values);
        })}
      >
        <AppFormGrid>
          <div className="division-form__main">
            <GeneralInformationSection />
            <AddressSection />
            <PolicySection />

            {errorMessage ? (
              <p role="alert" className="division-form__error-banner">
                {errorMessage}
              </p>
            ) : null}

            <AppFormActionsPanel
              submitLabel={submitLabel}
              isSubmitting={isSubmitting}
              onCancel={onCancel}
            />
          </div>

          {division ? (
            <AppSidebarSummary title="Division metadata" items={summaryItems} />
          ) : null}
        </AppFormGrid>
      </form>
    </FormProvider>
  );
};
