import { useQuery } from '@tanstack/react-query';
import { getTransferById } from '@/modules/products/transfers/api/transfers.api';
import { mapTransferDetailsDto } from '@/modules/products/transfers/model/mappers';
import { transferQueryKeys } from '@/modules/products/transfers/model/query-keys';

export const useTransferDetailsQuery = (id: number | null) =>
  useQuery({
    queryKey: transferQueryKeys.detail(id ?? 0),
    queryFn: async () => {
      if (!id) throw new Error('Transfer ID is required');
      return mapTransferDetailsDto(await getTransferById(id));
    },
    enabled: Boolean(id),
  });
