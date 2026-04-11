import { AppButton, AppNavLink } from '@/shared/ui/primitives';
import { AppPageHeader, AppSectionCard } from '@/shared/ui/patterns';
import { DIVISION_MANAGER_ROUTES } from '@/shared/config/routes';
import { useDivisionListPage } from '@/modules/divisions/composables/useDivisionListPage';

const DivisionListPage = () => {
  const page = useDivisionListPage();

  return (
    <section className="app-page division-list-page">
      <AppPageHeader
        eyebrow="Admin"
        title="Division Manager"
        description="Browse and manage division data used by products and pricing workflows."
        actions={
          <AppButton type="button" onClick={page.openCreatePage}>
            Create new division
          </AppButton>
        }
      />

      <AppSectionCard title="Divisions" description="Select a division to review or edit details.">
        {page.isLoading ? <p>Loading divisions...</p> : null}
        {page.isError ? <p role="alert">{page.errorMessage}</p> : null}

        {!page.isLoading && !page.isError ? (
          <table className="division-list-table">
            <caption className="sr-only">Division list</caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Website</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {page.divisions.map((division) => (
                <tr key={division.id}>
                  <td>{division.name}</td>
                  <td>{division.websiteUrl}</td>
                  <td>
                    <AppNavLink
                      forceLink
                      to={DIVISION_MANAGER_ROUTES.details(division.id)}
                    >
                      Open
                    </AppNavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </AppSectionCard>
    </section>
  );
};

export default DivisionListPage;
