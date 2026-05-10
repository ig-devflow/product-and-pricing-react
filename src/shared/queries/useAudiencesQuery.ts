import { useQuery } from '@tanstack/react-query';
import { getAudiences } from '@/shared/api/reference-data/reference-data.api';
import {
  referenceDataQueryKeys,
  referenceDataStaleTime,
} from './reference-data-query-keys';

export const useAudiencesQuery = () =>
  useQuery({
    queryKey: referenceDataQueryKeys.audiences(),
    queryFn: getAudiences,
    staleTime: referenceDataStaleTime,
  });
