import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAddOn } from '@/modules/products/addons/api/addons.api';
import type { CreateAddOnRequestDto } from '@/modules/products/addons/api/dto';
import { addonQueryKeys } from '@/modules/products/addons/model/query-keys';

export const useCreateAddOnMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      divisionId,
      payload,
    }: {
      divisionId: number;
      payload: CreateAddOnRequestDto;
    }) => createAddOn(divisionId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: addonQueryKeys.lists() });
    },
  });
};
