import type { AddOnType } from '@/modules/products/addons/api/dto';

export interface AddOnFormValues {
  name: string;
  unitTypeId: number | null;
  addOnType: AddOnType | null;
  isActive: boolean;
  accountCategoryId: number | null;
  productCategoryId: number | null;
  ageFrom: number | '';
  ageTo: number | '';
  oneToOneLessonsPerWeek: number | '';
  generalLedgerCode: string;
  costCentreCode: string;
  closurePolicy: string;
}
