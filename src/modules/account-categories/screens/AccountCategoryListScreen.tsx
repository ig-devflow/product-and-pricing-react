import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDivisionContext } from '@/app/context/DivisionContext';
import { CATEGORIES_MANAGER_ROUTES } from '@/app/config/routes';
import { AppAsyncState } from '@/shared/ui/data-display';
import { AppPageHeader } from '@/shared/ui/patterns';
import { AppButton } from '@/shared/ui/primitives';
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';
import { useAccountCategoryListQuery } from '@/modules/account-categories/queries/useAccountCategoryListQuery';

export const AccountCategoryListScreen = () => {
  const navigate = useNavigate();
  const { divisionId, divisionName } = useDivisionContext();
  const [search, setSearch] = useState('');

  const query = useAccountCategoryListQuery(divisionId);
  const errorMessage = getApiErrorMessage(query.error, 'Failed to load account categories.');

  const items = useMemo(() => {
    const all = query.data ?? [];
    const term = search.trim().toLowerCase();
    return term ? all.filter((c) => c.name.toLowerCase().includes(term)) : all;
  }, [query.data, search]);

  const subtitle = divisionName
    ? `Drive how product revenue is posted to finance. Scoped to ${divisionName}.`
    : 'Drive how product revenue is posted to finance. Select a division at the top.';

  return (
    <section className="app-page">
      <AppPageHeader
        eyebrow="Pricing Reference Data"
        title="Account categories"
        subtitle={subtitle}
        actions={
          <AppButton
            type="button"
            variant="primary"
            onClick={() => navigate(CATEGORIES_MANAGER_ROUTES.accountCategories.create)}
            disabled={divisionId === 0}
          >
            Add account category
          </AppButton>
        }
      />

      <div className="app-surface app-surface--outlined" style={{ padding: '1.25rem 1.5rem', marginBottom: '1rem' }}>
        <p className="app-label" style={{ marginBottom: '0.5rem' }}>Find your match</p>
        <input
          className="app-input"
          type="search"
          placeholder="Search account categories by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%', maxWidth: '28rem' }}
        />
      </div>

      {query.isLoading ? (
        <div className="app-async-state-placeholder">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="app-skeleton" style={{ height: '5rem', marginBottom: '0.75rem', borderRadius: '0.75rem' }} />
          ))}
        </div>
      ) : errorMessage ? (
        <AppAsyncState
          title="Could not load account categories"
          text={errorMessage}
          actionText="Retry"
          onAction={() => void query.refetch()}
        />
      ) : divisionId === 0 ? (
        <AppAsyncState title="No division selected" text="Select a division to view account categories." />
      ) : items.length === 0 ? (
        <AppAsyncState
          title="No account categories found"
          text={search.trim() ? `No results for "${search.trim()}".` : 'Create the first account category for this division.'}
          actionText={search.trim() ? undefined : 'Add account category'}
          onAction={search.trim() ? undefined : () => navigate(CATEGORIES_MANAGER_ROUTES.accountCategories.create)}
        />
      ) : (
        <>
          <p className="app-page__eyebrow" style={{ marginBottom: '0.75rem' }}>
            <strong>{items.length}</strong> of <strong>{query.data?.length ?? 0}</strong> account {query.data?.length === 1 ? 'category' : 'categories'}
          </p>
          <div className="app-stack">
            {items.map((item) => (
              <div
                key={item.id}
                className="app-surface app-surface--outlined"
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem' }}
              >
                <div style={{ flex: 1 }}>
                  <p className="app-section__title" style={{ margin: 0 }}>{item.name}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--color-text-subtle)', fontSize: '0.8125rem' }}>
                  <span>ID {item.id}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <AppButton
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate(CATEGORIES_MANAGER_ROUTES.accountCategories.details(item.id))}
                  >
                    View details
                  </AppButton>
                  <AppButton
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate(CATEGORIES_MANAGER_ROUTES.accountCategories.edit(item.id))}
                  >
                    Edit
                  </AppButton>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};
