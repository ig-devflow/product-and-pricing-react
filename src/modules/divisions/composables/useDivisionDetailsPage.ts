import { useNavigate } from 'react-router';
import { DIVISION_MANAGER_ROUTES } from '@/shared/config/routes';
import { useDivisionRouteId } from './useDivisionRouteId';
import { useDivisionDetailsQuery } from '@/modules/divisions/queries/useDivisionDetailsQuery';

export const useDivisionDetailsPage = () => {
  const navigate = useNavigate();
  const divisionId = useDivisionRouteId();
  const divisionQuery = useDivisionDetailsQuery(divisionId);

  return {
    divisionId,
    division: divisionQuery.data ?? null,
    isLoading: divisionQuery.isLoading,
    isError: divisionQuery.isError,
    errorMessage: divisionQuery.error instanceof Error ? divisionQuery.error.message : 'Failed to load division',
    openEditPage: () => {
      if (divisionId !== null) {
        navigate(DIVISION_MANAGER_ROUTES.edit(divisionId));
      }
    },
  };
};
