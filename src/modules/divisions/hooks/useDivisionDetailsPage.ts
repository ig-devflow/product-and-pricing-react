import { useNavigate } from 'react-router';
import { DIVISION_MANAGER_ROUTES } from '@/app/config/routes';
import { useResourcePageState } from '@/shared/hooks/useResourcePageState';
import { useDivisionRouteId } from './useDivisionRouteId';
import { useDivisionDetailsQuery } from '@/modules/divisions/queries/useDivisionDetailsQuery';
import { useDivisionPageHeader } from './useDivisionPageHeader';

export const useDivisionDetailsPage = () => {
  const navigate = useNavigate();
  const pageHeader = useDivisionPageHeader('details');
  const divisionId = useDivisionRouteId();
  const divisionQuery = useDivisionDetailsQuery(divisionId);
  const pageState = useResourcePageState({
    data: divisionQuery.data,
    isLoading: divisionQuery.isLoading,
    error: divisionQuery.error,
    fallbackErrorMessage: 'Failed to load division.',
  });

  return {
    pageHeader,
    detailsQuery: divisionQuery,
    divisionId,
    details: pageState.data,
    isLoading: pageState.isLoading,
    errorMessage: pageState.errorMessage,
    openEditPage: () => {
      if (divisionId !== null) {
        navigate(DIVISION_MANAGER_ROUTES.edit(divisionId));
      }
    },
    handleBack: () => navigate(DIVISION_MANAGER_ROUTES.list),
  };
};
