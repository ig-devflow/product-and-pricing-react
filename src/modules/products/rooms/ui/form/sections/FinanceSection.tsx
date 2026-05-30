import { useFormContext } from 'react-hook-form';
import type { RoomFormValues } from '@/modules/products/rooms/model/form.types';
import { AppField } from '@/shared/ui/controls';
import { AppFormGrid, AppSectionCard } from '@/shared/ui/patterns';
import { AppInput } from '@/shared/ui/primitives';

export const FinanceSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RoomFormValues>();

  return (
    <AppSectionCard
      id="section-finance"
      title="Finance & availability"
      description="GL code, cost centre, and the date when bookings close."
    >
      <AppFormGrid>
        <AppField
          label="GL code"
          forId="room-gl-code"
          error={errors.generalLedgerCode?.message}
          hint="Optional — general ledger code for this room."
        >
          {({ describedBy, labelId }) => (
            <AppInput
              id="room-gl-code"
              invalid={Boolean(errors.generalLedgerCode?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="e.g. 5001-RS"
              {...register('generalLedgerCode')}
            />
          )}
        </AppField>

        <AppField
          label="Cost centre"
          forId="room-cost-centre"
          error={errors.costCentreCode?.message}
          hint="Optional — cost centre code for this room."
        >
          {({ describedBy, labelId }) => (
            <AppInput
              id="room-cost-centre"
              invalid={Boolean(errors.costCentreCode?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="e.g. CC-MLT"
              {...register('costCentreCode')}
            />
          )}
        </AppField>

        <AppField
          label="Closure date"
          forId="room-closure-date"
          error={errors.closurePolicy?.message}
          hint="Optional — last date on which bookings can be made."
        >
          {({ describedBy, labelId }) => (
            <AppInput
              id="room-closure-date"
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
