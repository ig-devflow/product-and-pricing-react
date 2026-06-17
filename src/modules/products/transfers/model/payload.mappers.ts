import type {
  CreateTransferRequestDto,
  UpdateTransferRequestDto,
} from '@/modules/products/transfers/api/dto';
import type { TransferFormValues } from './form.types';

export function mapTransferFormValuesToCreateDto(
  values: TransferFormValues,
): CreateTransferRequestDto {
  return {
    name: values.name.trim(),
    unitTypeId: values.unitTypeId ?? 0,
    transferTypeId: values.transferTypeId ?? 0,
    transferPortId: values.transferPortId ?? 0,
    timeFrom: values.timeFrom.trim() || null,
    timeTo: values.timeTo.trim() || null,
    isActive: values.isActive,
    accountCategoryId: values.accountCategoryId ?? 0,
    productCategoryId: values.productCategoryId ?? 0,
    generalLedgerCode: values.generalLedgerCode.trim() || null,
    costCentreCode: values.costCentreCode.trim() || null,
    closurePolicy: values.closurePolicy.trim() || null,
  };
}

export function mapTransferFormValuesToUpdateDto(
  values: TransferFormValues,
  version: string,
): UpdateTransferRequestDto {
  return { ...mapTransferFormValuesToCreateDto(values), version };
}
