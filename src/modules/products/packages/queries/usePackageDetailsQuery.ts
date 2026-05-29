import { useQuery } from '@tanstack/react-query';
import { getPackageById } from '@/modules/products/packages/api/packages.api';
import { mapPackageDetailsDto } from '@/modules/products/packages/model/mappers';
import { packageQueryKeys } from '@/modules/products/packages/model/query-keys';

export const usePackageDetailsQuery = (id: number | null) =>
  useQuery({
    queryKey: packageQueryKeys.detail(id ?? 0),
    queryFn: async () => {
      if (!id) throw new Error('Package ID is required');
      return mapPackageDetailsDto(await getPackageById(id));
    },
    enabled: Boolean(id),
  });
