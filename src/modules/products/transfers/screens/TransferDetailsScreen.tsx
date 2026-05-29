import { AppAsyncState, AppKeyValueList } from '@/shared/ui/data-display';
import { AppPageHeader, AppSectionCard } from '@/shared/ui/patterns';
import { useTransferDetailsScreen } from '@/modules/products/transfers/hooks/useTransferDetailsScreen';
import { ProductDetailsHero, ProductReadonlySummary } from '@/modules/products/shared/ui';

export const TransferDetailsScreen = () => {
  const page = useTransferDetailsScreen();

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
        <AppAsyncState title="Could not load transfer" text={page.errorMessage} actionText="Retry" onAction={() => void page.detailsQuery.refetch()} />
      </section>
    );
  }

  return (
    <section className="app-page product-details-page">
      <AppPageHeader eyebrow={page.pageHeader.eyebrow} title={page.pageHeader.title} subtitle={page.pageHeader.subtitle} />
      <ProductDetailsHero
        productType="transfer"
        name={page.details.name}
        isActive={page.details.isActive}
        description={page.details.description || undefined}
        onBack={page.handleBack}
        onEdit={page.openEditPage}
      />
      <div className="app-split product-details-page__layout">
        <AppSectionCard title="Details">
          <div className="product-details-sections__grid">
            <AppKeyValueList>
              <div className="app-key-value-list__row">
                <dt className="app-key-value-list__label">Division</dt>
                <dd className="app-key-value-list__value">{page.details.divisionName || 'Not set'}</dd>
              </div>
            </AppKeyValueList>
          </div>
        </AppSectionCard>
        <ProductReadonlySummary title="Transfer summary" isActive={page.details.isActive} audit={page.details} />
      </div>
    </section>
  );
};
