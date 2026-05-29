import { AppPageHeader } from '@/shared/ui/patterns';
import { useTransferCreateScreen } from '@/modules/products/transfers/hooks/useTransferCreateScreen';
import { TransferForm } from '../ui/form';

export const TransferCreateScreen = () => {
  const page = useTransferCreateScreen();
  return (
    <section className="app-page product-form-page">
      <AppPageHeader eyebrow={page.pageHeader.eyebrow} title={page.pageHeader.title} subtitle={page.pageHeader.subtitle} />
      <TransferForm mode="create" defaultValues={page.initialValues} submitLabel={page.submitLabel} isSubmitting={page.isSaving} errorMessage={page.saveErrorMessage} onSubmit={page.handleSubmit} onCancel={page.handleCancel} />
    </section>
  );
};
