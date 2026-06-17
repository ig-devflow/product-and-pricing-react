import { useNavigate } from 'react-router';
import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { buildResourcePageState } from '@/shared/lib/resource/buildResourcePageState';
import { roomPageHeaders } from '../config/pageHeaders';
import { useRoomDetailsQuery } from '../queries/useRoomDetailsQuery';
import { useRoomRouteParams } from './useRoomRouteParams';

export const useRoomDetailsScreen = () => {
  const navigate = useNavigate();
  const { accommodationId, roomId } = useRoomRouteParams();
  const roomQuery = useRoomDetailsQuery(roomId);
  const pageState = buildResourcePageState({
    data: roomQuery.data,
    isLoading: roomQuery.isLoading,
    error: roomQuery.error,
    fallbackErrorMessage: 'Failed to load room.',
  });

  const resolvedAccommodationId =
    accommodationId ?? pageState.data?.accommodationId ?? null;

  return {
    pageHeader: roomPageHeaders.details,
    detailsQuery: roomQuery,
    roomId,
    accommodationId: resolvedAccommodationId,
    details: pageState.data,
    isLoading: pageState.isLoading,
    errorMessage: pageState.errorMessage,
    openEditPage: () => {
      if (roomId !== null && resolvedAccommodationId !== null) {
        navigate(PRODUCT_MANAGER_ROUTES.rooms.edit(resolvedAccommodationId, roomId));
      }
    },
    handleBackToAccommodation: () => {
      if (resolvedAccommodationId !== null) {
        navigate(PRODUCT_MANAGER_ROUTES.accommodations.details(resolvedAccommodationId));
      } else {
        navigate(PRODUCT_MANAGER_ROUTES.accommodations.list);
      }
    },
  };
};
