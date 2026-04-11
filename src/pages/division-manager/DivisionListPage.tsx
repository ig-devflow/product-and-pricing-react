import { AppPageHeader } from '@/shared/ui/patterns';
import { useDivisionListPage } from '@/modules/divisions/composables/useDivisionListPage';
import {
  DivisionCardList,
  DivisionListToolbar,
} from '@/modules/divisions/ui/list';

const DivisionListPage = () => {
  const page = useDivisionListPage();

  return (
    <section className="app-page division-list-page">
      <AppPageHeader
        eyebrow="Admin"
        title="Division Manager"
        subtitle="Browse divisions, open details, and move into create or edit flows."
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
        isLoading={page.isLoading}
        errorMessage={page.errorMessage}
        emptyMessage={page.emptyMessage}
        onRetry={() => void page.refetch()}
      />
    </section>
  );
};

export default DivisionListPage;
