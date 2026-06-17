import { useNavigate, useParams } from 'react-router';
import { CATEGORIES_MANAGER_ROUTES } from '@/app/config/routes';
import { AppAsyncState, AppKeyValueList, AppPill } from '@/shared/ui/data-display';
import { AppPageHeader, AppSectionCard } from '@/shared/ui/patterns';
import { AppButton } from '@/shared/ui/primitives';
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';
import { useAccountCategoryDetailsQuery } from '@/modules/account-categories/queries/useAccountCategoryDetailsQuery';

export const AccountCategoryDetailsScreen = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const categoryId = Number(id);

  const query = useAccountCategoryDetailsQuery(categoryId);
  const errorMessage = getApiErrorMessage(query.error, 'Failed to load account category.');
  const category = query.data;

  if (query.isLoading) {
    return (
      <section className="app-page">
        <AppPageHeader eyebrow="Pricing Reference Data" title="Account category" />
        <div className="app-skeleton" style={{ height: '12rem', borderRadius: '0.75rem' }} />
      </section>
    );
  }

  if (errorMessage || !category) {
    return (
      <section className="app-page">
        <AppPageHeader eyebrow="Pricing Reference Data" title="Account category" />
        <AppAsyncState
          title="Could not load account category"
          text={errorMessage}
          actionText="Retry"
          onAction={() => void query.refetch()}
        />
      </section>
    );
  }

  return (
    <section className="app-page">
      <AppPageHeader
        eyebrow="Pricing Reference Data"
        title={category.name}
        subtitle={`Account category · ID ${category.id}`}
        actions={
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <AppButton
              type="button"
              variant="secondary"
              onClick={() => navigate(CATEGORIES_MANAGER_ROUTES.accountCategories.list)}
            >
              Back to list
            </AppButton>
            <AppButton
              type="button"
              variant="primary"
              onClick={() => navigate(CATEGORIES_MANAGER_ROUTES.accountCategories.edit(category.id))}
            >
              Edit
            </AppButton>
          </div>
        }
      />

      <div className="app-stack">
        <AppSectionCard title="Details">
          <AppKeyValueList
            items={[
              { key: 'id', label: 'ID', value: category.id },
              { key: 'name', label: 'Name', value: category.name },
              { key: 'divisionId', label: 'Division ID', value: category.divisionId },
            ]}
          />
          <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-subtle)' }}>Status</span>
            <AppPill variant={category.isActive ? 'success' : 'neutral'}>
              {category.isActive ? 'Active' : 'Inactive'}
            </AppPill>
          </div>
        </AppSectionCard>

        <AppSectionCard title="Audit">
          <AppKeyValueList
            items={[
              { key: 'createdAt', label: 'Created', value: category.createdAt },
              { key: 'createdBy', label: 'Created by', value: category.createdByName },
              { key: 'updatedAt', label: 'Last updated', value: category.updatedAt || '—' },
              { key: 'updatedBy', label: 'Updated by', value: category.updatedByName || '—' },
            ]}
          />
        </AppSectionCard>
      </div>
    </section>
  );
};
