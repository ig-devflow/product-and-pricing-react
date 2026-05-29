export interface GetAccommodationsParams {
  search?: string;
  isActive?: boolean;
  page?: number;
  pageSize?: number;
}

export const accommodationQueryKeys = {
  all: ['products', 'accommodations'] as const,
  lists: () => [...accommodationQueryKeys.all, 'list'] as const,
  list: (params: GetAccommodationsParams) => [...accommodationQueryKeys.lists(), params] as const,
  details: () => [...accommodationQueryKeys.all, 'details'] as const,
  detail: (id: number) => [...accommodationQueryKeys.details(), id] as const,
};
