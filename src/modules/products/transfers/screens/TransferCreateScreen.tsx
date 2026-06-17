import { AppPageHeader } from '@/shared/ui/patterns';
import { AppButton } from '@/shared/ui/primitives';
import { useTransferCreateScreen } from '@/modules/products/transfers/hooks/useTransferCreateScreen';
import { TransferForm } from '../ui/form';

export const TransferCreateScreen = () => {
  const page = useTransferCreateScreen();

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
              form="transfer-form"
              variant="primary"
              loading={page.isSaving}
              disabled={page.isSaving}
            >
              {page.isSaving ? 'Creating…' : page.submitLabel}
            </AppButton>
          </>
        }
      />
      <TransferForm
        id="transfer-form"
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
