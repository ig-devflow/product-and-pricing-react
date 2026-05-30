import { useFormContext } from 'react-hook-form';
import type { AddOnFormValues } from '@/modules/products/addons/model/form.types';
import { AppField } from '@/shared/ui/controls';
import { AppFormGrid, AppSectionCard } from '@/shared/ui/patterns';
import { AppInput } from '@/shared/ui/primitives';

export const FinanceSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<AddOnFormValues>();

  return (
    <AppSectionCard
      id="section-finance"
      title="Finance & availability"
      description="GL code, cost centre, and the date when bookings close."
    >
      <AppFormGrid>
        <AppField label="General ledger code" forId="addon-gl-code" error={errors.generalLedgerCode?.message} hint="Optional — used for financial reporting.">
          {({ describedBy, labelId }) => (
            <AppInput
              id="addon-gl-code"
              invalid={Boolean(errors.generalLedgerCode?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="e.g. 4001-ADDON"
              {...register('generalLedgerCode')}
            />
          )}
        </AppField>

        <AppField label="Cost centre code" forId="addon-cost-centre" error={errors.costCentreCode?.message} hint="Optional — cost centre for budgeting.">
          {({ describedBy, labelId }) => (
            <AppInput
              id="addon-cost-centre"
              invalid={Boolean(errors.costCentreCode?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="e.g. CC-ADL"
              {...register('costCentreCode')}
            />
          )}
        </AppField>

        <AppField label="Closure date" forId="addon-closure-date" error={errors.closurePolicy?.message} hint="Optional — last date on which bookings can be made.">
          {({ describedBy, labelId }) => (
            <AppInput
              id="addon-closure-date"
              type="date"
              invalid={Boolean(errors.closurePolicy?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              {...register('closurePolicy')}
            />
          )}
        </AppField>
      </AppFormGrid>
    </AppSectionCard>
  );
};
