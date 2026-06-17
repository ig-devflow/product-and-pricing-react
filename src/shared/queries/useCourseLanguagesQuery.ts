import { useQuery } from '@tanstack/react-query';
import { getCourseLanguages } from '@/shared/api/reference-data/reference-data.api';
import { referenceDataQueryKeys, referenceDataStaleTime } from './reference-data-query-keys';

export const useCourseLanguagesQuery = () =>
  useQuery({
    queryKey: referenceDataQueryKeys.courseLanguages(),
    queryFn: getCourseLanguages,
    staleTime: referenceDataStaleTime,
  });
