import { AppPageHeader } from '@/shared/ui/patterns';
import { AppButton } from '@/shared/ui/primitives';
import { usePackageCreateScreen } from '@/modules/products/packages/hooks/usePackageCreateScreen';
import { PackageForm } from '../ui/form';

export const PackageCreateScreen = () => {
  const page = usePackageCreateScreen();

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
              form="package-form"
              variant="primary"
              loading={page.isSaving}
              disabled={page.isSaving}
            >
              {page.isSaving ? 'Creating…' : page.submitLabel}
            </AppButton>
          </>
        }
      />
      <PackageForm
        id="package-form"
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
