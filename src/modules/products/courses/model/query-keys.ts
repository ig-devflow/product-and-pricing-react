export interface GetCoursesParams {
  search?: string;
  isActive?: boolean;
  page?: number;
  pageSize?: number;
}

export const courseQueryKeys = {
  all: ['products', 'courses'] as const,
  lists: () => [...courseQueryKeys.all, 'list'] as const,
  list: (divisionId: number, params: GetCoursesParams) =>
    [...courseQueryKeys.lists(), divisionId, params] as const,
  details: () => [...courseQueryKeys.all, 'details'] as const,
  detail: (id: number) => [...courseQueryKeys.details(), id] as const,
};
