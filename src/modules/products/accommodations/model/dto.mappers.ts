import type {
  AccommodationDetailsDto,
  AccommodationListItemDto,
  PagedResultDto,
} from '@/modules/products/accommodations/api/dto';
import { buildProductAuditFields } from '@/modules/products/shared/model/formatters';
import type { AccommodationDetails, AccommodationListItem, AccommodationListPage } from './types';

export function mapAccommodationListItemDto(dto: AccommodationListItemDto): AccommodationListItem {
  return {
    id: dto.id,
    name: dto.name ?? '',
    accommodationTypeName: dto.accommodationTypeName ?? '',
    isActive: dto.isActive,
    ...buildProductAuditFields({ ...dto, version: '' }),
  };
}

export function mapAccommodationListPageDto(
  dto: PagedResultDto<AccommodationListItemDto>,
): AccommodationListPage {
  return {
    items: dto.items.map(mapAccommodationListItemDto),
    totalCount: dto.totalCount,
    page: dto.page,
    pageSize: dto.pageSize,
  };
}

export function mapAccommodationDetailsDto(dto: AccommodationDetailsDto): AccommodationDetails {
  return {
    id: dto.id,
    name: dto.name ?? '',
    accommodationTypeId: dto.accommodationTypeId,
    isActive: dto.isActive,
    minimumStayInWeeks: dto.minimumStayInWeeks,
    minimumAge: dto.minimumAge,
    maximumAge: dto.maximumAge,
    isCommitted: dto.isCommitted,
    isNonCommitted: dto.isNonCommitted,
    ...buildProductAuditFields(dto),
  };
}
