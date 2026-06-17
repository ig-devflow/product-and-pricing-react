import { useQuery } from '@tanstack/react-query';
import { getAccommodationBoardTypes } from '@/shared/api/reference-data/reference-data.api';
import { referenceDataQueryKeys, referenceDataStaleTime } from './reference-data-query-keys';

export const useAccommodationBoardTypesQuery = () =>
  useQuery({
    queryKey: referenceDataQueryKeys.accommodationBoardTypes(),
    queryFn: getAccommodationBoardTypes,
    staleTime: referenceDataStaleTime,
  });
