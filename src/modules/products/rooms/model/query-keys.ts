export interface GetRoomsParams {
  search?: string;
  isActive?: boolean;
  page?: number;
  pageSize?: number;
}

export const roomQueryKeys = {
  all: ['products', 'rooms'] as const,
  lists: () => [...roomQueryKeys.all, 'list'] as const,
  list: (divisionId: number, accommodationId: number, params: GetRoomsParams) =>
    [...roomQueryKeys.lists(), divisionId, accommodationId, params] as const,
  details: () => [...roomQueryKeys.all, 'details'] as const,
  detail: (id: number) => [...roomQueryKeys.details(), id] as const,
};
