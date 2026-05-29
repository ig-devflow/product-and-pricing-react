import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { AppPageHeader } from '@/shared/ui/patterns';
import { useCourseListScreen } from '@/modules/products/courses/hooks/useCourseListScreen';
import { ProductCard, ProductCardList, ProductListToolbar } from '@/modules/products/shared/ui';

export const CourseListScreen = () => {
  const page = useCourseListScreen();

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
              { key: 'lpw', label: 'Lessons / week', value: String(course.lessonsPerWeek) },
              { key: 'mpl', label: 'Minutes / lesson', value: String(course.minutesPerLesson) },
              { key: 'age', label: 'Age range', value: `${course.minAge}–${course.maxAge}` },
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
