export interface GetAddOnsParams {
  search?: string;
  isActive?: boolean;
  page?: number;
  pageSize?: number;
}

export const addonQueryKeys = {
  all: ['products', 'addons'] as const,
  lists: () => [...addonQueryKeys.all, 'list'] as const,
  list: (divisionId: number, params: GetAddOnsParams) =>
    [...addonQueryKeys.lists(), divisionId, params] as const,
  details: () => [...addonQueryKeys.all, 'details'] as const,
  detail: (id: number) => [...addonQueryKeys.details(), id] as const,
};
