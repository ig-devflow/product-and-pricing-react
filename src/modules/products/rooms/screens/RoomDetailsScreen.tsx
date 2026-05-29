import { AppAsyncState, AppKeyValueList } from '@/shared/ui/data-display';
import { AppPageHeader, AppSectionCard } from '@/shared/ui/patterns';
import { useRoomDetailsScreen } from '@/modules/products/rooms/hooks/useRoomDetailsScreen';
import { ProductDetailsHero, ProductReadonlySummary } from '@/modules/products/shared/ui';

export const RoomDetailsScreen = () => {
  const page = useRoomDetailsScreen();

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
        <AppAsyncState title="Could not load room" text={page.errorMessage} actionText="Retry" onAction={() => void page.detailsQuery.refetch()} />
      </section>
    );
  }

  return (
    <section className="app-page product-details-page">
      <AppPageHeader eyebrow={page.pageHeader.eyebrow} title={page.pageHeader.title} subtitle={page.pageHeader.subtitle} />
      <ProductDetailsHero
        productType="room"
        name={page.details.name}
        isActive={page.details.isActive}
        description={page.details.description || undefined}
        onBack={page.handleBackToAccommodation}
        onEdit={page.openEditPage}
        backLabel="Back to accommodation"
      />
      <div className="app-split product-details-page__layout">
        <AppSectionCard title="Details" description="Room capacity and location.">
          <div className="product-details-sections__grid">
            <AppKeyValueList>
              <div className="app-key-value-list__row">
                <dt className="app-key-value-list__label">Accommodation</dt>
                <dd className="app-key-value-list__value">{page.details.accommodationName || 'Not set'}</dd>
              </div>
            </AppKeyValueList>
            <AppKeyValueList>
              <div className="app-key-value-list__row">
                <dt className="app-key-value-list__label">Max occupancy</dt>
                <dd className="app-key-value-list__value">{page.details.maxOccupancy}</dd>
              </div>
            </AppKeyValueList>
            <AppKeyValueList>
              <div className="app-key-value-list__row">
                <dt className="app-key-value-list__label">Division</dt>
                <dd className="app-key-value-list__value">{page.details.divisionName || 'Not set'}</dd>
              </div>
            </AppKeyValueList>
          </div>
        </AppSectionCard>
        <ProductReadonlySummary title="Room summary" isActive={page.details.isActive} audit={page.details} />
      </div>
    </section>
  );
};
