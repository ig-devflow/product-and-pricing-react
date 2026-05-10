import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { DIVISION_MANAGER_ROUTES } from '@/app/config/routes';
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';
import { divisionPageHeaders } from '@/modules/divisions/config/pageHeaders';
import { useDivisionListQuery } from '@/modules/divisions/queries/useDivisionListQuery';

const defaultPage = 1;
const defaultPageSize = 12;

function parsePositiveInteger(value: string | null, fallback: number): number {
  const numericValue = Number(value);

  return Number.isInteger(numericValue) && numericValue > 0
    ? numericValue
    : fallback;
}

export const useDivisionListScreen = () => {
  const navigate = useNavigate();
  const pageHeader = divisionPageHeaders.list;
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') ?? '';
  const page = parsePositiveInteger(searchParams.get('page'), defaultPage);
  const pageSize = parsePositiveInteger(searchParams.get('pageSize'), defaultPageSize);
  const divisionsQuery = useDivisionListQuery({
    search: searchTerm.trim() || undefined,
    page,
    pageSize,
  });
  const errorMessage = getApiErrorMessage(
    divisionsQuery.error,
    'Failed to load divisions.',
  );

  const setSearchTerm = (value: string) => {
    const normalizedValue = value.trim();
    const nextParams = new URLSearchParams(searchParams);

    if (normalizedValue) {
      nextParams.set('search', normalizedValue);
    } else {
      nextParams.delete('search');
    }

    nextParams.set('page', String(defaultPage));
    setSearchParams(nextParams, { replace: true });
  };

  const setPage = (nextPage: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', String(Math.max(defaultPage, nextPage)));
    nextParams.set('pageSize', String(pageSize));
    setSearchParams(nextParams, { replace: true });
  };

  const data = divisionsQuery.data;
  const items = data?.items ?? [];
  const totalCount = data?.totalCount ?? 0;
  const resolvedPageSize = data?.pageSize ?? pageSize;
  const resolvedPage = data?.page ?? page;
  const totalPages = Math.max(1, Math.ceil(totalCount / resolvedPageSize));

  const emptyMessage = useMemo(() => {
    const term = searchTerm.trim();

    if (term) {
      return `No divisions matched "${term}".`;
    }

    return 'No divisions found.';
  }, [searchTerm]);

  return {
    pageHeader,
    searchTerm,
    setSearchTerm,
    divisions: items,
    visibleCount: items.length,
    totalCount,
    page: resolvedPage,
    pageSize: resolvedPageSize,
    totalPages,
    canGoPrevious: resolvedPage > 1,
    canGoNext: resolvedPage < totalPages,
    setPage,
    isLoading: divisionsQuery.isLoading,
    isRefreshing: divisionsQuery.isFetching && !divisionsQuery.isLoading,
    errorMessage,
    emptyMessage,
    refetch: divisionsQuery.refetch,
    handleCreateClick: () => navigate(DIVISION_MANAGER_ROUTES.create),
  };
};
