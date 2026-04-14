import { AppAsyncState } from '@/shared/ui/data-display';
import { AppPageHeader } from '@/shared/ui/patterns';
import { AppSurface } from '@/shared/ui/primitives';
import { useDivisionEditScreen } from '@/modules/divisions/hooks/useDivisionEditScreen';
import { DivisionForm } from '@/modules/divisions/ui/form';

export const DivisionEditScreen = () => {
  const page = useDivisionEditScreen();

  if (page.isLoading) {
    return (
      <section className="app-page division-edit-page">
        <AppPageHeader
          eyebrow={page.pageHeader.eyebrow}
          title={page.pageHeader.title}
          subtitle={page.pageHeader.subtitle}
        />

        <div className="app-grid app-grid--dense division-edit-page__loading">
          {Array.from({ length: 4 }, (_, index) => (
            <AppSurface
              key={index}
              className="division-edit-page__skeleton"
            />
          ))}
        </div>
      </section>
    );
  }

  if (page.loadErrorMessage || page.details === null) {
    return (
      <section className="app-page division-edit-page">
        <AppPageHeader
          eyebrow={page.pageHeader.eyebrow}
          title={page.pageHeader.title}
          subtitle={page.pageHeader.subtitle}
        />

        <AppAsyncState
          title="Could not load division"
          text={page.loadErrorMessage}
          actionText="Retry"
          onAction={() => void page.detailsQuery.refetch()}
        />
      </section>
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
        mode="edit"
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
