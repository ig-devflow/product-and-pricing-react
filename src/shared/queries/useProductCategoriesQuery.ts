import { useQuery } from '@tanstack/react-query';
import { getProductCategories } from '@/shared/api/reference-data/reference-data.api';
import { referenceDataQueryKeys, referenceDataStaleTime } from './reference-data-query-keys';

export const useProductCategoriesQuery = (divisionId: number) =>
  useQuery({
    queryKey: referenceDataQueryKeys.productCategories(divisionId),
    queryFn: () => getProductCategories(divisionId),
    staleTime: referenceDataStaleTime,
    enabled: Boolean(divisionId),
  });
