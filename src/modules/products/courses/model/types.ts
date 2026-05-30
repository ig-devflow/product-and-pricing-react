import type { AuditFields } from '@/modules/products/shared/model/audit';

export interface CourseListItem extends AuditFields {
  id: number;
  name: string;
  divisionName: string;
  isActive: boolean;
  courseLanguageId: number;
  courseIntensityId: number;
}

export interface CourseListPage {
  items: CourseListItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface CourseDetails extends AuditFields {
  id: number;
  divisionId: number;
  unitTypeId: number;
  courseLanguageId: number;
  courseIntensityId: number;
  name: string;
  isActive: boolean;
  ageFrom: number | null;
  ageTo: number | null;
  minimumWeeks: number | null;
  accountCategoryId: number;
  productCategoryId: number;
  generalLedgerCode: string;
  costCentreCode: string;
  closurePolicy: string | null;
}
