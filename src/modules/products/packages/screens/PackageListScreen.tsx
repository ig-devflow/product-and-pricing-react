import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { AppPageHeader } from '@/shared/ui/patterns';
import { usePackageListScreen } from '@/modules/products/packages/hooks/usePackageListScreen';
import { ProductCard, ProductCardList, ProductListToolbar } from '@/modules/products/shared/ui';

export const PackageListScreen = () => {
  const page = usePackageListScreen();

  return (
    <section className="app-page product-list-page">
      <AppPageHeader eyebrow={page.pageHeader.eyebrow} title={page.pageHeader.title} subtitle={page.pageHeader.subtitle} />
      <ProductListToolbar
        entityLabel="package"
        entityLabelPlural="packages"
        searchTerm={page.searchTerm}
        visibleCount={page.visibleCount}
        totalCount={page.totalCount}
        page={page.page}
        totalPages={page.totalPages}
        canGoPrevious={page.canGoPrevious}
        canGoNext={page.canGoNext}
        isRefreshing={page.isRefreshing}
        activeOnly={page.activeOnly}
        onSearchTermChange={page.setSearchTerm}
        onPageChange={page.setPage}
        onActiveOnlyChange={page.setActiveOnly}
        onCreate={page.handleCreateClick}
      />
      <ProductCardList
        isLoading={page.isLoading}
        errorMessage={page.errorMessage}
        emptyMessage={page.emptyMessage}
        isEmpty={!page.isLoading && !page.errorMessage && page.packages.length === 0}
        entityLabel="packages"
        onRetry={() => void page.refetch()}
        onCreate={page.handleCreateClick}
      >
        {page.packages.map((pkg) => (
          <ProductCard
            key={pkg.id}
            productType="package"
            name={pkg.name}
            isActive={pkg.isActive}
            facts={[
              { key: 'components', label: 'Components', value: String(pkg.componentCount) },
              { key: 'division', label: 'Division', value: pkg.divisionName || 'Not set' },
            ]}
            audit={pkg}
            detailsHref={PRODUCT_MANAGER_ROUTES.packages.details(pkg.id)}
            editHref={PRODUCT_MANAGER_ROUTES.packages.edit(pkg.id)}
          />
        ))}
      </ProductCardList>
    </section>
  );
};
