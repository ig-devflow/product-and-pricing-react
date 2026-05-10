import type { To } from 'react-router';
import { AppPill } from '@/shared/ui/data-display';
import { AppButtonLink, AppSurface } from '@/shared/ui/primitives';
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
}: DivisionCardProps) => (
  <AppSurface className="app-card division-card" as="article" padding="none">
    <div className="app-card__content division-card__content">
      <div className="division-card__top-row">
        <h2 className="division-card__title">{division.name}</h2>

        <AppPill variant={division.isActive ? 'success' : 'neutral'}>
          {division.isActive ? 'Active' : 'Inactive'}
        </AppPill>
      </div>
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
