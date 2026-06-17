import { useQuery } from '@tanstack/react-query';
import { getRooms } from '@/modules/products/rooms/api/rooms.api';
import { mapRoomListPageDto } from '@/modules/products/rooms/model/mappers';
import { roomQueryKeys, type GetRoomsParams } from '@/modules/products/rooms/model/query-keys';

export const useRoomListQuery = (
  divisionId: number,
  accommodationId: number,
  params: GetRoomsParams = {},
) =>
  useQuery({
    queryKey: roomQueryKeys.list(divisionId, accommodationId, params),
    queryFn: async () => mapRoomListPageDto(await getRooms(divisionId, accommodationId, params)),
    enabled: Boolean(divisionId) && Boolean(accommodationId),
  });
