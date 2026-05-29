import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPackage } from '@/modules/products/packages/api/packages.api';
import type { CreatePackageRequestDto } from '@/modules/products/packages/api/dto';
import { packageQueryKeys } from '@/modules/products/packages/model/query-keys';

export const useCreatePackageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      divisionId,
      payload,
    }: {
      divisionId: number;
      payload: CreatePackageRequestDto;
    }) => createPackage(divisionId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: packageQueryKeys.lists() });
    },
  });
};
