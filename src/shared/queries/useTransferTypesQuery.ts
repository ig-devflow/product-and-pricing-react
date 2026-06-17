import { useQuery } from '@tanstack/react-query';
import { getTransferTypes } from '@/shared/api/reference-data/reference-data.api';
import { referenceDataQueryKeys, referenceDataStaleTime } from './reference-data-query-keys';

export const useTransferTypesQuery = () =>
  useQuery({
    queryKey: referenceDataQueryKeys.transferTypes(),
    queryFn: getTransferTypes,
    staleTime: referenceDataStaleTime,
  });
