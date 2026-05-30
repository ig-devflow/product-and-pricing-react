import { AppAsyncState } from '@/shared/ui/data-display';
import { AppPageHeader } from '@/shared/ui/patterns';
import { AppButton } from '@/shared/ui/primitives';
import { useAccommodationEditScreen } from '@/modules/products/accommodations/hooks/useAccommodationEditScreen';
import { AccommodationForm } from '../ui/form';

export const AccommodationEditScreen = () => {
  const page = useAccommodationEditScreen();

  if (page.isLoading) {
    return (
      <section className="app-page product-form-page">
        <AppPageHeader eyebrow={page.pageHeader.eyebrow} title={page.pageHeader.title} subtitle={page.pageHeader.subtitle} />
        <div className="app-grid app-grid--dense product-form-page__loading">
          {Array.from({ length: 3 }, (_, i) => <div key={i} className="app-skeleton product-form-page__skeleton" />)}
        </div>
      </section>
    );
  }

  if (page.loadErrorMessage || page.details === null) {
    return (
      <section className="app-page product-form-page">
        <AppPageHeader eyebrow={page.pageHeader.eyebrow} title={page.pageHeader.title} subtitle={page.pageHeader.subtitle} />
        <AppAsyncState title="Could not load accommodation" text={page.loadErrorMessage} actionText="Retry" onAction={() => void page.detailsQuery.refetch()} />
      </section>
    );
  }

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
              onClick={page.onCancel}
            >
              Cancel
            </AppButton>
            <AppButton
              type="submit"
              form="accommodation-form"
              variant="primary"
              loading={page.isSaving}
              disabled={page.isSaving}
            >
              {page.isSaving ? 'Saving…' : page.submitLabel}
            </AppButton>
          </>
        }
      />
      <AccommodationForm
        id="accommodation-form"
        mode="edit"
        defaultValues={page.initialValues}
        errorMessage={page.saveErrorMessage}
        onSubmit={page.onSubmit}
      />
    </section>
  );
};
