import { CENTRE_MANAGER_ROUTES } from '@/app/config/routes';
import { AppPageHeader } from '@/shared/ui/patterns';
import { useCountriesQuery } from '@/shared/queries/useCountriesQuery';
import { useCentresListScreen } from '@/modules/centres/hooks/useCentresListScreen';
import { CentreCardList } from '@/modules/centres/ui/list/CentreCardList';
import { CentreListToolbar } from '@/modules/centres/ui/list/CentreListToolbar';

export const CentresListScreen = () => {
  const page = useCentresListScreen();
  const countriesQuery = useCountriesQuery();

  return (
    <section className="app-page centre-list-page">
      <AppPageHeader
        eyebrow={page.pageHeader.eyebrow}
        title={page.pageHeader.title}
        subtitle={page.pageHeader.subtitle}
      />

      <CentreListToolbar
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

      <CentreCardList
        items={page.centres}
        countries={countriesQuery.data ?? []}
        getDetailsHref={(id) => CENTRE_MANAGER_ROUTES.details(id)}
        getEditHref={(id) => CENTRE_MANAGER_ROUTES.edit(id)}
        isLoading={page.isLoading}
        errorMessage={page.errorMessage}
        emptyMessage={page.emptyMessage}
        onRetry={() => void page.refetch()}
        onCreate={page.handleCreateClick}
      />
    </section>
  );
};
