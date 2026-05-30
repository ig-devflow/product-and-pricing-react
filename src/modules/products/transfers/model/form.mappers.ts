import type { TransferDetails } from './types';
import type { TransferFormValues } from './form.types';

export function createEmptyTransferFormValues(): TransferFormValues {
  return {
    name: '',
    unitTypeId: null,
    transferTypeId: null,
    transferPortId: null,
    timeFrom: '',
    timeTo: '',
    isActive: true,
    accountCategoryId: null,
    productCategoryId: null,
    generalLedgerCode: '',
    costCentreCode: '',
    closurePolicy: '',
  };
}

export function mapTransferDetailsToFormValues(details: TransferDetails): TransferFormValues {
  return {
    name: details.name,
    unitTypeId: details.unitTypeId,
    transferTypeId: details.transferTypeId,
    transferPortId: details.transferPortId,
    timeFrom: details.timeFrom ?? '',
    timeTo: details.timeTo ?? '',
    isActive: details.isActive,
    accountCategoryId: details.accountCategoryId,
    productCategoryId: details.productCategoryId,
    generalLedgerCode: details.generalLedgerCode ?? '',
    costCentreCode: details.costCentreCode ?? '',
    closurePolicy: details.closurePolicy ?? '',
  };
}
