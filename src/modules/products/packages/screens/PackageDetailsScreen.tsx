import { AppAsyncState, AppKeyValueList } from '@/shared/ui/data-display';
import { AppPageHeader, AppSectionCard } from '@/shared/ui/patterns';
import { usePackageDetailsScreen } from '@/modules/products/packages/hooks/usePackageDetailsScreen';
import { ProductDetailsHero, ProductReadonlySummary } from '@/modules/products/shared/ui';

export const PackageDetailsScreen = () => {
  const page = usePackageDetailsScreen();

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
        <AppAsyncState title="Could not load package" text={page.errorMessage} actionText="Retry" onAction={() => void page.detailsQuery.refetch()} />
      </section>
    );
  }

  const { components } = page.details;

  return (
    <section className="app-page product-details-page">
      <AppPageHeader eyebrow={page.pageHeader.eyebrow} title={page.pageHeader.title} subtitle={page.pageHeader.subtitle} />
      <ProductDetailsHero
        productType="package"
        name={page.details.name}
        isActive={page.details.isActive}
        description={page.details.description || undefined}
        onBack={page.handleBack}
        onEdit={page.openEditPage}
      />
      <div className="app-split product-details-page__layout">
        <div className="app-stack app-stack--lg">
          <AppSectionCard title="Components" description="Products bundled in this package.">
            <div className="product-details-sections__grid">
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">Course</dt>
                  <dd className="app-key-value-list__value">{components.courseName ?? 'None'}</dd>
                </div>
              </AppKeyValueList>
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">Accommodation</dt>
                  <dd className="app-key-value-list__value">{components.accommodationName ?? 'None'}</dd>
                </div>
              </AppKeyValueList>
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">Room</dt>
                  <dd className="app-key-value-list__value">{components.roomName ?? 'None'}</dd>
                </div>
              </AppKeyValueList>
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">Add-ons</dt>
                  <dd className="app-key-value-list__value">{components.addonNames.length ? components.addonNames.join(', ') : 'None'}</dd>
                </div>
              </AppKeyValueList>
              <AppKeyValueList>
                <div className="app-key-value-list__row">
                  <dt className="app-key-value-list__label">Transfers</dt>
                  <dd className="app-key-value-list__value">{components.transferNames.length ? components.transferNames.join(', ') : 'None'}</dd>
                </div>
              </AppKeyValueList>
            </div>
          </AppSectionCard>
        </div>
        <ProductReadonlySummary title="Package summary" isActive={page.details.isActive} audit={page.details} />
      </div>
    </section>
  );
};
