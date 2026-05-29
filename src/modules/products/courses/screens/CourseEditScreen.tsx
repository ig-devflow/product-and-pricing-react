import { AppAsyncState } from '@/shared/ui/data-display';
import { AppPageHeader } from '@/shared/ui/patterns';
import { useCourseEditScreen } from '@/modules/products/courses/hooks/useCourseEditScreen';
import { CourseForm } from '../ui/form';

export const CourseEditScreen = () => {
  const page = useCourseEditScreen();

  if (page.isLoading) {
    return (
      <section className="app-page product-form-page">
        <AppPageHeader eyebrow={page.pageHeader.eyebrow} title={page.pageHeader.title} subtitle={page.pageHeader.subtitle} />
        <div className="app-grid app-grid--dense product-form-page__loading">
          {Array.from({ length: 3 }, (_, i) => <div key={i} className="app-skeleton product-form-page__skeleton" />)}
        </div>
      </section>
    );
  }

  if (page.loadErrorMessage || page.details === null) {
    return (
      <section className="app-page product-form-page">
        <AppPageHeader eyebrow={page.pageHeader.eyebrow} title={page.pageHeader.title} subtitle={page.pageHeader.subtitle} />
        <AppAsyncState title="Could not load course" text={page.loadErrorMessage} actionText="Retry" onAction={() => void page.detailsQuery.refetch()} />
      </section>
    );
  }

  return (
    <section className="app-page product-form-page">
      <AppPageHeader eyebrow={page.pageHeader.eyebrow} title={page.pageHeader.title} subtitle={page.pageHeader.subtitle} />
      <CourseForm
        mode="edit"
        defaultValues={page.initialValues}
        submitLabel={page.submitLabel}
        isSubmitting={page.isSaving}
        errorMessage={page.saveErrorMessage}
        onSubmit={page.onSubmit}
        onCancel={page.onCancel}
      />
    </section>
  );
};
