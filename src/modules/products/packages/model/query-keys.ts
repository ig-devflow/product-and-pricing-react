export interface GetPackagesParams {
  search?: string;
  isActive?: boolean;
  page?: number;
  pageSize?: number;
}

export const packageQueryKeys = {
  all: ['products', 'packages'] as const,
  lists: () => [...packageQueryKeys.all, 'list'] as const,
  list: (divisionId: number, params: GetPackagesParams) =>
    [...packageQueryKeys.lists(), divisionId, params] as const,
  details: () => [...packageQueryKeys.all, 'details'] as const,
  detail: (id: number) => [...packageQueryKeys.details(), id] as const,
};
