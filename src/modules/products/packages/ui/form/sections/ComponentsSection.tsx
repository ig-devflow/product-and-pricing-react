import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import type { PackageFormValues } from '@/modules/products/packages/model/form.types';
import { ProductKind } from '@/modules/products/packages/api/dto';
import { AppField } from '@/shared/ui/controls';
import { AppSelect, type AppSelectOption } from '@/shared/ui/controls/AppSelect';
import { AppSectionCard } from '@/shared/ui/patterns';
import { AppButton, AppInput } from '@/shared/ui/primitives';

const PRODUCT_KIND_OPTIONS: AppSelectOption[] = [
  { value: String(ProductKind.Course), label: 'Course' },
  { value: String(ProductKind.AccommodationRoom), label: 'Room' },
  { value: String(ProductKind.AddOn), label: 'Add-on' },
  { value: String(ProductKind.Transfer), label: 'Transfer' },
];

export const ComponentsSection = () => {
  const { control, register, formState: { errors } } = useFormContext<PackageFormValues>();
  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  return (
    <AppSectionCard
      id="section-components"
      title="Components"
      description="Products bundled in this package. Each entry specifies the product type, its ID, and price contribution."
    >
      {fields.length > 0 ? (
        <div className="product-form-components">
          {fields.map((field, index) => (
            <div key={field.id} className="product-form-components__row">
              <AppField label="Product type" forId={`pkg-kind-${index}`}>
                {({ labelId, describedBy }) => (
                  <Controller
                    name={`items.${index}.productKind`}
                    control={control}
                    render={({ field: f }) => (
                      <AppSelect
                        id={`pkg-kind-${index}`}
                        options={PRODUCT_KIND_OPTIONS}
                        value={String(f.value)}
                        labelledBy={labelId}
                        describedBy={describedBy}
                        onValueChange={(v) => f.onChange(Number(v))}
                      />
                    )}
                  />
                )}
              </AppField>

              <AppField label="Product ID" forId={`pkg-product-id-${index}`} error={errors.items?.[index]?.productId?.message}>
                {({ describedBy, labelId }) => (
                  <AppInput
                    id={`pkg-product-id-${index}`}
                    type="number"
                    min={1}
                    invalid={Boolean(errors.items?.[index]?.productId?.message)}
                    describedBy={describedBy}
                    labelledBy={labelId}
                    placeholder="ID"
                    {...register(`items.${index}.productId`, { valueAsNumber: true })}
                  />
                )}
              </AppField>

              <AppField label="Price breakdown" forId={`pkg-price-${index}`}>
                {({ describedBy, labelId }) => (
                  <AppInput
                    id={`pkg-price-${index}`}
                    type="number"
                    min={0}
                    step="0.01"
                    describedBy={describedBy}
                    labelledBy={labelId}
                    placeholder="0.00"
                    {...register(`items.${index}.priceBreakdown`, { valueAsNumber: true })}
                  />
                )}
              </AppField>

              <div className="product-form-components__remove">
                <AppButton type="button" variant="secondary" onClick={() => remove(index)}>
                  Remove
                </AppButton>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="product-form-components__empty">No components added yet.</p>
      )}

      <div className="product-form-components__add">
        <AppButton
          type="button"
          variant="secondary"
          onClick={() => append({ productKind: ProductKind.Course, productId: 0, priceBreakdown: 0 })}
        >
          Add component
        </AppButton>
      </div>
    </AppSectionCard>
  );
};
