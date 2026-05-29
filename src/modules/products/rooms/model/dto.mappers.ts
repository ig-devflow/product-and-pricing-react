import type {
  RoomDetailsDto,
  RoomListItemDto,
  PagedResultDto,
} from '@/modules/products/rooms/api/dto';
import { buildProductAuditFields, toTrimmedString } from '@/modules/products/shared/model/formatters';
import type { RoomDetails, RoomListItem, RoomListPage } from './types';

export function mapRoomListItemDto(dto: RoomListItemDto): RoomListItem {
  return {
    id: dto.id,
    name: dto.name ?? '',
    accommodationName: dto.accommodationName ?? '',
    divisionName: dto.divisionName ?? '',
    isActive: dto.isActive,
    occupyRoom: dto.occupyRoom,
    ...buildProductAuditFields({ ...dto, version: '' }),
  };
}

export function mapRoomListPageDto(dto: PagedResultDto<RoomListItemDto>): RoomListPage {
  return {
    items: dto.items.map(mapRoomListItemDto),
    totalCount: dto.totalCount,
    page: dto.page,
    pageSize: dto.pageSize,
  };
}

export function mapRoomDetailsDto(dto: RoomDetailsDto): RoomDetails {
  return {
    id: dto.id,
    accommodationId: dto.accommodationId,
    divisionId: dto.divisionId,
    unitTypeId: dto.unitTypeId,
    name: dto.name ?? '',
    isActive: dto.isActive,
    occupyRoom: dto.occupyRoom,
    roomDetails: {
      roomTypeId: dto.roomDetails.roomTypeId,
      boardTypeId: dto.roomDetails.boardTypeId,
      bathroomTypeId: dto.roomDetails.bathroomTypeId,
      roomGradeId: dto.roomDetails.roomGradeId,
    },
    accountCategoryId: dto.accountCategoryId,
    productCategoryId: dto.productCategoryId,
    generalLedgerCode: toTrimmedString(dto.generalLedgerCode),
    costCentreCode: toTrimmedString(dto.costCentreCode),
    closurePolicy: toTrimmedString(dto.closurePolicy),
    ...buildProductAuditFields(dto),
  };
}
