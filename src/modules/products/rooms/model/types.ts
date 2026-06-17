import type { AuditFields } from '@/modules/products/shared/model/audit';

export interface RoomDetails_ {
  roomTypeId: number;
  boardTypeId: number;
  bathroomTypeId: number;
  roomGradeId: number;
}

export interface RoomListItem extends AuditFields {
  id: number;
  name: string;
  accommodationName: string;
  divisionName: string;
  isActive: boolean;
  occupyRoom: boolean;
}

export interface RoomListPage {
  items: RoomListItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface RoomDetails extends AuditFields {
  id: number;
  accommodationId: number;
  divisionId: number;
  unitTypeId: number;
  name: string;
  isActive: boolean;
  occupyRoom: boolean;
  roomDetails: RoomDetails_;
  accountCategoryId: number;
  productCategoryId: number;
  generalLedgerCode: string | null;
  costCentreCode: string | null;
  closurePolicy: string | null;
}
