import { AppPageHeader } from '@/shared/ui/patterns';
import { DivisionForm } from '@/modules/divisions/ui/form';
import { useDivisionCreatePage } from '@/modules/divisions/hooks/useDivisionCreatePage';

const DivisionCreatePage = () => {
  const page = useDivisionCreatePage();

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

export default DivisionCreatePage;
