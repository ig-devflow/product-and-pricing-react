import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCentre } from '@/modules/centres/api/centres.api';
import type { UpdateCentreRequestDto } from '@/modules/centres/api/dto';
import { centreQueryKeys } from '@/modules/centres/model/query-keys';

interface UpdateCentreMutationVariables {
  centreId: number;
  payload: UpdateCentreRequestDto;
}

export const useUpdateCentreMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ centreId, payload }: UpdateCentreMutationVariables) => {
      await updateCentre(centreId, payload);
      return { centreId, payload };
    },
    onSuccess: async ({ centreId }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: centreQueryKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: centreQueryKeys.detail(centreId) }),
      ]);
    },
  });
};
