import { useNavigate } from 'react-router';
import { CENTRE_MANAGER_ROUTES } from '@/app/config/routes';
import { buildResourcePageState } from '@/shared/lib/resource/buildResourcePageState';
import { centrePageHeaders } from '@/modules/centres/config/pageHeaders';
import { useCentreDetailsQuery } from '@/modules/centres/queries/useCentreDetailsQuery';
import { useCentreRouteId } from './useCentreRouteId';

export const useCentreDetailsScreen = () => {
  const navigate = useNavigate();
  const pageHeader = centrePageHeaders.details;
  const centreId = useCentreRouteId();
  const centreQuery = useCentreDetailsQuery(centreId);
  const pageState = buildResourcePageState({
    data: centreQuery.data,
    isLoading: centreQuery.isLoading,
    error: centreQuery.error,
    fallbackErrorMessage: 'Failed to load centre.',
  });

  return {
    pageHeader,
    centreQuery,
    centreId,
    centre: pageState.data,
    isLoading: pageState.isLoading,
    errorMessage: pageState.errorMessage,
    openEditPage: () => {
      if (centreId !== null) {
        navigate(CENTRE_MANAGER_ROUTES.edit(centreId));
      }
    },
    handleBack: () => navigate(CENTRE_MANAGER_ROUTES.list),
  };
};
