import type { PackageItemDto } from '@/modules/products/packages/api/dto';

export interface PackageFormValues {
  name: string;
  unitTypeId: number | null;
  isActive: boolean;
  description: string;
  commission: number | '';
  ageFrom: number | '';
  ageTo: number | '';
  minimumWeeks: number | '';
  accountCategoryId: number | null;
  productCategoryId: number | null;
  generalLedgerCode: string;
  costCentreCode: string;
  closurePolicy: string;
  items: PackageItemDto[];
}
