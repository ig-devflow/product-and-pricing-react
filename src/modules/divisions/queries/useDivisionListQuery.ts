import { useQuery } from '@tanstack/react-query';
import { divisionsApi } from '@/modules/divisions/api/divisions.api';
import { mapDivisionSummaryDto } from '@/modules/divisions/model/mappers';
import { divisionQueryKeys } from './division-query-keys';

export const useDivisionListQuery = () =>
  useQuery({
    queryKey: divisionQueryKeys.list(),
    queryFn: async () => {
      const response = await divisionsApi.getList();
      return response.map(mapDivisionSummaryDto);
    },
  });
