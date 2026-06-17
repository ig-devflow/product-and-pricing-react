import { AppPageHeader } from '@/shared/ui/patterns';
import { AppButton } from '@/shared/ui/primitives';
import { useAddOnCreateScreen } from '@/modules/products/addons/hooks/useAddOnCreateScreen';
import { AddOnForm } from '../ui/form';

export const AddOnCreateScreen = () => {
  const page = useAddOnCreateScreen();

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
              form="addon-form"
              variant="primary"
              loading={page.isSaving}
              disabled={page.isSaving}
            >
              {page.isSaving ? 'Creating…' : page.submitLabel}
            </AppButton>
          </>
        }
      />
      <AddOnForm
        id="addon-form"
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
