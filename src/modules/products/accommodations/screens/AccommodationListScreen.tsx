import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { AppPageHeader } from '@/shared/ui/patterns';
import { useAccommodationListScreen } from '@/modules/products/accommodations/hooks/useAccommodationListScreen';
import { ProductCard, ProductCardList, ProductListToolbar } from '@/modules/products/shared/ui';

export const AccommodationListScreen = () => {
  const page = useAccommodationListScreen();

  return (
    <section className="app-page product-list-page">
      <AppPageHeader eyebrow={page.pageHeader.eyebrow} title={page.pageHeader.title} subtitle={page.pageHeader.subtitle} />

      <ProductListToolbar
        entityLabel="accommodation"
        entityLabelPlural="accommodations"
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
        isEmpty={!page.isLoading && !page.errorMessage && page.accommodations.length === 0}
        entityLabel="accommodations"
        onRetry={() => void page.refetch()}
        onCreate={page.handleCreateClick}
      >
        {page.accommodations.map((acc) => (
          <ProductCard
            key={acc.id}
            productType="accommodation"
            name={acc.name}
            isActive={acc.isActive}
            facts={[{ key: 'rooms', label: 'Rooms', value: String(acc.roomCount) }]}
            audit={acc}
            detailsHref={PRODUCT_MANAGER_ROUTES.accommodations.details(acc.id)}
            editHref={PRODUCT_MANAGER_ROUTES.accommodations.edit(acc.id)}
          />
        ))}
      </ProductCardList>
    </section>
  );
};
