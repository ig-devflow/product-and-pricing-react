import type { To } from 'react-router';
import { AppAsyncState } from '@/shared/ui/data-display';
import { AppSurface } from '@/shared/ui/primitives';
import type { DivisionListItem } from '@/modules/divisions/model/types';
import { DivisionCard } from './DivisionCard';

export interface DivisionCardListProps {
  items: DivisionListItem[];
  getDetailsHref: (divisionId: number) => To;
  getEditHref: (divisionId: number) => To;
  isLoading: boolean;
  errorMessage?: string;
  emptyMessage?: string;
  onRetry: () => void;
  onCreate: () => void;
}

const skeletonItems = Array.from({ length: 6 }, (_, index) => index);

export const DivisionCardList = ({
  items,
  getDetailsHref,
  getEditHref,
  isLoading,
  errorMessage = '',
  emptyMessage = 'No items found.',
  onRetry,
  onCreate,
}: DivisionCardListProps) => (
  <div className="division-card-list">
    {isLoading ? (
      <div className="division-card-list__items">
        {skeletonItems.map((item) => (
          <AppSurface
            key={item}
            as="article"
            className="division-card-list__skeleton-card"
            padding="md"
          >
            <div className="app-skeleton division-card-list__skeleton division-card-list__skeleton--marker" />
            <div className="division-card-list__skeleton-body">
              <div className="app-skeleton division-card-list__skeleton division-card-list__skeleton--title" />
              <div className="app-skeleton division-card-list__skeleton division-card-list__skeleton--line" />
              <div className="app-skeleton division-card-list__skeleton division-card-list__skeleton--line-short" />
            </div>
          </AppSurface>
        ))}
      </div>
    ) : errorMessage ? (
      <AppAsyncState
        title="Could not load divisions"
        text={errorMessage}
        actionText="Retry"
        onAction={onRetry}
      />
    ) : !items.length ? (
      <AppAsyncState
        title="No divisions found"
        text={emptyMessage}
        actionText="Add division"
        onAction={onCreate}
        surfaceVariant="outlined"
      />
    ) : (
      <div className="division-card-list__items">
        {items.map((division) => (
          <DivisionCard
            key={division.id}
            division={division}
            detailsHref={getDetailsHref(division.id)}
            editHref={getEditHref(division.id)}
          />
        ))}
      </div>
    )}
  </div>
);
