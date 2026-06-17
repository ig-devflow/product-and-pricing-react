import { useQuery } from '@tanstack/react-query';
import { getTransferPorts } from '@/shared/api/reference-data/reference-data.api';
import { referenceDataQueryKeys, referenceDataStaleTime } from './reference-data-query-keys';

export const useTransferPortsQuery = () =>
  useQuery({
    queryKey: referenceDataQueryKeys.transferPorts(),
    queryFn: getTransferPorts,
    staleTime: referenceDataStaleTime,
  });
