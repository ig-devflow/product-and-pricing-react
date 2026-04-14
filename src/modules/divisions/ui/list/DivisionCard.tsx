import type { To } from 'react-router';
import { AppPill } from '@/shared/ui/data-display';
import { AppButtonLink, AppSurface } from '@/shared/ui/primitives';
import { getDivisionBannerSrc } from '@/modules/divisions/lib/banner';
import type { DivisionListItem } from '@/modules/divisions/model/types';

export interface DivisionCardProps {
  division: DivisionListItem;
  detailsHref: To;
  editHref: To;
}

export const DivisionCard = ({
  division,
  detailsHref,
  editHref,
}: DivisionCardProps) => {
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
        <AppButtonLink
          to={detailsHref}
          variant="secondary"
          block
        >
          Open
        </AppButtonLink>

        <AppButtonLink
          to={editHref}
          variant="primary"
          block
        >
          Edit
        </AppButtonLink>
      </footer>
    </AppSurface>
  );
};
