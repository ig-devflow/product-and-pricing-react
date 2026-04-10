import { AppPageHeader } from '@/shared/ui/patterns';
import { DivisionForm } from '@/modules/divisions/ui/form';
import { useDivisionCreatePage } from '@/modules/divisions/composables/useDivisionCreatePage';

const DivisionCreatePage = () => {
  const page = useDivisionCreatePage();

  return (
    <div className="division-page division-create-page">
      <AppPageHeader title={page.title} />
      <DivisionForm
        defaultValues={page.defaultValues}
        submitLabel={page.submitLabel}
        isSubmitting={page.isSubmitting}
        errorMessage={page.errorMessage}
        onSubmit={page.onSubmit}
        onCancel={page.onCancel}
      />
    </div>
  );
};

export default DivisionCreatePage;
