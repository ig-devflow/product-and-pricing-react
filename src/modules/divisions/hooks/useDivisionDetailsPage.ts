import { useNavigate } from 'react-router';
import { DIVISION_MANAGER_ROUTES } from '@/app/config/routes';
import { buildResourcePageState } from '@/shared/lib/resource/buildResourcePageState';
import { useDivisionRouteId } from './useDivisionRouteId';
import { useDivisionDetailsQuery } from '@/modules/divisions/queries/useDivisionDetailsQuery';
import { divisionPageHeaders } from '@/modules/divisions/config/page-headers';

export const useDivisionDetailsPage = () => {
  const navigate = useNavigate();
  const pageHeader = divisionPageHeaders.details;
  const divisionId = useDivisionRouteId();
  const divisionQuery = useDivisionDetailsQuery(divisionId);
  const pageState = buildResourcePageState({
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
