import { useQuery } from '@tanstack/react-query';
import { getRoomById } from '@/modules/products/rooms/api/rooms.api';
import { mapRoomDetailsDto } from '@/modules/products/rooms/model/mappers';
import { roomQueryKeys } from '@/modules/products/rooms/model/query-keys';

export const useRoomDetailsQuery = (id: number | null) =>
  useQuery({
    queryKey: roomQueryKeys.detail(id ?? 0),
    queryFn: async () => {
      if (!id) throw new Error('Room ID is required');
      return mapRoomDetailsDto(await getRoomById(id));
    },
    enabled: Boolean(id),
  });
