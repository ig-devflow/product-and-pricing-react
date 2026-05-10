import type { GetDivisionsParams } from '../api/divisions.api';

export const divisionQueryKeys = {
  all: ['divisions'] as const,
  lists: () => [...divisionQueryKeys.all, 'list'] as const,
  list: (params: GetDivisionsParams) =>
    [...divisionQueryKeys.lists(), params] as const,
  details: () => [...divisionQueryKeys.all, 'details'] as const,
  detail: (divisionId: number) =>
    [...divisionQueryKeys.details(), divisionId] as const,
};
