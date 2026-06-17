import type { AuditFields } from '@/modules/products/shared/model/audit';
import type { PackageItemDto } from '@/modules/products/packages/api/dto';

export type { PackageItemDto };

export interface PackageListItem extends AuditFields {
  id: number;
  name: string;
  divisionName: string;
  isActive: boolean;
  description: string | null;
  commission: number;
}

export interface PackageListPage {
  items: PackageListItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface PackageDetails extends AuditFields {
  id: number;
  divisionId: number;
  unitTypeId: number;
  name: string;
  isActive: boolean;
  description: string | null;
  commission: number;
  ageFrom: number | null;
  ageTo: number | null;
  minimumWeeks: number | null;
  accountCategoryId: number;
  productCategoryId: number;
  generalLedgerCode: string | null;
  costCentreCode: string | null;
  closurePolicy: string | null;
  items: PackageItemDto[];
}
