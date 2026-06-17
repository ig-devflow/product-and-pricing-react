import { useQuery } from '@tanstack/react-query';
import { getAccountCategoriesByDivision } from '@/modules/account-categories/api/account-categories.api';
import { accountCategoryQueryKeys } from '@/modules/account-categories/model/query-keys';

export const useAccountCategoryListQuery = (divisionId: number) =>
  useQuery({
    queryKey: accountCategoryQueryKeys.list(divisionId),
    queryFn: () => getAccountCategoriesByDivision(divisionId),
    enabled: divisionId > 0,
  });
