import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDivision } from '@/modules/divisions/api/divisions.api';
import type { UpdateDivisionRequestDto } from '@/modules/divisions/api/dto';
import { divisionQueryKeys } from '@/modules/divisions/model/query-keys';

interface UpdateDivisionMutationVariables {
  divisionId: number;
  payload: UpdateDivisionRequestDto;
}

export const useUpdateDivisionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ divisionId, payload }: UpdateDivisionMutationVariables) => {
      await updateDivision(divisionId, payload);
      return { divisionId, payload };
    },
    onSuccess: async ({ divisionId }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: divisionQueryKeys.lists() }),
        queryClient.invalidateQueries({
          queryKey: divisionQueryKeys.detail(divisionId),
        }),
      ]);
    },
  });
};
