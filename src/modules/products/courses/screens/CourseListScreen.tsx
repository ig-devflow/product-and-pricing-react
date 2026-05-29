import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { AppPageHeader } from '@/shared/ui/patterns';
import { useCourseListScreen } from '@/modules/products/courses/hooks/useCourseListScreen';
import { ProductCard, ProductCardList, ProductListToolbar } from '@/modules/products/shared/ui';
import { useCourseLanguagesQuery } from '@/shared/queries/useCourseLanguagesQuery';
import { useCourseIntensitiesQuery } from '@/shared/queries/useCourseIntensitiesQuery';

function findName(items: { id: number; name: string }[] | undefined, id: number): string {
  return items?.find((x) => x.id === id)?.name ?? '—';
}

export const CourseListScreen = () => {
  const page = useCourseListScreen();
  const languagesQuery = useCourseLanguagesQuery();
  const intensitiesQuery = useCourseIntensitiesQuery();

  return (
    <section className="app-page product-list-page">
      <AppPageHeader
        eyebrow={page.pageHeader.eyebrow}
        title={page.pageHeader.title}
        subtitle={page.pageHeader.subtitle}
      />

      <ProductListToolbar
        entityLabel="course"
        entityLabelPlural="courses"
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
        isEmpty={!page.isLoading && !page.errorMessage && page.courses.length === 0}
        entityLabel="courses"
        onRetry={() => void page.refetch()}
        onCreate={page.handleCreateClick}
      >
        {page.courses.map((course) => (
          <ProductCard
            key={course.id}
            productType="course"
            name={course.name}
            isActive={course.isActive}
            facts={[
              {
                key: 'lang',
                label: 'Language',
                value: findName(languagesQuery.data, course.courseLanguageId),
              },
              {
                key: 'intensity',
                label: 'Intensity',
                value: findName(intensitiesQuery.data, course.courseIntensityId),
              },
              {
                key: 'division',
                label: 'Division',
                value: course.divisionName || '—',
              },
            ]}
            audit={course}
            detailsHref={PRODUCT_MANAGER_ROUTES.courses.details(course.id)}
            editHref={PRODUCT_MANAGER_ROUTES.courses.edit(course.id)}
          />
        ))}
      </ProductCardList>
    </section>
  );
};
