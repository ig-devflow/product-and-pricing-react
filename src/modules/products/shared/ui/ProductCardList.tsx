import type { ReactNode } from 'react';
import { AppAsyncState } from '@/shared/ui/data-display';
import { AppSurface } from '@/shared/ui/primitives';

export interface ProductCardListProps {
  isLoading: boolean;
  errorMessage?: string;
  emptyMessage?: string;
  isEmpty: boolean;
  entityLabel: string;
  onRetry: () => void;
  onCreate: () => void;
  children: ReactNode;
}

const skeletonItems = Array.from({ length: 4 }, (_, i) => i);

export const ProductCardList = ({
  isLoading,
  errorMessage = '',
  emptyMessage = 'No items found.',
  isEmpty,
  entityLabel,
  onRetry,
  onCreate,
  children,
}: ProductCardListProps) => {
  if (isLoading) {
    return (
      <div className="product-card-list">
        <div className="product-card-list__items">
          {skeletonItems.map((i) => (
            <AppSurface key={i} as="article" className="product-card-list__skeleton-card" padding="md">
              <div className="app-skeleton product-card-list__skeleton product-card-list__skeleton--icon" />
              <div className="product-card-list__skeleton-body">
                <div className="app-skeleton product-card-list__skeleton product-card-list__skeleton--title" />
                <div className="app-skeleton product-card-list__skeleton product-card-list__skeleton--line" />
              </div>
            </AppSurface>
          ))}
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="product-card-list">
        <AppAsyncState
          title={`Could not load ${entityLabel}`}
          text={errorMessage}
          actionText="Retry"
          onAction={onRetry}
        />
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="product-card-list">
        <AppAsyncState
          title={`No ${entityLabel} found`}
          text={emptyMessage}
          actionText={`Add ${entityLabel}`}
          onAction={onCreate}
          surfaceVariant="outlined"
        />
      </div>
    );
  }

  return (
    <div className="product-card-list">
      <div className="product-card-list__items">{children}</div>
    </div>
  );
};
