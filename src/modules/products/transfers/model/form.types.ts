export interface TransferFormValues {
  name: string;
  unitTypeId: number | null;
  transferTypeId: number | null;
  transferPortId: number | null;
  timeFrom: string;
  timeTo: string;
  isActive: boolean;
  accountCategoryId: number | null;
  productCategoryId: number | null;
  generalLedgerCode: string;
  costCentreCode: string;
  closurePolicy: string;
}
