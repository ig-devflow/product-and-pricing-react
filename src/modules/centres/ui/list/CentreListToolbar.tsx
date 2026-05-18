import { AppField, AppSearchInput } from '@/shared/ui/controls';
import { AppButton, AppSurface, AppSwitch } from '@/shared/ui/primitives';

export interface CentreListToolbarProps {
  searchTerm: string;
  totalCount: number;
  visibleCount: number;
  page: number;
  totalPages: number;
  canGoPrevious: boolean;
  canGoNext: boolean;
  isRefreshing?: boolean;
  activeOnly: boolean;
  onSearchTermChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onActiveOnlyChange: (value: boolean) => void;
  onCreate: () => void;
}

export const CentreListToolbar = ({
  searchTerm,
  totalCount,
  visibleCount,
  page,
  totalPages,
  canGoPrevious,
  canGoNext,
  isRefreshing = false,
  activeOnly,
  onSearchTermChange,
  onPageChange,
  onActiveOnlyChange,
  onCreate,
}: CentreListToolbarProps) => (
  <AppSurface className="app-toolbar-panel centre-list-toolbar" variant="soft" padding="md">
    <div className="centre-list-toolbar__intro">
      <span className="centre-list-toolbar__label">Find your match</span>
      <p className="centre-list-toolbar__text">
        Search centre records by name, code, or city.
      </p>
    </div>

    <div className="centre-list-toolbar__search">
      <AppField label="Search" forId="centre-search">
        {({ describedBy, labelId }) => (
          <AppSearchInput
            id="centre-search"
            value={searchTerm}
            aria-describedby={describedBy}
            aria-labelledby={labelId}
            placeholder="Search centres"
            onValueChange={onSearchTermChange}
          />
        )}
      </AppField>

      <div className="centre-list-toolbar__filter">
        <span className="centre-list-toolbar__filter-label">Filter</span>
        <AppSwitch
          id="centre-active-filter"
          checked={activeOnly}
          onChange={(e) => onActiveOnlyChange(e.target.checked)}
          label="Active only"
        />
      </div>
    </div>

    <div className="centre-list-toolbar__meta">
      <div className="centre-list-toolbar__count-row">
        <span className="centre-list-toolbar__count">
          Showing {visibleCount} of {totalCount} centres
        </span>
        {isRefreshing ? (
          <span className="centre-list-toolbar__refreshing">Updating...</span>
        ) : null}
      </div>

      <div className="centre-list-toolbar__controls">
        <div className="centre-list-toolbar__pagination" aria-label="Centre pages">
          <AppButton
            type="button"
            variant="ghost"
            size="sm"
            disabled={!canGoPrevious}
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </AppButton>
          <span className="centre-list-toolbar__page">
            Page {page} of {totalPages}
          </span>
          <AppButton
            type="button"
            variant="ghost"
            size="sm"
            disabled={!canGoNext}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </AppButton>
        </div>

        <AppButton type="button" variant="primary" onClick={onCreate}>
          Add centre
        </AppButton>
      </div>
    </div>
  </AppSurface>
);
