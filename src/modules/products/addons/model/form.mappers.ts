import type { AddOnDetails } from './types';
import type { AddOnFormValues } from './form.types';

export function createEmptyAddOnFormValues(): AddOnFormValues {
  return {
    name: '',
    unitTypeId: null,
    addOnType: null,
    isActive: true,
    accountCategoryId: null,
    productCategoryId: null,
    ageFrom: '',
    ageTo: '',
    oneToOneLessonsPerWeek: '',
    generalLedgerCode: '',
    costCentreCode: '',
    closurePolicy: '',
  };
}

export function mapAddOnDetailsToFormValues(details: AddOnDetails): AddOnFormValues {
  return {
    name: details.name,
    unitTypeId: details.unitTypeId,
    addOnType: details.addOnType,
    isActive: details.isActive,
    accountCategoryId: details.accountCategoryId,
    productCategoryId: details.productCategoryId,
    ageFrom: details.ageFrom ?? '',
    ageTo: details.ageTo ?? '',
    oneToOneLessonsPerWeek: details.oneToOneLessonsPerWeek ?? '',
    generalLedgerCode: details.generalLedgerCode ?? '',
    costCentreCode: details.costCentreCode ?? '',
    closurePolicy: details.closurePolicy ?? '',
  };
}
