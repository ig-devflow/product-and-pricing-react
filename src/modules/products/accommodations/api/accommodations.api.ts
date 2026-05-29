import { httpClient } from '@/shared/api/http/http-client';
import type {
  AccommodationDetailsDto,
  AccommodationListItemDto,
  CreateAccommodationRequestDto,
  CreateAccommodationResponseDto,
  PagedResultDto,
  UpdateAccommodationRequestDto,
} from './dto';
import type { GetAccommodationsParams } from '../model/query-keys';

const BASE_PATH = '/api/v1/accommodations';

export async function getAccommodations(
  params: GetAccommodationsParams = {},
): Promise<PagedResultDto<AccommodationListItemDto>> {
  return httpClient.get<PagedResultDto<AccommodationListItemDto>>(BASE_PATH, { ...params });
}

export async function getAccommodationById(id: number): Promise<AccommodationDetailsDto> {
  return httpClient.get<AccommodationDetailsDto>(`${BASE_PATH}/${id}`);
}

export async function createAccommodation(
  payload: CreateAccommodationRequestDto,
): Promise<CreateAccommodationResponseDto> {
  return httpClient.post<CreateAccommodationResponseDto, CreateAccommodationRequestDto>(
    BASE_PATH,
    payload,
  );
}

export async function updateAccommodation(
  id: number,
  payload: UpdateAccommodationRequestDto,
): Promise<void> {
  await httpClient.put<null, UpdateAccommodationRequestDto>(`${BASE_PATH}/${id}`, payload);
}
