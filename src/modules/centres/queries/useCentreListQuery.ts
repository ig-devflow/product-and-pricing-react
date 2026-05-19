import { useQuery } from '@tanstack/react-query';
import { getCentres, type GetCentresParams } from '@/modules/centres/api/centres.api';
import { mapCentreListPageFromDto } from '@/modules/centres/model/dto.mappers';
import { centreQueryKeys } from '@/modules/centres/model/query-keys';

export const useCentreListQuery = (params: GetCentresParams) =>
  useQuery({
    queryKey: centreQueryKeys.list(params),
    queryFn: async () => {
      const response = await getCentres(params);
      return mapCentreListPageFromDto(response);
    },
  });
