import { httpClient } from '@/shared/api/http/http-client';
import type {
  CreateDivisionRequestDto,
  DivisionDetailsDto,
  DivisionSummaryDto,
  UpdateDivisionRequestDto,
} from './dto';

const DIVISIONS_BASE_PATH = '/api/divisions';

export async function getDivisions(): Promise<DivisionSummaryDto[]> {
  return httpClient.get<DivisionSummaryDto[]>(DIVISIONS_BASE_PATH);
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
): Promise<void> {
  await httpClient.put<unknown, CreateDivisionRequestDto>(
    `${DIVISIONS_BASE_PATH}/create`,
    payload,
  );
}

export async function updateDivision(
  divisionId: number,
  payload: UpdateDivisionRequestDto,
): Promise<void> {
  await httpClient.put<unknown, UpdateDivisionRequestDto>(
    `${DIVISIONS_BASE_PATH}/${divisionId}`,
    payload,
  );
}
