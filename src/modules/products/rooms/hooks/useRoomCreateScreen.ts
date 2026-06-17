import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { useDivisionContext } from '@/app/context/DivisionContext';
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';
import type { RoomFormValues } from '../model/form.types';
import { createEmptyRoomFormValues, mapRoomFormValuesToCreateDto } from '../model/mappers';
import { useCreateRoomMutation } from '../queries/useCreateRoomMutation';
import { roomPageHeaders } from '../config/pageHeaders';
import { useRoomRouteParams } from './useRoomRouteParams';

export const useRoomCreateScreen = () => {
  const navigate = useNavigate();
  const { accommodationId } = useRoomRouteParams();
  const { divisionId } = useDivisionContext();
  const createMutation = useCreateRoomMutation();
  const initialValues = useMemo(() => createEmptyRoomFormValues(), []);

  return {
    pageHeader: roomPageHeaders.create,
    initialValues,
    accommodationId,
    divisionId,
    submitLabel: 'Create room',
    isSaving: createMutation.isPending,
    saveErrorMessage: getApiErrorMessage(createMutation.error, 'Failed to save room.'),
    handleSubmit: async (values: RoomFormValues) => {
      if (accommodationId === null) return;
      const result = await createMutation.mutateAsync({
        divisionId,
        accommodationId,
        payload: mapRoomFormValuesToCreateDto(values),
      });
      navigate(PRODUCT_MANAGER_ROUTES.rooms.details(accommodationId, result.id));
    },
    handleCancel: () => {
      if (accommodationId !== null) {
        navigate(PRODUCT_MANAGER_ROUTES.accommodations.details(accommodationId));
      } else {
        navigate(PRODUCT_MANAGER_ROUTES.accommodations.list);
      }
    },
  };
};
