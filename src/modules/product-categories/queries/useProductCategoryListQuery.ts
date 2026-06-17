import { useQuery } from '@tanstack/react-query';
import { getProductCategoriesByDivision } from '@/modules/product-categories/api/product-categories.api';
import { productCategoryQueryKeys } from '@/modules/product-categories/model/query-keys';

export const useProductCategoryListQuery = (divisionId: number) =>
  useQuery({
    queryKey: productCategoryQueryKeys.list(divisionId),
    queryFn: () => getProductCategoriesByDivision(divisionId),
    enabled: divisionId > 0,
  });
