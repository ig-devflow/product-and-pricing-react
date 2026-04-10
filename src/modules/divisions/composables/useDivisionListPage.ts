import { useNavigate } from 'react-router';
import { DIVISION_MANAGER_ROUTES } from '@/shared/config/routes';
import { useDivisionListQuery } from '@/modules/divisions/queries/useDivisionListQuery';

export const useDivisionListPage = () => {
  const navigate = useNavigate();
  const divisionsQuery = useDivisionListQuery();

  return {
    divisions: divisionsQuery.data ?? [],
    isLoading: divisionsQuery.isLoading,
    isError: divisionsQuery.isError,
    errorMessage: divisionsQuery.error instanceof Error ? divisionsQuery.error.message : 'Failed to load divisions',
    openDivision: (divisionId: number) => navigate(DIVISION_MANAGER_ROUTES.details(divisionId)),
    openCreatePage: () => navigate(DIVISION_MANAGER_ROUTES.create),
  };
};
