import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { DIVISION_MANAGER_ROUTES } from '@/app/config/routes';
import { useApiErrorMessage } from '@/shared/hooks/useApiErrorMessage';
import { useDivisionListQuery } from '@/modules/divisions/queries/useDivisionListQuery';

export const useDivisionListPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const divisionsQuery = useDivisionListQuery();
  const errorMessage = useApiErrorMessage(
    divisionsQuery.error,
    'Failed to load divisions.',
  );
  const searchTerm = searchParams.get('q') ?? '';

  const setSearchTerm = (value: string) => {
    const normalizedValue = value.trim();
    const nextParams = new URLSearchParams(searchParams);

    if (normalizedValue) {
      nextParams.set('q', normalizedValue);
    } else {
      nextParams.delete('q');
    }

    setSearchParams(nextParams, { replace: true });
  };

  const sortedDivisions = useMemo(() => {
    const items = divisionsQuery.data ?? [];

    return [...items].sort((left, right) =>
      left.name.localeCompare(right.name, undefined, { sensitivity: 'base' }),
    );
  }, [divisionsQuery.data]);

  const filteredDivisions = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      return sortedDivisions;
    }

    return sortedDivisions.filter((division) => {
      const searchable = [
        division.name,
        division.websiteDisplayUrl,
        division.addressText,
        division.createdBy,
        division.lastModifiedBy,
      ]
        .join(' ')
        .toLowerCase();

      return searchable.includes(term);
    });
  }, [searchTerm, sortedDivisions]);

  const emptyMessage = useMemo(() => {
    const term = searchTerm.trim();

    if (term) {
      return `No divisions matched "${term}".`;
    }

    return 'No divisions found.';
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredDivisions,
    filteredCount: filteredDivisions.length,
    totalCount: sortedDivisions.length,
    isLoading: divisionsQuery.isLoading,
    isRefreshing: divisionsQuery.isFetching && !divisionsQuery.isLoading,
    errorMessage,
    emptyMessage,
    refetch: divisionsQuery.refetch,
    handleCreateClick: () => navigate(DIVISION_MANAGER_ROUTES.create),
  };
};
