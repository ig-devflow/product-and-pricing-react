export interface GetTransfersParams {
  search?: string;
  isActive?: boolean;
  page?: number;
  pageSize?: number;
}

export const transferQueryKeys = {
  all: ['products', 'transfers'] as const,
  lists: () => [...transferQueryKeys.all, 'list'] as const,
  list: (divisionId: number, params: GetTransfersParams) =>
    [...transferQueryKeys.lists(), divisionId, params] as const,
  details: () => [...transferQueryKeys.all, 'details'] as const,
  detail: (id: number) => [...transferQueryKeys.details(), id] as const,
};
