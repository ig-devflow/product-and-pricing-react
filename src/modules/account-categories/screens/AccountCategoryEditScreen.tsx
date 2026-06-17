import { useNavigate, useParams } from 'react-router';
import { useDivisionContext } from '@/app/context/DivisionContext';
import { CATEGORIES_MANAGER_ROUTES } from '@/app/config/routes';
import { AppAsyncState } from '@/shared/ui/data-display';
import { AppPageHeader, AppSectionCard } from '@/shared/ui/patterns';
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';
import { useAccountCategoryDetailsQuery } from '@/modules/account-categories/queries/useAccountCategoryDetailsQuery';
import { useUpdateAccountCategoryMutation } from '@/modules/account-categories/queries/useUpdateAccountCategoryMutation';
import { AccountCategoryForm } from '@/modules/account-categories/ui/form/AccountCategoryForm';
import type { AccountCategoryFormValues } from '@/modules/account-categories/model/types';

export const AccountCategoryEditScreen = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { divisionId } = useDivisionContext();
  const categoryId = Number(id);

  const query = useAccountCategoryDetailsQuery(categoryId);
  const updateMutation = useUpdateAccountCategoryMutation(divisionId);

  const errorMessage = getApiErrorMessage(query.error, 'Failed to load account category.');
  const category = query.data;

  if (query.isLoading) {
    return (
      <section className="app-page">
        <AppPageHeader eyebrow="Pricing Reference Data" title="Edit account category" />
        <div className="app-skeleton" style={{ height: '12rem', borderRadius: '0.75rem' }} />
      </section>
    );
  }

  if (errorMessage || !category) {
    return (
      <section className="app-page">
        <AppPageHeader eyebrow="Pricing Reference Data" title="Edit account category" />
        <AppAsyncState
          title="Could not load account category"
          text={errorMessage}
          actionText="Retry"
          onAction={() => void query.refetch()}
        />
      </section>
    );
  }

  const handleSubmit = async (values: AccountCategoryFormValues) => {
    await updateMutation.mutateAsync({
      id: categoryId,
      payload: { name: values.name.trim(), version: category.version },
    });
    navigate(CATEGORIES_MANAGER_ROUTES.accountCategories.details(categoryId));
  };

  const handleCancel = () =>
    navigate(CATEGORIES_MANAGER_ROUTES.accountCategories.details(categoryId));

  return (
    <section className="app-page">
      <AppPageHeader
        eyebrow="Pricing Reference Data"
        title={`Edit: ${category.name}`}
        subtitle="Update the name of this account category."
      />
      <AppSectionCard title="Category details">
        <AccountCategoryForm
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
