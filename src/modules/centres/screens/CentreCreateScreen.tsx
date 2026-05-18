import { AppPageHeader } from '@/shared/ui/patterns';
import { useCentreCreateScreen } from '@/modules/centres/hooks/useCentreCreateScreen';
import { CentreFormWizard } from '@/modules/centres/ui/form/CentreFormWizard';

export const CentreCreateScreen = () => {
  const page = useCentreCreateScreen();

  return (
    <section className="app-page centre-create-page">
      <AppPageHeader
        eyebrow={page.pageHeader.eyebrow}
        title={page.pageHeader.title}
        subtitle={page.pageHeader.subtitle}
      />
      <CentreFormWizard
        mode="create"
        initialValues={page.initialValues}
        isSaving={page.isSaving}
        onSubmit={page.handleSubmit}
        onCancel={page.handleCancel}
      />
    </section>
  );
};
