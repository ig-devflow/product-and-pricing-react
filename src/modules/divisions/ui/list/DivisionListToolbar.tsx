import { AppField, AppSearchInput } from '@/shared/ui/controls';
import { AppButton, AppSurface } from '@/shared/ui/primitives';

export interface DivisionListToolbarProps {
  searchTerm: string;
  totalCount: number;
  filteredCount: number;
  isRefreshing?: boolean;
  onSearchTermChange: (value: string) => void;
  onCreate: () => void;
}

export const DivisionListToolbar = ({
  searchTerm,
  totalCount,
  filteredCount,
  isRefreshing = false,
  onSearchTermChange,
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
            placeholder="Search by name, website, address, author..."
            onValueChange={onSearchTermChange}
          />
        )}
      </AppField>
    </div>

    <div className="division-list-toolbar__meta">
      <span className="division-list-toolbar__count">
        {filteredCount}
        {filteredCount !== totalCount ? ` / ${totalCount}` : ''} divisions
      </span>

      {isRefreshing ? (
        <span className="division-list-toolbar__refreshing">Updating...</span>
      ) : null}

      <AppButton type="button" variant="primary" onClick={onCreate}>
        Add division
      </AppButton>
    </div>
  </AppSurface>
);
