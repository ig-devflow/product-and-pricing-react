import { Link, type To } from 'react-router';
import { AppPill } from '@/shared/ui/data-display';
import { AppSurface } from '@/shared/ui/primitives';
import { getCentreInitials } from '@/modules/centres/model/helpers';
import type { CentreListItem } from '@/modules/centres/model/types';

export interface CentreCardProps {
  centre: CentreListItem;
  countryName: string;
  detailsHref: To;
}

export const CentreCard = ({ centre, countryName, detailsHref }: CentreCardProps) => {
  const initials = getCentreInitials(centre.name);
  const location = centre.city
    ? `${centre.city}${countryName ? `, ${countryName}` : ''}`
    : null;

  const style = centre.brandColor
    ? ({
        '--centre-brand': centre.brandColor,
        '--centre-brand-bg': `color-mix(in srgb, ${centre.brandColor} 12%, transparent)`,
      } as React.CSSProperties)
    : {};

  return (
    <AppSurface
      className="app-card centre-card"
      as="article"
      padding="none"
      style={style}
    >
      <header className="centre-card__header">
        <div className={`centre-card__logo${centre.brandColor ? ' centre-card__logo--branded' : ''}`}>
          {initials}
        </div>
        <div className="centre-card__title-area">
          <h3 className="centre-card__title">{centre.name}</h3>
          <span className="centre-card__sub">
            {location ?? <span style={{ color: 'var(--color-text-disabled)' }}>Location not set</span>}
          </span>
        </div>
        <span className="centre-card__code">{centre.code}</span>
      </header>

      <div className="centre-card__meta">
        {centre.telephone ? (
          <div className="centre-card__meta-row">
            <span style={{ color: 'var(--color-text-muted)', fontWeight: 600, minWidth: 56 }}>Phone</span>
            <span>{centre.telephone}</span>
          </div>
        ) : (
          <div className="centre-card__meta-row centre-card__meta-row--muted">
            <span style={{ color: 'var(--color-text-muted)', fontWeight: 600, minWidth: 56 }}>Phone</span>
            <span>Not provided</span>
          </div>
        )}
        <div className="centre-card__meta-row">
          <span style={{ color: 'var(--color-text-muted)', fontWeight: 600, minWidth: 56 }}>Type</span>
          <span>{centre.isPhysicalCentre ? 'Physical centre' : 'Online'}</span>
        </div>
      </div>

      <footer className="centre-card__footer">
        <AppPill variant={centre.isActive ? 'success' : 'neutral'}>
          {centre.isActive ? 'Active' : 'Inactive'}
        </AppPill>
        <Link to={detailsHref} className="centre-card__view app-link">
          View details
        </Link>
      </footer>
    </AppSurface>
  );
};
