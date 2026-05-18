import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { CENTRE_MANAGER_ROUTES } from '@/app/config/routes';
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';
import { useDebouncedValue } from '@/shared/hooks';
import { centrePageHeaders } from '@/modules/centres/config/pageHeaders';
import { useCentreListQuery } from '@/modules/centres/queries/useCentreListQuery';

const defaultPage = 1;
const defaultPageSize = 12;
const searchDebounceMs = 350;

function parsePositiveInteger(value: string | null, fallback: number): number {
  const numericValue = Number(value);
  return Number.isInteger(numericValue) && numericValue > 0 ? numericValue : fallback;
}

export const useCentresListScreen = () => {
  const navigate = useNavigate();
  const pageHeader = centrePageHeaders.list;
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

  const centresQuery = useCentreListQuery({
    search: submittedSearchTerm.trim() || undefined,
    page,
    pageSize,
  });
  const errorMessage = getApiErrorMessage(centresQuery.error, 'Failed to load centres.');

  const setPage = (nextPage: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', String(Math.max(defaultPage, nextPage)));
    nextParams.set('pageSize', String(pageSize));
    setSearchParams(nextParams, { replace: true });
  };

  const data = centresQuery.data;
  const items = data?.items ?? [];
  const totalCount = data?.totalCount ?? 0;
  const resolvedPageSize = data?.pageSize ?? pageSize;
  const resolvedPage = data?.page ?? page;
  const totalPages = Math.max(1, Math.ceil(totalCount / resolvedPageSize));

  const emptyMessage = useMemo(() => {
    const term = submittedSearchTerm.trim();
    if (term) return `No centres matched "${term}".`;
    return 'Try changing the search or create a new centre.';
  }, [submittedSearchTerm]);

  return {
    pageHeader,
    searchTerm,
    setSearchTerm,
    centres: items,
    visibleCount: items.length,
    totalCount,
    page: resolvedPage,
    pageSize: resolvedPageSize,
    totalPages,
    canGoPrevious: resolvedPage > 1,
    canGoNext: resolvedPage < totalPages,
    setPage,
    isLoading: centresQuery.isLoading,
    isRefreshing: centresQuery.isFetching && !centresQuery.isLoading,
    errorMessage,
    emptyMessage,
    refetch: centresQuery.refetch,
    handleCreateClick: () => navigate(CENTRE_MANAGER_ROUTES.create),
    handleCentreClick: (centreId: number) => navigate(CENTRE_MANAGER_ROUTES.details(centreId)),
  };
};
