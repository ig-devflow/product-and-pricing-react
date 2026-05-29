import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTransfer } from '@/modules/products/transfers/api/transfers.api';
import type { UpdateTransferRequestDto } from '@/modules/products/transfers/api/dto';
import { transferQueryKeys } from '@/modules/products/transfers/model/query-keys';

export const useUpdateTransferMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateTransferRequestDto }) =>
      updateTransfer(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: transferQueryKeys.all });
    },
  });
};
