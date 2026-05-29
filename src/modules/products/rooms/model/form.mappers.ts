import type { RoomDetails } from './types';
import type { RoomFormValues } from './form.types';

export function createEmptyRoomFormValues(): RoomFormValues {
  return {
    name: '',
    unitTypeId: null,
    isActive: true,
    occupyRoom: false,
    roomTypeId: null,
    boardTypeId: null,
    bathroomTypeId: null,
    roomGradeId: null,
    accountCategoryId: null,
    productCategoryId: null,
    generalLedgerCode: '',
    costCentreCode: '',
    closurePolicy: '',
  };
}

export function mapRoomDetailsToFormValues(details: RoomDetails): RoomFormValues {
  return {
    name: details.name,
    unitTypeId: details.unitTypeId,
    isActive: details.isActive,
    occupyRoom: details.occupyRoom,
    roomTypeId: details.roomDetails.roomTypeId,
    boardTypeId: details.roomDetails.boardTypeId,
    bathroomTypeId: details.roomDetails.bathroomTypeId,
    roomGradeId: details.roomDetails.roomGradeId,
    accountCategoryId: details.accountCategoryId,
    productCategoryId: details.productCategoryId,
    generalLedgerCode: details.generalLedgerCode,
    costCentreCode: details.costCentreCode,
    closurePolicy: details.closurePolicy,
  };
}
