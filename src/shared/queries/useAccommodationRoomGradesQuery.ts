import { useQuery } from '@tanstack/react-query';
import { getAccommodationRoomGrades } from '@/shared/api/reference-data/reference-data.api';
import { referenceDataQueryKeys, referenceDataStaleTime } from './reference-data-query-keys';

export const useAccommodationRoomGradesQuery = () =>
  useQuery({
    queryKey: referenceDataQueryKeys.accommodationRoomGrades(),
    queryFn: getAccommodationRoomGrades,
    staleTime: referenceDataStaleTime,
  });
