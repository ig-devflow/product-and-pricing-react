import type { To } from 'react-router';
import { AppNavLink } from '@/shared/ui/primitives';

export interface AppShellFooterLink {
  id: string;
  label: string;
  to: To;
}

export interface AppShellFooterProps {
  links: AppShellFooterLink[];
  title?: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  copyrightLabel?: string;
}

export const AppShellFooter = ({
  links,
  title = '',
  description = '',
  metaTitle = '',
  metaDescription = '',
  copyrightLabel = '',
}: AppShellFooterProps) => {
  const currentYear = new Date().getFullYear();
  const footerCopyright = copyrightLabel
    ? `${currentYear} ${copyrightLabel}`
    : `${currentYear}`;

  return (
    <footer className="app-shell-footer">
      <div className="app-container app-shell-footer__inner">
        <section className="app-shell-footer__brand">
          {title ? <h2 className="app-shell-footer__title">{title}</h2> : null}
          {description ? <p className="app-shell-footer__text">{description}</p> : null}
        </section>

        <nav className="app-shell-footer__links" aria-label="Footer quick links">
          <h2 className="app-shell-footer__heading">Quick links</h2>
          <div className="app-shell-footer__link-list">
            {links.map((link) => (
              <AppNavLink key={link.id} to={link.to} variant="footer" forceLink>
                {link.label}
              </AppNavLink>
            ))}
          </div>
        </nav>

        <section className="app-shell-footer__meta">
          {metaTitle ? <h2 className="app-shell-footer__heading">{metaTitle}</h2> : null}
          {metaDescription ? (
            <p className="app-shell-footer__text">{metaDescription}</p>
          ) : null}
          <p className="app-shell-footer__copyright">{footerCopyright}</p>
        </section>
      </div>
    </footer>
  );
};
