import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAccountCategory } from '@/modules/account-categories/api/account-categories.api';
import type { UpdateAccountCategoryRequestDto } from '@/modules/account-categories/api/dto';
import { accountCategoryQueryKeys } from '@/modules/account-categories/model/query-keys';
import { referenceDataQueryKeys } from '@/shared/queries/reference-data-query-keys';

export const useUpdateAccountCategoryMutation = (divisionId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateAccountCategoryRequestDto }) =>
      updateAccountCategory(id, payload),
    onSuccess: async (_data, { id }) => {
      await queryClient.invalidateQueries({ queryKey: accountCategoryQueryKeys.detail(id) });
      await queryClient.invalidateQueries({ queryKey: accountCategoryQueryKeys.lists() });
      await queryClient.invalidateQueries({
        queryKey: referenceDataQueryKeys.accountCategories(divisionId),
      });
    },
  });
};
