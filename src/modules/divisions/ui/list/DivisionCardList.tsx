import { AppAsyncState } from '@/shared/ui/AppAsyncState';
import { AppSurface } from '@/shared/ui/primitives';
import type { DivisionListItem } from '@/modules/divisions/model/types';
import { DivisionCard } from './DivisionCard';

export interface DivisionCardListProps {
  items: DivisionListItem[];
  isLoading: boolean;
  errorMessage?: string;
  emptyMessage?: string;
  onRetry: () => void;
}

const skeletonItems = Array.from({ length: 6 }, (_, index) => index);

export const DivisionCardList = ({
  items,
  isLoading,
  errorMessage = '',
  emptyMessage = 'No items found.',
  onRetry,
}: DivisionCardListProps) => (
  <div className="division-card-list">
    {isLoading ? (
      <div className="app-grid">
        {skeletonItems.map((item) => (
          <AppSurface
            key={item}
            as="article"
            className="division-card-list__skeleton-card"
            padding="md"
          >
            <div className="app-skeleton division-card-list__skeleton division-card-list__skeleton--banner" />
            <div className="app-skeleton division-card-list__skeleton division-card-list__skeleton--title" />
            <div className="app-skeleton division-card-list__skeleton division-card-list__skeleton--line" />
            <div className="app-skeleton division-card-list__skeleton division-card-list__skeleton--line-short" />
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
        title="Nothing to show"
        text={emptyMessage}
        surfaceVariant="outlined"
      />
    ) : (
      <div className="app-grid">
        {items.map((division) => (
          <DivisionCard key={division.id} division={division} />
        ))}
      </div>
    )}
  </div>
);
