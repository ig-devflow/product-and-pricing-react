export interface CourseFormValues {
  name: string;
  unitTypeId: number | null;
  courseLanguageId: number | null;
  courseIntensityId: number | null;
  isActive: boolean;
  accountCategoryId: number | null;
  productCategoryId: number | null;
  ageFrom: number | '';
  ageTo: number | '';
  minimumWeeks: number | '';
  generalLedgerCode: string;
  costCentreCode: string;
  closurePolicy: string;
}
