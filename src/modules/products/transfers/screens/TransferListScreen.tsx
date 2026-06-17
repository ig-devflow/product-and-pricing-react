import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { AppPageHeader } from '@/shared/ui/patterns';
import { useTransferListScreen } from '@/modules/products/transfers/hooks/useTransferListScreen';
import { ProductCard, ProductCardList, ProductListToolbar } from '@/modules/products/shared/ui';

export const TransferListScreen = () => {
  const page = useTransferListScreen();

  return (
    <section className="app-page product-list-page">
      <AppPageHeader eyebrow={page.pageHeader.eyebrow} title={page.pageHeader.title} subtitle={page.pageHeader.subtitle} />
      <ProductListToolbar
        entityLabel="transfer"
        entityLabelPlural="transfers"
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
        isEmpty={!page.isLoading && !page.errorMessage && page.transfers.length === 0}
        entityLabel="transfers"
        onRetry={() => void page.refetch()}
        onCreate={page.handleCreateClick}
      >
        {page.transfers.map((transfer) => (
          <ProductCard
            key={transfer.id}
            productType="transfer"
            name={transfer.name}
            isActive={transfer.isActive}
            facts={[{ key: 'division', label: 'Division', value: transfer.divisionName || 'Not set' }]}
            audit={transfer}
            detailsHref={PRODUCT_MANAGER_ROUTES.transfers.details(transfer.id)}
            editHref={PRODUCT_MANAGER_ROUTES.transfers.edit(transfer.id)}
          />
        ))}
      </ProductCardList>
    </section>
  );
};
