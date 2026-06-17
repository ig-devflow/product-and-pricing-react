import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAddOn } from '@/modules/products/addons/api/addons.api';
import type { UpdateAddOnRequestDto } from '@/modules/products/addons/api/dto';
import { addonQueryKeys } from '@/modules/products/addons/model/query-keys';

export const useUpdateAddOnMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateAddOnRequestDto }) =>
      updateAddOn(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: addonQueryKeys.all });
    },
  });
};
