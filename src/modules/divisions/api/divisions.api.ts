import { httpClient } from '@/shared/api/http/http-client';
import type { DivisionDetailsDto, DivisionSummaryDto, DivisionUpsertDto } from './dto';

const DIVISIONS_BASE = '/api/divisions';

export const divisionsApi = {
  getList: () => httpClient.get<DivisionSummaryDto[]>(DIVISIONS_BASE),

  getById: (divisionId: number) =>
    httpClient.get<DivisionDetailsDto>(`${DIVISIONS_BASE}/${divisionId}`),

  create: (payload: DivisionUpsertDto) =>
    httpClient.put<DivisionUpsertDto, Record<string, never>>(`${DIVISIONS_BASE}/create`, payload),

  update: (divisionId: number, payload: DivisionUpsertDto) =>
    httpClient.put<DivisionUpsertDto, Record<string, never>>(
      `${DIVISIONS_BASE}/${divisionId}`,
      payload,
    ),
};
