import { httpClient } from '@/shared/api/http/http-client';
import type {
  TransferDetailsDto,
  TransferListItemDto,
  CreateTransferRequestDto,
  CreateTransferResponseDto,
  PagedResultDto,
  UpdateTransferRequestDto,
} from './dto';
import type { GetTransfersParams } from '../model/query-keys';

export async function getTransfers(
  divisionId: number,
  params: GetTransfersParams = {},
): Promise<PagedResultDto<TransferListItemDto>> {
  return httpClient.get<PagedResultDto<TransferListItemDto>>(
    `/api/v1/divisions/${divisionId}/transfers`,
    { ...params },
  );
}

export async function getTransferById(id: number): Promise<TransferDetailsDto> {
  return httpClient.get<TransferDetailsDto>(`/api/v1/transfers/${id}`);
}

export async function createTransfer(
  divisionId: number,
  payload: CreateTransferRequestDto,
): Promise<CreateTransferResponseDto> {
  return httpClient.post<CreateTransferResponseDto, CreateTransferRequestDto>(
    `/api/v1/divisions/${divisionId}/transfers`,
    payload,
  );
}

export async function updateTransfer(id: number, payload: UpdateTransferRequestDto): Promise<void> {
  await httpClient.put<null, UpdateTransferRequestDto>(`/api/v1/transfers/${id}`, payload);
}
