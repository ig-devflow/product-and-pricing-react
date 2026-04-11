import { Outlet } from 'react-router';
import { AppShellFooter, AppShellHeader } from '@/shared/ui/patterns';

const DivisionManagerLayout = () => {
  return (
    <div className="app-shell">
      <AppShellHeader />
      <main className="app-shell__main">
        <Outlet />
      </main>
      <AppShellFooter />
    </div>
  );
};

export default DivisionManagerLayout;
