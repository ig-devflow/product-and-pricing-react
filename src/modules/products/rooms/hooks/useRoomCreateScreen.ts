import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { PRODUCT_MANAGER_ROUTES } from '@/app/config/routes';
import { getApiErrorMessage } from '@/shared/lib/errors/getApiErrorMessage';
import type { RoomFormValues } from '../model/form.types';
import { createEmptyRoomFormValues, mapRoomFormValuesToCreateDto } from '../model/mappers';
import { useCreateRoomMutation } from '../queries/useCreateRoomMutation';
import { roomPageHeaders } from '../config/pageHeaders';
import { useRoomRouteParams } from './useRoomRouteParams';

export const useRoomCreateScreen = () => {
  const navigate = useNavigate();
  const { accommodationId } = useRoomRouteParams();
  const createMutation = useCreateRoomMutation();
  const initialValues = useMemo(() => createEmptyRoomFormValues(accommodationId), [accommodationId]);

  return {
    pageHeader: roomPageHeaders.create,
    initialValues,
    accommodationId,
    submitLabel: 'Create room',
    isSaving: createMutation.isPending,
    saveErrorMessage: getApiErrorMessage(createMutation.error, 'Failed to save room.'),
    handleSubmit: async (values: RoomFormValues) => {
      const result = await createMutation.mutateAsync(mapRoomFormValuesToCreateDto(values));
      const accId = values.accommodationId ?? accommodationId;
      navigate(
        accId !== null
          ? PRODUCT_MANAGER_ROUTES.rooms.details(accId, result.id)
          : PRODUCT_MANAGER_ROUTES.accommodations.list,
      );
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
