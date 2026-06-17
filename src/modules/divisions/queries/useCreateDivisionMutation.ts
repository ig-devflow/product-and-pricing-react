import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDivision } from '@/modules/divisions/api/divisions.api';
import type { CreateDivisionRequestDto } from '@/modules/divisions/api/dto';
import { divisionQueryKeys } from '@/modules/divisions/model/query-keys';

export const useCreateDivisionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateDivisionRequestDto) => createDivision(payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: divisionQueryKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: divisionQueryKeys.options() }),
      ]);
    },
  });
};
