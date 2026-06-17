import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAccountCategory } from '@/modules/account-categories/api/account-categories.api';
import type { CreateAccountCategoryRequestDto } from '@/modules/account-categories/api/dto';
import { accountCategoryQueryKeys } from '@/modules/account-categories/model/query-keys';
import { referenceDataQueryKeys } from '@/shared/queries/reference-data-query-keys';

export const useCreateAccountCategoryMutation = (divisionId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAccountCategoryRequestDto) =>
      createAccountCategory(divisionId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: accountCategoryQueryKeys.lists() });
      await queryClient.invalidateQueries({
        queryKey: referenceDataQueryKeys.accountCategories(divisionId),
      });
    },
  });
};
