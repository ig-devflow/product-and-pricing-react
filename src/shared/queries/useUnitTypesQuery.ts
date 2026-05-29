import { useQuery } from '@tanstack/react-query';
import { getUnitTypes } from '@/shared/api/reference-data/reference-data.api';
import { referenceDataQueryKeys, referenceDataStaleTime } from './reference-data-query-keys';

export const useUnitTypesQuery = () =>
  useQuery({
    queryKey: referenceDataQueryKeys.unitTypes(),
    queryFn: getUnitTypes,
    staleTime: referenceDataStaleTime,
  });
