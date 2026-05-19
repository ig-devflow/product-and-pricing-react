import { httpClient } from '@/shared/api/http/http-client';
import type {
  CentreDetailsDto,
  CentreListItemDto,
  CreateCentreRequestDto,
  CreateCentreResponseDto,
  PagedResultDto,
  UpdateCentreRequestDto,
} from './dto';

const CENTRES_BASE_PATH = '/api/v1/centres';

export interface GetCentresParams {
  search?: string;
  isActive?: boolean;
  page?: number;
  pageSize?: number;
}

export async function getCentres(
  params: GetCentresParams = {},
): Promise<PagedResultDto<CentreListItemDto>> {
  return httpClient.get<PagedResultDto<CentreListItemDto>>(
    CENTRES_BASE_PATH,
    { ...params },
  );
}

export async function getCentreById(
  centreId: number,
): Promise<CentreDetailsDto> {
  return httpClient.get<CentreDetailsDto>(
    `${CENTRES_BASE_PATH}/${centreId}`,
  );
}

export async function createCentre(
  payload: CreateCentreRequestDto,
): Promise<CreateCentreResponseDto> {
  return httpClient.post<CreateCentreResponseDto, CreateCentreRequestDto>(
    CENTRES_BASE_PATH,
    payload,
  );
}

export async function updateCentre(
  centreId: number,
  payload: UpdateCentreRequestDto,
): Promise<void> {
  await httpClient.put<null, UpdateCentreRequestDto>(
    `${CENTRES_BASE_PATH}/${centreId}`,
    payload,
  );
}
