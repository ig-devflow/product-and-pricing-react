export const accountCategoryQueryKeys = {
  all: ['account-categories'] as const,
  lists: () => [...accountCategoryQueryKeys.all, 'list'] as const,
  list: (divisionId: number) => [...accountCategoryQueryKeys.lists(), divisionId] as const,
  details: () => [...accountCategoryQueryKeys.all, 'details'] as const,
  detail: (id: number) => [...accountCategoryQueryKeys.details(), id] as const,
};
