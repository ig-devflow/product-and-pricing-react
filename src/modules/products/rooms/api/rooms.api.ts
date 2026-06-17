import { httpClient } from '@/shared/api/http/http-client';
import type {
  RoomDetailsDto,
  RoomListItemDto,
  CreateRoomRequestDto,
  CreateRoomResponseDto,
  PagedResultDto,
  UpdateRoomRequestDto,
} from './dto';
import type { GetRoomsParams } from '../model/query-keys';

export async function getRooms(
  divisionId: number,
  accommodationId: number,
  params: GetRoomsParams = {},
): Promise<PagedResultDto<RoomListItemDto>> {
  return httpClient.get<PagedResultDto<RoomListItemDto>>(
    `/api/v1/divisions/${divisionId}/accommodations/${accommodationId}/rooms`,
    { ...params },
  );
}

export async function getRoomById(id: number): Promise<RoomDetailsDto> {
  return httpClient.get<RoomDetailsDto>(`/api/v1/accommodation-rooms/${id}`);
}

export async function createRoom(
  divisionId: number,
  accommodationId: number,
  payload: CreateRoomRequestDto,
): Promise<CreateRoomResponseDto> {
  return httpClient.post<CreateRoomResponseDto, CreateRoomRequestDto>(
    `/api/v1/divisions/${divisionId}/accommodations/${accommodationId}/rooms`,
    payload,
  );
}

export async function updateRoom(id: number, payload: UpdateRoomRequestDto): Promise<void> {
  await httpClient.put<null, UpdateRoomRequestDto>(`/api/v1/accommodation-rooms/${id}`, payload);
}
