import { AppPageHeader } from '@/shared/ui/patterns';
import { useAddOnCreateScreen } from '@/modules/products/addons/hooks/useAddOnCreateScreen';
import { AddOnForm } from '../ui/form';

export const AddOnCreateScreen = () => {
  const page = useAddOnCreateScreen();
  return (
    <section className="app-page product-form-page">
      <AppPageHeader eyebrow={page.pageHeader.eyebrow} title={page.pageHeader.title} subtitle={page.pageHeader.subtitle} />
      <AddOnForm mode="create" defaultValues={page.initialValues} submitLabel={page.submitLabel} isSubmitting={page.isSaving} errorMessage={page.saveErrorMessage} onSubmit={page.handleSubmit} onCancel={page.handleCancel} />
    </section>
  );
};
