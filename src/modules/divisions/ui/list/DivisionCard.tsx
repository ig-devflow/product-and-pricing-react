import { Link } from 'react-router';
import { AppPill } from '@/shared/ui/AppPill';
import { AppSurface } from '@/shared/ui/primitives';
import { getDivisionBannerSrc } from '@/modules/divisions/lib/banner';
import type { DivisionListItem } from '@/modules/divisions/model/division';
import { DIVISION_MANAGER_ROUTES } from '@/shared/config/routes';

export interface DivisionCardProps {
  division: DivisionListItem;
}

export const DivisionCard = ({ division }: DivisionCardProps) => {
  const bannerSrc = getDivisionBannerSrc(division.banner);

  return (
    <AppSurface className="app-card division-card" as="article" padding="none">
      {bannerSrc ? (
        <div className="division-card__banner-wrap">
          <img
            className="division-card__banner"
            src={bannerSrc}
            alt={`${division.name} banner`}
          />
        </div>
      ) : (
        <div className="division-card__banner-placeholder">No banner</div>
      )}

      <div className="app-card__content division-card__content">
        <div className="division-card__top-row">
          <h2 className="division-card__title">{division.name}</h2>

          <AppPill variant={division.isActive ? 'success' : 'neutral'}>
            {division.isActive ? 'Active' : 'Inactive'}
          </AppPill>
        </div>

        {division.websiteUrl ? (
          <a
            className="app-link"
            href={division.websiteUrl}
            target="_blank"
            rel="noreferrer"
          >
            {division.websiteDisplayUrl}
          </a>
        ) : null}

        {division.addressText ? (
          <p className="division-card__text">{division.addressText}</p>
        ) : (
          <p className="division-card__text division-card__text--muted">
            Address is empty
          </p>
        )}

        <dl className="division-card__meta">
          <div>
            <dt>Created by</dt>
            <dd>{division.createdBy}</dd>
          </div>
          <div>
            <dt>Last modified by</dt>
            <dd>{division.lastModifiedBy}</dd>
          </div>
        </dl>
      </div>

      <footer className="app-card__footer division-card__footer">
        <Link
          to={DIVISION_MANAGER_ROUTES.details(division.id)}
          className="app-button app-button--secondary app-button--md app-button--block"
        >
          Open
        </Link>

        <Link
          to={DIVISION_MANAGER_ROUTES.edit(division.id)}
          className="app-button app-button--primary app-button--md app-button--block"
        >
          Edit
        </Link>
      </footer>
    </AppSurface>
  );
};
