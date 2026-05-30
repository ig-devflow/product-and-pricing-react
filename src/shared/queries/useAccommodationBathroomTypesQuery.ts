import { useQuery } from '@tanstack/react-query';
import { getAccommodationBathroomTypes } from '@/shared/api/reference-data/reference-data.api';
import { referenceDataQueryKeys, referenceDataStaleTime } from './reference-data-query-keys';

export const useAccommodationBathroomTypesQuery = () =>
  useQuery({
    queryKey: referenceDataQueryKeys.accommodationBathroomTypes(),
    queryFn: getAccommodationBathroomTypes,
    staleTime: referenceDataStaleTime,
  });
