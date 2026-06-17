import { useQuery } from '@tanstack/react-query';
import { getPackages } from '@/modules/products/packages/api/packages.api';
import { mapPackageListPageDto } from '@/modules/products/packages/model/mappers';
import { packageQueryKeys, type GetPackagesParams } from '@/modules/products/packages/model/query-keys';

export const usePackageListQuery = (divisionId: number, params: GetPackagesParams = {}) =>
  useQuery({
    queryKey: packageQueryKeys.list(divisionId, params),
    queryFn: async () => mapPackageListPageDto(await getPackages(divisionId, params)),
    enabled: Boolean(divisionId),
  });
