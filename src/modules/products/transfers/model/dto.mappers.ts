import type {
  TransferDetailsDto,
  TransferListItemDto,
  PagedResultDto,
} from '@/modules/products/transfers/api/dto';
import { buildProductAuditFields } from '@/modules/products/shared/model/formatters';
import type { TransferDetails, TransferListItem, TransferListPage } from './types';

export function mapTransferListItemDto(dto: TransferListItemDto): TransferListItem {
  return {
    id: dto.id,
    name: dto.name ?? '',
    divisionName: dto.divisionName ?? '',
    isActive: dto.isActive,
    transferTypeId: dto.transferTypeId,
    transferPortId: dto.transferPortId,
    ...buildProductAuditFields({ ...dto, version: '' }),
  };
}

export function mapTransferListPageDto(dto: PagedResultDto<TransferListItemDto>): TransferListPage {
  return {
    items: dto.items.map(mapTransferListItemDto),
    totalCount: dto.totalCount,
    page: dto.page,
    pageSize: dto.pageSize,
  };
}

export function mapTransferDetailsDto(dto: TransferDetailsDto): TransferDetails {
  return {
    id: dto.id,
    divisionId: dto.divisionId,
    unitTypeId: dto.unitTypeId,
    transferTypeId: dto.transferTypeId,
    transferPortId: dto.transferPortId,
    timeFrom: dto.timeFrom ?? null,
    timeTo: dto.timeTo ?? null,
    name: dto.name ?? '',
    isActive: dto.isActive,
    accountCategoryId: dto.accountCategoryId,
    productCategoryId: dto.productCategoryId,
    generalLedgerCode: dto.generalLedgerCode ?? null,
    costCentreCode: dto.costCentreCode ?? null,
    closurePolicy: dto.closurePolicy ?? null,
    ...buildProductAuditFields(dto),
  };
}
