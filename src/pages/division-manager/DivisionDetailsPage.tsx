import { AppButton } from '@/shared/ui/primitives';
import { AppPageHeader, AppSectionCard } from '@/shared/ui/patterns';
import { useDivisionDetailsPage } from '@/modules/divisions/composables/useDivisionDetailsPage';
import { formatUtcDateTime } from '@/shared/lib/date';
import { ContentFormat } from '@/modules/divisions/model/division';

const DivisionDetailsPage = () => {
  const page = useDivisionDetailsPage();

  if (page.isLoading) {
    return <p className="app-page">Loading division...</p>;
  }

  if (page.errorMessage || page.details === null) {
    return (
      <div className="app-page">
        <p role="alert">{page.errorMessage}</p>
      </div>
    );
  }

  return (
    <section className="app-page division-details-page">
      <AppPageHeader
        eyebrow={page.pageHeader.eyebrow}
        title={page.pageHeader.title}
        subtitle={page.pageHeader.subtitle}
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
              <dd>{page.details.websiteUrl}</dd>
            </div>
            <div>
              <dt>Head office email</dt>
              <dd>{page.details.headOfficeEmailAddress}</dd>
            </div>
            <div>
              <dt>Head office phone</dt>
              <dd>{page.details.headOfficeTelephoneNo}</dd>
            </div>
            <div>
              <dt>Visa note format</dt>
              <dd>
                {page.details.visaLetterNoteFormat === ContentFormat.PlainText
                  ? 'Plain text'
                  : 'Rich text'}
              </dd>
            </div>
            <div>
              <dt>Terms and conditions</dt>
              <dd>{page.details.termsAndConditions}</dd>
            </div>
            <div>
              <dt>Groups payment terms</dt>
              <dd>{page.details.groupsPaymentTerms}</dd>
            </div>
            <div>
              <dt>Last modified</dt>
              <dd>{formatUtcDateTime(page.details.lastModifiedOn)}</dd>
            </div>
          </dl>
        </AppSectionCard>
      </div>
    </section>
  );
};

export default DivisionDetailsPage;
