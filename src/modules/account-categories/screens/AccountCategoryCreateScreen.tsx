import { useNavigate } from 'react-router';
import { useDivisionContext } from '@/app/context/DivisionContext';
import { CATEGORIES_MANAGER_ROUTES } from '@/app/config/routes';
import { AppAsyncState } from '@/shared/ui/data-display';
import { AppPageHeader, AppSectionCard } from '@/shared/ui/patterns';
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';
import { useCreateAccountCategoryMutation } from '@/modules/account-categories/queries/useCreateAccountCategoryMutation';
import { AccountCategoryForm } from '@/modules/account-categories/ui/form/AccountCategoryForm';
import type { AccountCategoryFormValues } from '@/modules/account-categories/model/types';

export const AccountCategoryCreateScreen = () => {
  const navigate = useNavigate();
  const { divisionId } = useDivisionContext();
  const createMutation = useCreateAccountCategoryMutation(divisionId);

  if (divisionId === 0) {
    return (
      <section className="app-page">
        <AppPageHeader
          eyebrow="Pricing Reference Data"
          title="Add account category"
        />
        <AppAsyncState title="No division selected" text="Select a division before creating an account category." />
      </section>
    );
  }

  const handleSubmit = async (values: AccountCategoryFormValues) => {
    const response = await createMutation.mutateAsync({
      name: values.name.trim(),
      isActive: values.isActive,
    });
    navigate(CATEGORIES_MANAGER_ROUTES.accountCategories.details(response.id));
  };

  const handleCancel = () => navigate(CATEGORIES_MANAGER_ROUTES.accountCategories.list);

  return (
    <section className="app-page">
      <AppPageHeader
        eyebrow="Pricing Reference Data"
        title="Add account category"
        subtitle="Create a new account category for this division."
      />
      <AppSectionCard title="Category details">
        <AccountCategoryForm
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
