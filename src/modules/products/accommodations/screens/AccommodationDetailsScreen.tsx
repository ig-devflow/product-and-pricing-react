import { AppAsyncState } from '@/shared/ui/data-display';
import { AppKeyValueList } from '@/shared/ui/data-display';
import { AppPageHeader } from '@/shared/ui/patterns';
import { AppSectionCard } from '@/shared/ui/patterns';
import { AppButton } from '@/shared/ui/primitives';
import { useAccommodationDetailsScreen } from '@/modules/products/accommodations/hooks/useAccommodationDetailsScreen';
import { ProductDetailsHero, ProductReadonlySummary } from '@/modules/products/shared/ui';

export const AccommodationDetailsScreen = () => {
  const page = useAccommodationDetailsScreen();

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

  return (
    <section className="app-page product-details-page">
      <AppPageHeader eyebrow={page.pageHeader.eyebrow} title={page.pageHeader.title} subtitle={page.pageHeader.subtitle} />
      <ProductDetailsHero
        productType="accommodation"
        name={page.details.name}
        isActive={page.details.isActive}
        description={page.details.description || undefined}
        onBack={page.handleBack}
        onEdit={page.openEditPage}
      />
      <div className="app-split product-details-page__layout">
        <div className="app-stack app-stack--lg">
          <AppSectionCard title="Details" description="Accommodation property information.">
            <div className="product-details-sections__grid">
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">Room count</dt>
                  <dd className="app-key-value-list__value">{page.details.roomCount}</dd>
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
            {page.details.roomCount === 0 ? (
              <p className="product-details-sections__empty-copy">No rooms have been added yet.</p>
            ) : (
              <p className="product-details-sections__empty-copy">This accommodation has {page.details.roomCount} room(s). Navigate to individual rooms via their detail pages.</p>
            )}
          </AppSectionCard>
        </div>
        <ProductReadonlySummary title="Accommodation summary" isActive={page.details.isActive} audit={page.details} />
      </div>
    </section>
  );
};
