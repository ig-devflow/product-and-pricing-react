import { AppAsyncState } from '@/shared/ui/data-display';
import { AppPageHeader } from '@/shared/ui/patterns';
import { useCentreDetailsScreen } from '@/modules/centres/hooks/useCentreDetailsScreen';
import { CentreDetailsHero } from '@/modules/centres/ui/details/CentreDetailsHero';
import { CentreDetailsSections } from '@/modules/centres/ui/details/CentreDetailsSections';
import { CentreSectionNav } from '@/modules/centres/ui/details/CentreSectionNav';

const DETAIL_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'contact', label: 'Contact' },
  { id: 'legal', label: 'Legal' },
  { id: 'ratios', label: 'Ratios' },
  { id: 'bank', label: 'Bank details' },
  { id: 'contacts', label: 'Contacts' },
  { id: 'texts', label: 'Texts' },
];

export const CentreDetailsScreen = () => {
  const page = useCentreDetailsScreen();

  if (page.isLoading) {
    return (
      <section className="app-page centre-details-page">
        <AppPageHeader
          eyebrow={page.pageHeader.eyebrow}
          title={page.pageHeader.title}
          subtitle={page.pageHeader.subtitle}
        />
        <div className="app-grid app-grid--dense centre-details-page__loading">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="app-skeleton centre-details-page__skeleton" />
          ))}
        </div>
      </section>
    );
  }

  if (page.errorMessage || page.centre === null) {
    return (
      <section className="app-page centre-details-page">
        <AppPageHeader
          eyebrow={page.pageHeader.eyebrow}
          title={page.pageHeader.title}
          subtitle={page.pageHeader.subtitle}
        />
        <AppAsyncState
          title="Could not load centre"
          text={page.errorMessage}
          actionText="Retry"
          onAction={() => void page.centreQuery.refetch()}
        />
      </section>
    );
  }

  return (
    <section className="app-page centre-details-page">
      <AppPageHeader
        eyebrow={page.pageHeader.eyebrow}
        title={page.pageHeader.title}
        subtitle={page.pageHeader.subtitle}
      />

      <CentreDetailsHero
        centre={page.centre}
        onBack={page.handleBack}
        onEdit={page.openEditPage}
      />

      <div className="centre-details-page__layout">
        <CentreSectionNav sections={DETAIL_SECTIONS} />
        <CentreDetailsSections centre={page.centre} />
      </div>
    </section>
  );
};
