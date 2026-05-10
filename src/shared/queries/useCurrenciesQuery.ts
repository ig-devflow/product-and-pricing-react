import { useQuery } from '@tanstack/react-query';
import { getCurrencies } from '@/shared/api/reference-data/reference-data.api';
import {
  referenceDataQueryKeys,
  referenceDataStaleTime,
} from './reference-data-query-keys';

export const useCurrenciesQuery = () =>
  useQuery({
    queryKey: referenceDataQueryKeys.currencies(),
    queryFn: getCurrencies,
    staleTime: referenceDataStaleTime,
  });
