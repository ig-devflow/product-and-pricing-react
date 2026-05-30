import { Controller, useFormContext } from 'react-hook-form';
import type { RoomFormValues } from '@/modules/products/rooms/model/form.types';
import { AppField } from '@/shared/ui/controls';
import { AppSelect, type AppSelectOption } from '@/shared/ui/controls/AppSelect';
import { AppFormGrid, AppSectionCard } from '@/shared/ui/patterns';
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
    formState: { errors },
  } = useFormContext<RoomFormValues>();

  const accountCatsQuery = useAccountCategoriesQuery(divisionId);
  const productCatsQuery = useProductCategoriesQuery(divisionId);

  const accountCatOptions = toOptions(accountCatsQuery.data);
  const productCatOptions = toOptions(productCatsQuery.data);

  return (
    <AppSectionCard
      id="section-categorisation"
      title="Categorisation"
      description="Product and account categories for this room."
    >
      <AppFormGrid>
        <AppField label="Product category" forId="room-product-cat" error={errors.productCategoryId?.message} required>
          {({ labelId, describedBy }) => (
            <Controller
              name="productCategoryId"
              control={control}
              render={({ field }) => (
                <AppSelect
                  id="room-product-cat"
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

        <AppField label="Account category" forId="room-account-cat" error={errors.accountCategoryId?.message} required>
          {({ labelId, describedBy }) => (
            <Controller
              name="accountCategoryId"
              control={control}
              render={({ field }) => (
                <AppSelect
                  id="room-account-cat"
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
      </AppFormGrid>
    </AppSectionCard>
  );
};
