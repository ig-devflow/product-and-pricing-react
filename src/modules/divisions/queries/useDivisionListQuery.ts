import { useQuery } from '@tanstack/react-query';
import {
  getDivisions,
  type GetDivisionsParams,
} from '@/modules/divisions/api/divisions.api';
import { mapDivisionListPageDto } from '@/modules/divisions/model/mappers';
import { divisionQueryKeys } from '@/modules/divisions/model/query-keys';

export const useDivisionListQuery = (params: GetDivisionsParams) =>
  useQuery({
    queryKey: divisionQueryKeys.list(params),
    queryFn: async () => {
      const response = await getDivisions(params);
      return mapDivisionListPageDto(response);
    },
  });
