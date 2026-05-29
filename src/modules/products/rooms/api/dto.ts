export interface PagedResultDto<TItem> {
  items: TItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface RoomDetailsRequestDto {
  roomTypeId: number;
  boardTypeId: number;
  bathroomTypeId: number;
  roomGradeId: number;
}

export interface RoomListItemDto {
  id: number;
  accommodationName: string;
  divisionName: string;
  name: string;
  isActive: boolean;
  occupyRoom: boolean;
  createdAt: string;
  createdByName: string;
  updatedAt: string;
  updatedByName: string;
}

export interface RoomDetailsDto {
  id: number;
  accommodationId: number;
  divisionId: number;
  unitTypeId: number;
  name: string;
  isActive: boolean;
  occupyRoom: boolean;
  roomDetails: RoomDetailsRequestDto;
  accountCategoryId: number;
  productCategoryId: number;
  generalLedgerCode: string | null;
  costCentreCode: string | null;
  closurePolicy: string | null;
  version: string;
  createdAt: string;
  createdByName: string;
  updatedAt: string;
  updatedByName: string;
}

export interface CreateRoomRequestDto {
  name: string;
  unitTypeId: number;
  isActive: boolean;
  occupyRoom: boolean;
  roomDetails: RoomDetailsRequestDto;
  accountCategoryId: number;
  productCategoryId: number;
  generalLedgerCode: string | null;
  costCentreCode: string | null;
  closurePolicy: string | null;
}

export interface CreateRoomResponseDto {
  id: number;
}

export interface UpdateRoomRequestDto extends CreateRoomRequestDto {
  version: string;
}
