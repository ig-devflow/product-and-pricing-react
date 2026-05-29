import { useQuery } from '@tanstack/react-query';
import { getCourseIntensities } from '@/shared/api/reference-data/reference-data.api';
import { referenceDataQueryKeys, referenceDataStaleTime } from './reference-data-query-keys';

export const useCourseIntensitiesQuery = () =>
  useQuery({
    queryKey: referenceDataQueryKeys.courseIntensities(),
    queryFn: getCourseIntensities,
    staleTime: referenceDataStaleTime,
  });
