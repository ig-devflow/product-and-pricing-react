import { useNavigate } from 'react-router';
import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { buildResourcePageState } from '@/shared/lib/resource/buildResourcePageState';
import { accommodationPageHeaders } from '../config/pageHeaders';
import { useAccommodationDetailsQuery } from '../queries/useAccommodationDetailsQuery';
import { useAccommodationRouteId } from './useAccommodationRouteId';

export const useAccommodationDetailsScreen = () => {
  const navigate = useNavigate();
  const accommodationId = useAccommodationRouteId();
  const query = useAccommodationDetailsQuery(accommodationId);
  const pageState = buildResourcePageState({
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    fallbackErrorMessage: 'Failed to load accommodation.',
  });

  return {
    pageHeader: accommodationPageHeaders.details,
    detailsQuery: query,
    accommodationId,
    details: pageState.data,
    isLoading: pageState.isLoading,
    errorMessage: pageState.errorMessage,
    openEditPage: () => { if (accommodationId !== null) navigate(PRODUCT_MANAGER_ROUTES.accommodations.edit(accommodationId)); },
    handleBack: () => navigate(PRODUCT_MANAGER_ROUTES.accommodations.list),
    handleAddRoom: () => { if (accommodationId !== null) navigate(PRODUCT_MANAGER_ROUTES.rooms.create(accommodationId)); },
  };
};
