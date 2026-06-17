import { useQuery } from '@tanstack/react-query';
import { getAccountCategories } from '@/shared/api/reference-data/reference-data.api';
import { referenceDataQueryKeys, referenceDataStaleTime } from './reference-data-query-keys';

export const useAccountCategoriesQuery = (divisionId: number) =>
  useQuery({
    queryKey: referenceDataQueryKeys.accountCategories(divisionId),
    queryFn: () => getAccountCategories(divisionId),
    staleTime: referenceDataStaleTime,
    enabled: Boolean(divisionId),
  });
