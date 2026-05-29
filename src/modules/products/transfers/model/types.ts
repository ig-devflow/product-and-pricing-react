import type { AuditFields } from '@/modules/products/shared/model/audit';

export interface TransferListItem extends AuditFields {
  id: number;
  name: string;
  divisionName: string;
  isActive: boolean;
  transferTypeId: number;
  transferPortId: number;
}

export interface TransferListPage {
  items: TransferListItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface TransferDetails extends AuditFields {
  id: number;
  divisionId: number;
  unitTypeId: number;
  transferTypeId: number;
  transferPortId: number;
  timeFrom: string;
  timeTo: string;
  name: string;
  isActive: boolean;
  accountCategoryId: number;
  productCategoryId: number;
  generalLedgerCode: string;
  costCentreCode: string;
  closurePolicy: string;
}
