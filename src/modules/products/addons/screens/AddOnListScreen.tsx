import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { AppPageHeader } from '@/shared/ui/patterns';
import { useAddOnListScreen } from '@/modules/products/addons/hooks/useAddOnListScreen';
import { AddOnType } from '@/modules/products/addons/api/dto';
import { ProductCard, ProductCardList, ProductListToolbar } from '@/modules/products/shared/ui';

const ADD_ON_TYPE_LABELS: Record<AddOnType, string> = {
  [AddOnType.OneToOneCourse]: 'One-to-one course',
  [AddOnType.Exam]: 'Exam',
  [AddOnType.Activity]: 'Activity',
  [AddOnType.Insurance]: 'Insurance',
  [AddOnType.Generic]: 'Generic',
};

export const AddOnListScreen = () => {
  const page = useAddOnListScreen();

  return (
    <section className="app-page product-list-page">
      <AppPageHeader eyebrow={page.pageHeader.eyebrow} title={page.pageHeader.title} subtitle={page.pageHeader.subtitle} />
      <ProductListToolbar
        entityLabel="add-on"
        entityLabelPlural="add-ons"
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
        isEmpty={!page.isLoading && !page.errorMessage && page.addons.length === 0}
        entityLabel="add-ons"
        onRetry={() => void page.refetch()}
        onCreate={page.handleCreateClick}
      >
        {page.addons.map((addon) => (
          <ProductCard
            key={addon.id}
            productType="addon"
            name={addon.name}
            isActive={addon.isActive}
            facts={[{ key: 'type', label: 'Type', value: ADD_ON_TYPE_LABELS[addon.addOnType] ?? 'Unknown' }]}
            audit={addon}
            detailsHref={PRODUCT_MANAGER_ROUTES.addons.details(addon.id)}
            editHref={PRODUCT_MANAGER_ROUTES.addons.edit(addon.id)}
          />
        ))}
      </ProductCardList>
    </section>
  );
};
