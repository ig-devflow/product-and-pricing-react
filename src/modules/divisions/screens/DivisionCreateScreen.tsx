import { AppPageHeader } from '@/shared/ui/patterns';
import { useDivisionCreateScreen } from '@/modules/divisions/hooks/useDivisionCreateScreen';
import { DivisionForm } from '@/modules/divisions/ui/form';

export const DivisionCreateScreen = () => {
  const page = useDivisionCreateScreen();

  return (
    <section className="app-page division-create-page">
      <AppPageHeader
        eyebrow={page.pageHeader.eyebrow}
        title={page.pageHeader.title}
        subtitle={page.pageHeader.subtitle}
      />
      <DivisionForm
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
