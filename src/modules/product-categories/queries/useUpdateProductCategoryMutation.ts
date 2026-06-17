import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProductCategory } from '@/modules/product-categories/api/product-categories.api';
import type { UpdateProductCategoryRequestDto } from '@/modules/product-categories/api/dto';
import { productCategoryQueryKeys } from '@/modules/product-categories/model/query-keys';
import { referenceDataQueryKeys } from '@/shared/queries/reference-data-query-keys';

export const useUpdateProductCategoryMutation = (divisionId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateProductCategoryRequestDto }) =>
      updateProductCategory(id, payload),
    onSuccess: async (_data, { id }) => {
      await queryClient.invalidateQueries({ queryKey: productCategoryQueryKeys.detail(id) });
      await queryClient.invalidateQueries({ queryKey: productCategoryQueryKeys.lists() });
      await queryClient.invalidateQueries({
        queryKey: referenceDataQueryKeys.productCategories(divisionId),
      });
    },
  });
};
