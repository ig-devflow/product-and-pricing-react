import { useMutation, useQueryClient } from '@tanstack/react-query';
import { divisionsApi } from '@/modules/divisions/api/divisions.api';
import type { DivisionUpsertPayload } from '@/modules/divisions/model/division';
import { divisionQueryKeys } from './division-query-keys';

interface UpdateDivisionMutationVariables {
  divisionId: number;
  payload: DivisionUpsertPayload;
}

export const useUpdateDivisionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ divisionId, payload }: UpdateDivisionMutationVariables) => {
      await divisionsApi.update(divisionId, payload);
      return { divisionId, payload };
    },
    onSuccess: async ({ divisionId }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: divisionQueryKeys.list() }),
        queryClient.invalidateQueries({ queryKey: divisionQueryKeys.details(divisionId) }),
      ]);
    },
  });
};
