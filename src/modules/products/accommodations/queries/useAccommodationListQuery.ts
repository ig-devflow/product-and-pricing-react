import { useQuery } from '@tanstack/react-query';
import { getAccommodations } from '@/modules/products/accommodations/api/accommodations.api';
import { mapAccommodationListPageDto } from '@/modules/products/accommodations/model/mappers';
import { accommodationQueryKeys, type GetAccommodationsParams } from '@/modules/products/accommodations/model/query-keys';

export const useAccommodationListQuery = (params: GetAccommodationsParams) =>
  useQuery({
    queryKey: accommodationQueryKeys.list(params),
    queryFn: async () => mapAccommodationListPageDto(await getAccommodations(params)),
  });
