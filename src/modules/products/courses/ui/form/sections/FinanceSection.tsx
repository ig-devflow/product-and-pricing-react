import { useFormContext } from 'react-hook-form';
import type { CourseFormValues } from '@/modules/products/courses/model/form.types';
import { AppField } from '@/shared/ui/controls';
import { AppFormGrid, AppSectionCard } from '@/shared/ui/patterns';
import { AppInput, AppTextarea } from '@/shared/ui/primitives';

export const FinanceSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CourseFormValues>();

  return (
    <AppSectionCard
      id="section-finance"
      title="Finance & availability"
      description="Ledger codes and booking closure rules."
    >
      <AppFormGrid>
        <AppField label="General ledger code" forId="course-gl-code" error={errors.generalLedgerCode?.message} hint="Optional — used for financial reporting.">
          {({ describedBy, labelId }) => (
            <AppInput
              id="course-gl-code"
              invalid={Boolean(errors.generalLedgerCode?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="e.g. 4001-COURSE"
              {...register('generalLedgerCode')}
            />
          )}
        </AppField>

        <AppField label="Cost centre code" forId="course-cost-centre" error={errors.costCentreCode?.message} hint="Optional — cost centre for budgeting.">
          {({ describedBy, labelId }) => (
            <AppInput
              id="course-cost-centre"
              invalid={Boolean(errors.costCentreCode?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="e.g. CC-ADL"
              {...register('costCentreCode')}
            />
          )}
        </AppField>
      </AppFormGrid>

      <AppField label="Closure policy" forId="course-closure-policy" error={errors.closurePolicy?.message} hint="Optional — describes how booking closures are handled.">
        {({ describedBy, labelId }) => (
          <AppTextarea
            id="course-closure-policy"
            rows={4}
            invalid={Boolean(errors.closurePolicy?.message)}
            describedBy={describedBy}
            labelledBy={labelId}
            placeholder="Describe the closure policy…"
            {...register('closurePolicy')}
          />
        )}
      </AppField>
    </AppSectionCard>
  );
};
