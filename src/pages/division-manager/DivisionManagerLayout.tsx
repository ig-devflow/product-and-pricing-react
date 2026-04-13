import { Outlet } from 'react-router';
import {
  appShellBrand,
  appShellFooterCopy,
  appShellFooterLinks,
  appShellHeaderCopy,
} from '@/app/config/app-shell';
import { useAppShellNavigation } from '@/app/hooks/useAppShellNavigation';
import { AppBrandMark, AppShellFooter, AppShellHeader } from '@/shared/ui/patterns';

const DivisionManagerLayout = () => {
  const navigation = useAppShellNavigation();

  return (
    <div className="app-shell">
      <AppShellHeader
        navigation={navigation}
        brandMark={<AppBrandMark {...appShellBrand} />}
        serviceLabel={appShellHeaderCopy.serviceLabel}
        contextualLinkLabel={appShellHeaderCopy.contextualLinkLabel}
        sectionsAriaLabel={appShellHeaderCopy.sectionsAriaLabel}
      />
      <main className="app-shell__main">
        <Outlet />
      </main>
      <AppShellFooter
        links={appShellFooterLinks}
        title={appShellFooterCopy.title}
        description={appShellFooterCopy.description}
        metaTitle={appShellFooterCopy.metaTitle}
        metaDescription={appShellFooterCopy.metaDescription}
        copyrightLabel={appShellFooterCopy.copyrightLabel}
      />
    </div>
  );
};

export default DivisionManagerLayout;
