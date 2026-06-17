import { httpClient } from '@/shared/api/http/http-client';
import type {
  CreateDivisionRequestDto,
  CreateDivisionResponseDto,
  DivisionDetailsDto,
  DivisionListItemDto,
  DivisionOptionDto,
  PagedResultDto,
  UpdateDivisionRequestDto,
} from './dto';

const DIVISIONS_BASE_PATH = '/api/v1/divisions';

export interface GetDivisionsParams {
  search?: string;
  isActive?: boolean;
  page?: number;
  pageSize?: number;
}

export async function getDivisionOptions(): Promise<DivisionOptionDto[]> {
  return httpClient.get<DivisionOptionDto[]>(`${DIVISIONS_BASE_PATH}/options`);
}

export async function getDivisions(
  params: GetDivisionsParams = {},
): Promise<PagedResultDto<DivisionListItemDto>> {
  return httpClient.get<PagedResultDto<DivisionListItemDto>>(
    DIVISIONS_BASE_PATH,
    { ...params },
  );
}

export async function getDivisionById(
  divisionId: number,
): Promise<DivisionDetailsDto> {
  return httpClient.get<DivisionDetailsDto>(
    `${DIVISIONS_BASE_PATH}/${divisionId}`,
  );
}

export async function createDivision(
  payload: CreateDivisionRequestDto,
): Promise<CreateDivisionResponseDto> {
  return httpClient.post<CreateDivisionResponseDto, CreateDivisionRequestDto>(
    DIVISIONS_BASE_PATH,
    payload,
  );
}

export async function updateDivision(
  divisionId: number,
  payload: UpdateDivisionRequestDto,
): Promise<void> {
  await httpClient.put<null, UpdateDivisionRequestDto>(
    `${DIVISIONS_BASE_PATH}/${divisionId}`,
    payload,
  );
}
