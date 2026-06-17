import { useNavigate } from 'react-router';
import { useDivisionContext } from '@/app/context/DivisionContext';
import { CATEGORIES_MANAGER_ROUTES } from '@/app/config/routes';
import { AppAsyncState } from '@/shared/ui/data-display';
import { AppPageHeader, AppSectionCard } from '@/shared/ui/patterns';
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';
import { useCreateProductCategoryMutation } from '@/modules/product-categories/queries/useCreateProductCategoryMutation';
import { ProductCategoryForm } from '@/modules/product-categories/ui/form/ProductCategoryForm';
import type { ProductCategoryFormValues } from '@/modules/product-categories/model/types';

export const ProductCategoryCreateScreen = () => {
  const navigate = useNavigate();
  const { divisionId } = useDivisionContext();
  const createMutation = useCreateProductCategoryMutation(divisionId);

  if (divisionId === 0) {
    return (
      <section className="app-page">
        <AppPageHeader
          eyebrow="Pricing Reference Data"
          title="Add product category"
        />
        <AppAsyncState title="No division selected" text="Select a division before creating a product category." />
      </section>
    );
  }

  const handleSubmit = async (values: ProductCategoryFormValues) => {
    const response = await createMutation.mutateAsync({
      name: values.name.trim(),
      isActive: values.isActive,
    });
    navigate(CATEGORIES_MANAGER_ROUTES.productCategories.details(response.id));
  };

  const handleCancel = () => navigate(CATEGORIES_MANAGER_ROUTES.productCategories.list);

  return (
    <section className="app-page">
      <AppPageHeader
        eyebrow="Pricing Reference Data"
        title="Add product category"
        subtitle="Create a new product category for this division."
      />
      <AppSectionCard title="Category details">
        <ProductCategoryForm
          mode="create"
          isSubmitting={createMutation.isPending}
          serverError={getApiErrorMessage(createMutation.error)}
          onSubmit={(values) => void handleSubmit(values)}
          onCancel={handleCancel}
        />
      </AppSectionCard>
    </section>
  );
};
