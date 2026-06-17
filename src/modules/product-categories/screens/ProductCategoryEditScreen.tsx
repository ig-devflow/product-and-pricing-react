import { useNavigate, useParams } from 'react-router';
import { useDivisionContext } from '@/app/context/DivisionContext';
import { CATEGORIES_MANAGER_ROUTES } from '@/app/config/routes';
import { AppAsyncState } from '@/shared/ui/data-display';
import { AppPageHeader, AppSectionCard } from '@/shared/ui/patterns';
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';
import { useProductCategoryDetailsQuery } from '@/modules/product-categories/queries/useProductCategoryDetailsQuery';
import { useUpdateProductCategoryMutation } from '@/modules/product-categories/queries/useUpdateProductCategoryMutation';
import { ProductCategoryForm } from '@/modules/product-categories/ui/form/ProductCategoryForm';
import type { ProductCategoryFormValues } from '@/modules/product-categories/model/types';

export const ProductCategoryEditScreen = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { divisionId } = useDivisionContext();
  const categoryId = Number(id);

  const query = useProductCategoryDetailsQuery(categoryId);
  const updateMutation = useUpdateProductCategoryMutation(divisionId);

  const errorMessage = getApiErrorMessage(query.error, 'Failed to load product category.');
  const category = query.data;

  if (query.isLoading) {
    return (
      <section className="app-page">
        <AppPageHeader eyebrow="Pricing Reference Data" title="Edit product category" />
        <div className="app-skeleton" style={{ height: '12rem', borderRadius: '0.75rem' }} />
      </section>
    );
  }

  if (errorMessage || !category) {
    return (
      <section className="app-page">
        <AppPageHeader eyebrow="Pricing Reference Data" title="Edit product category" />
        <AppAsyncState
          title="Could not load product category"
          text={errorMessage}
          actionText="Retry"
          onAction={() => void query.refetch()}
        />
      </section>
    );
  }

  const handleSubmit = async (values: ProductCategoryFormValues) => {
    await updateMutation.mutateAsync({
      id: categoryId,
      payload: { name: values.name.trim(), version: category.version },
    });
    navigate(CATEGORIES_MANAGER_ROUTES.productCategories.details(categoryId));
  };

  const handleCancel = () =>
    navigate(CATEGORIES_MANAGER_ROUTES.productCategories.details(categoryId));

  return (
    <section className="app-page">
      <AppPageHeader
        eyebrow="Pricing Reference Data"
        title={`Edit: ${category.name}`}
        subtitle="Update the name of this product category."
      />
      <AppSectionCard title="Category details">
        <ProductCategoryForm
          mode="edit"
          initial={{ name: category.name, isActive: category.isActive }}
          isSubmitting={updateMutation.isPending}
          serverError={getApiErrorMessage(updateMutation.error)}
          onSubmit={(values) => void handleSubmit(values)}
          onCancel={handleCancel}
        />
      </AppSectionCard>
    </section>
  );
};
