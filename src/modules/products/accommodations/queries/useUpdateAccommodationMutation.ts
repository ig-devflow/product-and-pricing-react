import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAccommodation } from '@/modules/products/accommodations/api/accommodations.api';
import type { UpdateAccommodationRequestDto } from '@/modules/products/accommodations/api/dto';
import { accommodationQueryKeys } from '@/modules/products/accommodations/model/query-keys';

export const useUpdateAccommodationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateAccommodationRequestDto }) =>
      updateAccommodation(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: accommodationQueryKeys.all });
    },
  });
};
