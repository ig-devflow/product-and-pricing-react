import { useQuery } from '@tanstack/react-query';
import { getDivisions } from '@/modules/divisions/api/divisions.api';
import { mapDivisionSummaryDto } from '@/modules/divisions/model/mappers';
import { divisionQueryKeys } from '@/modules/divisions/model/query-keys';

export const useDivisionListQuery = () =>
  useQuery({
    queryKey: divisionQueryKeys.list(),
    queryFn: async () => {
      const response = await getDivisions();
      return response.map(mapDivisionSummaryDto);
    },
  });
