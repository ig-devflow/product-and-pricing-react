import { AppPageHeader } from '@/shared/ui/patterns';
import { useCourseCreateScreen } from '@/modules/products/courses/hooks/useCourseCreateScreen';
import { CourseForm } from '../ui/form';

export const CourseCreateScreen = () => {
  const page = useCourseCreateScreen();

  return (
    <section className="app-page product-form-page">
      <AppPageHeader eyebrow={page.pageHeader.eyebrow} title={page.pageHeader.title} subtitle={page.pageHeader.subtitle} />
      <CourseForm
        mode="create"
        defaultValues={page.initialValues}
        submitLabel={page.submitLabel}
        isSubmitting={page.isSaving}
        errorMessage={page.saveErrorMessage}
        onSubmit={page.handleSubmit}
        onCancel={page.handleCancel}
      />
    </section>
  );
};
