import type { To } from 'react-router';
import { AppPill } from '@/shared/ui/data-display';
import { AppButtonLink, AppSurface } from '@/shared/ui/primitives';
import { getCentreInitials, formatCentreDate } from '@/modules/centres/model/helpers';
import type { CentreListItem } from '@/modules/centres/model/types';

export interface CentreCardProps {
  centre: CentreListItem;
  countryName: string;
  detailsHref: To;
  editHref: To;
}

export const CentreCard = ({ centre, countryName, detailsHref, editHref }: CentreCardProps) => {
  const brand = centre.code ? undefined : undefined;
  const initials = getCentreInitials(centre.name);
  const createdText = centre.createdAt ? formatCentreDate(centre.createdAt) : '';
  const createdBy = centre.createdByName ? ` by ${centre.createdByName}` : '';
  const updatedText = centre.updatedAt ? formatCentreDate(centre.updatedAt) : '';

  return (
    <AppSurface className="app-card centre-card" as="article" padding="none">
      <header className="centre-card__header">
        <div className="centre-card__logo">
          <span>{initials}</span>
        </div>
        <div className="centre-card__title-area">
          <h2 className="centre-card__title">{centre.name}</h2>
          <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', flexWrap: 'wrap' }}>
            <span className="centre-card__code">{centre.code}</span>
            <AppPill variant={centre.isActive ? 'success' : 'neutral'}>
              {centre.isActive ? 'Active' : 'Inactive'}
            </AppPill>
          </div>
        </div>
      </header>

      <div className="centre-card__meta">
        {centre.city || countryName ? (
          <div className="centre-card__meta-row">
            <span>{[centre.city, countryName].filter(Boolean).join(', ')}</span>
          </div>
        ) : (
          <div className="centre-card__meta-row centre-card__meta-row--muted">
            <span>No location set</span>
          </div>
        )}
        <div className="centre-card__meta-row">
          <span>{centre.isPhysicalCentre ? 'Physical centre' : 'Online'}</span>
        </div>
        {createdText ? (
          <div className="centre-card__meta-row" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
            <span>Created {createdText}{createdBy}</span>
          </div>
        ) : null}
        {updatedText ? (
          <div className="centre-card__meta-row" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
            <span>Updated {updatedText}</span>
          </div>
        ) : null}
      </div>

      <footer className="centre-card__footer">
        <AppButtonLink to={detailsHref} variant="ghost" size="sm">
          Open details
        </AppButtonLink>
        <AppButtonLink to={editHref} variant="primary" size="sm">
          Edit
        </AppButtonLink>
      </footer>
    </AppSurface>
  );
};
