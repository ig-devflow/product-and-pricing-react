import { useQuery } from '@tanstack/react-query';
import { getAddOns } from '@/modules/products/addons/api/addons.api';
import { mapAddOnListPageDto } from '@/modules/products/addons/model/mappers';
import { addonQueryKeys, type GetAddOnsParams } from '@/modules/products/addons/model/query-keys';

export const useAddOnListQuery = (divisionId: number, params: GetAddOnsParams = {}) =>
  useQuery({
    queryKey: addonQueryKeys.list(divisionId, params),
    queryFn: async () => mapAddOnListPageDto(await getAddOns(divisionId, params)),
    enabled: Boolean(divisionId),
  });
