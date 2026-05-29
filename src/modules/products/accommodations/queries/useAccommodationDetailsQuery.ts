import { useQuery } from '@tanstack/react-query';
import { getAccommodationById } from '@/modules/products/accommodations/api/accommodations.api';
import { mapAccommodationDetailsDto } from '@/modules/products/accommodations/model/mappers';
import { accommodationQueryKeys } from '@/modules/products/accommodations/model/query-keys';

export const useAccommodationDetailsQuery = (id: number | null) =>
  useQuery({
    queryKey: accommodationQueryKeys.detail(id ?? 0),
    queryFn: async () => {
      if (!id) throw new Error('Accommodation ID is required');
      return mapAccommodationDetailsDto(await getAccommodationById(id));
    },
    enabled: Boolean(id),
  });
