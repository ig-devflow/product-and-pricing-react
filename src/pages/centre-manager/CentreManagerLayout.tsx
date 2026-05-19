import { Outlet } from 'react-router';
import {
  appShellFooterCopy,
  appShellFooterLinks,
  centreShellBrand,
  centreShellHeaderCopy,
} from '@/app/config/app-shell';
import { useAppShellNavigation } from '@/app/hooks/useAppShellNavigation';
import { AppBrandMark, AppShellFooter, AppShellHeader } from '@/app/layout';

const CentreManagerLayout = () => {
  const navigation = useAppShellNavigation();

  return (
    <div className="app-shell">
      <AppShellHeader
        navigation={navigation}
        brandMark={<AppBrandMark {...centreShellBrand} />}
        serviceLabel={centreShellHeaderCopy.serviceLabel}
        contextualLinkLabel={centreShellHeaderCopy.contextualLinkLabel}
        sectionsAriaLabel={centreShellHeaderCopy.sectionsAriaLabel}
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

export default CentreManagerLayout;
