import { useQuery } from '@tanstack/react-query';
import { getAccountCategoryById } from '@/modules/account-categories/api/account-categories.api';
import { accountCategoryQueryKeys } from '@/modules/account-categories/model/query-keys';

export const useAccountCategoryDetailsQuery = (id: number) =>
  useQuery({
    queryKey: accountCategoryQueryKeys.detail(id),
    queryFn: () => getAccountCategoryById(id),
    enabled: id > 0,
  });
