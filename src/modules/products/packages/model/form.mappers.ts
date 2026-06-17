import type { PackageDetails } from './types';
import type { PackageFormValues } from './form.types';

export function createEmptyPackageFormValues(): PackageFormValues {
  return {
    name: '',
    unitTypeId: null,
    isActive: true,
    description: '',
    commission: '',
    ageFrom: '',
    ageTo: '',
    minimumWeeks: '',
    accountCategoryId: null,
    productCategoryId: null,
    generalLedgerCode: '',
    costCentreCode: '',
    closurePolicy: '',
    items: [],
  };
}

export function mapPackageDetailsToFormValues(details: PackageDetails): PackageFormValues {
  return {
    name: details.name,
    unitTypeId: details.unitTypeId,
    isActive: details.isActive,
    description: details.description ?? '',
    commission: details.commission,
    ageFrom: details.ageFrom ?? '',
    ageTo: details.ageTo ?? '',
    minimumWeeks: details.minimumWeeks ?? '',
    accountCategoryId: details.accountCategoryId,
    productCategoryId: details.productCategoryId,
    generalLedgerCode: details.generalLedgerCode ?? '',
    costCentreCode: details.costCentreCode ?? '',
    closurePolicy: details.closurePolicy ?? '',
    items: details.items,
  };
}
