import { useMemo, useState } from 'react';
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
  isLoading: boolean;
  errorMessage?: string;
  emptyMessage?: string;
  onRetry: () => void;
  onCreate: () => void;
}

const skeletonItems = Array.from({ length: 6 }, (_, index) => index);

interface CountryGroup {
  id: number;
  countryCode: string;
  countryName: string;
  items: CentreListItem[];
}

function countryCodeToFlag(code: string): string {
  if (!code || code.length !== 2) return '🌐';
  const offset = 0x1F1E6 - 65;
  return [...code.toUpperCase()].map((c) => String.fromCodePoint(c.charCodeAt(0) + offset)).join('');
}

export const CentreCardList = ({
  items,
  countries,
  getDetailsHref,
  isLoading,
  errorMessage = '',
  emptyMessage = 'No items found.',
  onRetry,
  onCreate,
}: CentreCardListProps) => {
  const [expanded, setExpanded] = useState<Set<number>>(() => new Set());

  const countryMap = useMemo(
    () => new Map(countries.map((c) => [c.id, { name: c.name, code: c.code }])),
    [countries],
  );

  const grouped = useMemo(() => {
    const map = new Map<number, CountryGroup>();
    for (const centre of items) {
      const { countryId } = centre;
      if (!map.has(countryId)) {
        const country = countryMap.get(countryId);
        map.set(countryId, {
          id: countryId,
          countryCode: country?.code ?? '',
          countryName: country?.name ?? '',
          items: [],
        });
      }
      map.get(countryId)!.items.push(centre);
    }
    return Array.from(map.values()).sort((a, b) => {
      if (!a.countryName && b.countryName) return 1;
      if (a.countryName && !b.countryName) return -1;
      return a.countryName.localeCompare(b.countryName);
    });
  }, [items, countryMap]);

  const toggleGroup = (id: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

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
        grouped.map((group) => {
          const isExpanded = expanded.has(group.id);
          return (
            <div
              key={group.id}
              className={`centre-country-group${isExpanded ? '' : ' centre-country-group--collapsed'}`}
            >
              <button
                type="button"
                className="centre-country-group__header"
                onClick={() => toggleGroup(group.id)}
                aria-expanded={isExpanded}
              >
                <span className="centre-country-group__flag" aria-hidden="true">
                  {countryCodeToFlag(group.countryCode)}
                </span>
                <h2 className="centre-country-group__name">
                  {group.countryName || 'Country not set'}
                </h2>
                <span className="centre-country-group__count">{group.items.length}</span>
                <span className="centre-country-group__chevron" aria-hidden="true" />
              </button>

              {isExpanded ? (
                <div className="centre-country-group__body">
                  {group.items.map((centre) => (
                    <CentreCard
                      key={centre.id}
                      centre={centre}
                      countryName={group.countryName}
                      detailsHref={getDetailsHref(centre.id)}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          );
        })
      )}
    </div>
  );
};
