import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { useDivisionContext } from '@/app/context/DivisionContext';
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';
import { buildResourcePageState } from '@/shared/lib/resource/buildResourcePageState';
import type { RoomFormValues } from '../model/form.types';
import {
  createEmptyRoomFormValues,
  mapRoomDetailsToFormValues,
  mapRoomFormValuesToUpdateDto,
} from '../model/mappers';
import { useRoomDetailsQuery } from '../queries/useRoomDetailsQuery';
import { useUpdateRoomMutation } from '../queries/useUpdateRoomMutation';
import { roomPageHeaders } from '../config/pageHeaders';
import { useRoomRouteParams } from './useRoomRouteParams';

export const useRoomEditScreen = () => {
  const navigate = useNavigate();
  const { accommodationId, roomId } = useRoomRouteParams();
  const { divisionId } = useDivisionContext();
  const roomQuery = useRoomDetailsQuery(roomId);
  const updateMutation = useUpdateRoomMutation();
  const pageState = buildResourcePageState({
    data: roomQuery.data,
    isLoading: roomQuery.isLoading,
    error: roomQuery.error,
    fallbackErrorMessage: 'Failed to load room.',
  });

  const resolvedAccommodationId = accommodationId ?? pageState.data?.accommodationId ?? null;

  const defaultValues = useMemo(
    () => pageState.data ? mapRoomDetailsToFormValues(pageState.data) : createEmptyRoomFormValues(accommodationId),
    [pageState.data, accommodationId],
  );

  return {
    pageHeader: roomPageHeaders.edit,
    submitLabel: 'Save changes',
    roomId,
    accommodationId: resolvedAccommodationId,
    divisionId,
    details: pageState.data,
    detailsQuery: roomQuery,
    isLoading: pageState.isLoading,
    loadErrorMessage: pageState.errorMessage,
    isSaving: updateMutation.isPending,
    saveErrorMessage: getApiErrorMessage(updateMutation.error, 'Failed to save room.'),
    initialValues: defaultValues,
    onSubmit: async (values: RoomFormValues) => {
      if (roomId === null || !pageState.data) return;
      await updateMutation.mutateAsync({
        id: roomId,
        payload: mapRoomFormValuesToUpdateDto(values, pageState.data.version),
      });
      if (resolvedAccommodationId !== null) {
        navigate(PRODUCT_MANAGER_ROUTES.rooms.details(resolvedAccommodationId, roomId));
      }
    },
    onCancel: () => {
      if (roomId !== null && resolvedAccommodationId !== null) {
        navigate(PRODUCT_MANAGER_ROUTES.rooms.details(resolvedAccommodationId, roomId));
      } else if (resolvedAccommodationId !== null) {
        navigate(PRODUCT_MANAGER_ROUTES.accommodations.details(resolvedAccommodationId));
      } else {
        navigate(PRODUCT_MANAGER_ROUTES.accommodations.list);
      }
    },
  };
};
