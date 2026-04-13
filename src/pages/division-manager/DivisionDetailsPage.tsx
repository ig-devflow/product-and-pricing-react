import { AppAsyncState } from '@/shared/ui/data-display';
import { AppPageHeader } from '@/shared/ui/patterns';
import { useDivisionDetailsPage } from '@/modules/divisions/hooks/useDivisionDetailsPage';
import {
  DivisionDetailsHero,
  DivisionDetailsSections,
  DivisionReadonlySummary,
} from '@/modules/divisions/ui/details';

const DivisionDetailsPage = () => {
  const page = useDivisionDetailsPage();

  if (page.isLoading) {
    return (
      <section className="app-page division-details-page">
        <AppPageHeader
          eyebrow={page.pageHeader.eyebrow}
          title={page.pageHeader.title}
          subtitle={page.pageHeader.subtitle}
        />

        <div className="app-grid app-grid--dense division-details-page__loading">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="app-skeleton division-details-page__skeleton"
            />
          ))}
        </div>
      </section>
    );
  }

  if (page.errorMessage || page.details === null) {
    return (
      <section className="app-page division-details-page">
        <AppPageHeader
          eyebrow={page.pageHeader.eyebrow}
          title={page.pageHeader.title}
          subtitle={page.pageHeader.subtitle}
        />

        <AppAsyncState
          title="Could not load division"
          text={page.errorMessage}
          actionText="Retry"
          onAction={() => void page.detailsQuery.refetch()}
        />
      </section>
    );
  }

  return (
    <section className="app-page division-details-page">
      <AppPageHeader
        eyebrow={page.pageHeader.eyebrow}
        title={page.pageHeader.title}
        subtitle={page.pageHeader.subtitle}
      />

      <DivisionDetailsHero
        division={page.details}
        onBack={page.handleBack}
        onEdit={page.openEditPage}
      />

      <div className="app-split division-details-page__layout">
        <DivisionDetailsSections division={page.details} />
        <DivisionReadonlySummary division={page.details} />
      </div>
    </section>
  );
};

export default DivisionDetailsPage;
