import { AppPageHeader } from '@/shared/ui/patterns';
import { usePackageCreateScreen } from '@/modules/products/packages/hooks/usePackageCreateScreen';
import { PackageForm } from '../ui/form';

export const PackageCreateScreen = () => {
  const page = usePackageCreateScreen();
  return (
    <section className="app-page product-form-page">
      <AppPageHeader eyebrow={page.pageHeader.eyebrow} title={page.pageHeader.title} subtitle={page.pageHeader.subtitle} />
      <PackageForm mode="create" defaultValues={page.initialValues} submitLabel={page.submitLabel} isSubmitting={page.isSaving} errorMessage={page.saveErrorMessage} onSubmit={page.handleSubmit} onCancel={page.handleCancel} />
    </section>
  );
};
