import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCentre } from '@/modules/centres/api/centres.api';
import type { CreateCentreRequestDto } from '@/modules/centres/api/dto';
import { centreQueryKeys } from '@/modules/centres/model/query-keys';

export const useCreateCentreMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCentreRequestDto) => createCentre(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: centreQueryKeys.lists() });
    },
  });
};
