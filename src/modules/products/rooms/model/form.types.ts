export interface RoomFormValues {
  name: string;
  unitTypeId: number | null;
  isActive: boolean;
  occupyRoom: boolean;
  roomTypeId: number | null;
  boardTypeId: number | null;
  bathroomTypeId: number | null;
  roomGradeId: number | null;
  accountCategoryId: number | null;
  productCategoryId: number | null;
  generalLedgerCode: string;
  costCentreCode: string;
  closurePolicy: string;
}
