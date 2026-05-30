import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { useDivisionContext } from '@/app/context/DivisionContext';
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';
import { useDebouncedValue } from '@/shared/hooks';
import { packagePageHeaders } from '../config/pageHeaders';
import { usePackageListQuery } from '../queries/usePackageListQuery';

const defaultPage = 1;
const defaultPageSize = 4;
const debounceMs = 350;

function parsePositiveInt(value: string | null, fallback: number): number {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : fallback;
}

export const usePackageListScreen = () => {
  const navigate = useNavigate();
  const { divisionId } = useDivisionContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const submittedSearch = searchParams.get('search') ?? '';
  const [searchTerm, setSearchTerm] = useState(submittedSearch);
  const debouncedSearch = useDebouncedValue(searchTerm, debounceMs);
  const page = parsePositiveInt(searchParams.get('page'), defaultPage);
  const pageSize = parsePositiveInt(searchParams.get('pageSize'), defaultPageSize);
  const activeOnly = searchParams.get('active') === 'true';

  useEffect(() => { setSearchTerm(submittedSearch); }, [submittedSearch]);

  useEffect(() => {
    const normalized = debouncedSearch.trim();
    if (normalized === submittedSearch.trim()) return;
    const next = new URLSearchParams(searchParams);
    if (normalized) { next.set('search', normalized); } else { next.delete('search'); }
    next.set('page', String(defaultPage));
    next.set('pageSize', String(pageSize));
    setSearchParams(next, { replace: true });
  }, [debouncedSearch, pageSize, searchParams, setSearchParams, submittedSearch]);

  const query = usePackageListQuery(divisionId, {
    search: submittedSearch.trim() || undefined,
    isActive: activeOnly || undefined,
    page,
    pageSize,
  });
  const errorMessage = getApiErrorMessage(query.error, 'Failed to load packages.');

  const setPage = (nextPage: number) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(Math.max(defaultPage, nextPage)));
    next.set('pageSize', String(pageSize));
    setSearchParams(next, { replace: true });
  };

  const setActiveOnly = (value: boolean) => {
    const next = new URLSearchParams(searchParams);
    if (value) { next.set('active', 'true'); } else { next.delete('active'); }
    next.set('page', String(defaultPage));
    next.set('pageSize', String(pageSize));
    setSearchParams(next, { replace: true });
  };

  const data = query.data;
  const items = data?.items ?? [];
  const totalCount = data?.totalCount ?? 0;
  const resolvedPageSize = data?.pageSize ?? pageSize;
  const resolvedPage = data?.page ?? page;
  const totalPages = Math.max(1, Math.ceil(totalCount / resolvedPageSize));

  const emptyMessage = useMemo(() => {
    const term = submittedSearch.trim();
    return term ? `No packages matched "${term}".` : 'Try changing the search or create a new package.';
  }, [submittedSearch]);

  return {
    pageHeader: packagePageHeaders.list,
    searchTerm,
    setSearchTerm,
    activeOnly,
    setActiveOnly,
    packages: items,
    visibleCount: items.length,
    totalCount,
    page: resolvedPage,
    pageSize: resolvedPageSize,
    totalPages,
    canGoPrevious: resolvedPage > 1,
    canGoNext: resolvedPage < totalPages,
    setPage,
    isLoading: query.isLoading,
    isRefreshing: query.isFetching && !query.isLoading,
    errorMessage,
    emptyMessage,
    refetch: query.refetch,
    handleCreateClick: () => navigate(PRODUCT_MANAGER_ROUTES.packages.create),
  };
};
