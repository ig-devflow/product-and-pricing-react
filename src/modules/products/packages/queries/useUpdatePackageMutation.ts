import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePackage } from '@/modules/products/packages/api/packages.api';
import type { UpdatePackageRequestDto } from '@/modules/products/packages/api/dto';
import { packageQueryKeys } from '@/modules/products/packages/model/query-keys';

export const useUpdatePackageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdatePackageRequestDto }) =>
      updatePackage(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: packageQueryKeys.all });
    },
  });
};
