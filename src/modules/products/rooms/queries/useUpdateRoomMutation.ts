import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRoom } from '@/modules/products/rooms/api/rooms.api';
import type { UpdateRoomRequestDto } from '@/modules/products/rooms/api/dto';
import { roomQueryKeys } from '@/modules/products/rooms/model/query-keys';

export const useUpdateRoomMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateRoomRequestDto }) =>
      updateRoom(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: roomQueryKeys.all });
    },
  });
};
