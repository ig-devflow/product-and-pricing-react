import { NavLink, Outlet, useMatch } from 'react-router';
import {
  productManagerShellBrand,
  productManagerShellHeaderCopy,
  appShellFooterCopy,
  appShellFooterLinks,
} from '@/app/config/app-shell';
import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { useAppShellNavigation } from '@/app/hooks/useAppShellNavigation';
import { AppBrandMark, AppShellFooter, AppShellHeader } from '@/app/layout';
import { DivisionProvider } from '@/app/context/DivisionContext';
import { ProductTypeIcon, type ProductType } from '@/modules/products/shared/ui/ProductTypeIcon';

interface ProductNavItem {
  to: string;
  label: string;
  type: ProductType;
}

const productNavItems: ProductNavItem[] = [
  { to: PRODUCT_MANAGER_ROUTES.courses.list, label: 'Courses', type: 'course' },
  { to: PRODUCT_MANAGER_ROUTES.accommodations.list, label: 'Accommodation', type: 'accommodation' },
  { to: PRODUCT_MANAGER_ROUTES.addons.list, label: 'Add-ons', type: 'addon' },
  { to: PRODUCT_MANAGER_ROUTES.transfers.list, label: 'Transfers', type: 'transfer' },
  { to: PRODUCT_MANAGER_ROUTES.packages.list, label: 'Packages', type: 'package' },
];

const DivisionIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 14V7L8 2l6 5v7" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <rect x="6" y="9.5" width="4" height="4.5" rx="0.6" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface ProductSubNavProps {
  isOnRooms: boolean;
}

const ProductSubNav = ({ isOnRooms }: ProductSubNavProps) => (
  <div className="app-container product-subnav__inner">
    <div className="product-subnav__division">
      <span className="product-subnav__division-icon">
        <DivisionIcon />
      </span>
      <span className="product-subnav__division-label">Division</span>
      <button type="button" className="product-subnav__division-btn">
        <span>EC Adult · ADL</span>
        <ChevronDownIcon />
      </button>
    </div>
    <nav className="product-subnav__tabs" aria-label="Product types">
      {productNavItems.map((item) => {
        const isAccommodation = item.type === 'accommodation';
        const forceActive = isAccommodation && isOnRooms;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `product-subnav__tab${isActive || forceActive ? ' is-active' : ''}`
            }
          >
            <span className="product-subnav__tab-icon">
              <ProductTypeIcon type={item.type} size={14} />
            </span>
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  </div>
);

const ProductManagerLayout = () => {
  const navigation = useAppShellNavigation();
  const isOnRooms = Boolean(useMatch(`${PRODUCT_MANAGER_ROUTES.accommodations.list}/*`));

  return (
    <div className="app-shell app-shell--with-subnav">
      <AppShellHeader
        navigation={navigation}
        brandMark={<AppBrandMark {...productManagerShellBrand} />}
        serviceLabel={productManagerShellHeaderCopy.serviceLabel}
        contextualLinkLabel={productManagerShellHeaderCopy.contextualLinkLabel}
        sectionsAriaLabel={productManagerShellHeaderCopy.sectionsAriaLabel}
      />
      <div className="app-shell-subnav-bar">
        <ProductSubNav isOnRooms={isOnRooms} />
      </div>
      <main className="app-shell__main product-manager-content">
        <DivisionProvider>
          <Outlet />
        </DivisionProvider>
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

export default ProductManagerLayout;
