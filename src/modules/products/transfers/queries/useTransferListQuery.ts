import { useQuery } from '@tanstack/react-query';
import { getTransfers } from '@/modules/products/transfers/api/transfers.api';
import { mapTransferListPageDto } from '@/modules/products/transfers/model/mappers';
import { transferQueryKeys, type GetTransfersParams } from '@/modules/products/transfers/model/query-keys';

export const useTransferListQuery = (divisionId: number, params: GetTransfersParams = {}) =>
  useQuery({
    queryKey: transferQueryKeys.list(divisionId, params),
    queryFn: async () => mapTransferListPageDto(await getTransfers(divisionId, params)),
    enabled: Boolean(divisionId),
  });
