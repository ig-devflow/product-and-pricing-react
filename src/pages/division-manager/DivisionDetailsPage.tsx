import { AppButton } from '@/shared/ui/primitives';
import { AppPageHeader, AppSectionCard } from '@/shared/ui/patterns';
import { useDivisionDetailsPage } from '@/modules/divisions/composables/useDivisionDetailsPage';
import { formatUtcDateTime } from '@/shared/lib/date';

const DivisionDetailsPage = () => {
  const page = useDivisionDetailsPage();

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
    <section className="app-page division-details-page">
      <AppPageHeader
        title={page.division.name}
        description="Review details for this division."
        actions={
          <AppButton type="button" onClick={page.openEditPage}>
            Edit division
          </AppButton>
        }
      />

      <div className="division-details-layout">
        <AppSectionCard title="Core details">
          <dl className="division-details-grid">
            <div>
              <dt>Website</dt>
              <dd>{page.division.websiteUrl}</dd>
            </div>
            <div>
              <dt>Head office email</dt>
              <dd>{page.division.headOfficeEmailAddress}</dd>
            </div>
            <div>
              <dt>Head office phone</dt>
              <dd>{page.division.headOfficeTelephoneNo}</dd>
            </div>
            <div>
              <dt>Visa note format</dt>
              <dd>{page.division.visaLetterNoteFormat === 0 ? 'Plain text' : 'Rich text'}</dd>
            </div>
            <div>
              <dt>Terms and conditions</dt>
              <dd>{page.division.termsAndConditions}</dd>
            </div>
            <div>
              <dt>Groups payment terms</dt>
              <dd>{page.division.groupsPaymentTerms}</dd>
            </div>
            <div>
              <dt>Last modified</dt>
              <dd>{formatUtcDateTime(page.division.lastModifiedOn)}</dd>
            </div>
          </dl>
        </AppSectionCard>
      </div>
    </section>
  );
};

export default DivisionDetailsPage;
