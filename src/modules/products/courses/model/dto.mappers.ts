import type {
  CourseDetailsDto,
  CourseListItemDto,
  PagedResultDto,
} from '@/modules/products/courses/api/dto';
import { buildProductAuditFields, toTrimmedString } from '@/modules/products/shared/model/formatters';
import type { CourseDetails, CourseListItem, CourseListPage } from './types';

export function mapCourseListItemDto(dto: CourseListItemDto): CourseListItem {
  return {
    id: dto.id,
    name: dto.name ?? '',
    divisionName: dto.divisionName ?? '',
    isActive: dto.isActive,
    courseLanguageId: dto.courseLanguageId,
    courseIntensityId: dto.courseIntensityId,
    ...buildProductAuditFields({ ...dto, version: '' }),
  };
}

export function mapCourseListPageDto(dto: PagedResultDto<CourseListItemDto>): CourseListPage {
  return {
    items: dto.items.map(mapCourseListItemDto),
    totalCount: dto.totalCount,
    page: dto.page,
    pageSize: dto.pageSize,
  };
}

export function mapCourseDetailsDto(dto: CourseDetailsDto): CourseDetails {
  return {
    id: dto.id,
    divisionId: dto.divisionId,
    unitTypeId: dto.unitTypeId,
    courseLanguageId: dto.courseLanguageId,
    courseIntensityId: dto.courseIntensityId,
    name: dto.name ?? '',
    isActive: dto.isActive,
    ageFrom: dto.ageFrom,
    ageTo: dto.ageTo,
    minimumWeeks: dto.minimumWeeks,
    accountCategoryId: dto.accountCategoryId,
    productCategoryId: dto.productCategoryId,
    generalLedgerCode: toTrimmedString(dto.generalLedgerCode),
    costCentreCode: toTrimmedString(dto.costCentreCode),
    closurePolicy: toTrimmedString(dto.closurePolicy),
    ...buildProductAuditFields(dto),
  };
}
