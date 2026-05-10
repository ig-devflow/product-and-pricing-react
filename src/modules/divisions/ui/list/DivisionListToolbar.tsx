import { AppField, AppSearchInput } from '@/shared/ui/controls';
import { AppButton, AppSurface } from '@/shared/ui/primitives';

export interface DivisionListToolbarProps {
  searchTerm: string;
  totalCount: number;
  visibleCount: number;
  page: number;
  totalPages: number;
  canGoPrevious: boolean;
  canGoNext: boolean;
  isRefreshing?: boolean;
  onSearchTermChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onCreate: () => void;
}

export const DivisionListToolbar = ({
  searchTerm,
  totalCount,
  visibleCount,
  page,
  totalPages,
  canGoPrevious,
  canGoNext,
  isRefreshing = false,
  onSearchTermChange,
  onPageChange,
  onCreate,
}: DivisionListToolbarProps) => (
  <AppSurface
    className="app-toolbar-panel division-list-toolbar"
    variant="soft"
    padding="md"
  >
    <div className="division-list-toolbar__search">
      <AppField label="Search" forId="division-search">
        {({ describedBy, labelId }) => (
          <AppSearchInput
            id="division-search"
            value={searchTerm}
            aria-describedby={describedBy}
            aria-labelledby={labelId}
            placeholder="Search divisions"
            onValueChange={onSearchTermChange}
          />
        )}
      </AppField>
    </div>

    <div className="division-list-toolbar__meta">
      <span className="division-list-toolbar__count">
        Showing {visibleCount} of {totalCount} divisions
      </span>

      {isRefreshing ? (
        <span className="division-list-toolbar__refreshing">Updating...</span>
      ) : null}

      <div className="division-list-toolbar__pagination" aria-label="Division pages">
        <AppButton
          type="button"
          variant="secondary"
          size="sm"
          disabled={!canGoPrevious}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </AppButton>
        <span className="division-list-toolbar__page">
          Page {page} of {totalPages}
        </span>
        <AppButton
          type="button"
          variant="secondary"
          size="sm"
          disabled={!canGoNext}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </AppButton>
      </div>

      <AppButton type="button" variant="primary" onClick={onCreate}>
        Add division
      </AppButton>
    </div>
  </AppSurface>
);
