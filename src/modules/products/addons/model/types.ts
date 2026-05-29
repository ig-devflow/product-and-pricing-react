import type { AuditFields } from '@/modules/products/shared/model/audit';
import type { AddOnType } from '@/modules/products/addons/api/dto';

export interface AddOnListItem extends AuditFields {
  id: number;
  name: string;
  divisionName: string;
  isActive: boolean;
  addOnType: AddOnType;
}

export interface AddOnListPage {
  items: AddOnListItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface AddOnDetails extends AuditFields {
  id: number;
  divisionId: number;
  unitTypeId: number;
  addOnType: AddOnType;
  name: string;
  isActive: boolean;
  ageFrom: number | null;
  ageTo: number | null;
  oneToOneLessonsPerWeek: number | null;
  accountCategoryId: number;
  productCategoryId: number;
  generalLedgerCode: string;
  costCentreCode: string;
  closurePolicy: string;
}
