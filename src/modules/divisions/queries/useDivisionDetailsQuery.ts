import { useQuery } from '@tanstack/react-query';
import { divisionsApi } from '@/modules/divisions/api/divisions.api';
import { mapDivisionDetailsDto } from '@/modules/divisions/model/mappers';
import { divisionQueryKeys } from './division-query-keys';

export const useDivisionDetailsQuery = (divisionId: number | null) =>
  useQuery({
    queryKey: divisionId ? divisionQueryKeys.details(divisionId) : ['divisions', 'details', 'empty'],
    queryFn: async () => {
      if (!divisionId) {
        throw new Error('Division ID is required');
      }

      const response = await divisionsApi.getById(divisionId);
      return mapDivisionDetailsDto(response);
    },
    enabled: divisionId !== null,
  });
