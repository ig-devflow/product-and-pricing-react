import { DIVISION_MANAGER_ROUTES } from '@/app/config/routes';
import { AppPageHeader } from '@/shared/ui/patterns';
import { useDivisionListScreen } from '@/modules/divisions/hooks/useDivisionListScreen';
import {
  DivisionCardList,
  DivisionListToolbar,
} from '@/modules/divisions/ui/list';

export const DivisionListScreen = () => {
  const page = useDivisionListScreen();

  return (
    <section className="app-page division-list-page">
      <AppPageHeader
        eyebrow={page.pageHeader.eyebrow}
        title={page.pageHeader.title}
        subtitle={page.pageHeader.subtitle}
      />

      <DivisionListToolbar
        searchTerm={page.searchTerm}
        filteredCount={page.filteredCount}
        totalCount={page.totalCount}
        isRefreshing={page.isRefreshing}
        onSearchTermChange={page.setSearchTerm}
        onCreate={page.handleCreateClick}
      />

      <DivisionCardList
        items={page.filteredDivisions}
        getDetailsHref={(id) => DIVISION_MANAGER_ROUTES.details(id)}
        getEditHref={(id) => DIVISION_MANAGER_ROUTES.edit(id)}
        isLoading={page.isLoading}
        errorMessage={page.errorMessage}
        emptyMessage={page.emptyMessage}
        onRetry={() => void page.refetch()}
      />
    </section>
  );
};
