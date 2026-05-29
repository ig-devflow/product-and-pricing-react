import type { CreateRoomRequestDto, UpdateRoomRequestDto } from '@/modules/products/rooms/api/dto';
import type { RoomFormValues } from './form.types';

export function mapRoomFormValuesToCreateDto(values: RoomFormValues): CreateRoomRequestDto {
  return {
    name: values.name.trim(),
    unitTypeId: values.unitTypeId ?? 0,
    isActive: values.isActive,
    occupyRoom: values.occupyRoom,
    roomDetails: {
      roomTypeId: values.roomTypeId ?? 0,
      boardTypeId: values.boardTypeId ?? 0,
      bathroomTypeId: values.bathroomTypeId ?? 0,
      roomGradeId: values.roomGradeId ?? 0,
    },
    accountCategoryId: values.accountCategoryId ?? 0,
    productCategoryId: values.productCategoryId ?? 0,
    generalLedgerCode: values.generalLedgerCode.trim() || null,
    costCentreCode: values.costCentreCode.trim() || null,
    closurePolicy: values.closurePolicy.trim() || null,
  };
}

export function mapRoomFormValuesToUpdateDto(
  values: RoomFormValues,
  version: string,
): UpdateRoomRequestDto {
  return { ...mapRoomFormValuesToCreateDto(values), version };
}
