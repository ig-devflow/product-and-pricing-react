import { useFormContext } from 'react-hook-form';
import type { DivisionFormValues } from '@/modules/divisions/model/form.types';
import { AppField } from '@/shared/ui/controls';
import { AppSectionCard } from '@/shared/ui/patterns';
import { AppTextarea } from '@/shared/ui/primitives';

export const PolicySection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<DivisionFormValues>();

  return (
    <AppSectionCard
      title="Policies"
      description="Long-form policy copy stored directly on the division."
    >
      <div className="division-form-content__stack">
        <AppField
          label="Terms and conditions"
          forId="division-terms"
          error={errors.termsAndConditions?.message}
        >
          {({ describedBy, labelId }) => (
            <AppTextarea
              id="division-terms"
              className="division-form-content__textarea division-form-content__textarea--lg"
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="Paste or write the division terms and conditions"
              {...register('termsAndConditions')}
            />
          )}
        </AppField>

        <AppField
          label="Groups payment terms"
          forId="division-groups"
          error={errors.groupsPaymentTerms?.message}
        >
          {({ describedBy, labelId }) => (
            <AppTextarea
              id="division-groups"
              className="division-form-content__textarea"
              describedBy={describedBy}
              labelledBy={labelId}
              placeholder="Describe groups payment terms"
              {...register('groupsPaymentTerms')}
            />
          )}
        </AppField>
      </div>
    </AppSectionCard>
  );
};
