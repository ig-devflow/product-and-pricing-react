import { AppAsyncState, AppKeyValueList } from '@/shared/ui/data-display';
import { AppPageHeader, AppSectionCard } from '@/shared/ui/patterns';
import { AppButton } from '@/shared/ui/primitives';
import { useAccommodationDetailsScreen } from '@/modules/products/accommodations/hooks/useAccommodationDetailsScreen';
import { ProductDetailsHero, ProductReadonlySummary } from '@/modules/products/shared/ui';
import { useAccommodationTypesQuery } from '@/shared/queries/useAccommodationTypesQuery';

function findName(items: { id: number; name: string }[] | undefined, id: number | null | undefined): string {
  if (!items || id == null) return '—';
  return items.find((x) => x.id === id)?.name ?? String(id);
}

export const AccommodationDetailsScreen = () => {
  const page = useAccommodationDetailsScreen();
  const typesQuery = useAccommodationTypesQuery();

  if (page.isLoading) {
    return (
      <section className="app-page product-details-page">
        <AppPageHeader eyebrow={page.pageHeader.eyebrow} title={page.pageHeader.title} subtitle={page.pageHeader.subtitle} />
        <div className="app-grid app-grid--dense product-details-page__loading">
          {Array.from({ length: 4 }, (_, i) => <div key={i} className="app-skeleton product-details-page__skeleton" />)}
        </div>
      </section>
    );
  }

  if (page.errorMessage || page.details === null) {
    return (
      <section className="app-page product-details-page">
        <AppPageHeader eyebrow={page.pageHeader.eyebrow} title={page.pageHeader.title} subtitle={page.pageHeader.subtitle} />
        <AppAsyncState title="Could not load accommodation" text={page.errorMessage} actionText="Retry" onAction={() => void page.detailsQuery.refetch()} />
      </section>
    );
  }

  const { details } = page;
  const typeName = findName(typesQuery.data, details.accommodationTypeId);

  return (
    <section className="app-page product-details-page">
      <AppPageHeader eyebrow={page.pageHeader.eyebrow} title={page.pageHeader.title} subtitle={page.pageHeader.subtitle} />
      <ProductDetailsHero
        productType="accommodation"
        name={details.name}
        isActive={details.isActive}
        onBack={page.handleBack}
        onEdit={page.openEditPage}
      />
      <div className="app-split product-details-page__layout">
        <div className="app-stack app-stack--lg">
          <AppSectionCard title="Basics" description="Name, type, and availability.">
            <div className="product-details-sections__grid">
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">Accommodation type</dt>
                  <dd className="app-key-value-list__value">{typeName}</dd>
                </div>
              </AppKeyValueList>
            </div>
          </AppSectionCard>

          <AppSectionCard title="Booking rules" description="Minimum stay and student age range.">
            <div className="product-details-sections__grid">
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">Minimum stay</dt>
                  <dd className="app-key-value-list__value">
                    {details.minimumStayInWeeks} {details.minimumStayInWeeks === 1 ? 'week' : 'weeks'}
                  </dd>
                </div>
              </AppKeyValueList>
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">Age range</dt>
                  <dd className="app-key-value-list__value">
                    {details.minimumAge != null && details.maximumAge != null
                      ? `${details.minimumAge}–${details.maximumAge}`
                      : details.minimumAge != null
                        ? `${details.minimumAge}+`
                        : '—'}
                  </dd>
                </div>
              </AppKeyValueList>
            </div>
          </AppSectionCard>

          <AppSectionCard title="Commitment" description="Accepted booking commitment types.">
            <div className="product-details-sections__grid">
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">Committed</dt>
                  <dd className="app-key-value-list__value">{details.isCommitted ? 'Yes' : 'No'}</dd>
                </div>
              </AppKeyValueList>
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">Non-committed</dt>
                  <dd className="app-key-value-list__value">{details.isNonCommitted ? 'Yes' : 'No'}</dd>
                </div>
              </AppKeyValueList>
            </div>
          </AppSectionCard>

          <AppSectionCard
            title="Rooms"
            description="Rooms within this accommodation."
            actions={
              <AppButton type="button" variant="primary" size="sm" onClick={page.handleAddRoom}>
                Add room
              </AppButton>
            }
          >
            <p className="product-details-sections__empty-copy">
              Navigate to individual rooms from the rooms list.
            </p>
          </AppSectionCard>
        </div>
        <ProductReadonlySummary title="Accommodation summary" isActive={details.isActive} audit={details} />
      </div>
    </section>
  );
};
