import { useQuery } from '@tanstack/react-query';
import { getAddOnById } from '@/modules/products/addons/api/addons.api';
import { mapAddOnDetailsDto } from '@/modules/products/addons/model/mappers';
import { addonQueryKeys } from '@/modules/products/addons/model/query-keys';

export const useAddOnDetailsQuery = (id: number | null) =>
  useQuery({
    queryKey: addonQueryKeys.detail(id ?? 0),
    queryFn: async () => {
      if (!id) throw new Error('Add-on ID is required');
      return mapAddOnDetailsDto(await getAddOnById(id));
    },
    enabled: Boolean(id),
  });
