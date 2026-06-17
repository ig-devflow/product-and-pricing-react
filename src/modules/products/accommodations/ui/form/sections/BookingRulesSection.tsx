import { useFormContext } from 'react-hook-form';
import type { AccommodationFormValues } from '@/modules/products/accommodations/model/form.types';
import { AppField } from '@/shared/ui/controls';
import { AppFormGrid, AppSectionCard } from '@/shared/ui/patterns';
import { AppInput } from '@/shared/ui/primitives';

export const BookingRulesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<AccommodationFormValues>();

  return (
    <AppSectionCard
      id="section-booking-rules"
      title="Booking rules"
      description="Minimum stay duration and eligible student age range."
    >
      <AppFormGrid>
        <AppField
          label="Minimum stay (weeks)"
          forId="acc-min-stay"
          error={errors.minimumStayInWeeks?.message}
          required
          hint="Minimum number of weeks a student must book."
        >
          {({ describedBy, labelId }) => (
            <AppInput
              id="acc-min-stay"
              type="number"
              min={1}
              invalid={Boolean(errors.minimumStayInWeeks?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="e.g. 1"
              {...register('minimumStayInWeeks', { valueAsNumber: true })}
            />
          )}
        </AppField>

        <AppField
          label="Age from"
          forId="acc-age-from"
          error={errors.ageFrom?.message}
          hint="Optional — minimum student age."
        >
          {({ describedBy, labelId }) => (
            <AppInput
              id="acc-age-from"
              type="number"
              min={0}
              max={99}
              invalid={Boolean(errors.ageFrom?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="e.g. 16"
              {...register('ageFrom', { valueAsNumber: true })}
            />
          )}
        </AppField>

        <AppField
          label="Age to"
          forId="acc-age-to"
          error={errors.ageTo?.message}
          hint="Optional — maximum student age."
        >
          {({ describedBy, labelId }) => (
            <AppInput
              id="acc-age-to"
              type="number"
              min={0}
              max={99}
              invalid={Boolean(errors.ageTo?.message)}
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="e.g. 99"
              {...register('ageTo', { valueAsNumber: true })}
            />
          )}
        </AppField>
      </AppFormGrid>
    </AppSectionCard>
  );
};
