import { AppPageHeader } from '@/shared/ui/patterns';
import { useAccommodationCreateScreen } from '@/modules/products/accommodations/hooks/useAccommodationCreateScreen';
import { AccommodationForm } from '../ui/form';

export const AccommodationCreateScreen = () => {
  const page = useAccommodationCreateScreen();

  return (
    <section className="app-page product-form-page">
      <AppPageHeader eyebrow={page.pageHeader.eyebrow} title={page.pageHeader.title} subtitle={page.pageHeader.subtitle} />
      <AccommodationForm
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
