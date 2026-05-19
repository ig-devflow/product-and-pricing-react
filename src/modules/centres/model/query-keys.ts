import type { GetCentresParams } from '../api/centres.api';

export const centreQueryKeys = {
  all: ['centres'] as const,
  lists: () => [...centreQueryKeys.all, 'list'] as const,
  list: (params: GetCentresParams) => [...centreQueryKeys.lists(), params] as const,
  details: () => [...centreQueryKeys.all, 'details'] as const,
  detail: (centreId: number) => [...centreQueryKeys.details(), centreId] as const,
};
