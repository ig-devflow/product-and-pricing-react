export const divisionQueryKeys = {
  all: ['divisions'] as const,
  lists: () => [...divisionQueryKeys.all, 'list'] as const,
  list: () => [...divisionQueryKeys.lists()] as const,
  details: () => [...divisionQueryKeys.all, 'details'] as const,
  detail: (divisionId: number) =>
    [...divisionQueryKeys.details(), divisionId] as const,
};
