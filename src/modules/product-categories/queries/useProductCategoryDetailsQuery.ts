import { useQuery } from '@tanstack/react-query';
import { getProductCategoryById } from '@/modules/product-categories/api/product-categories.api';
import { productCategoryQueryKeys } from '@/modules/product-categories/model/query-keys';

export const useProductCategoryDetailsQuery = (id: number) =>
  useQuery({
    queryKey: productCategoryQueryKeys.detail(id),
    queryFn: () => getProductCategoryById(id),
    enabled: id > 0,
  });
