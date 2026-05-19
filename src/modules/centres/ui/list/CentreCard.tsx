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
  const location = [centre.city, countryName].filter(Boolean).join(', ');

  return (
    <AppSurface
      className="app-card centre-card"
      as="article"
      padding="none"
      style={centre.brandColor ? ({ '--centre-brand': centre.brandColor } as React.CSSProperties) : undefined}
    >
      <div className="centre-card__accent" />

      <div className="centre-card__body">
        <div className="centre-card__header">
          <div className="centre-card__logo">
            <span>{initials}</span>
          </div>
          <div className="centre-card__title-area">
            <h2 className="centre-card__title">{centre.name}</h2>
            {location ? <span className="centre-card__location">{location}</span> : null}
          </div>
          <span className="centre-card__code">{centre.code}</span>
        </div>

        <div className="centre-card__rows">
          {centre.telephone ? (
            <div className="centre-card__row">
              <span className="centre-card__row-label">Phone</span>
              <span className="centre-card__row-value">{centre.telephone}</span>
            </div>
          ) : null}
          <div className="centre-card__row">
            <span className="centre-card__row-label">Type</span>
            <span className="centre-card__row-value">
              {centre.isPhysicalCentre ? 'Physical centre' : 'Online'}
            </span>
          </div>
        </div>
      </div>

      <footer className="centre-card__footer">
        <AppPill variant={centre.isActive ? 'success' : 'neutral'}>
          {centre.isActive ? 'Active' : 'Inactive'}
        </AppPill>
        <Link to={detailsHref} className="centre-card__details-link">
          View details
        </Link>
      </footer>
    </AppSurface>
  );
};
