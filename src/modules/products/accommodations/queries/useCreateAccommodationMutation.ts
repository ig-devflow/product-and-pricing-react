import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAccommodation } from '@/modules/products/accommodations/api/accommodations.api';
import type { CreateAccommodationRequestDto } from '@/modules/products/accommodations/api/dto';
import { accommodationQueryKeys } from '@/modules/products/accommodations/model/query-keys';

export const useCreateAccommodationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateAccommodationRequestDto) => createAccommodation(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: accommodationQueryKeys.lists() });
    },
  });
};
