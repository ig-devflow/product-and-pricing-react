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
import { ProductTypeIcon, type ProductType } from '@/modules/products/shared/ui/ProductTypeIcon';

interface ProductNavItem {
  to: string;
  label: string;
  type: ProductType;
}

const productNavItems: ProductNavItem[] = [
  { to: PRODUCT_MANAGER_ROUTES.courses.list, label: 'Courses', type: 'course' },
  { to: PRODUCT_MANAGER_ROUTES.accommodations.list, label: 'Accommodations', type: 'accommodation' },
  { to: PRODUCT_MANAGER_ROUTES.addons.list, label: 'Add-ons', type: 'addon' },
  { to: PRODUCT_MANAGER_ROUTES.transfers.list, label: 'Transfers', type: 'transfer' },
  { to: PRODUCT_MANAGER_ROUTES.packages.list, label: 'Packages', type: 'package' },
];

const ProductManagerLayout = () => {
  const navigation = useAppShellNavigation();
  const isOnRooms = Boolean(useMatch(`${PRODUCT_MANAGER_ROUTES.accommodations.list}/*`));

  return (
    <div className="app-shell">
      <AppShellHeader
        navigation={navigation}
        brandMark={<AppBrandMark {...productManagerShellBrand} />}
        serviceLabel={productManagerShellHeaderCopy.serviceLabel}
        contextualLinkLabel={productManagerShellHeaderCopy.contextualLinkLabel}
        sectionsAriaLabel={productManagerShellHeaderCopy.sectionsAriaLabel}
      />
      <div className="app-shell__main product-manager-shell">
        <nav className="product-manager-nav" aria-label="Product types">
          <p className="product-manager-nav__label">Product types</p>
          <ul className="product-manager-nav__list">
            {productNavItems.map((item) => {
              const isAccommodation = item.type === 'accommodation';
              const isActive = isAccommodation && isOnRooms;
              return (
                <li key={item.to} className="product-manager-nav__item">
                  <NavLink
                    to={item.to}
                    className={({ isActive: navActive }) =>
                      `product-manager-nav__link${navActive || isActive ? ' is-active' : ''}`
                    }
                  >
                    <span className={`product-manager-nav__icon product-manager-nav__icon--${item.type}`}>
                      <ProductTypeIcon type={item.type} size={18} />
                    </span>
                    <span className="product-manager-nav__text">{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <main className="product-manager-content">
          <Outlet />
        </main>
      </div>
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
