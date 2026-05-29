import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTransfer } from '@/modules/products/transfers/api/transfers.api';
import type { CreateTransferRequestDto } from '@/modules/products/transfers/api/dto';
import { transferQueryKeys } from '@/modules/products/transfers/model/query-keys';

export const useCreateTransferMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      divisionId,
      payload,
    }: {
      divisionId: number;
      payload: CreateTransferRequestDto;
    }) => createTransfer(divisionId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: transferQueryKeys.lists() });
    },
  });
};
