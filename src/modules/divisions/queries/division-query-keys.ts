export const divisionQueryKeys = {
  all: ['divisions'] as const,
  list: () => [...divisionQueryKeys.all, 'list'] as const,
  details: (divisionId: number) => [...divisionQueryKeys.all, 'details', divisionId] as const,
};
