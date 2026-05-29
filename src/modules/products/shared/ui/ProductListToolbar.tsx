import { AppSearchInput } from '@/shared/ui/controls';
import { AppButton, AppSurface, AppSwitch } from '@/shared/ui/primitives';

export interface ProductListToolbarProps {
  entityLabel: string;
  entityLabelPlural: string;
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

export const ProductListToolbar = ({
  entityLabel,
  entityLabelPlural,
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
}: ProductListToolbarProps) => (
  <AppSurface className="app-toolbar-panel product-list-toolbar" variant="soft" padding="md">
    <div className="product-list-toolbar__intro">
      <span className="product-list-toolbar__label">Find your match</span>
      <p className="product-list-toolbar__text">
        Search {entityLabelPlural} by name.
      </p>
    </div>

    <div className="product-list-toolbar__row">
      <AppSearchInput
        id={`${entityLabel}-search`}
        value={searchTerm}
        aria-label={`Search ${entityLabelPlural}`}
        placeholder={`Search ${entityLabelPlural}`}
        onValueChange={onSearchTermChange}
      />

      <div className="product-list-toolbar__filter">
        <span className="product-list-toolbar__filter-label">Filter</span>
        <AppSwitch
          id={`${entityLabel}-active-filter`}
          checked={activeOnly}
          onChange={(e) => onActiveOnlyChange(e.target.checked)}
          label="Active only"
        />
      </div>

      <div className="product-list-toolbar__meta">
        <span className="product-list-toolbar__count">
          Showing {visibleCount} of {totalCount} {entityLabelPlural}
        </span>

        {isRefreshing ? (
          <span className="product-list-toolbar__refreshing">Updating...</span>
        ) : null}

        <div className="product-list-toolbar__pagination" aria-label={`${entityLabel} pages`}>
          <AppButton
            type="button"
            variant="ghost"
            size="sm"
            disabled={!canGoPrevious}
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </AppButton>
          <span className="product-list-toolbar__page">Page {page} of {totalPages}</span>
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
      </div>

      <AppButton type="button" variant="primary" onClick={onCreate}>
        Add {entityLabel}
      </AppButton>
    </div>
  </AppSurface>
);
