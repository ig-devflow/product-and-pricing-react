import { AppAsyncState } from '@/shared/ui/data-display';
import { AppPageHeader } from '@/shared/ui/patterns';
import { AppSurface } from '@/shared/ui/primitives';
import { useCentreEditScreen } from '@/modules/centres/hooks/useCentreEditScreen';
import { CentreFormWizard } from '@/modules/centres/ui/form/CentreFormWizard';

export const CentreEditScreen = () => {
  const page = useCentreEditScreen();

  if (page.isLoading) {
    return (
      <section className="app-page centre-edit-page">
        <AppPageHeader
          eyebrow={page.pageHeader.eyebrow}
          title={page.pageHeader.title}
          subtitle={page.pageHeader.subtitle}
        />
        <div className="app-grid app-grid--dense centre-edit-page__loading">
          {Array.from({ length: 4 }, (_, index) => (
            <AppSurface key={index} className="centre-edit-page__skeleton" />
          ))}
        </div>
      </section>
    );
  }

  if (page.loadErrorMessage || page.centre === null) {
    return (
      <section className="app-page centre-edit-page">
        <AppPageHeader
          eyebrow={page.pageHeader.eyebrow}
          title={page.pageHeader.title}
          subtitle={page.pageHeader.subtitle}
        />
        <AppAsyncState
          title="Could not load centre"
          text={page.loadErrorMessage}
          actionText="Retry"
          onAction={() => void page.centreQuery.refetch()}
        />
      </section>
    );
  }

  return (
    <section className="app-page centre-edit-page">
      <AppPageHeader
        eyebrow={page.pageHeader.eyebrow}
        title={page.pageHeader.title}
        subtitle={page.pageHeader.subtitle}
      />
      <CentreFormWizard
        mode="edit"
        initialValues={page.initialValues}
        isSaving={page.isSaving}
        onSubmit={page.handleSubmit}
        onCancel={page.handleCancel}
      />
    </section>
  );
};
