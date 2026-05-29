export interface PagedResultDto<TItem> {
  items: TItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface TransferListItemDto {
  id: number;
  divisionName: string;
  name: string;
  isActive: boolean;
  transferTypeId: number;
  transferPortId: number;
  createdAt: string;
  createdByName: string;
  updatedAt: string;
  updatedByName: string;
}

export interface TransferDetailsDto {
  id: number;
  divisionId: number;
  unitTypeId: number;
  transferTypeId: number;
  transferPortId: number;
  timeFrom: string | null;
  timeTo: string | null;
  name: string;
  isActive: boolean;
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

export interface CreateTransferRequestDto {
  name: string;
  unitTypeId: number;
  transferTypeId: number;
  transferPortId: number;
  timeFrom: string | null;
  timeTo: string | null;
  isActive: boolean;
  accountCategoryId: number;
  productCategoryId: number;
  generalLedgerCode: string | null;
  costCentreCode: string | null;
  closurePolicy: string | null;
}

export interface CreateTransferResponseDto {
  id: number;
}

export interface UpdateTransferRequestDto extends CreateTransferRequestDto {
  version: string;
}
