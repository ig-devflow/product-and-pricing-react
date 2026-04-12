import { Outlet } from 'react-router';
import { appShellFooterLinks } from '@/app/config/app-shell';
import { useAppShellNavigation } from '@/app/hooks/useAppShellNavigation';
import { AppShellFooter, AppShellHeader } from '@/shared/ui/patterns';

const DivisionManagerLayout = () => {
  const navigation = useAppShellNavigation();

  return (
    <div className="app-shell">
      <AppShellHeader navigation={navigation} />
      <main className="app-shell__main">
        <Outlet />
      </main>
      <AppShellFooter links={appShellFooterLinks} />
    </div>
  );
};

export default DivisionManagerLayout;
