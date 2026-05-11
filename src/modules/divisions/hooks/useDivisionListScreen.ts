import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { DIVISION_MANAGER_ROUTES } from '@/app/config/routes';
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';
import { useDebouncedValue } from '@/shared/hooks';
import { divisionPageHeaders } from '@/modules/divisions/config/pageHeaders';
import { useDivisionListQuery } from '@/modules/divisions/queries/useDivisionListQuery';

const defaultPage = 1;
const defaultPageSize = 12;
const searchDebounceMs = 350;

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
  const submittedSearchTerm = searchParams.get('search') ?? '';
  const [searchTerm, setSearchTerm] = useState(submittedSearchTerm);
  const debouncedSearchTerm = useDebouncedValue(searchTerm, searchDebounceMs);
  const page = parsePositiveInteger(searchParams.get('page'), defaultPage);
  const pageSize = parsePositiveInteger(searchParams.get('pageSize'), defaultPageSize);

  useEffect(() => {
    setSearchTerm(submittedSearchTerm);
  }, [submittedSearchTerm]);

  useEffect(() => {
    const normalizedValue = debouncedSearchTerm.trim();

    if (normalizedValue === submittedSearchTerm.trim()) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);

    if (normalizedValue) {
      nextParams.set('search', normalizedValue);
    } else {
      nextParams.delete('search');
    }

    nextParams.set('page', String(defaultPage));
    nextParams.set('pageSize', String(pageSize));
    setSearchParams(nextParams, { replace: true });
  }, [debouncedSearchTerm, pageSize, searchParams, setSearchParams, submittedSearchTerm]);

  const divisionsQuery = useDivisionListQuery({
    search: submittedSearchTerm.trim() || undefined,
    page,
    pageSize,
  });
  const errorMessage = getApiErrorMessage(
    divisionsQuery.error,
    'Failed to load divisions.',
  );

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
    const term = submittedSearchTerm.trim();

    if (term) {
      return `No divisions matched "${term}".`;
    }

    return 'Try changing the search or create a new division.';
  }, [submittedSearchTerm]);

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
