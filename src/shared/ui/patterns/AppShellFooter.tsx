import { appShellFooterLinks } from '@/shared/config/app-shell';
import { AppNavLink } from '@/shared/ui/primitives';

export const AppShellFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-shell-footer">
      <div className="app-container app-shell-footer__inner">
        <section className="app-shell-footer__brand">
          <h2 className="app-shell-footer__title">Products & Pricing</h2>
          <p className="app-shell-footer__text">
            Division Manager keeps division details, pricing context, and content
            settings in one clean workspace.
          </p>
        </section>

        <nav className="app-shell-footer__links" aria-label="Footer quick links">
          <h2 className="app-shell-footer__heading">Quick links</h2>
          <div className="app-shell-footer__link-list">
            {appShellFooterLinks.map((link) => (
              <AppNavLink key={link.id} to={link.to} variant="footer" forceLink>
                {link.label}
              </AppNavLink>
            ))}
          </div>
        </nav>

        <section className="app-shell-footer__meta">
          <h2 className="app-shell-footer__heading">Product</h2>
          <p className="app-shell-footer__text">Admin shell for operational workflows.</p>
          <p className="app-shell-footer__copyright">
            {currentYear} Products & Pricing. Internal product interface.
          </p>
        </section>
      </div>
    </footer>
  );
};
