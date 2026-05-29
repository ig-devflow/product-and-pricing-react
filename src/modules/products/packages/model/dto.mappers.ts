import type {
  PackageDetailsDto,
  PackageListItemDto,
  PagedResultDto,
} from '@/modules/products/packages/api/dto';
import { buildProductAuditFields, toTrimmedString } from '@/modules/products/shared/model/formatters';
import type { PackageDetails, PackageListItem, PackageListPage } from './types';

export function mapPackageListItemDto(dto: PackageListItemDto): PackageListItem {
  return {
    id: dto.id,
    name: dto.name ?? '',
    divisionName: dto.divisionName ?? '',
    isActive: dto.isActive,
    description: toTrimmedString(dto.description),
    commission: dto.commission,
    ...buildProductAuditFields({ ...dto, version: '' }),
  };
}

export function mapPackageListPageDto(dto: PagedResultDto<PackageListItemDto>): PackageListPage {
  return {
    items: dto.items.map(mapPackageListItemDto),
    totalCount: dto.totalCount,
    page: dto.page,
    pageSize: dto.pageSize,
  };
}

export function mapPackageDetailsDto(dto: PackageDetailsDto): PackageDetails {
  return {
    id: dto.id,
    divisionId: dto.divisionId,
    unitTypeId: dto.unitTypeId,
    name: dto.name ?? '',
    isActive: dto.isActive,
    description: toTrimmedString(dto.description),
    commission: dto.commission,
    ageFrom: dto.ageFrom,
    ageTo: dto.ageTo,
    minimumWeeks: dto.minimumWeeks,
    accountCategoryId: dto.accountCategoryId,
    productCategoryId: dto.productCategoryId,
    generalLedgerCode: toTrimmedString(dto.generalLedgerCode),
    costCentreCode: toTrimmedString(dto.costCentreCode),
    closurePolicy: toTrimmedString(dto.closurePolicy),
    items: dto.items ?? [],
    ...buildProductAuditFields(dto),
  };
}
