import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRoom } from '@/modules/products/rooms/api/rooms.api';
import type { CreateRoomRequestDto } from '@/modules/products/rooms/api/dto';
import { roomQueryKeys } from '@/modules/products/rooms/model/query-keys';
import { accommodationQueryKeys } from '@/modules/products/accommodations/model/query-keys';

export const useCreateRoomMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      divisionId,
      accommodationId,
      payload,
    }: {
      divisionId: number;
      accommodationId: number;
      payload: CreateRoomRequestDto;
    }) => createRoom(divisionId, accommodationId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: roomQueryKeys.lists() });
      await queryClient.invalidateQueries({ queryKey: accommodationQueryKeys.all });
    },
  });
};
