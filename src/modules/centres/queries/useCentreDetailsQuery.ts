import { useQuery } from '@tanstack/react-query';
import { getCentreById } from '@/modules/centres/api/centres.api';
import { mapCentreDetailsFromDto } from '@/modules/centres/model/dto.mappers';
import { centreQueryKeys } from '@/modules/centres/model/query-keys';

export const useCentreDetailsQuery = (centreId: number | null) =>
  useQuery({
    queryKey: centreQueryKeys.detail(centreId ?? 0),
    queryFn: async () => {
      if (!centreId) {
        throw new Error('Centre ID is required');
      }
      const response = await getCentreById(centreId);
      return mapCentreDetailsFromDto(response);
    },
    enabled: Boolean(centreId),
  });
