import { NavLink, Outlet } from 'react-router';
import {
  appShellFooterCopy,
  appShellFooterLinks,
  categoriesManagerShellBrand,
  categoriesManagerShellHeaderCopy,
} from '@/app/config/app-shell';
import { CATEGORIES_MANAGER_ROUTES } from '@/app/config/routes';
import { useAppShellNavigation } from '@/app/hooks/useAppShellNavigation';
import { AppBrandMark, AppShellFooter, AppShellHeader } from '@/app/layout';
import { DivisionProvider } from '@/app/context/DivisionContext';
import { DivisionDropdown } from '@/pages/product-manager/DivisionDropdown';

const DivisionIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 14V7L8 2l6 5v7" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <rect x="6" y="9.5" width="4" height="4.5" rx="0.6" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const CategoriesSubNav = () => (
  <div className="app-container product-subnav__inner">
    <div className="product-subnav__division">
      <span className="product-subnav__division-icon">
        <DivisionIcon />
      </span>
      <span className="product-subnav__division-label">Division</span>
      <DivisionDropdown />
    </div>
    <nav className="product-subnav__tabs" aria-label="Category types">
      <NavLink
        to={CATEGORIES_MANAGER_ROUTES.accountCategories.list}
        className={({ isActive }) => `product-subnav__tab${isActive ? ' is-active' : ''}`}
      >
        Account categories
      </NavLink>
      <NavLink
        to={CATEGORIES_MANAGER_ROUTES.productCategories.list}
        className={({ isActive }) => `product-subnav__tab${isActive ? ' is-active' : ''}`}
      >
        Product categories
      </NavLink>
    </nav>
  </div>
);

const CategoriesManagerLayout = () => {
  const navigation = useAppShellNavigation();

  return (
    <DivisionProvider>
      <div className="app-shell app-shell--with-subnav">
        <AppShellHeader
          navigation={navigation}
          brandMark={<AppBrandMark {...categoriesManagerShellBrand} />}
          serviceLabel={categoriesManagerShellHeaderCopy.serviceLabel}
          contextualLinkLabel={categoriesManagerShellHeaderCopy.contextualLinkLabel}
          sectionsAriaLabel={categoriesManagerShellHeaderCopy.sectionsAriaLabel}
        />
        <div className="app-shell-subnav-bar">
          <CategoriesSubNav />
        </div>
        <main className="app-shell__main product-manager-content">
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
    </DivisionProvider>
  );
};

export default CategoriesManagerLayout;
