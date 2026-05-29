import { Controller, useFormContext } from 'react-hook-form';
import type { CourseFormValues } from '@/modules/products/courses/model/form.types';
import { AppField } from '@/shared/ui/controls';
import { AppSelect, type AppSelectOption } from '@/shared/ui/controls/AppSelect';
import { AppFormGrid, AppSectionCard } from '@/shared/ui/patterns';
import { AppInput } from '@/shared/ui/primitives';
import { useAccountCategoriesQuery } from '@/shared/queries/useAccountCategoriesQuery';
import { useProductCategoriesQuery } from '@/shared/queries/useProductCategoriesQuery';

function toOptions(items: { id: number; name: string }[] | undefined): AppSelectOption[] {
  return (items ?? []).map((item) => ({ value: String(item.id), label: item.name }));
}

interface CategorisationSectionProps {
  divisionId: number;
}

export const CategorisationSection = ({ divisionId }: CategorisationSectionProps) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<CourseFormValues>();

  const accountCatsQuery = useAccountCategoriesQuery(divisionId);
  const productCatsQuery = useProductCategoriesQuery(divisionId);

  const accountCatOptions = toOptions(accountCatsQuery.data);
  const productCatOptions = toOptions(productCatsQuery.data);

  return (
    <AppSectionCard
      id="section-categorisation"
      title="Categorisation"
      description="How the course is categorised for reporting and accounts."
    >
      <AppFormGrid>
        <AppField label="Product category" forId="course-product-cat" error={errors.productCategoryId?.message} required>
          {({ labelId, describedBy }) => (
            <Controller
              name="productCategoryId"
              control={control}
              render={({ field }) => (
                <AppSelect
                  id="course-product-cat"
                  placeholder="Select product category…"
                  options={productCatOptions}
                  value={field.value !== null ? String(field.value) : ''}
                  invalid={Boolean(errors.productCategoryId?.message)}
                  describedBy={describedBy}
                  labelledBy={labelId}
                  searchable
                  onValueChange={(v) => field.onChange(v ? Number(v) : null)}
                />
              )}
            />
          )}
        </AppField>

        <AppField label="Account category" forId="course-account-cat" error={errors.accountCategoryId?.message} required>
          {({ labelId, describedBy }) => (
            <Controller
              name="accountCategoryId"
              control={control}
              render={({ field }) => (
                <AppSelect
                  id="course-account-cat"
                  placeholder="Select account category…"
                  options={accountCatOptions}
                  value={field.value !== null ? String(field.value) : ''}
                  invalid={Boolean(errors.accountCategoryId?.message)}
                  describedBy={describedBy}
                  labelledBy={labelId}
                  searchable
                  onValueChange={(v) => field.onChange(v ? Number(v) : null)}
                />
              )}
            />
          )}
        </AppField>

        <AppField label="Age from" forId="course-age-from" error={errors.ageFrom?.message} hint="Optional — minimum student age.">
          {({ describedBy, labelId }) => (
            <AppInput
              id="course-age-from"
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

        <AppField label="Age to" forId="course-age-to" error={errors.ageTo?.message} hint="Optional — maximum student age.">
          {({ describedBy, labelId }) => (
            <AppInput
              id="course-age-to"
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
