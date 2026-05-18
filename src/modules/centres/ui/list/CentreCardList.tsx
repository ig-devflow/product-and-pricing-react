import type { To } from 'react-router';
import { AppAsyncState } from '@/shared/ui/data-display';
import { AppSurface } from '@/shared/ui/primitives';
import type { CentreListItem } from '@/modules/centres/model/types';
import type { CountryReferenceDto } from '@/shared/api/reference-data/types';
import { CentreCard } from './CentreCard';

export interface CentreCardListProps {
  items: CentreListItem[];
  countries: CountryReferenceDto[];
  getDetailsHref: (centreId: number) => To;
  getEditHref: (centreId: number) => To;
  isLoading: boolean;
  errorMessage?: string;
  emptyMessage?: string;
  onRetry: () => void;
  onCreate: () => void;
}

const skeletonItems = Array.from({ length: 6 }, (_, index) => index);

export const CentreCardList = ({
  items,
  countries,
  getDetailsHref,
  getEditHref,
  isLoading,
  errorMessage = '',
  emptyMessage = 'No items found.',
  onRetry,
  onCreate,
}: CentreCardListProps) => {
  const countryMap = new Map(countries.map((c) => [c.id, c.name]));

  return (
    <div className="centre-card-list">
      {isLoading ? (
        <div className="centre-card-list__items">
          {skeletonItems.map((item) => (
            <AppSurface
              key={item}
              as="article"
              className="centre-card-list__skeleton-card"
              padding="md"
            >
              <div className="app-skeleton centre-card-list__skeleton centre-card-list__skeleton--marker" />
              <div className="centre-card-list__skeleton-body">
                <div className="app-skeleton centre-card-list__skeleton centre-card-list__skeleton--title" />
                <div className="app-skeleton centre-card-list__skeleton centre-card-list__skeleton--line" />
                <div className="app-skeleton centre-card-list__skeleton centre-card-list__skeleton--line-short" />
              </div>
            </AppSurface>
          ))}
        </div>
      ) : errorMessage ? (
        <AppAsyncState
          title="Could not load centres"
          text={errorMessage}
          actionText="Retry"
          onAction={onRetry}
        />
      ) : !items.length ? (
        <AppAsyncState
          title="No centres found"
          text={emptyMessage}
          actionText="Add centre"
          onAction={onCreate}
          surfaceVariant="outlined"
        />
      ) : (
        <div className="centre-card-list__items">
          {items.map((centre) => (
            <CentreCard
              key={centre.id}
              centre={centre}
              countryName={countryMap.get(centre.countryId) ?? ''}
              detailsHref={getDetailsHref(centre.id)}
              editHref={getEditHref(centre.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
