import type {
  AddOnDetailsDto,
  AddOnListItemDto,
  PagedResultDto,
} from '@/modules/products/addons/api/dto';
import { buildProductAuditFields, toTrimmedString } from '@/modules/products/shared/model/formatters';
import type { AddOnDetails, AddOnListItem, AddOnListPage } from './types';

export function mapAddOnListItemDto(dto: AddOnListItemDto): AddOnListItem {
  return {
    id: dto.id,
    name: dto.name ?? '',
    divisionName: dto.divisionName ?? '',
    isActive: dto.isActive,
    addOnType: dto.addOnType,
    ...buildProductAuditFields({ ...dto, version: '' }),
  };
}

export function mapAddOnListPageDto(dto: PagedResultDto<AddOnListItemDto>): AddOnListPage {
  return {
    items: dto.items.map(mapAddOnListItemDto),
    totalCount: dto.totalCount,
    page: dto.page,
    pageSize: dto.pageSize,
  };
}

export function mapAddOnDetailsDto(dto: AddOnDetailsDto): AddOnDetails {
  return {
    id: dto.id,
    divisionId: dto.divisionId,
    unitTypeId: dto.unitTypeId,
    addOnType: dto.addOnType,
    name: dto.name ?? '',
    isActive: dto.isActive,
    ageFrom: dto.ageFrom,
    ageTo: dto.ageTo,
    oneToOneLessonsPerWeek: dto.oneToOneLessonsPerWeek,
    accountCategoryId: dto.accountCategoryId,
    productCategoryId: dto.productCategoryId,
    generalLedgerCode: toTrimmedString(dto.generalLedgerCode),
    costCentreCode: toTrimmedString(dto.costCentreCode),
    closurePolicy: toTrimmedString(dto.closurePolicy),
    ...buildProductAuditFields(dto),
  };
}
