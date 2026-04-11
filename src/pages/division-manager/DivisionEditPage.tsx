import { AppPageHeader } from '@/shared/ui/patterns';
import { DivisionForm } from '@/modules/divisions/ui/form';
import { useDivisionEditPage } from '@/modules/divisions/composables/useDivisionEditPage';

const DivisionEditPage = () => {
  const page = useDivisionEditPage();

  if (page.isLoading) {
    return <p className="app-page">Loading division...</p>;
  }

  if (page.loadErrorMessage || page.details === null) {
    return (
      <div className="app-page">
        <p role="alert">{page.loadErrorMessage}</p>
      </div>
    );
  }

  return (
    <section className="app-page division-edit-page">
      <AppPageHeader
        eyebrow={page.pageHeader.eyebrow}
        title={page.pageHeader.title}
        subtitle={page.pageHeader.subtitle}
      />
      <DivisionForm
        defaultValues={page.initialValues}
        submitLabel={page.submitLabel}
        isSubmitting={page.isSaving}
        errorMessage={page.saveErrorMessage}
        division={page.details}
        onSubmit={page.onSubmit}
        onCancel={page.onCancel}
      />
    </section>
  );
};

export default DivisionEditPage;
