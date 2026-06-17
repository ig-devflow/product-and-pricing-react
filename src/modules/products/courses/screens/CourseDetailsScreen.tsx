import { AppAsyncState } from '@/shared/ui/data-display';
import { AppPageHeader } from '@/shared/ui/patterns';
import { useCourseDetailsScreen } from '@/modules/products/courses/hooks/useCourseDetailsScreen';
import { ProductDetailsHero, ProductReadonlySummary } from '@/modules/products/shared/ui';
import { CourseDetailsSections } from '../ui/details/CourseDetailsSections';

export const CourseDetailsScreen = () => {
  const page = useCourseDetailsScreen();

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
        <AppAsyncState title="Could not load course" text={page.errorMessage} actionText="Retry" onAction={() => void page.detailsQuery.refetch()} />
      </section>
    );
  }

  return (
    <section className="app-page product-details-page">
      <AppPageHeader eyebrow={page.pageHeader.eyebrow} title={page.pageHeader.title} subtitle={page.pageHeader.subtitle} />
      <ProductDetailsHero
        productType="course"
        name={page.details.name}
        isActive={page.details.isActive}
        onBack={page.handleBack}
        onEdit={page.openEditPage}
      />
      <div className="app-split product-details-page__layout">
        <CourseDetailsSections course={page.details} />
        <ProductReadonlySummary title="Course summary" isActive={page.details.isActive} audit={page.details} />
      </div>
    </section>
  );
};
