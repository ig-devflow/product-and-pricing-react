import { useQuery } from '@tanstack/react-query';
import { getAccommodationTypes } from '@/shared/api/reference-data/reference-data.api';
import { referenceDataQueryKeys, referenceDataStaleTime } from './reference-data-query-keys';

export const useAccommodationTypesQuery = () =>
  useQuery({
    queryKey: referenceDataQueryKeys.accommodationTypes(),
    queryFn: getAccommodationTypes,
    staleTime: referenceDataStaleTime,
  });
