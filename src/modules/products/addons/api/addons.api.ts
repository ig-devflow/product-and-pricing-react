import { httpClient } from '@/shared/api/http/http-client';
import type {
  AddOnDetailsDto,
  AddOnListItemDto,
  CreateAddOnRequestDto,
  CreateAddOnResponseDto,
  PagedResultDto,
  UpdateAddOnRequestDto,
} from './dto';
import type { GetAddOnsParams } from '../model/query-keys';

export async function getAddOns(
  divisionId: number,
  params: GetAddOnsParams = {},
): Promise<PagedResultDto<AddOnListItemDto>> {
  return httpClient.get<PagedResultDto<AddOnListItemDto>>(
    `/api/v1/divisions/${divisionId}/add-ons`,
    { ...params },
  );
}

export async function getAddOnById(id: number): Promise<AddOnDetailsDto> {
  return httpClient.get<AddOnDetailsDto>(`/api/v1/add-ons/${id}`);
}

export async function createAddOn(
  divisionId: number,
  payload: CreateAddOnRequestDto,
): Promise<CreateAddOnResponseDto> {
  return httpClient.post<CreateAddOnResponseDto, CreateAddOnRequestDto>(
    `/api/v1/divisions/${divisionId}/add-ons`,
    payload,
  );
}

export async function updateAddOn(id: number, payload: UpdateAddOnRequestDto): Promise<void> {
  await httpClient.put<null, UpdateAddOnRequestDto>(`/api/v1/add-ons/${id}`, payload);
}
