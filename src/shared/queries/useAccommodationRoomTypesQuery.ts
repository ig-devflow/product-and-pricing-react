import { useQuery } from '@tanstack/react-query';
import { getAccommodationRoomTypes } from '@/shared/api/reference-data/reference-data.api';
import { referenceDataQueryKeys, referenceDataStaleTime } from './reference-data-query-keys';

export const useAccommodationRoomTypesQuery = () =>
  useQuery({
    queryKey: referenceDataQueryKeys.accommodationRoomTypes(),
    queryFn: getAccommodationRoomTypes,
    staleTime: referenceDataStaleTime,
  });
