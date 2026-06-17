export const productCategoryQueryKeys = {
  all: ['product-categories'] as const,
  lists: () => [...productCategoryQueryKeys.all, 'list'] as const,
  list: (divisionId: number) => [...productCategoryQueryKeys.lists(), divisionId] as const,
  details: () => [...productCategoryQueryKeys.all, 'details'] as const,
  detail: (id: number) => [...productCategoryQueryKeys.details(), id] as const,
};
