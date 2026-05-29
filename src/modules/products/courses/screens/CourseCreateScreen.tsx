import { AppPageHeader } from '@/shared/ui/patterns';
import { AppButton } from '@/shared/ui/primitives';
import { useCourseCreateScreen } from '@/modules/products/courses/hooks/useCourseCreateScreen';
import { CourseForm } from '../ui/form';

export const CourseCreateScreen = () => {
  const page = useCourseCreateScreen();

  return (
    <section className="app-page product-form-page">
      <AppPageHeader
        eyebrow={page.pageHeader.eyebrow}
        title={page.pageHeader.title}
        subtitle={page.pageHeader.subtitle}
        actions={
          <>
            <AppButton
              type="button"
              variant="secondary"
              disabled={page.isSaving}
              onClick={page.handleCancel}
            >
              Cancel
            </AppButton>
            <AppButton
              type="submit"
              form="course-form"
              variant="primary"
              loading={page.isSaving}
              disabled={page.isSaving}
            >
              {page.isSaving ? 'Creating…' : page.submitLabel}
            </AppButton>
          </>
        }
      />
      <CourseForm
        id="course-form"
        mode="create"
        defaultValues={page.initialValues}
        errorMessage={page.saveErrorMessage}
        divisionId={page.divisionId}
        divisionName={page.divisionName}
        onSubmit={page.handleSubmit}
      />
    </section>
  );
};
