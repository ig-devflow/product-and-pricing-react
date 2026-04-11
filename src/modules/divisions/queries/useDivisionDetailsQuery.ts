import { useQuery } from '@tanstack/react-query';
import { getDivisionById } from '@/modules/divisions/api/divisions.api';
import { mapDivisionDetailsDto } from '@/modules/divisions/model/mappers';
import { divisionQueryKeys } from '@/modules/divisions/model/query-keys';

export const useDivisionDetailsQuery = (divisionId: number | null) =>
  useQuery({
    queryKey: divisionQueryKeys.detail(divisionId ?? 0),
    queryFn: async () => {
      if (!divisionId) {
        throw new Error('Division ID is required');
      }

      const response = await getDivisionById(divisionId);
      return mapDivisionDetailsDto(response);
    },
    enabled: Boolean(divisionId),
  });
