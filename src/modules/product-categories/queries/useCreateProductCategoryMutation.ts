import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProductCategory } from '@/modules/product-categories/api/product-categories.api';
import type { CreateProductCategoryRequestDto } from '@/modules/product-categories/api/dto';
import { productCategoryQueryKeys } from '@/modules/product-categories/model/query-keys';
import { referenceDataQueryKeys } from '@/shared/queries/reference-data-query-keys';

export const useCreateProductCategoryMutation = (divisionId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProductCategoryRequestDto) =>
      createProductCategory(divisionId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: productCategoryQueryKeys.lists() });
      await queryClient.invalidateQueries({
        queryKey: referenceDataQueryKeys.productCategories(divisionId),
      });
    },
  });
};
