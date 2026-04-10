import { Outlet } from 'react-router';
import { useDivisionPageHeader } from '@/modules/divisions/composables/useDivisionPageHeader';
import { AppShellFooter, AppShellHeader } from '@/shared/ui/patterns';

const DivisionManagerLayout = () => {
  const pageHeader = useDivisionPageHeader();

  return (
    <div className="app-shell">
      <AppShellHeader showAllDivisionsLink={pageHeader.showAllDivisionsLink} />
      <main className="app-shell__content">
        <Outlet />
      </main>
      <AppShellFooter />
    </div>
  );
};

export default DivisionManagerLayout;
