import { AppPageHeader } from '@/shared/ui/patterns';
import { DivisionForm } from '@/modules/divisions/ui/form';
import { useDivisionEditPage } from '@/modules/divisions/composables/useDivisionEditPage';

const DivisionEditPage = () => {
  const page = useDivisionEditPage();

  if (page.isLoading) {
    return <p className="app-page">Loading division...</p>;
  }

  if (page.isError || page.division === null) {
    return (
      <div className="app-page">
        <p role="alert">{page.errorMessage}</p>
      </div>
    );
  }

  return (
    <section className="app-page division-edit-page">
      <AppPageHeader title={page.title} description={`Editing ${page.division.name}`} />
      <DivisionForm
        defaultValues={page.defaultValues}
        submitLabel={page.submitLabel}
        isSubmitting={page.isSubmitting}
        errorMessage={page.errorMessage}
        division={page.division}
        onSubmit={page.onSubmit}
        onCancel={page.onCancel}
      />
    </section>
  );
};

export default DivisionEditPage;
